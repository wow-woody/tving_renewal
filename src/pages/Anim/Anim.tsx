import { useEffect } from 'react';
import { useAnimStore } from '../../store/useAnimStore';
import '../scss/Anim.scss';
import RankRowAnim from '../../components/anim-top20/RankRowanim20';
import anim from '../../data/Anim';
import { RankScope } from '../../type/enum';
import { 
  ANIM_FILTERS, 
  JP_ANIM_CONFIG, 
  COMEDY_ANIM_CONFIG,
  DRAMA_ANIM_CONFIG,
  FAMILY_ANIM_CONFIG,
  KIDS_ANIM_CONFIG
} from '../../data/AnimFilters';
import { useNavigate } from 'react-router-dom';
import AnimSwiper from '../../components/Anim/AnimSwiper';
import SnoopySection from '../../components/Anim/SnoopySection';
import ZootopiaSection from '../../components/Anim/ZootopiaSection';


const Anim = () => {
  const onFetchAnims = useAnimStore((s) => s.onFetchAnims);
  const navigate = useNavigate();

  // 인기 애니메이션 TOP20 추출
  const anim20 = anim
    .filter((item) => item.rank?.[RankScope.POP_ANIM] != null)
    .sort((a, b) => (a.rank?.[RankScope.POP_ANIM] ?? 999) - (b.rank?.[RankScope.POP_ANIM] ?? 999))
    .slice(0, 20);

  useEffect(() => {
    onFetchAnims();
  }, [onFetchAnims]);

  return (
    <div className="contents-wrap">
      <section className="section-1">
        <div className="sub-container">
          <img src="/images/애니배너.png" alt="애니메이션 배너" className="main-banner-image" />
        </div>
      </section>
      
      <section className="section-2">
        <ul className="anim-filter">
          {ANIM_FILTERS.map((f) => (
            <li
              key={f.key}
              className="filter-item"
              onClick={() => navigate(`/anim/genre/${f.key}`)}>
              {f.label}
            </li>
          ))}
        </ul>
      </section>

      <section className="section-rank-anim">
        <RankRowAnim data={anim20} title="실시간 인기 애니메이션" rankScope={RankScope.POP_ANIM} />
      </section>

      <section className="section-animSwiper">
        <AnimSwiper config={JP_ANIM_CONFIG} />
      </section>

      <section className="section-animSwiper">
        <AnimSwiper config={COMEDY_ANIM_CONFIG} />
      </section>

      <section className="section-snoopy">
        <SnoopySection />
      </section>

      <section className="section-animSwiper">
        <AnimSwiper config={FAMILY_ANIM_CONFIG} />
      </section>

      <section className="section-animSwiper">
        <AnimSwiper config={DRAMA_ANIM_CONFIG} />
      </section>

      <section className="section-zootopia">
        <ZootopiaSection />
      </section>

      <section className="section-animSwiper">
        <AnimSwiper config={KIDS_ANIM_CONFIG} />
      </section>
    </div>
  );
};

export default Anim;
