// src/components/Drama/OnAirDramaList.tsx
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import './OnAirDrama.scss';

import { AGE } from '../../contents/media';
import { Link } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

/* ================= utils ================= */

const getAutoplaySrc = (src: string) => {
  const params = 'autoplay=1&mute=1&controls=0&playsinline=1&rel=0';
  return src.includes('?') ? `${src}&${params}` : `${src}?${params}`;
};

const pickBestTrailer = (videos: any[]) =>
  videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ||
  videos.find((v) => v.site === 'YouTube' && v.type === 'Teaser') ||
  videos.find((v) => v.site === 'YouTube');

/* ================= types ================= */

interface OnAirTv {
  id: number;
  name: string;
  poster_path: string | null;
  overview?: string;
}

interface OnAirDramaListProps {
  tvs: OnAirTv[];
}

interface FeaturedItem {
  id: number;
  title: string;
  img1: string;
  desc?: string;
}

/* ================= component ================= */

const OnAirDramaList = ({ tvs }: OnAirDramaListProps) => {
  /* ---------- state ---------- */
  const [list, setList] = useState<FeaturedItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [barOffset, setBarOffset] = useState(0);
  const [currentVideoKey, setCurrentVideoKey] = useState<string | null>(null);
  const [tvDetail, setTvDetail] = useState<any>(null);

  /* ---------- refs ---------- */
  const swiperRef = useRef<SwiperType | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  /* =========================================================
     1️⃣ props.tvs → FeaturedItem list 변환
     ========================================================= */
  useEffect(() => {
    if (!tvs || tvs.length === 0) return;

    const mapped: FeaturedItem[] = tvs.map((tv) => ({
      id: tv.id,
      title: tv.name,
      img1: tv.poster_path ? `${IMAGE_BASE}${tv.poster_path}` : '',
      desc: tv.overview,
    }));

    setList(mapped);
    setActiveIndex(0);
  }, [tvs]);

  const activeItem = list.length > 0 ? list[activeIndex] ?? list[0] : null;

  /* =========================================================
     2️⃣ active 변경 시 → 상세 정보 fetch (로컬)
     ========================================================= */
  useEffect(() => {
    if (!activeItem) return;

    const fetchDetail = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${activeItem.id}?api_key=${API_KEY}&language=ko-KR`
      );
      const detail = await res.json();

      setTvDetail({
        ...detail,
        genreNames: detail.genres?.map((g: any) => g.name) || [],
        networks: detail.networks || [],
        seasonText:
          detail.number_of_seasons === 1
            ? '시즌 1'
            : detail.number_of_seasons
            ? `시즌 ${detail.number_of_seasons}`
            : '',
        age: detail.adult ? '19' : '12',
      });
    };

    fetchDetail();
  }, [activeItem]);

  /* =========================================================
     3️⃣ active 변경 시 → 비디오 fetch (로컬)
     ========================================================= */
  useEffect(() => {
    if (!activeItem) return;

    const fetchVideo = async () => {
      setCurrentVideoKey(null);

      const koRes = await fetch(
        `https://api.themoviedb.org/3/tv/${activeItem.id}/videos?api_key=${API_KEY}&language=ko-KR`
      );
      const koData = await koRes.json();

      let trailer = pickBestTrailer(koData.results || []);

      if (!trailer) {
        const enRes = await fetch(
          `https://api.themoviedb.org/3/tv/${activeItem.id}/videos?api_key=${API_KEY}&language=en-US`
        );
        const enData = await enRes.json();
        trailer = pickBestTrailer(enData.results || []);
      }

      if (trailer) setCurrentVideoKey(trailer.key);
    };

    fetchVideo();
  }, [activeItem]);

  /* =========================================================
     4️⃣ progress bar 계산
     ========================================================= */
  const updateBar = (prog: number) => {
    if (!trackRef.current || !barRef.current) return;

    const trackWidth = trackRef.current.clientWidth;
    const barWidth = barRef.current.clientWidth;
    const maxLeft = Math.max(trackWidth - barWidth, 0);

    setBarOffset(Math.min(Math.max(prog, 0), 1) * maxLeft);
  };

  if (!list.length) return null;

  /* ================= render ================= */

  return (
    <section
      className="onair-section"
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
      <div className="onair-body">
        <div className="title-area">
          <h2 className="onair-title">
            지금
            <br />
            방영 중인
            <br />
            드라마
          </h2>
        </div>
        {/* 메인 */}
        <div className="onair-fixed">
          <div className="featured-media">
            {!activeItem ? (
              <div className="featured-loading" />
            ) : currentVideoKey ? (
              <iframe
                key={currentVideoKey}
                src={getAutoplaySrc(`https://www.youtube.com/embed/${currentVideoKey}`)}
                title={activeItem.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <img src={activeItem.img1} alt={activeItem.title} />
            )}
          </div>

          {tvDetail && (
            <Link to={`/detail/${tvDetail.id}`} className="featured-info">
              <h3>{tvDetail.name}</h3>

              <p className="age">
                {AGE[tvDetail.age as keyof typeof AGE]?.image ? (
                  <img
                    src={AGE[tvDetail.age as keyof typeof AGE].image}
                    alt={AGE[tvDetail.age as keyof typeof AGE].label}
                  />
                ) : (
                  <span>{tvDetail.age}</span>
                )}
              </p>

              <p className="broadcast">{tvDetail.networks.map((n: any) => n.name).join(', ')}</p>

              <p className="season">{tvDetail.seasonText}</p>
              <p className="genre">{tvDetail.genreNames.join(' · ')}</p>

              <span className="desc">{tvDetail.overview}</span>
            </Link>
          )}
        </div>

        {/* 썸네일 스와이퍼 */}
        <div className="thumb-rail-onair">
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
              const maxIndex = Math.max(list.length - visible, 1);
              updateBar(swiper.realIndex / maxIndex);
            }}
            onProgress={(_, prog) => updateBar(prog)}>
            {list.map((item, index) => (
              <SwiperSlide key={item.id}>
                <button
                  className={`thumb ${index === activeIndex ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveIndex(index);
                    swiperRef.current?.slideToLoop(index);
                  }}>
                  <img src={item.img1} alt={item.title} />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default OnAirDramaList;
