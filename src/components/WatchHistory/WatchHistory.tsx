import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import './HWatching.scss';
import { Link } from 'react-router-dom';
import { useWatchHistoryStore } from '../../store/useWatchHistoryStore';
import { useAuthStore } from '../../store/useAuthStore';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

const WatchHistory = () => {
  const { watchHistory, onFetchWatchHistory } = useWatchHistoryStore();
  const { user, loading } = useAuthStore();

  const [activeIndex, setActiveIndex] = useState(0);
  const [barOffset, setBarOffset] = useState(0);

  const swiperRef = useRef<SwiperType | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (user) {
      onFetchWatchHistory();
    }
  }, [user, onFetchWatchHistory]);

  const updateBar = (prog: number) => {
    if (!trackRef.current || !barRef.current) return;

    const trackWidth = trackRef.current.clientWidth;
    const barWidth = barRef.current.clientWidth;
    const maxLeft = Math.max(trackWidth - barWidth, 0);

    setBarOffset(Math.min(Math.max(prog, 0), 1) * maxLeft);
  };

  if (loading) return null;
  //   if (!user) return null;
  //   로그인하지 않았거나 시청 내역이 없으면 렌더링하지 않음
  if (!user || watchHistory.length === 0) return null;
  if (watchHistory.length === 0) return null;

  const activeItem = watchHistory[activeIndex] || watchHistory[0];

  return (
    <section
      className="hwatching-section"
      style={{ '--enter-progress': `${barOffset}px` } as CSSProperties}>
      {/* 헤더 */}
      <div className="section-header">
        <div className="thumb-controls">
          <div className="enter-pagination" ref={trackRef}>
            <div className="pagenation-line" />
            <div className="pointer-line" ref={barRef} />
          </div>

          <div className="enter-nav">
            <button ref={prevRef} className="nav-btn prev">
              ‹
            </button>
            <button ref={nextRef} className="nav-btn next">
              ›
            </button>
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className="hwatching-body">
        <div className="title-area">
          <h2 className="hwatching-title">
            현재
            <br />
            시청 중인
            <br />
            콘텐츠
          </h2>
        </div>

        {/* 메인 */}
        <div className="hwatching-fixed">
          <div className="featured-media">
            {activeItem && (
              <img
                src={`${IMAGE_BASE}${activeItem.backdrop_path || activeItem.poster_path}`}
                alt={activeItem.title || activeItem.name}
              />
            )}
          </div>

          {activeItem && (
            <Link
              to={
                activeItem.media_type === 'movie'
                  ? `/movie/detail/${activeItem.id}`
                  : `/detail/${activeItem.id}`
              }
              className="featured-info">
              <h3>{activeItem.title || activeItem.name}</h3>

              {activeItem.cAge && <p className="age">{activeItem.cAge}</p>}

              {activeItem.seasonNumber && activeItem.episodeNumber && (
                <p className="season">
                  시즌 {activeItem.seasonNumber} · 에피소드 {activeItem.episodeNumber}
                </p>
              )}

              <span className="desc">{activeItem.overview}</span>
            </Link>
          )}
        </div>

        {/* 썸네일 스와이퍼 */}
        <div className="thumb-rail-hwatching">
          <Swiper
            slidesPerView="auto"
            spaceBetween={30}
            loop
            navigation
            modules={[Navigation]}
            onBeforeInit={(swiper) => {
              // @ts-expect-error HTMLElement OK
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-expect-error HTMLElement OK
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            onSwiper={(s) => {
              swiperRef.current = s;
              updateBar(0);
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
              const visible = Number(swiper.params.slidesPerView) || 1;
              const maxIndex = Math.max(watchHistory.length - visible, 1);
              updateBar(swiper.realIndex / maxIndex);
            }}
            onProgress={(_, prog) => updateBar(prog)}>
            {watchHistory.map((item, index) => (
              <SwiperSlide key={`${item.id}-${item.watchedAt}`}>
                <button
                  className={`thumb ${index === activeIndex ? 'is-active' : ''}`}
                  onClick={() => {
                    swiperRef.current?.slideToLoop(index);
                  }}>
                  <img src={`${IMAGE_BASE}${item.poster_path}`} alt={item.title || item.name} />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default WatchHistory;
