import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase/firebase';
import { create } from 'zustand';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore';

declare global {
  interface Window {
    Kakao: any;
  }
}

type UserInfo =
  | User
  | {
      uid: string;
      email: string;
      name: string;
      provider: string;
      createdAt: Date | Timestamp;
      nickname?: string;
    };

interface AuthState {
  user: UserInfo | null;
  loading: boolean;
  alertModal: {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
    title?: string;
  } | null;
  showAlert: (message: string, type?: 'success' | 'error' | 'info', title?: string) => void;
  hideAlert: () => void;
  onMember: (id: string, email: string, password: string) => Promise<void>;
  onLogin: (email: string, password: string) => Promise<void>;
  onLogout: () => Promise<void>;
  onGoogleLogin: () => Promise<void>;
  onKakaoLogin: () => Promise<void>;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  alertModal: null,

  showAlert: (message, type = 'info', title) => {
    set({ alertModal: { show: true, message, type, title } });
  },

  hideAlert: () => {
    set({ alertModal: null });
  },

  initAuth: () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        set({ user, loading: false });
      } else {
        // 카카오
        const kakaoUser = localStorage.getItem('kakaoUser');
        if (kakaoUser) {
          set({ user: JSON.parse(kakaoUser), loading: false });
          return;
        }
        set({ user: null, loading: false });
      }
    });
  },

  // 회원가입 메서드
  onMember: async (id, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, 'users', uid), {
        id,
        email,
        uid,
        createdAt: new Date(),
      });
      set({ user: userCredential.user });
      useAuthStore.getState().showAlert('회원가입이 완료되었습니다!', 'success');
    } catch (err: any) {
      useAuthStore.getState().showAlert('회원가입에 실패했습니다. 다시 시도해주세요.', 'error');
      console.log('회원가입 실패', err.message);
    }
  },

  // 로그인 메서드
  onLogin: async (email, password) => {
    try {
      let IdEmail = email;

      if (!email.includes('@')) {
        const userRef = collection(db, 'users');
        const q = query(userRef, where('id', '==', email));
        const querySnapshot = await getDocs(q);

        IdEmail = querySnapshot.docs[0].data().email;
      }

      const userCredential = await signInWithEmailAndPassword(auth, IdEmail, password);
      set({ user: userCredential.user });
      useAuthStore.getState().showAlert('로그인 성공!', 'success');
    } catch (err: any) {
      useAuthStore.getState().showAlert('로그인에 실패했습니다.\n아이디와 비밀번호를 확인해주세요.', 'error');
      console.log('로그인 실패', err.message);
    }
  },

  // 구글
  onGoogleLogin: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const customUser: UserInfo = {
        uid: user.uid,
        email: user.email!,
        name: user.displayName || '',
        provider: 'google',
        createdAt: new Date(),
      };

      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        await setDoc(userRef, customUser);
      }
      set({ user: customUser });
      useAuthStore.getState().showAlert(`${customUser.name}님, 환영합니다!`, 'success', 'Google 로그인 성공');
    } catch (err: any) {
      useAuthStore.getState().showAlert(err.message || '로그인에 실패했습니다.', 'error');
    }
  },

  // 카카오
  onKakaoLogin: async () => {
    try {
      // 1 카카오 SDK 초기화
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init('739f3bb69e1cf65293581959588a1419');
        console.log(' Kakao SDK 초기화 완료');
      }

      // 2 로그인 요청 (Promise 변환)
      const authObj = await new Promise((resolve, reject) => {
        window.Kakao.Auth.login({
          scope: 'profile_nickname',
          success: resolve,
          fail: reject,
        });
      });
      console.log(' 카카오 로그인 성공:', authObj);

      // 3 사용자 정보 요청 (Promise 기반)
      const res = await window.Kakao.API.request({
        url: '/v2/user/me',
      });
      console.log(' 카카오 사용자 정보:', res);

      // 4 사용자 정보 가공
      const uid = res.id.toString();
      const kakaoUser = {
        uid,
        email: res.kakao_account?.email || '',
        name: res.kakao_account.profile?.nickname || '카카오사용자',
        provider: 'kakao',
        createdAt: new Date(),
      };

      // 5 Firestore에 저장
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, kakaoUser);
        set({ user: kakaoUser });
      } else {
        set({ user: userDoc.data() as UserInfo });
        console.log('기존 카카오 회원 Firestore 데이터 있음');
      }

      // Zustand + localStorage 저장
      set({ user: kakaoUser });
      localStorage.setItem('kakaoUser', JSON.stringify(kakaoUser));

      useAuthStore.getState().showAlert(`${kakaoUser.name}님, 환영합니다!`, 'success', '카카오 로그인 성공');
    } catch (err: any) {
      console.error(' 카카오 로그인 중 오류:', err);
      useAuthStore.getState().showAlert(err.message || '로그인에 실패했습니다.', 'error');
    }
  },

  // 로그아웃
  onLogout: async () => {
    await signOut(auth);
    set({ user: null });
  },
}));
