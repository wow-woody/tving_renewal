import { useEffect } from 'react';
import { useMovieStore } from '../../store/useMoviesStore';
import { useNavigate } from 'react-router-dom';
import {
  MOVIE_FILTERS,
  ACTION_MOVIE_CONFIG,
  COMEDY_MOVIE_CONFIG,
  THRILLER_MOVIE_CONFIG,
  HORROR_MOVIE_CONFIG,
  SF_MOVIE_CONFIG,
  FANTASY_MOVIE_CONFIG,
} from '../../data/MovieFilters';
import MoviePopular20 from '../../components/Movie/Popular20/MoviePopular20';
import MovieUpcoming from '../../components/Movie/Upcoming/MovieUpcoming';
import MovieSwiper from '../../components/Movie/MovieSwiper';
import MovieClassic from '../../components/Movie/Classic/MovieClassic';
import MovieBanner from '../../components/Movie/MovieBanner/MovieBanner';
import '../scss/Movie.scss';
import { Swiper, SwiperSlide } from 'swiper/react';

const Movie = () => {
  const { onFetchPopular } = useMovieStore();
  const navigate = useNavigate();

  useEffect(() => {
    onFetchPopular();
  }, [onFetchPopular]);

  return (
    <div className="movie-contents-wrap">
      <section className="section-1">
        <MovieBanner />
      </section>

      <section className="section-2">
          <Swiper
          className="movie-filter-swiper"
          slidesPerView="auto"
          spaceBetween={12}
          freeMode={true}
          grabCursor={true}>
          {MOVIE_FILTERS.map((f) => (
            <SwiperSlide key={f.key} className="filter-slide">
              <div className="filter-item" onClick={() => navigate(`/drama/genre/${f.key}`)}>
                {f.label}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="section-3">
        <MoviePopular20 />
      </section>

      <section className="section-4">
        <MovieSwiper config={ACTION_MOVIE_CONFIG} />
      </section>

      <section className="section-5">
        <MovieSwiper config={COMEDY_MOVIE_CONFIG} />
      </section>

      <section className="section-6">
        <MovieUpcoming />
      </section>

      <section className="section-7">
        <MovieSwiper config={THRILLER_MOVIE_CONFIG} />
      </section>

      <section className="section-8">
        <MovieSwiper config={HORROR_MOVIE_CONFIG} />
      </section>

      <section className="section-9">
        <MovieClassic />
      </section>

      <section className="section-10">
        <MovieSwiper config={SF_MOVIE_CONFIG} />
      </section>

      <section className="section-11">
        <MovieSwiper config={FANTASY_MOVIE_CONFIG} />
      </section>
    </div>
  );
};

export default Movie;
