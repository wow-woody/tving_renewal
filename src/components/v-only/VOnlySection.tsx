import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";

import VOnlyCard from "./VOnlyCard";
import "./VOnly.scss";

import { ONLY_CONTENTS } from "../../data";
import { TVING_BADGE } from "../../contents/media";
import { TvingBadge, Category } from "../../type/enum";

interface Props {
  category?: Category;
}

const VOnlySection = ({ category }: Props) => {
  const badge = TVING_BADGE[TvingBadge.ONLY];
  const swiperRef = useRef<any | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  // category prop이 있으면 필터링, 없으면 전체
  const filteredContents = category
    ? ONLY_CONTENTS.filter(item => item.category === category)
    : ONLY_CONTENTS;

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || !prevRef.current || !nextRef.current) return;

    const nav =
      typeof swiper.params.navigation === 'object' && swiper.params.navigation
        ? swiper.params.navigation
        : ({} as NonNullable<Exclude<typeof swiper.params.navigation, boolean>>);

    swiper.params.navigation = {
      ...nav,
      prevEl: prevRef.current!,
      nextEl: nextRef.current!,
    } as any;

    swiper.navigation.destroy();
    swiper.navigation.init();
    swiper.navigation.update();
  });

  return (
    <section className="glass-frame">
      <div className="v-only">
        {/* 좌측 설명 영역 */}
        <div className="v-only-info">
          <div className="info-top">
            <img className="logo" src={badge.image} alt={badge.label} />
            <p>
              티빙만의<br />
              특별한 전용 콘텐츠를<br />
              만나보세요.
            </p>
          </div>
        </div>

        {/* 우측 카드 영역 */}
        <div className="v-only-slider">
          <Swiper
            slidesPerView={4.3}
            spaceBetween={24}
            modules={[Navigation]}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            onSwiper={(s) => {
              swiperRef.current = s;
            }}
            navigation
          >
            {filteredContents.map((item, index) => (
              <SwiperSlide key={item.id}>
                <VOnlyCard item={item} rank={index + 1} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 네비게이션 버튼 */}
          <div className="v-only-nav">
            <button
              type="button"
              className="nav-btn prev"
              ref={prevRef}
              aria-label="Previous slide"
            >
              <img src="/images/arrow-LW.svg" alt="" />
            </button>
            <button
              type="button"
              className="nav-btn next"
              ref={nextRef}
              aria-label="Next slide"
            >
              <img src="/images/arrow-RW.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VOnlySection;
