import { useEffect } from 'react';
import { useTvSeriesStore } from '../../store/useTvSeriesStore';
import '../scss/Enter.scss';
import { ENTER_FILTERS, TALK_CONFIG, REALITY_CONFIG, COMEDY_CONFIG, GAME_CONFIG, FAMILY_CONFIG } from '../../data/EnterFilters';
import { useNavigate } from 'react-router-dom';
import EnterSwiper from '../../components/Enter/EnterSwiper';
import EnterFeaturedSection from '../../components/enter-pop/EnterFeaturedSection';
import VOriginalSection from '../../components/v-origin/VOriginalSection';
import VOnlySection from '../../components/v-only/VOnlySection';
import { Category } from '../../type/enum';

const Enter = () => {
  const onFetchEnters = useTvSeriesStore((s) => s.onFetchEnters);
  const onFetchKoEnters = useTvSeriesStore((s) => s.onFetchKoEnters);
  const navigate = useNavigate();

  useEffect(() => {
    onFetchEnters();
    onFetchKoEnters();
  }, [onFetchEnters, onFetchKoEnters]);

  return (
    <div className="contents-wrap">
      <section className="section-1">
        {/* <h2>인기 예능 프로그램</h2> */}
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

      <section className="section-enter-featured">
        <EnterFeaturedSection />
      </section>

      <section className="section-dramaSwiper">
        <EnterSwiper config={TALK_CONFIG} />
      </section>

      <section className="section-dramaSwiper">
        <EnterSwiper config={REALITY_CONFIG} />
      </section>

      <section className="section-vonly">
        <VOnlySection category={Category.ENTER} />
      </section>

      <section className="section-dramaSwiper">
        <EnterSwiper config={COMEDY_CONFIG} />
      </section>

      <section className="section-dramaSwiper">
        <EnterSwiper config={GAME_CONFIG} />
      </section>

      <section className="section-dramaSwiper">
        <EnterSwiper config={FAMILY_CONFIG} />
      </section>

      <section className="section-voriginal">
        <VOriginalSection category={Category.ENTER} />
      </section>
    </div>
  );
};

export default Enter;
