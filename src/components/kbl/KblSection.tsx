import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";

import "./Kbl.scss";
import KblCard from "./KblCard";

import { sports } from "../../data/sport";

const KblSection = () => {
  const swiperRef = useRef<any | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  // KBL 섹션 데이터 (sport.ts에서 KBL 카테고리만 필터링)
  const kblContents = sports.filter((item) => item.category === "KBL");

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || !prevRef.current || !nextRef.current) return;

    const nav =
      typeof swiper.params.navigation === "object" && swiper.params.navigation
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

  if (kblContents.length === 0) return null;

  return (
    <section className="glass-frame">
      <div className="kbl">
        <div className="kbl-info">
          <div className="info-top">
            <div className="logo">
              <img src="/images/KBL로고.png" alt="" />
            </div>
            <p>
              박진감 넘치는 프로농구는<br />
              오직 티빙에서!
            </p>
          </div>
          <button className="more-btn">더보기 +</button>
        </div>

        <div className="kbl-slider">
          <Swiper
            slidesPerView={3}
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
            {kblContents.map((item, index) => (
              <SwiperSlide key={item.id}>
                <KblCard item={item} rank={index + 1} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="kbl-nav">
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

export default KblSection;
