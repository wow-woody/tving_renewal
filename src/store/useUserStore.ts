import { create } from 'zustand';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import type { Profile, Subscription } from '../type/Auth';
import { ProfileImg } from '../constants/ProfileImages';

const endOfThisMonthISO = () => {
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  return end.toISOString();
};

interface UserState {
  profiles: Profile[];
  profileId: string | null;
  // account-scoped subscription (moved from per-profile)
  subscription: Subscription | null;

  initProfiles: (uid: string) => Promise<void>;
  addProfile: (uid: string, name: string) => Promise<void>;
  removeProfile: (uid: string, profileId: string) => Promise<void>;
  updatePro: (uid: string, profileId: string, name: string) => Promise<void>;
  onSetProfile: (id: string) => void;

  saveSubscription: (uid: string, profileId: string, subscription: Subscription) => Promise<void>;
  cancelSubscription: (uid: string, profileId: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  profiles: [],
  profileId: null,
  subscription: null,

  // 로그인 직후 호출
  initProfiles: async (uid) => {
    const ref = collection(db, 'users', uid, 'profiles');
    const q = query(ref, orderBy('createdAt', 'asc'));
    const snap = await getDocs(q);

    // 자동 생성
    if (snap.empty) {
      await addDoc(ref, {
        name: '내 프로필',
        owner: true,
        image: ProfileImg[0],
        createdAt: new Date(),
      });
      return get().initProfiles(uid);
    }

    const profiles: Profile[] = snap.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Profile, 'id'>),
    }));

    // localStorage에서 저장된 profileId 확인
    const savedProfileId = localStorage.getItem('selectedProfileId');
    const validProfileId =
      savedProfileId && profiles.some((p) => p.id === savedProfileId)
        ? savedProfileId
        : profiles[0].id;

    // Try to load account-level subscription from users/{uid} doc
    const userDoc = await getDoc(doc(db, 'users', uid));
    let accountSubscription: Subscription | null = null;

    if (userDoc.exists()) {
      const data = userDoc.data() as any;
      if (data.subscription) {
        accountSubscription = data.subscription as Subscription;
      }
    }

    // If no account subscription, try to find a subscription attached to any profile (migration)
    if (!accountSubscription) {
      const found = profiles.find((p) => p.subscription);
      if (found?.subscription) {
        accountSubscription = found.subscription as Subscription;
        // write it to user doc for future consistency (merge/create if missing)
        await setDoc(doc(db, 'users', uid), { subscription: accountSubscription }, { merge: true });
      }
    }

    localStorage.setItem('selectedProfileId', validProfileId);

    set({
      profiles,
      profileId: validProfileId,
      subscription: accountSubscription ?? null,
    });
  },

  // 프로필 추가
  addProfile: async (uid, name) => {
    const profiles = get().profiles;
    if (profiles.length >= 4) return;

    const usedImg = profiles.map((i) => i.image);
    const CheckImg = ProfileImg.find((img) => !usedImg.includes(img)) ?? ProfileImg[0];

    const ref = collection(db, 'users', uid, 'profiles');
    const docRef = await addDoc(ref, {
      name,
      owner: false,
      image: CheckImg,
      createdAt: new Date(),
    });

    set({
      profiles: [
        ...profiles,
        {
          id: docRef.id,
          name,
          owner: false,
          image: CheckImg,
          createdAt: new Date(),
        },
      ],
    });
  },

  // 프로필 삭제
  removeProfile: async (uid, profileId) => {
    const { profiles, profileId: currentId } = get();
    const target = profiles.find((p) => p.id === profileId);
    if (!target) return;

    //firestore에서 삭제
    await deleteDoc(doc(db, 'users', uid, 'profiles', profileId));

    const setProfiles = profiles.filter((p) => p.id !== profileId);
    const newProfileId =
      currentId === profileId
        ? setProfiles.find((p) => p.owner)?.id ?? setProfiles[0]?.id ?? ''
        : currentId;

    if (newProfileId) {
      localStorage.setItem('selectedProfileId', newProfileId);
    }

    set({
      profiles: setProfiles,
      profileId: newProfileId,
    });
  },

  // 프로필 수정 업뎃
  updatePro: async (uId, profileId, name) => {
    const { profiles } = get();
    await updateDoc(doc(db, 'users', uId, 'profiles', profileId), {
      name,
    });
    set({ profiles: profiles.map((p) => (p.id === profileId ? { ...p, name } : p)) });
  },

  onSetProfile: (id) => {
    localStorage.setItem('selectedProfileId', id);
    set({ profileId: id });
  },

  //구독 저장 (이제 계정 수준으로 저장합니다)
  saveSubscription: async (uid, profileId, subscription) => {
    const { profiles } = get();
    const profile = profiles.find((p) => p.id === profileId);
    if (!profile) return;

    // Firestore: save to users/{uid} (account-scoped). Use setDoc with merge so user doc is created if needed
    await setDoc(doc(db, 'users', uid), { subscription }, { merge: true });

    // store 업데이트: account subscription을 업데이트하고 모든 profile에도 동기화(호환성)
    set({
      subscription,
      profiles: profiles.map((p) => ({ ...p, subscription })),
    });
  },

  // 구독 취소 (계정 수준으로 취소 처리하여 모든 프로필에 적용)

  cancelSubscription: async (uid, profileId) => {
    const { profiles } = get();
    // use the current account-level subscription if available, else fall back to profile subscription
    const currentSub = get().subscription ?? profiles.find((p) => p.id === profileId)?.subscription;
    if (!currentSub) return;

    const next = {
      ...currentSub,
      status: 'canceled' as const,
      canceledAt: new Date().toISOString(),
      cancelEffectiveAt: endOfThisMonthISO(),
    };

    // update account-level subscription (create if missing)
    await setDoc(doc(db, 'users', uid), { subscription: next }, { merge: true });

    // sync to local state and also write into profiles for UI compatibility
    set({
      subscription: next,
      profiles: profiles.map((p) => ({ ...p, subscription: next })),
    });
  },
}));
