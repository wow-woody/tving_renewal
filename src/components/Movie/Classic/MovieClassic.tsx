import { useRef, useState, useEffect, type CSSProperties } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import './MovieClassic.scss';

import { useMovieStore } from '../../../store/useMoviesStore';

const MovieClassic = () => {
  const [barOffset, setBarOffset] = useState(0);
  const classicMovies = useMovieStore((s) => s.classicMovies);
  const onFetchClassic = useMovieStore((s) => s.onFetchClassic);

  const swiperRef = useRef<SwiperType | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    onFetchClassic();
  }, [onFetchClassic]);

  const progress = barOffset;

  /** progress(0~1) → 실제 px 이동값 */
  const updateBar = (prog: number) => {
    if (!trackRef.current || !barRef.current) return;
    const track = trackRef.current.clientWidth;
    const bar = barRef.current.clientWidth;
    const maxLeft = Math.max(track - bar, 0);
    const safeProg = Math.min(Math.max(prog, 0), 1);
    setBarOffset(safeProg * maxLeft);
  };

  const formatYear = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).getFullYear();
  };

  return (
    <div
      className="movie-classic-wrappers"
      style={{ '--classic-progress': `${progress}px` } as CSSProperties}>
      {/* 헤더 */}
      <div className="section-header">
        <h2>고전 명작 영화</h2>
        <div className="thumb-controls">
          <div className="classic-pagination" ref={trackRef}>
            <div className="pagenation-line" />
            <div className="pointer-line" ref={barRef} />
          </div>
          <div className="classic-nav">
            <button
              type="button"
              className="nav-btn prev"
              ref={prevRef}
              aria-label="Previous slide">
              ‹
            </button>
            <button type="button" className="nav-btn next" ref={nextRef} aria-label="Next slide">
              ›
            </button>
          </div>
        </div>
      </div>

      {/* 슬라이더 */}
      <Swiper
        className="classic-swiper"
        slidesPerView="auto"
        modules={[Navigation]}
        spaceBetween={40}
        slidesOffsetBefore={88}
        grabCursor
        navigation
        speed={800}
        onBeforeInit={(swiper) => {
          // @ts-expect-error HTMLElement ok
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-expect-error HTMLElement ok
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onSwiper={(s) => {
          swiperRef.current = s;
          updateBar(0);
        }}
        onSlideChange={(swiper) => {
          const total = classicMovies.length;
          const visible = 1;
          const maxIndex = Math.max(total - visible, 1);
          const prog = Math.min(Math.max(swiper.realIndex / maxIndex, 0), 1);
          updateBar(prog);
        }}
        onProgress={(_, prog) => updateBar(prog)}>
        {classicMovies.map((movie, i) => (
          <SwiperSlide key={movie.id}>
            <Link to={`/movie/detail/${movie.id}`}>
              <div className={`classic-wrap ${i % 2 === 1 ? 'reverse' : ''}`}>
                <div className="img-box">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                  />
                </div>

                <div className="classic-title">
                  <div className="title-img">
                    {movie.logo ? (
                      <img src={`https://image.tmdb.org/t/p/w500${movie.logo}`} alt={movie.title} />
                    ) : (
                      <h3>{movie.title}</h3>
                    )}
                  </div>
                  <div className="sub-title">{formatYear(movie.release_date)}</div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieClassic;
