import { useEffect } from 'react';
import { useTvSeriesStore } from '../../store/useTvSeriesStore';
import '../scss/Drama.scss';
import { DRAMA_FILTERS } from '../../data/DramaFilters';
import { useNavigate } from 'react-router-dom';
import OnAirDramaList from '../../components/Drama/OnAirDrama';
const Drama = () => {
  const { onFetchTvs, onairko, onFetchOnAirKo } = useTvSeriesStore();

  const navigate = useNavigate();

  useEffect(() => {
    onFetchTvs();
    onFetchOnAirKo();
  }, [onFetchTvs, onFetchOnAirKo]);

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
        {/* <div className="pagenation-wrap">
          <div className="pagenation-area" ref={areaRef}>
            <div className="pagenation-line" />
            <div className="pointer-line" ref={barRef} />
          </div>

          <div className="nav-btn">
            <button ref={prevRef}>
              <img src="/images/arrow-left.svg" />
            </button>
            <button ref={nextRef}>
              <img src="/images/arrow-right.svg" />
            </button>
          </div>
        </div> */}
        <div className="onair-list">
          <div>
            <h3>지금 방영중인 드라마</h3>
          </div>
          <div>
            <OnAirDramaList tvs={onairko} />
          </div>
        </div>
      </section>
      <section className="section-4"></section>
    </div>
  );
};

export default Drama;
