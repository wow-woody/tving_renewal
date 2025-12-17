import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { ONLY_CONTENTS } from "../../data";
import { TVING_BADGE } from "../../contents/media";
import { TvingBadge } from "../../type/enum";

import VOnlyCard from "./VOnlyCard";
import "./VOnly.scss";

const VOnlySection = () => {
  const badge = TVING_BADGE[TvingBadge.ONLY];

  if (ONLY_CONTENTS.length === 0) return null;

  return (
    <section className="v-only">
      {/* 좌측 설명 영역 */}
      <div className="v-only-info">
        <img className="logo" src={badge.image} alt={badge.label} />
        <p>
          오직 티빙만 볼 수 있는<br />
          특별하고 다양한 콘텐츠를<br />
          만나보세요.
        </p>
        <button className="more-btn">더보기 +</button>
      </div>

      {/* 카드 영역 */}
      <div className="v-only-slider">
        <Swiper slidesPerView={4} spaceBetween={24}>
          {ONLY_CONTENTS.map((item, index) => (
            <SwiperSlide key={item.id}>
              <VOnlyCard item={item} rank={index + 1} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default VOnlySection;
