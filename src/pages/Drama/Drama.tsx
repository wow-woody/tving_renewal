import { useEffect } from 'react';
import { useTvSeriesStore } from '../../store/useTvSeriesStore';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '../scss/Drama.scss';
import { DRAMA_FILTERS } from '../../data/DramaFilters';
import { useNavigate } from 'react-router-dom';
import OnAirDramaList from '../../components/Drama/OnAirDrama';
import Popular20 from '../../components/Drama/Popular20/Popular20';
import VOriginalSection from '../../components/v-origin/VOriginalSection';
import DramaSwiper from '../../components/Drama/DramaSwiper';
import DramaBanner from '../../components/Drama/DramaBanner/DramaBanner';
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

  useEffect(() => {
    onFetchTvs();
    onFetchKoTvs();
    onFetchOnAirKo();
  }, [onFetchTvs, onFetchKoTvs, onFetchOnAirKo]);

  return (
    <div className="drama-contents-wrap">
      <section className="section-1">
        <DramaBanner />
      </section>
      <section className="section-2">
        <Swiper
          className="drama-filter-swiper"
          slidesPerView="auto"
          spaceBetween={12}
          freeMode={true}
          grabCursor={true}>
          {DRAMA_FILTERS.map((f) => (
            <SwiperSlide key={f.key} className="filter-slide">
              <div className="filter-item" onClick={() => navigate(`/drama/genre/${f.key}`)}>
                {f.label}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section className="section-3">
        <div className="onair-list">
          <OnAirDramaList tvs={onairko} />
        </div>
      </section>
      
      <section className="section-4">
        <Popular20 />
      </section>

      <section className="section-5">
        <VOriginalSection />
      </section>

      <section className="section-6">
        <DramaSwiper config={FANTASY_CONFIG} />
      </section>

      <section className="section-7">
        <DramaSwiper config={ACTION_CONFIG} />
      </section>
      <section className="section-8">
        <DramaSwiper config={Comedy_CONFIG} />
      </section>
      <section className="section-9">
        <AppleTvSection />
      </section>
      <section className="section-10">
        <DramaCountry config={OVERSEAS_CONFIG} />
      </section>
      <section className="section-11">
        <DramaSwiper config={Human_CONFIG} />
      </section>
      <section className="section-12">
        <DramaSwiper config={War_CONFIG} />
      </section>
      <section className="section-13">
        <DramaSwiper config={Mystery_CONFIG} />
      </section>
    </div>
  );
};

export default Drama;
