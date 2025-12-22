import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';

import MovieCard from './MovieCard';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w342';

interface TmdbMovie {
  id: number;
  title: string;
  poster_path: string;
}

const MoviePopular20 = ({ title = '인기 영화 TOP 20' }) => {
  const [data, setData] = useState<TmdbMovie[]>([]);
  const [barOffset, setBarOffset] = useState(0);

  const swiperRef = useRef<any | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`
      );
      const json = await res.json();

      // 19세 등급 필터링
      const filtered = [];
      for (const movie of json.results) {
        if (filtered.length >= 20) break;

        const resAge = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/release_dates?api_key=${API_KEY}`
        );
        const dataAge = await resAge.json();
        const krInfo = dataAge.results.find((item: any) => item.iso_3166_1 === 'KR');
        const cAge = krInfo?.release_dates?.[0].certification || 'none';

        if (cAge !== '청소년관람불가' && cAge !== '19' && movie.original_language !== 'mn') {
          filtered.push(movie);
        }
      }

      setData(filtered);
    };

    fetchPopularMovies();
  }, []);

  const updateBar = (prog: number) => {
    if (!trackRef.current || !barRef.current) return;
    const track = trackRef.current.clientWidth;
    const bar = barRef.current.clientWidth;
    const maxLeft = Math.max(track - bar, 0);
    setBarOffset(Math.min(Math.max(prog, 0), 1) * maxLeft);
  };

  return (
    <section
      className="movie-top20-wrap"
      style={{ '--enter-progress': `${barOffset}px` } as CSSProperties}>
      <h2 className="section-title">{title}</h2>

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

      <div className="rank-row">
        <Swiper
          slidesPerView={6}
          spaceBetween={50}
          modules={[Navigation]}
          navigation
          onBeforeInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          onSwiper={(s) => {
            swiperRef.current = s;
            updateBar(0);
          }}
          onSlideChange={(swiper) => {
            const maxIndex = Math.max(data.length - 6, 1);
            updateBar(swiper.realIndex / maxIndex);
          }}>
          {data.map((movie, index) => (
            <SwiperSlide key={movie.id}>
              <MovieCard
                id={movie.id}
                title={movie.title}
                img1={`${IMAGE_BASE}${movie.poster_path}`}
                order={index + 1}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default MoviePopular20;
