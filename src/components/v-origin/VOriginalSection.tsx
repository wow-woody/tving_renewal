import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import VOriginalCard from "./VOriginalCard";
import "./VOriginal.scss";

import { ORIGINAL_CONTENTS } from "../../data";
import { TVING_BADGE } from "../../contents/media";
import { TvingBadge } from "../../type/enum";

const VOriginalSection = () => {
  const badge = TVING_BADGE[TvingBadge.ORIGINAL];

  return (
    <section className="glass-frame">
    <div className="v-original">
      {/* 좌측 설명 영역 */}
      <div className="v-original-info">
        <img className="logo" src={badge.image} alt={badge.label} />
        <p>
          티빙만의<br />
          특별한 오리지널 콘텐츠를<br />
          만나보세요.
        </p>
        <button className="more-btn">더보기 +</button>
      </div>

      {/* 우측 카드 영역 */}
      <div className="v-original-slider">
        <Swiper slidesPerView={6} spaceBetween={24}>
          {ORIGINAL_CONTENTS.map((item) => (
            <SwiperSlide key={item.id}>
              <VOriginalCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      </div>
    </section>
  );
};

export default VOriginalSection;

