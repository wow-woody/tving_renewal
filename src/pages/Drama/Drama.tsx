import { useEffect } from 'react';
import { useTvSeriesStore } from '../../store/useTvSeriesStore';
import '../scss/Drama.scss';
import { DRAMA_FILTERS } from '../../data/DramaFilters';
import { useNavigate, useParams } from 'react-router-dom';
import OnAirDramaList from '../../components/Drama/OnAirDrama';
import Popular20 from '../../components/Drama/Popular20/Popular20';
import VOriginalSection from '../../components/v-origin/VOriginalSection';
import DramaSwiper from '../../components/Drama/DramaSwiper';
import {
  FANTASY_CONFIG,
  ACTION_CONFIG,
  Comedy_CONFIG,
  OVERSEAS_CONFIG,
  Human_CONFIG,
  War_CONFIG,
  Mystery_CONFIG,
} from '../../data/DramaFilters';
import AppleTvSection from '../../components/appletv/AppleTvSection';
import DramaCountry from '../../components/Drama/DramaCountry';

const Drama = () => {
  const onFetchTvs = useTvSeriesStore((s) => s.onFetchTvs);
  const onFetchKoTvs = useTvSeriesStore((s) => s.onFetchKoTvs);
  const onFetchOnAirKo = useTvSeriesStore((s) => s.onFetchOnAirKo);
  const onairko = useTvSeriesStore((s) => s.onairko);

  const navigate = useNavigate();
  const { key } = useParams();

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
      <section className="section-onair">
        <div className="onair-list">
          <OnAirDramaList tvs={onairko} />
        </div>
      </section>
      <section className="section-dramaSwiper">
        <Popular20 />
      </section>
      <section className="drama-voriginal">
        <VOriginalSection />
      </section>
      <section className="section-dramaSwiper">
        <DramaSwiper config={FANTASY_CONFIG} />
      </section>
      <section className="section-dramaSwiper">
        <DramaSwiper config={ACTION_CONFIG} />
      </section>
      <section className="section-dramaSwiper">
        <DramaSwiper config={Comedy_CONFIG} />
      </section>
      <section className="section-9">
        <AppleTvSection />
      </section>
      <section className="section-dramaSwiper">
        <DramaCountry config={OVERSEAS_CONFIG} />
      </section>
      <section className="section-dramaSwiper">
        <DramaSwiper config={Human_CONFIG} />
      </section>
      <section className="section-dramaSwiper">
        <DramaSwiper config={War_CONFIG} />
      </section>
      <section className="section-dramaSwiper">
        <DramaSwiper config={Mystery_CONFIG} />
      </section>
    </div>
  );
};

export default Drama;
