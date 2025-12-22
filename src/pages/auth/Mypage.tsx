import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/useUserStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useHeartStore } from '../../store/useHeartStore';
import { useWatchHistoryStore } from '../../store/useWatchHistoryStore';
import { useEffect, useState, useRef } from 'react';
import type { CSSProperties } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { getLiveAlarms, removeLiveAlarm, type LiveAlarm } from '../../firebase/liveAlarms';
import CstomerService from './CstomerService';
import Edit_Members from './Edit_Members';
import './scss/Mypage.scss';

const Mypage = () => {
  const { profiles, profileId } = useUserStore();
  const { user } = useAuthStore();
  const { hearts, onFetchHeart, onToggleHeart } = useHeartStore();
  const { watchHistory, onFetchWatchHistory, onRemoveWatchHistory } = useWatchHistoryStore();
  const navigate = useNavigate();
  const currentProfile = profiles.find((p) => p.id === profileId);
  const [liveAlarms, setLiveAlarms] = useState<LiveAlarm[]>([]);
  const [showCustomerService, setShowCustomerService] = useState(false);
  const [showEditMembers, setShowEditMembers] = useState(false);
  const [barOffsetWatching, setBarOffsetWatching] = useState(0);
  const [barOffsetInterest, setBarOffsetInterest] = useState(0);

  const barRefWatching = useRef<HTMLDivElement | null>(null);
  const trackRefWatching = useRef<HTMLDivElement | null>(null);
  const prevRefWatching = useRef<HTMLButtonElement | null>(null);
  const nextRefWatching = useRef<HTMLButtonElement | null>(null);

  const barRefInterest = useRef<HTMLDivElement | null>(null);
  const trackRefInterest = useRef<HTMLDivElement | null>(null);
  const prevRefInterest = useRef<HTMLButtonElement | null>(null);
  const nextRefInterest = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const fetchAlarms = async () => {
      if (user?.uid && profileId) {
        const alarms = await getLiveAlarms(user.uid);
        setLiveAlarms(alarms);
        await onFetchHeart();
        await onFetchWatchHistory();
      }
    };
    fetchAlarms();
  }, [user, profileId, onFetchHeart, onFetchWatchHistory]);

  const handleRemoveAlarm = async (channelId: string) => {
    if (!user?.uid) return;
    const success = await removeLiveAlarm(user.uid, channelId);
    if (success) {
      setLiveAlarms((prev) => prev.filter((alarm) => alarm.channelId !== channelId));
      alert('알림이 삭제되었습니다.');
    }
  };

  const handleAlarmClick = (channelId: string) => {
    navigate('/live', { state: { channelId } });
  };

  const updateBarWatching = (prog: number) => {
    if (!trackRefWatching.current || !barRefWatching.current) return;
    const track = trackRefWatching.current.clientWidth;
    const bar = barRefWatching.current.clientWidth;
    const maxLeft = Math.max(track - bar, 0);
    setBarOffsetWatching(Math.min(Math.max(prog, 0), 1) * maxLeft);
  };

  const updateBarInterest = (prog: number) => {
    if (!trackRefInterest.current || !barRefInterest.current) return;
    const track = trackRefInterest.current.clientWidth;
    const bar = barRefInterest.current.clientWidth;
    const maxLeft = Math.max(track - bar, 0);
    setBarOffsetInterest(Math.min(Math.max(prog, 0), 1) * maxLeft);
  };

  const handleRemoveHeart = async (item: any) => {
    await onToggleHeart(item);
  };

  const handleRemoveWatchHistory = async (id: number) => {
    await onRemoveWatchHistory(id);
  };

  return (
    <div className="mypage-wrap">
      <div className="user-info-wrap">
        <div className="user-info">
          <div className="user">
            <div className="top-title">
              <h3 className="sub-title">계정관리</h3>
              <div className="link">
                <Link to="/editprofile">
                  <p>프로필 수정</p>
                  <img src="/images/edit.svg" alt="edit" />
                </Link>
              </div>
            </div>
            <div className="current-profile">
              {currentProfile && (
                <>
                  <img src={currentProfile.image} alt={currentProfile.name} />
                  <span>{currentProfile.name}</span>
                </>
              )}
            </div>
          </div>

          <div className="subscribe">
            <div className="top-title">
              <h3 className="sub-title">이용권 관리</h3>
              <div className="link">
                <Link to="/subscription">
                  {/* 이용권 이름 들어와야 함 */}
                  <p>3PACK 이용권</p>
                  <img src="/images/edit.svg" alt="edit" />
                </Link>
              </div>
            </div>
            {/* 이용권 선택 */}
            <div className="current-subscribe">
              <div className="subscribe-info">
                <img src="/images/tving-icon.svg" alt="" />
                <p>동시시청 2대 | 고화질 | 모든 디바이스</p>
              </div>
              <div className="subscribe-info">
                <img src="/images/tving-icon.svg" alt="" />
                <p>동시시청 2대 | 고화질 | 모든 디바이스</p>
              </div>
              <div className="subscribe-info">
                <img src="/images/tving-icon.svg" alt="" />
                <p>동시시청 2대 | 고화질 | 모든 디바이스</p>
              </div>
            </div>
          </div>

          <div className="cs">
            <div className="top-title">
              <h3 className="sub-title">설정 및 관리</h3>
            </div>
            <div className="setting">
              <div onClick={() => setShowCustomerService(true)} style={{ cursor: 'pointer' }}>
                <img src="/images/cs-1.svg" alt="cs-1" />
                <p>고객센터 문의</p>
              </div>
              <div onClick={() => setShowEditMembers(true)} style={{ cursor: 'pointer' }}>
                <img src="/images/cs-2.svg" alt="cs-2" />
                <p>회원정보 수정</p>
              </div>
              <div>
                <img src="/images/cs-3.svg" alt="cs-3" />
                <p>보유캐시</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section
        className="watching-list"
        style={{ '--watching-progress': `${barOffsetWatching}px` } as CSSProperties}>
        <div className="title-wrap">
          <h2>전체 시청 내역</h2>
          <div className="pagenation-wrap">
            <div className="pagenation-area" ref={trackRefWatching}>
              <div className="pagenation-line"></div>
              <div className="pointer-line" ref={barRefWatching}></div>
            </div>
            <div className="nav-btn">
              <button ref={prevRefWatching} className="prev">
                <img src="/images/arrow-left.svg" alt="prev" />
              </button>
              <button ref={nextRefWatching} className="next">
                <img src="/images/arrow-right.svg" alt="next" />
              </button>
            </div>
          </div>
        </div>
        <div className="watching-list-content">
          {watchHistory.length === 0 ? (
            <p className="empty-message">시청 내역이 없습니다.</p>
          ) : (
            <Swiper
              modules={[Navigation]}
              slidesPerView="auto"
              spaceBetween={20}
              navigation
              onBeforeInit={(swiper) => {
                // @ts-expect-error HTMLElement OK
                swiper.params.navigation.prevEl = prevRefWatching.current;
                // @ts-expect-error HTMLElement OK
                swiper.params.navigation.nextEl = nextRefWatching.current;
              }}
              onSwiper={() => updateBarWatching(0)}
              onSlideChange={(swiper) => {
                const total = watchHistory.length;
                const visible = Number(swiper.params.slidesPerView) || 1;
                const maxIndex = Math.max(total - visible, 1);
                updateBarWatching(swiper.activeIndex / maxIndex);
              }}
              onProgress={(_, prog) => updateBarWatching(prog)}
              className="watching-swiper">
              {watchHistory.map((item) => {
                const detailPath =
                  item.media_type === 'movie' ? `/movie/detail/${item.id}` : `/detail/${item.id}`;

                return (
                  <SwiperSlide key={`${item.id}-${item.watchedAt}`}>
                    <div className="watching-item">
                      <Link to={detailPath} className="watching-link">
                        <div className="watching-thumb">
                          <img
                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                            alt={item.title || item.name}
                          />
                        </div>
                        <p className="watching-title">{item.title || item.name}</p>
                        {item.seasonNumber && item.episodeNumber && (
                          <p className="watching-episode">
                            S{item.seasonNumber} E{item.episodeNumber}
                          </p>
                        )}
                      </Link>
                      <button
                        className="remove-watching-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemoveWatchHistory(item.id);
                        }}>
                        삭제
                      </button>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
      </section>

      <section
        className="interest"
        style={{ '--interest-progress': `${barOffsetInterest}px` } as CSSProperties}>
        <div className="title-wrap">
          <h2>관심 컨텐츠</h2>
          <div className="pagenation-wrap">
            <div className="pagenation-area" ref={trackRefInterest}>
              <div className="pagenation-line"></div>
              <div className="pointer-line" ref={barRefInterest}></div>
            </div>
            <div className="nav-btn">
              <button ref={prevRefInterest} className="prev">
                <img src="/images/arrow-left.svg" alt="prev" />
              </button>
              <button ref={nextRefInterest} className="next">
                <img src="/images/arrow-right.svg" alt="next" />
              </button>
            </div>
          </div>
        </div>
        <div className="interest-list">
          {hearts.length === 0 ? (
            <p className="empty-message">찜한 컨텐츠가 없습니다.</p>
          ) : (
            <Swiper
              modules={[Navigation]}
              slidesPerView="auto"
              spaceBetween={20}
              navigation
              onBeforeInit={(swiper) => {
                // @ts-expect-error HTMLElement OK
                swiper.params.navigation.prevEl = prevRefInterest.current;
                // @ts-expect-error HTMLElement OK
                swiper.params.navigation.nextEl = nextRefInterest.current;
              }}
              onSwiper={() => updateBarInterest(0)}
              onSlideChange={(swiper) => {
                const total = hearts.length;
                const visible = Number(swiper.params.slidesPerView) || 1;
                const maxIndex = Math.max(total - visible, 1);
                updateBarInterest(swiper.activeIndex / maxIndex);
              }}
              onProgress={(_, prog) => updateBarInterest(prog)}
              className="interest-swiper">
              {hearts.map((item: import('../../type/contents').HeartItem) => {
                const detailPath =
                  item.media_type === 'movie' ? `/movie/detail/${item.id}` : `/detail/${item.id}`;

                return (
                  <SwiperSlide key={item.id}>
                    <div className="interest-item">
                      <Link to={detailPath} className="interest-link">
                        <div className="interest-thumb">
                          <img
                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                            alt={item.title || item.name}
                          />
                        </div>
                        <p className="interest-title">{item.title || item.name}</p>
                      </Link>
                      <button
                        className="remove-heart-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemoveHeart(item);
                        }}>
                        삭제
                      </button>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
      </section>

      <section className="live">
        <div className="title-wrap">
          <h2>라이브 예약 알림</h2>
        </div>
        <div className="live-alarm-list">
          {liveAlarms.length === 0 ? (
            <p className="empty-message">설정된 알림이 없습니다.</p>
          ) : (
            liveAlarms.map((alarm) => (
              <div key={alarm.id} className="alarm-item">
                <div className="alarm-thumb" onClick={() => handleAlarmClick(alarm.channelId)}>
                  <img src={alarm.thumb} alt={alarm.title} />
                </div>
                <div className="alarm-info">
                  <p className="alarm-title" onClick={() => handleAlarmClick(alarm.channelId)}>
                    {alarm.title}
                  </p>
                  <button className="remove-btn" onClick={() => handleRemoveAlarm(alarm.channelId)}>
                    삭제
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {showCustomerService && <CstomerService onClose={() => setShowCustomerService(false)} />}
      {showEditMembers && (
        <div className="modal-overlay" onClick={() => setShowEditMembers(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <Edit_Members onClose={() => setShowEditMembers(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Mypage;
