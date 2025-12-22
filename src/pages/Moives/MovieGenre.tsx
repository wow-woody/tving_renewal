import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MOVIE_FILTERS } from '../../data/MovieFilters';
import { TMDB_GENRE_MAP } from '../../data/tmdbGenreMap';
import { useMovieStore } from '../../store/useMoviesStore';
import '../scss/MovieGenre.scss';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w342';

const MovieGenre = () => {
  // URL에서 장르 key
  const { key = 'all' } = useParams();

  const onFetchByFilter = useMovieStore((s) => s.onFetchByFilter);
  const filteredMovies = useMovieStore((s) => s.filteredMovies);

  const currentFilter = MOVIE_FILTERS.find((f) => f.key === key) || MOVIE_FILTERS[0];

  // 🔥 장르 진입 시 랜덤 page 1번만 결정 (1~5)
  const [page] = useState(() => Math.floor(Math.random() * 5) + 1);

  useEffect(() => {
    onFetchByFilter({
      ...currentFilter.tmdb,
      page: String(page), // 랜덤 page지만 고정
    });
  }, [key, page, onFetchByFilter, currentFilter.tmdb]);

  return (
    <div className="contents-wrap">
      <h2>{currentFilter.label}</h2>

      <div className="movie-grid">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            {movie.poster_path && (
              <div className="movie-card-inner">
                <Link to={`/movie/detail/${movie.id}`} aria-label={`${movie.title} 상세보기`}>
                  <div className="img-wrap">
                    <img src={`${IMAGE_BASE}${movie.poster_path}`} alt={movie.title} />
                    <div className="overlay-info">
                      <div className="overlay-header">
                        <p className="overlay-title">{movie.title}</p>
                      </div>
                      <div className="overlay-details">
                        <div className="rating-date">
                          {movie.vote_average && (
                            <span className="rating">
                              <span className="rating_star">⭐</span>{' '}
                              {movie.vote_average.toFixed(1)}
                            </span>
                          )}
                          <span>·</span>
                          {movie.release_date && (
                            <span className="date">
                              {new Date(movie.release_date).getFullYear()}
                            </span>
                          )}
                        </div>
                        <p className="genres">
                          {(movie.genre_ids || [])
                            .map((id: number) => TMDB_GENRE_MAP[id])
                            .filter(Boolean)
                            .slice(0, 3)
                            .join(' • ')}
                        </p>
                        {movie.overview && (
                          <p className="overview">
                            {movie.overview.length > 120
                              ? movie.overview.slice(0, 120) + '...'
                              : movie.overview}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieGenre;
