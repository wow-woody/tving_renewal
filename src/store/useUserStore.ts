import { create } from 'zustand';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import type { Profile } from '../type/Auth';
import { ProfileImg } from '../constants/ProfileImages';

interface UserState {
  profiles: Profile[];
  profileId: string | null;

  initProfiles: (uid: string) => Promise<void>;
  addProfile: (uid: string, name: string) => Promise<void>;
  onSetProfile: (id: string) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  profiles: [],
  profileId: null,

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

    set({
      profiles,
      profileId: profiles[0].id, // 첫 프로필 자동 선택
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

  onSetProfile: (id) => set({ profileId: id }),
}));
