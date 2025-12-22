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

interface Video {
  site: string;
  type: string;
  key: string;
}

interface Genre {
  id: number;
  name: string;
}

interface Network {
  id: number;
  name: string;
  logo_path: string | null;
}

interface TvDetailData {
  id: number;
  name: string;
  overview: string;
  adult: boolean;
  genres?: Genre[];
  networks?: Network[];
  number_of_seasons?: number;
  genreNames: string[];
  seasonText: string;
  age: string;
}

const getAutoplaySrc = (src: string) => {
  const params = 'autoplay=1&mute=1&controls=0&playsinline=1&rel=0';
  return src.includes('?') ? `${src}&${params}` : `${src}?${params}`;
};

const pickBestTrailer = (videos: Video[]) =>
  videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ||
  videos.find((v) => v.site === 'YouTube' && v.type === 'Teaser') ||
  videos.find((v) => v.site === 'YouTube');

interface FeaturedItem {
  id: number;
  title: string;
  img1: string;
  desc?: string;
  season?: string;
  age?: string;
}
interface Props {
  config: DramaGenres;
}

const DramaSwiper = ({ config }: Props) => {
  const [list, setList] = useState<FeaturedItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [barOffset, setBarOffset] = useState(0);
  const [currentVideoKey, setCurrentVideoKey] = useState<string | null>(null);
  const [tvDetail, setTvDetail] = useState<TvDetailData | null>(null);

  const swiperRef = useRef<SwiperType | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const fetchDrama = async () => {
      const results: FeaturedItem[] = [];
      let page = Math.floor(Math.random() * 5) + 1;

      while (results.length < 15 && page <= 10) {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/tv?${new URLSearchParams({
            api_key: API_KEY,
            language: 'ko-KR',
            sort_by: 'popularity.desc',
            with_genres: config.genreParam,
            without_genres: '16',
            page: String(page),
          })}`
        );

        const data = await res.json();

        for (const tv of data.results) {
          results.push({
            id: tv.id,
            title: tv.name,
            img1: tv.poster_path ? `${IMAGE_BASE}${tv.poster_path}` : '',
            desc: tv.overview,
            season: tv.first_air_date ? tv.first_air_date.slice(0, 4) : '',
            age: tv.adult ? '19' : '12',
          });

          if (results.length === 15) break;
        }
        page++;
      }

      setList(results);
    };

    fetchDrama();
  }, [config]);

  const activeItem = list.length > 0 ? list[activeIndex] ?? list[0] : null;

  useEffect(() => {
    if (!activeItem) return;

    const fetchDetail = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${activeItem.id}?api_key=${API_KEY}&language=ko-KR`
      );
      const detail = await res.json();

      setTvDetail({
        ...detail,
        genreNames: detail.genres?.map((g: Genre) => g.name) || [],
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

  // 각 스와이퍼마다 독립적으로 비디오 가져오기
  useEffect(() => {
    if (!activeItem) return;

    const fetchVideo = async () => {
      setCurrentVideoKey(null);

      // 한국어 비디오 시도
      const koRes = await fetch(
        `https://api.themoviedb.org/3/tv/${activeItem.id}/videos?${new URLSearchParams({
          api_key: API_KEY,
          language: 'ko-KR',
        })}`
      );
      const koData = await koRes.json();

      let trailer = pickBestTrailer(koData.results || []);

      // 한국어 없으면 영어로 fallback
      if (!trailer) {
        const enRes = await fetch(
          `https://api.themoviedb.org/3/tv/${activeItem.id}/videos?${new URLSearchParams({
            api_key: API_KEY,
            language: 'en-US',
          })}`
        );
        const enData = await enRes.json();
        trailer = pickBestTrailer(enData.results || []);
      }

      if (trailer) {
        setCurrentVideoKey(trailer.key);
      }
    };

    fetchVideo();
  }, [activeItem]);

  const updateBar = (prog: number) => {
    if (!trackRef.current || !barRef.current) return;
    const track = trackRef.current.clientWidth;
    const bar = barRef.current.clientWidth;
    const maxLeft = Math.max(track - bar, 0);
    setBarOffset(Math.min(Math.max(prog, 0), 1) * maxLeft);
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
              <p className="broadcast">
                {tvDetail.networks?.map((n: Network) => n.name).join(', ')}
              </p>
              <p className="season">{tvDetail.seasonText}</p>
              <p className="genre">드라마</p>
              <span className="desc">{tvDetail.overview}</span>
            </Link>
          )}
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

export default DramaSwiper;
