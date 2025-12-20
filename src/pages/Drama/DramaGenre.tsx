import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DRAMA_FILTERS } from '../../data/DramaFilters';
import { useTvSeriesStore } from '../../store/useTvSeriesStore';

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
  }, [key, page]);

  return (
    <div className="contents-wrap">
      <h2>{currentFilter.label}</h2>

      <div className="drama-grid">
        {filteredTvs.map((tv) => (
          <div key={tv.id} className="drama-card">
            {tv.poster_path && <img src={`${IMAGE_BASE}${tv.poster_path}`} alt={tv.name} />}
            <p className="title">{tv.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DramaGenre;
