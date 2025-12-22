import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";

import "./AppleTv.scss";
import AppleTvCard from "./AppleTvCard";

import { ALL_CONTENTS } from "../../data";
import type { Content } from "../../type/content";
import { RankScope } from "../../type/enum";

const AppleTvSection = () => {
  const swiperRef = useRef<any | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  // Apple TV 랭크 데이터 필터링
  const appleContents: Content[] = ALL_CONTENTS
    .filter((item) => item.rank?.[RankScope.APPLE_TV] != null)
    .sort(
      (a, b) => (a.rank?.[RankScope.APPLE_TV] ?? 999) - (b.rank?.[RankScope.APPLE_TV] ?? 999)
    )
    .slice(0, 12);

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

  if (appleContents.length === 0) return null;

  return (
    <section className="glass-frame">
      <div className="apple-tv">
        <div className="apple-tv-info">
          <div className="info-top">
          <div className="logo"><img src="/images/appletv.png" alt="" /></div>
          <p>
            애플TV+에서 제공하는<br />
            인기 콘텐츠를 만나보세요.
          </p>
          </div>
        </div>

        <div className="apple-tv-slider">
          <Swiper
            slidesPerView={3.5}
            spaceBetween={5}
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
            {appleContents.map((item) => (
              <SwiperSlide key={item.id}>
                <AppleTvCard item={item} rank={item.rank![RankScope.APPLE_TV]!} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="apple-tv-nav">
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

export default AppleTvSection;
