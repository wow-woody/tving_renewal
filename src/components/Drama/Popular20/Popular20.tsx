import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';

import ContentCard from './ContentCard';
import { RankScope } from '../../../type/enum';
import '../../tving-top20/RankRow-top20.scss';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w342';

interface TmdbTv {
  id: number;
  name: string;
  poster_path: string;
}

const Popular20 = ({ title = '인기 드라마 TOP 20' }) => {
  const [data, setData] = useState<TmdbTv[]>([]);
  const [barOffset, setBarOffset] = useState(0);

  const swiperRef = useRef<any | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  // 🔥 TMDB 인기 드라마 fetch
  useEffect(() => {
    const fetchPopularTvs = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=ko-KR&page=1`
      );
      const json = await res.json();

      const dramaOnly = json.results.filter(
        (tv: any) => tv.genre_ids?.includes(18) && !tv.genre_ids?.includes(16)
      );

      setData(dramaOnly.slice(0, 20));
    };

    fetchPopularTvs();
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
      className="section-6"
      style={{ '--enter-progress': `${barOffset}px` } as CSSProperties}>
      <h2 className="section-title">{title}</h2>

      {/* 컨트롤 */}
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
          {data.map((tv, index) => (
            <SwiperSlide key={tv.id}>
              <ContentCard
                id={tv.id}
                title={tv.name}
                img1={`${IMAGE_BASE}${tv.poster_path}`}
                order={index + 1} // ✅ 그냥 순번
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Popular20;
