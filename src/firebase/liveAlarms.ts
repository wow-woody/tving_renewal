import { collection, doc, setDoc, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';

export interface LiveAlarm {
  id: string;
  channelId: string;
  title: string;
  thumb: string;
  createdAt: Date;
}

// 알림 추가
export const addLiveAlarm = async (
  userId: string,
  channelId: string,
  title: string,
  thumb: string
) => {
  try {
    const alarmRef = doc(db, 'users', userId, 'liveAlarms', channelId);
    await setDoc(alarmRef, {
      channelId,
      title,
      thumb,
      createdAt: new Date(),
    });
    return true;
  } catch (error) {
    console.error('알림 추가 실패:', error);
    return false;
  }
};

// 알림 삭제
export const removeLiveAlarm = async (userId: string, channelId: string) => {
  try {
    const alarmRef = doc(db, 'users', userId, 'liveAlarms', channelId);
    await deleteDoc(alarmRef);
    return true;
  } catch (error) {
    console.error('알림 삭제 실패:', error);
    return false;
  }
};

// 알림 확인 (이미 설정되어 있는지)
export const checkLiveAlarm = async (userId: string, channelId: string): Promise<boolean> => {
  try {
    const alarmDoc = await getDocs(
      query(collection(db, 'users', userId, 'liveAlarms'), where('channelId', '==', channelId))
    );
    return !alarmDoc.empty;
  } catch (error) {
    console.error('알림 확인 실패:', error);
    return false;
  }
};

// 모든 알림 가져오기
export const getLiveAlarms = async (userId: string): Promise<LiveAlarm[]> => {
  try {
    const alarmsRef = collection(db, 'users', userId, 'liveAlarms');
    const snapshot = await getDocs(alarmsRef);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as LiveAlarm[];
  } catch (error) {
    console.error('알림 목록 가져오기 실패:', error);
    return [];
  }
};
