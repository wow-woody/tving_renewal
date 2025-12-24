import { useEffect } from 'react';
import { useTvSeriesStore } from '../../store/useTvSeriesStore';
import '../scss/Enter.scss';
import { ENTER_FILTERS, TALK_CONFIG, REALITY_CONFIG, COMEDY_CONFIG, GAME_CONFIG, FAMILY_CONFIG } from '../../data/EnterFilters';
import { useNavigate } from 'react-router-dom';
import EnterSwiper from '../../components/Enter/EnterSwiper';
import EnterFeaturedSection from '../../components/enter-pop/EnterFeaturedSection';
import VOriginalSection from '../../components/v-origin/VOriginalSection';
import VOnlySection from '../../components/v-only/VOnlySection';
import { Category } from '../../types/enum';

const Enter = () => {
  const onFetchEnters = useTvSeriesStore((s) => s.onFetchEnters);
  const onFetchKoEnters = useTvSeriesStore((s) => s.onFetchKoEnters);
  const navigate = useNavigate();

  useEffect(() => {
    onFetchEnters();
    onFetchKoEnters();
  }, [onFetchEnters, onFetchKoEnters]);

  return (
    <div className="enter-contents-wrap">
      <section className="section-1">
        <div className="sub-container">
          <img src="/images/예능배너.webp" alt="예능 배너" className="main-banner-image" />
          <img src="/images/예능배너타이틀.webp" alt="예능 타이틀" className="banner-title-image" />
        </div>
      </section>
      
      <section className="section-2">
        <ul className="enter-filter">
          {ENTER_FILTERS.map((f) => (
            <li
              key={f.key}
              className="filter-item"
              onClick={() => navigate(`/enter/genre/${f.key}`)}>
              {f.label}
            </li>
          ))}
        </ul>
      </section>

      <section className="section-3">
        <EnterFeaturedSection />
      </section>

      <section className="section-4">
        <EnterSwiper config={TALK_CONFIG} />
      </section>

      <section className="section-5">
        <EnterSwiper config={REALITY_CONFIG} />
      </section>

      <section className="section-6">
        <VOnlySection category={Category.ENTER} />
      </section>

      <section className="section-7">
        <EnterSwiper config={COMEDY_CONFIG} />
      </section>

      <section className="section-8">
        <EnterSwiper config={GAME_CONFIG} />
      </section>

      <section className="section-9">
        <EnterSwiper config={FAMILY_CONFIG} />
      </section>

      <section className="section-10">
        <VOriginalSection category={Category.ENTER} />
      </section>
    </div>
  );
};

export default Enter;
