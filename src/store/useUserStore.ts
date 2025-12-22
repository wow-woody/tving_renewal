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
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import type { Profile, Subscription } from '../type/Auth';
import { ProfileImg } from '../constants/ProfileImages';

interface UserState {
    profiles: Profile[];
    profileId: string | null;

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

        localStorage.setItem('selectedProfileId', validProfileId);

        set({
            profiles,
            profileId: validProfileId,
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

    //구독 저장
    saveSubscription: async (uid, profileId, subscription) => {
        const { profiles } = get();
        const profile = profiles.find((p) => p.id === profileId);
        if (!profile) return;

        // Firestore 업데이트
        await updateDoc(doc(db, 'users', uid, 'profiles', profileId), {
            subscription,
        });

        // store 업데이트
        set({
            profiles: profiles.map((p) => (p.id === profileId ? { ...p, subscription } : p)),
        });
    },

    // 구독 취소
    cancelSubscription: async (uid, profileId) => {
        const { profiles } = get();
        const profile = profiles.find((p) => p.id === profileId);
        if (!profile) return;

        await updateDoc(doc(db, 'users', uid, 'profiles', profileId), {
            subscription: null,
        });

        set({
            profiles: profiles.map((p) => (p.id === profileId ? { ...p, subscription: null } : p)),
        });
    },
}));
