import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import '../tving-top20/RankRow-top20.scss';
import '../movie-pop/MovieFeaturedSection.scss';
import { AGE } from '../../contents/media';
import { Link } from 'react-router-dom';
import type { MovieGenres } from '../../data/MovieFilters';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

const getAutoplaySrc = (src: string) => {
  const params = 'autoplay=1&mute=1&controls=0&playsinline=1&rel=0';
  return src.includes('?') ? `${src}&${params}` : `${src}?${params}`;
};

const pickBestTrailer = (videos: any[]) =>
  videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ||
  videos.find((v) => v.site === 'YouTube' && v.type === 'Teaser') ||
  videos.find((v) => v.site === 'YouTube');

interface FeaturedItem {
  id: number;
  title: string;
  img1: string;
  desc?: string;
}

interface Props {
  config: MovieGenres;
}

const MovieSwiper = ({ config }: Props) => {
  const [list, setList] = useState<FeaturedItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [barOffset, setBarOffset] = useState(0);
  const [currentVideoKey, setCurrentVideoKey] = useState<string | null>(null);
  const [movieDetail, setMovieDetail] = useState<any>(null);

  const swiperRef = useRef<SwiperType | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const results: FeaturedItem[] = [];
      let page = Math.floor(Math.random() * 5) + 1;

      while (results.length < 15 && page <= 10) {
        const params: Record<string, string> = {
          api_key: API_KEY,
          language: 'ko-KR',
          sort_by: 'popularity.desc',
          page: String(page),
        };

        if (config.genreParam) {
          params.with_genres = config.genreParam;
        }

        if (config.genreKey === 'kr') {
          params.with_original_language = 'ko';
        } else if (config.genreKey === 'us') {
          params.with_original_language = 'en';
          params.with_origin_country = 'US';
        }

        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?${new URLSearchParams(params)}`
        );
        const data = await res.json();

        for (const movie of data.results) {
          // 19세 등급 체크
          const resAge = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/release_dates?api_key=${API_KEY}`
          );
          const dataAge = await resAge.json();
          const krInfo = dataAge.results.find((item: any) => item.iso_3166_1 === 'KR');
          const cAge = krInfo?.release_dates?.[0].certification || 'none';

          // 19세 등급이 아니고 몽골어가 아닌 경우만 추가
          if (cAge !== '청소년관람불가' && cAge !== '19' && movie.original_language !== 'mn') {
            results.push({
              id: movie.id,
              title: movie.title,
              img1: movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : '',
              desc: movie.overview,
            });
          }

          if (results.length === 15) break;
        }
        page++;
      }

      setList(results);
    };

    fetchMovies();
  }, [config]);

  const activeItem = list.length > 0 ? list[activeIndex] ?? list[0] : null;

  useEffect(() => {
    if (!activeItem) return;

    const fetchDetail = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${activeItem.id}?api_key=${API_KEY}&language=ko-KR&append_to_response=release_dates`
      );
      const detail = await res.json();

      const krInfo = detail.release_dates?.results.find((item: any) => item.iso_3166_1 === 'KR');
      const cAge = krInfo?.release_dates?.[0].certification || '12';

      setMovieDetail({
        ...detail,
        genreNames: detail.genres?.map((g: any) => g.name) || [],
        releaseYear: detail.release_date ? detail.release_date.slice(0, 4) : '',
        age: cAge,
        runtime: detail.runtime ? `${detail.runtime}분` : '120분',
      });
    };

    fetchDetail();
  }, [activeItem]);

  useEffect(() => {
    if (!activeItem) return;

    const fetchVideo = async () => {
      setCurrentVideoKey(null);

      const koRes = await fetch(
        `https://api.themoviedb.org/3/movie/${activeItem.id}/videos?${new URLSearchParams({
          api_key: API_KEY,
          language: 'ko-KR',
        })}`
      );
      const koData = await koRes.json();

      let trailer = pickBestTrailer(koData.results || []);

      if (!trailer) {
        const enRes = await fetch(
          `https://api.themoviedb.org/3/movie/${activeItem.id}/videos?${new URLSearchParams({
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
      className="movie-featured-section"
      style={{ '--enter-progress': `${barOffset}px` } as CSSProperties}>
      <div className="section-header">
        <h2 className="section-title">
          <Link to={`/movie/genre/${config.genreKey}`}>{config.title}</Link>
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

          {movieDetail && (
            <Link to={`/movie/${movieDetail.id}`} className="featured-info">
              <h3>{movieDetail.title}</h3>

              <p className="age">
                {AGE[movieDetail.age as keyof typeof AGE]?.image ? (
                  <img
                    src={AGE[movieDetail.age as keyof typeof AGE].image}
                    alt={AGE[movieDetail.age as keyof typeof AGE].label}
                  />
                ) : (
                  <span>{movieDetail.age}</span>
                )}
              </p>
              <p className="year">{movieDetail.releaseYear}</p>
              <p className="runtime">{movieDetail.runtime}</p>
              <p className="genre">{movieDetail.genreNames.slice(0, 2).join(', ')}</p>
              <span className="desc movie-overview-3lines">{movieDetail.overview}</span>
            </Link>
          )}
        </div>

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

export default MovieSwiper;
