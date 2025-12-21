import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ENTER_FILTERS } from '../../data/EnterFilters';
import { useTvSeriesStore } from '../../store/useTvSeriesStore';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w342';

const EnterGenre = () => {
  const { key = 'all' } = useParams();

  const onFetchEnterByFilter = useTvSeriesStore((s) => s.onFetchEnterByFilter);
  const filteredEnters = useTvSeriesStore((s) => s.filteredEnters);

  const currentFilter = ENTER_FILTERS.find((f) => f.key === key) || ENTER_FILTERS[0];

  const [page] = useState(() => Math.floor(Math.random() * 5) + 1);

  useEffect(() => {
    const params: Record<string, string> = {
      page: String(page),
    };
    
    // tmdb 필터 값들을 추가
    Object.entries(currentFilter.tmdb).forEach(([key, value]) => {
      if (value) {
        params[key] = value;
      }
    });
    
    onFetchEnterByFilter(params);
  }, [key, page]);

  return (
    <div className="contents-wrap">
      <h2>{currentFilter.label}</h2>

      <div className="drama-grid">
        {filteredEnters.map((tv) => (
          <div key={tv.id} className="drama-card">
            {tv.poster_path && <img src={`${IMAGE_BASE}${tv.poster_path}`} alt={tv.name} />}
            <p className="title">{tv.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnterGenre;
