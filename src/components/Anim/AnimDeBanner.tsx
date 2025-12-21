import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAnimStore } from '../../store/useAnimStore';
import './scss/AnimDeBanner.scss';

const AnimDeBanner = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { animDetail, onFetchAnimDetail } = useAnimStore();

  useEffect(() => {
    if (!id) return;
    onFetchAnimDetail(id);
  }, [id, onFetchAnimDetail]);

  if (!animDetail) return null;

  const handleClick = () => {
    navigate(`/anim/detail/${id}`);
  };

  return (
    <div
      className="anim-de-banner"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${animDetail.backdrop})`,
      }}
      onClick={handleClick}>
      <div className="anim-de-overlay">
        <div className="anim-de-info">
          <h2>{animDetail.name}</h2>
          <p className="anim-de-overview">{animDetail.overview}</p>
          <div className="anim-de-meta">
            <span className="age">{animDetail.age}</span>
            <span className="genres">{animDetail.genreNames.join(' · ')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimDeBanner;
