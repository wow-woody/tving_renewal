import { useParams } from 'react-router-dom';
import { useAnimStore } from '../../store/useAnimStore';
import { useEffect } from 'react';
import AnimList from '../../components/Anim/AnimList';
import '../scss/AnimDetail.scss';

const AnimDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { animDetail, onFetchAnimDetail } = useAnimStore();

  useEffect(() => {
    if (!id) return;
    onFetchAnimDetail(id);
  }, [id, onFetchAnimDetail]);

  if (!animDetail) return <p>로딩 중...</p>;

  return (
    <div className="anim-detail-wrap">
      <section className="section-1">
        <div
          className="detail-banner"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${animDetail.backdrop})`,
          }}>
          <div className="detail-info">
            <h1>{animDetail.name}</h1>
            <p>{animDetail.overview}</p>
            <div className="meta">
              <span>{animDetail.age}</span>
              <span>{animDetail.genreNames.join(', ')}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-2">
        <AnimList />
      </section>
    </div>
  );
};

export default AnimDetail;
