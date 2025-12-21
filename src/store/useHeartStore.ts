// 찜한 영화를 저장할 배열
// 찜 버튼 클릭시 찜/취소
// 로그인시 찜 목록 가져오기
// 로그아웃 초기화

import { create } from 'zustand';
import type { HeartItem, HeartState } from '../types/movie';
import { useAuthStore } from './useAuthStore';
import { useUserStore } from './useUserStore';
// firebase firestore를 가져오기
// 특정문서 참조, 문서 저장/삭제, 컬렉션 참조/가져오기
import { db } from '../firebase/firebase';
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';

export const useHeartStore = create<HeartState>((set, get) => ({
  // 찜 목록을 저장할 배열
  hearts: [],
  // 영화를 찜하거나 취소할때 사용될 메서드
  onToggleHeart: async (movie) => {
    // 로그인 정보 확인
    // useAuthStore에 있는 상태 변수 user 가져오기
    const user = useAuthStore.getState().user;
    const profileId = useUserStore.getState().profileId;
    if (!user) return alert('로그인이 필요합니다');
    if (!profileId) return alert('프로필을 선택해주세요');

    // firebase firestore에 해당 영화 문서 저장/참조
    // users컬렉션 -> uid문서 -> profiles -> profileId -> hearts서브 컬렉션 -> 영상.id 문서
    const ref = doc(db, 'users', user.uid, 'profiles', profileId, 'hearts', String(movie.id));

    // 현재 hearts 상태가 이미 있는지 확인
    const exists = get().hearts.find((h) => h.id === movie.id);

    if (exists) {
      // 만약에 있으면 제거
      // firebase에 저장된 문서 제거
      await deleteDoc(ref);
      alert('찜 목록에서 제거됨');
      // zustand 상태에서도 제거
      set({
        hearts: get().hearts.filter((h) => h.id !== movie.id),
      });
    } else {
      // 없으면 추가
      await setDoc(ref, movie);
      set({
        hearts: [...get().hearts, movie],
      });
    }
  },
  onFetchHeart: async () => {
    const user = useAuthStore.getState().user;
    const profileId = useUserStore.getState().profileId;
    if (!user) return;
    if (!profileId) return;
    //firestore user/{uid}/profiles/{profileId}/hearts 컬렉션 가져오기
    const snap = await getDocs(collection(db, 'users', user.uid, 'profiles', profileId, 'hearts'));
    // 가지고온 문서를 배열로 변환 시켜서 hearts 배열에 넣기
    const data = snap.docs.map((doc) => doc.data() as HeartItem);
    // zustand 상태변수에 저장
    set({ hearts: data });
  },
  onResetHeart: () => set({ hearts: [] }),
}));
