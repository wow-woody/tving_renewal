import { useEffect } from 'react';
import { useTvSeriesStore } from '../../store/useTvSeriesStore';
import '../scss/Drama.scss';
import { DRAMA_FILTERS } from '../../data/DramaFilters';
import { useNavigate, useParams } from 'react-router-dom';
import OnAirDramaList from '../../components/Drama/OnAirDrama';
import DramaSwiper from '../../components/Drama/DramaSwiper';
import { useDramaCate } from '../../store/Drama/useDramaCate';
import { useDramaList } from '../../store/Drama/useDramaList';
const Drama = () => {
  const onFetchTvs = useTvSeriesStore((s) => s.onFetchTvs);
  const onFetchKoTvs = useTvSeriesStore((s) => s.onFetchKoTvs);
  const onFetchOnAirKo = useTvSeriesStore((s) => s.onFetchOnAirKo);
  const onairko = useTvSeriesStore((s) => s.onairko);

  const navigate = useNavigate();
  const { key } = useParams();
  const setCategory = useDramaCate((s) => s.setCategory);
  const dramaList = useDramaList();

  useEffect(() => {
    setCategory(key || 'all');
  }, [key, setCategory]);

  useEffect(() => {
    onFetchTvs();
    onFetchKoTvs();
    onFetchOnAirKo();
  }, [onFetchTvs, onFetchKoTvs, onFetchOnAirKo]);

  return (
    <div className="contents-wrap">
      <section className="section-1">
        <h2>반드시 챙겨봐야 하는 회원님을 위한 콘텐츠</h2>
        <div className="sub-container"></div>
      </section>
      <section className="section-2">
        <ul className="drama-filter">
          {DRAMA_FILTERS.map((f) => (
            <li
              key={f.key}
              className="filter-item"
              onClick={() => navigate(`/drama/genre/${f.key}`)}>
              {f.label}
            </li>
          ))}
        </ul>
      </section>
      <section className="section-3">
        <div className="onair-list">
          <div>
            <h3>지금 방영중인 드라마</h3>
          </div>
          <div>
            <OnAirDramaList tvs={onairko} />
          </div>
        </div>
      </section>
      <section className="section-4">
        <div></div>
        <div>
          <DramaSwiper tvs={dramaList} />
        </div>
      </section>
    </div>
  );
};

export default Drama;
