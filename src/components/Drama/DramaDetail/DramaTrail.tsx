import { useParams } from 'react-router-dom';
import { useTvSeriesStore } from '../../../store/useTvSeriesStore';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import './scss/DramaTrail.scss';
import DramaVPopup from './DramaVPopup';

const DramaTrail = () => {
  const { id } = useParams<{ id: string }>();
  const { videos, onFetchTvVideos } = useTvSeriesStore();

  const [barOffset, setBarOffset] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedVideoKey, setSelectedVideoKey] = useState('');

  const swiperRef = useRef<SwiperType | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!id) return;
    onFetchTvVideos(id);
  }, [id]);

  const updateBar = (prog: number) => {
    if (!trackRef.current || !barRef.current) return;
    const track = trackRef.current.clientWidth;
    const bar = barRef.current.clientWidth;
    const maxLeft = Math.max(track - bar, 0);
    setBarOffset(Math.min(Math.max(prog, 0), 1) * maxLeft);
  };

  const handleVideoClick = (videoKey: string) => {
    setSelectedVideoKey(videoKey);
    setShowPopup(true);
  };

  if (!videos || videos.length === 0) return <p>영상을 불러오는 중...</p>;

  return (
    <section className="dramaTrail-wrap">
      <div
        className="season-section"
        style={{ '--enter-progress': `${barOffset}px` } as CSSProperties}>
        <div className="season-header">
          <div className="season-title">
            <h3>관련 영상 (총 {videos.length}개)</h3>
          </div>
        </div>

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

        <div className="episode-swiper">
          <Swiper
            modules={[Navigation]}
            slidesPerView={3.8}
            spaceBetween={16}
            navigation
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
              const total = videos.length;
              const visible = Number(swiper.params.slidesPerView) || 1;
              const maxIndex = Math.max(total - visible, 1);
              updateBar(swiper.realIndex / maxIndex);
            }}
            onProgress={(_, prog) => updateBar(prog)}>
            {videos.map((video) => (
              <SwiperSlide key={video.id}>
                <div className="episode-card">
                  <button onClick={() => handleVideoClick(video.key)} className="thumb">
                    <img
                      src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`}
                      alt={video.name}
                      onError={(e) => {
                        e.currentTarget.src = `https://img.youtube.com/vi/${video.key}/hqdefault.jpg`;
                      }}
                    />
                    <div className="play-icon">▶</div>
                  </button>

                  <div className="episode-title">
                    <h3>{video.name}</h3>
                    <p>{video.type}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {showPopup && (
        <DramaVPopup youtubeKey={selectedVideoKey} onClose={() => setShowPopup(false)} />
      )}
    </section>
  );
};

export default DramaTrail;
