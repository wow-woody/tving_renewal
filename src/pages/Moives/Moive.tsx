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

const Movie = () => {
  const { onFetchPopular } = useMovieStore();
  const navigate = useNavigate();

  useEffect(() => {
    onFetchPopular();
  }, [onFetchPopular]);

  return (
    <div className="contents-wrap">
      <section className="section-1">
        <MovieBanner />
      </section>

      <section className="section-2">
        <ul className="enter-filter">
          {MOVIE_FILTERS.map((f) => (
            <li
              key={f.key}
              className="filter-item"
              onClick={() => navigate(`/movie/genre/${f.key}`)}>
              {f.label}
            </li>
          ))}
        </ul>
      </section>

      <section className="section-popular">
        <MoviePopular20 />
      </section>

      <section className="section-movieSwiper">
        <MovieSwiper config={ACTION_MOVIE_CONFIG} />
      </section>

      <section className="section-movieSwiper">
        <MovieSwiper config={COMEDY_MOVIE_CONFIG} />
      </section>

      <section className="section-upcoming">
        <MovieUpcoming />
      </section>

      <section className="section-movieSwiper">
        <MovieSwiper config={THRILLER_MOVIE_CONFIG} />
      </section>

      <section className="section-movieSwiper">
        <MovieSwiper config={HORROR_MOVIE_CONFIG} />
      </section>

      <section className="section-classic">
        <MovieClassic />
      </section>

      <section className="section-movieSwiper">
        <MovieSwiper config={SF_MOVIE_CONFIG} />
      </section>

      <section className="section-movieSwiper">
        <MovieSwiper config={FANTASY_MOVIE_CONFIG} />
      </section>
    </div>
  );
};

export default Movie;
