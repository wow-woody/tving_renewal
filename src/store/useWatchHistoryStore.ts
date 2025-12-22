// 시청 내역을 저장할 배열
// 재생 버튼 클릭시 시청 내역 추가
// 로그인시 시청 내역 목록 가져오기
// 로그아웃 초기화

import { create } from 'zustand';
import type { WatchHistoryItem, WatchHistoryState } from '../type/contents';
import { useAuthStore } from './useAuthStore';
import { useUserStore } from './useUserStore';
// firebase firestore를 가져오기
// 특정문서 참조, 문서 저장/삭제, 컬렉션 참조/가져오기
import { db } from '../firebase/firebase';
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';

export const useWatchHistoryStore = create<WatchHistoryState>((set, get) => ({
  // 시청 내역을 저장할 배열
  watchHistory: [],

  // 시청 내역 추가
  onAddWatchHistory: async (item) => {
    // 로그인 정보 확인
    const user = useAuthStore.getState().user;
    const profileId = useUserStore.getState().profileId;
    if (!user) return alert('로그인이 필요합니다');
    if (!profileId) return alert('프로필을 선택해주세요');

    // firebase firestore에 해당 시청 내역 문서 저장/참조
    // users컬렉션 -> uid문서 -> profiles -> profileId -> watchHistory서브 컬렉션 -> 영상.id 문서
    const watchItem = {
      ...item,
      watchedAt: new Date().toISOString(),
    };

    const ref = doc(db, 'users', user.uid, 'profiles', profileId, 'watchHistory', String(item.id));

    // 이미 있으면 시청 시간만 업데이트, 없으면 추가
    await setDoc(ref, watchItem);

    // 기존 항목이 있으면 제거하고 맨 앞에 추가 (최신순)
    const currentHistory = get().watchHistory.filter((h) => h.id !== item.id);
    set({
      watchHistory: [watchItem, ...currentHistory],
    });
  },

  // 시청 내역 삭제
  onRemoveWatchHistory: async (id) => {
    const user = useAuthStore.getState().user;
    const profileId = useUserStore.getState().profileId;
    if (!user || !profileId) return;

    // firebase에서 삭제
    const ref = doc(db, 'users', user.uid, 'profiles', profileId, 'watchHistory', String(id));
    await deleteDoc(ref);

    // zustand 상태에서도 제거
    set({
      watchHistory: get().watchHistory.filter((h) => h.id !== id),
    });
  },

  // 시청 내역 가져오기
  onFetchWatchHistory: async () => {
    const user = useAuthStore.getState().user;
    const profileId = useUserStore.getState().profileId;
    if (!user) return;
    if (!profileId) return;

    //firestore user/{uid}/profiles/{profileId}/watchHistory 컬렉션 가져오기
    const snap = await getDocs(
      collection(db, 'users', user.uid, 'profiles', profileId, 'watchHistory')
    );
    // 가지고온 문서를 배열로 변환 시켜서 watchHistory 배열에 넣기
    const data = snap.docs.map((doc) => doc.data() as WatchHistoryItem);
    // 시청 시간 기준으로 최신순 정렬
    data.sort((a, b) => new Date(b.watchedAt).getTime() - new Date(a.watchedAt).getTime());
    // zustand 상태변수에 저장
    set({ watchHistory: data });
  },

  onResetWatchHistory: () => set({ watchHistory: [] }),
}));
