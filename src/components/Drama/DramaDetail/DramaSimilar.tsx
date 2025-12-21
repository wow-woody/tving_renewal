import { useParams, useNavigate } from 'react-router-dom';
import { useTvSeriesStore } from '../../../store/useTvSeriesStore';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import './scss/DramaSimilar.scss';

const DramaSimilar = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tvDetail, filteredTvs, onFetchByFilter } = useTvSeriesStore();

  const [barOffset, setBarOffset] = useState(0);

  const swiperRef = useRef<SwiperType | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!tvDetail?.genres) return;

    // 첫 번째 장르 ID로 비슷한 콘텐츠 가져오기
    const genreId = tvDetail.genres[0]?.id;
    if (genreId) {
      onFetchByFilter({ with_genres: String(genreId) });
    }
  }, [tvDetail]);

  const updateBar = (prog: number) => {
    if (!trackRef.current || !barRef.current) return;
    const track = trackRef.current.clientWidth;
    const bar = barRef.current.clientWidth;
    const maxLeft = Math.max(track - bar, 0);
    setBarOffset(Math.min(Math.max(prog, 0), 1) * maxLeft);
  };

  const handleContentClick = (contentId: number) => {
    navigate(`/detail/${contentId}`);
  };

  // 현재 콘텐츠 제외
  const similarContent = filteredTvs.filter((tv) => tv.id !== Number(id));

  if (!similarContent || similarContent.length === 0) return null;

  return (
    <section className="dramaSimilar-wrap">
      <div
        className="similar-section"
        style={{ '--enter-progress': `${barOffset}px` } as CSSProperties}>
        <div className="similar-header">
          <div className="similar-title">
            <h3>비슷한 콘텐츠</h3>
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
        </div>

        <div className="similar-swiper">
          <Swiper
            modules={[Navigation]}
            slidesPerView={5.5}
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
              const total = similarContent.length;
              const visible = Number(swiper.params.slidesPerView) || 1;
              const maxIndex = Math.max(total - visible, 1);
              updateBar(swiper.realIndex / maxIndex);
            }}
            onProgress={(_, prog) => updateBar(prog)}>
            {similarContent.map((content) => (
              <SwiperSlide key={content.id}>
                <div className="similar-card">
                  <button className="poster-thumb" onClick={() => handleContentClick(content.id)}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
                      alt={content.name || content.title}
                    />
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default DramaSimilar;
