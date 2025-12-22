import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DRAMA_FILTERS } from '../../data/DramaFilters';
import { TMDB_GENRE_MAP } from '../../data/tmdbGenreMap';
import { useTvSeriesStore } from '../../store/useTvSeriesStore';
import '../scss/DramaGenre.scss';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w342';

const DramaGenre = () => {
  // URL에서 장르 key
  const { key = 'all' } = useParams();

  const onFetchByFilter = useTvSeriesStore((s) => s.onFetchByFilter);
  const filteredTvs = useTvSeriesStore((s) => s.filteredTvs);

  const currentFilter = DRAMA_FILTERS.find((f) => f.key === key) || DRAMA_FILTERS[0];

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

            <div className="drama-grid">
                {filteredTvs.map((tv) => (
                    <div key={tv.id} className="drama-card">
                        {tv.poster_path && (
                            <div className="drama-card-inner">
                                <Link
                                    to={`/drama/detail/${tv.id}`}
                                    aria-label={`${tv.name} 상세보기`}
                                >
                                    <div className="img-wrap">
                                        <img src={`${IMAGE_BASE}${tv.poster_path}`} alt={tv.name} />
                                        <div className="overlay-info">
                                            <div className="overlay-header">
                                                <p className="overlay-title">{tv.name}</p>
                                            </div>
                                            <div className="overlay-details">
                                                <div className="rating-date">
                                                    {tv.vote_average && (
                                                        <span className="rating">
                                                            <span className='rating_star'>⭐</span> {tv.vote_average.toFixed(1)}
                                                        </span>
                                                    )}
                                                    <span>·</span>
                                                    {tv.first_air_date && (
                                                        <span className="date">
                                                            {new Date(
                                                                tv.first_air_date
                                                            ).getFullYear()}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="genres">
                                                    {(tv.genre_ids || [])
                                                        .map((id: number) => TMDB_GENRE_MAP[id])
                                                        .filter(Boolean)
                                                        .slice(0, 3)
                                                        .join(' • ')}
                                                </p>
                                                {tv.overview && (
                                                    <p className="overview">
                                                        {tv.overview.length > 120
                                                            ? tv.overview.slice(0, 120) + '...'
                                                            : tv.overview}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                {/* <div className="title-wrap">
                                    <p className="title">{tv.name}</p>
                                </div> */}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DramaGenre;
