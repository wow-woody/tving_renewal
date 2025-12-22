import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAnimStore } from '../../store/useAnimStore';
import { ANIM_FILTERS } from '../../data/AnimFilters';
import AnimList from '../../components/Anim/AnimList';
import '../scss/AnimGenre.scss';

const AnimGenre = () => {
  const { key } = useParams<{ key: string }>();
  const { filteredAnims, onFetchAnimByFilter } = useAnimStore();

  useEffect(() => {
    if (!key) return;

    const filter = ANIM_FILTERS.find((f) => f.key === key);
    if (!filter) return;

    onFetchAnimByFilter(filter.tmdb as Record<string, string>);
  }, [key, onFetchAnimByFilter]);

  const selectedFilter = ANIM_FILTERS.find((f) => f.key === key);

  return (
    <div className="anim-genre-wrap">
      <section className="section-1">
        <h2>{selectedFilter?.label || '애니메이션'}</h2>
      </section>

      <section className="section-2">
        <div className="anim-grid">
          {filteredAnims.map((anim) => (
            <div key={anim.id} className="anim-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${anim.poster_path}`}
                alt={anim.name}
              />
              <h3>{anim.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="section-3">
        <AnimList />
      </section>
    </div>
  );
};

export default AnimGenre;
