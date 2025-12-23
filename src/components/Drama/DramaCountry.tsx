import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import '../drama-pop/DramaFeaturedSection.scss';
import { AGE } from '../../contents/media';
import { Link } from 'react-router-dom';
import type { DramaGenres } from '../../data/DramaFilters';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

interface VideoResult {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

const getAutoplaySrc = (src: string) => {
  const params = 'autoplay=1&mute=1&controls=0&playsinline=1&rel=0';
  return src.includes('?') ? `${src}&${params}` : `${src}?${params}`;
};

interface FeaturedItem {
  id: number;
  title: string;
  img1: string;
  iframe?: { src: string; title?: string }[];
  desc?: string;
  category?: string;
  broadcast?: string;
  season?: string;
  age?: string;
}

interface Props {
  config: DramaGenres;
}

const DramaCountry = ({ config }: Props) => {
  const [list, setList] = useState<FeaturedItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [barOffset, setBarOffset] = useState(0);

  const swiperRef = useRef<SwiperType | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const fetchOverseas = async () => {
      const results: FeaturedItem[] = [];

      // 미국, 영국, 중국, 일본 설정
      const countries = [
        { type: 'with_original_language', value: 'en', name: '미국' }, // 미국
        { type: 'with_origin_country', value: 'GB', name: '영국' }, // 영국
        { type: 'with_original_language', value: 'zh', name: '중국' }, // 중국
        { type: 'with_original_language', value: 'ja', name: '일본' }, // 일본
      ];

      // 각 국가별로 데이터 가져오기
      for (const country of countries) {
        if (results.length >= 15) break;

        let page = Math.floor(Math.random() * 3) + 1;
        const targetPerCountry = Math.min(4, 15 - results.length);
        let countryResults = 0;

        while (countryResults < targetPerCountry && page <= 5) {
          const params: Record<string, string> = {
            api_key: API_KEY,
            language: 'ko-KR',
            sort_by: 'popularity.desc',
            with_genres: '18',
            without_genres: '16',
            with_video: 'true',
            page: String(page),
          };

          params[country.type] = country.value;

          const res = await fetch(
            `https://api.themoviedb.org/3/discover/tv?${new URLSearchParams(params)}`
          );

          const data = await res.json();

          for (const tv of data.results) {
            if (countryResults >= targetPerCountry) break;

            // 한국어 비디오 시도
            const koVideoRes = await fetch(
              `https://api.themoviedb.org/3/tv/${tv.id}/videos?${new URLSearchParams({
                api_key: API_KEY,
                language: 'ko-KR',
              })}`
            );
            const koVideoData = await koVideoRes.json();

            let trailer = koVideoData.results?.find(
              (v: VideoResult) =>
                v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
            );

            // 한국어 없으면 영어로 fallback
            if (!trailer) {
              const enVideoRes = await fetch(
                `https://api.themoviedb.org/3/tv/${tv.id}/videos?${new URLSearchParams({
                  api_key: API_KEY,
                  language: 'en-US',
                })}`
              );
              const enVideoData = await enVideoRes.json();

              trailer = enVideoData.results?.find(
                (v: VideoResult) =>
                  v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
              );
            }

            if (!trailer) continue;

            results.push({
              id: tv.id,
              title: tv.name,
              img1: tv.poster_path ? `${IMAGE_BASE}${tv.poster_path}` : '',
              iframe: [
                {
                  src: `https://www.youtube.com/embed/${trailer.key}`,
                  title: trailer.name,
                },
              ],
              desc: tv.overview,
              broadcast: country.name,
              season: tv.first_air_date ? tv.first_air_date.slice(0, 4) : '',
              age: tv.adult ? '19' : '12',
            });

            countryResults++;
          }

          page++;
        }
      }

      setList(results);
    };

    fetchOverseas();
  }, [config]);

  const activeItem = list[activeIndex];
  if (!activeItem) return null;

  const updateBar = (prog: number) => {
    if (!trackRef.current || !barRef.current) return;
    const track = trackRef.current.clientWidth;
    const bar = barRef.current.clientWidth;
    const maxLeft = Math.max(track - bar, 0);
    const safeProg = Math.min(Math.max(prog, 0), 1);
    setBarOffset(safeProg * maxLeft);
  };

  return (
    <section
      className="drama-featured-section"
      style={{ '--enter-progress': `${barOffset}px` } as CSSProperties}>
      <div className="section-header">
        <h2 className="section-title">
          <Link to={`/drama/genre/${config.genreKey}`}>{config.title}</Link>
        </h2>

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
      <div className="enter-featured-body">
        <div className="featured-fixed">
          <div className="featured-media">
            {activeItem.iframe ? (
              <iframe
                key={activeItem.id}
                src={getAutoplaySrc(activeItem.iframe[0].src)}
                title={activeItem.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <img src={activeItem.img1} alt={activeItem.title} />
            )}
          </div>

          <Link to={`/detail/${activeItem.id}`} className="featured-info">
            <h3>{activeItem.title}</h3>

            <p className="age">
              {AGE[activeItem.age as keyof typeof AGE]?.image ? (
                <img
                  src={AGE[activeItem.age as keyof typeof AGE].image}
                  alt={AGE[activeItem.age as keyof typeof AGE].label}
                />
              ) : (
                <span>{activeItem.age}</span>
              )}
            </p>

            <p className="category">{activeItem.category}</p>
            <p className="broadcast">{activeItem.broadcast}</p>
            <p className="season">{activeItem.season}</p>
            <span className="desc">{activeItem.desc}</span>
          </Link>
        </div>

        {/* 썸네일 스와이퍼 */}
        <div className="thumb-rail">
          <Swiper
            slidesPerView={4.2}
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
              const total = list.length;
              const visible = Number(swiper.params.slidesPerView) || 1;
              const maxIndex = Math.max(total - visible, 1);
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

export default DramaCountry;
