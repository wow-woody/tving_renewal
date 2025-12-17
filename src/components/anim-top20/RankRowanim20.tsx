import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";

import ContentCard from "./ContentCardanim20";
import type { Content } from "../../type/content";
import { RankScope } from "../../type/enum";
import "./RankRow-anim20.scss";

interface RankRowProps {
  title: string;
  data: Content[];
  rankScope: RankScope; // ✅ 추가
}

const RankRowanim20 = ({ data, title, rankScope }: RankRowProps) => {
  const barRef = useRef<HTMLDivElement | null>(null);
  const areaRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);


  return (
    <section className="section-14">
      {/* 🔴 Progress Bar */}
      <div className="pagenation-wrap">
        <div className="pagenation-area" ref={areaRef}>
          <div className="pagenation-line" />
          <div className="pointer-line" ref={barRef} />
        </div>

        <div className="nav-btn">
          <button ref={prevRef}>
            <img src="/images/arrow-left.svg" />
          </button>
          <button ref={nextRef}>
            <img src="/images/arrow-right.svg" />
          </button>

        </div>
      </div>

      <div className="rank-row">
        <Swiper
          slidesPerView={6}
          spaceBetween={12}
          modules={[Navigation]}
          onBeforeInit={(swiper) => {
            // ❗ swiper 내부에 ref 직접 주입
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          navigation
          onSwiper={() => {
            // 초기 위치
            if (barRef.current) {
              barRef.current.style.left = "0px";
            }
          }}
          onSlideChange={(swiper) => {
            if (!barRef.current || !areaRef.current) return;

            const totalSlides = swiper.slides.length;
            const visibleSlides = swiper.params.slidesPerView as number;

            const maxIndex = totalSlides - visibleSlides;
            if (maxIndex <= 0) return;

            const progress = swiper.activeIndex / maxIndex;

            const maxLeft =
              areaRef.current.clientWidth -
              barRef.current.clientWidth;

            barRef.current.style.left = `${progress * maxLeft}px`;
          }}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <ContentCard item={item} rankScope={rankScope} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default RankRowanim20;
