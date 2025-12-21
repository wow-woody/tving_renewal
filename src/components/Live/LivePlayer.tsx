import { useState, useEffect } from "react";
import type { LiveChannel } from "../../data/LiveChannels";
import { useAuthStore } from "../../store/useAuthStore";
import { addLiveAlarm, removeLiveAlarm, checkLiveAlarm } from "../../firebase/liveAlarms";

interface Props {
  channel: LiveChannel;
}

const LivePlayer = ({ channel }: Props) => {
  const { user } = useAuthStore();
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAlarm = async () => {
      if (user?.uid) {
        const exists = await checkLiveAlarm(user.uid, channel.id);
        setIsAlarmSet(exists);
      }
    };
    checkAlarm();
  }, [user, channel.id]);

  const handleAlarmClick = async () => {
    if (!user?.uid) {
      alert('로그인이 필요합니다.');
      return;
    }

    setLoading(true);
    try {
      if (isAlarmSet) {
        // 알림 해제
        const success = await removeLiveAlarm(user.uid, channel.id);
        if (success) {
          setIsAlarmSet(false);
          // alert('알림이 해제되었습니다.');
        }
      } else {
        // 알림 설정
        const success = await addLiveAlarm(user.uid, channel.id, channel.title, channel.thumb);
        if (success) {
          setIsAlarmSet(true);
          // alert('알림이 설정되었습니다.');
        }
      }
    } catch (error) {
      console.error('알림 처리 실패:', error);
      // alert('알림 처리에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="live-player">
      <div
        className="video-area"
        dangerouslySetInnerHTML={{ __html: channel.iframe }}
      />

      <div className="info-box">
        <h2 className="live-title">{channel.title}</h2>
        <button 
          className={`alarm-btn ${isAlarmSet ? 'active' : ''}`}
          onClick={handleAlarmClick}
          disabled={loading}
        >
          <img src="/images/aside-header-icon3.png" alt="알림" />
          {loading ? '처리중...' : isAlarmSet ? '알림 해제' : '라이브 예약 알림'}
        </button>
      </div>
    </div>
  );
};

export default LivePlayer;
