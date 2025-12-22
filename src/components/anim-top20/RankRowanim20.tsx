import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from 'react';
import "swiper/css";
import "swiper/css/navigation";

import ContentCard from "./ContentCardanim20";
import type { Content } from "../../type/content";
import { RankScope } from "../../type/enum";
import "./RankRow-anim20.scss";

interface RankRowProps {
  title?: string;
  data: Content[];
  rankScope: RankScope; // ✅ 추가
}

const RankRowanim20 = ({ data, title = '오늘의 티빙', rankScope }: RankRowProps) => {
  const [barOffset, setBarOffset] = useState(0);
  const swiperRef = useRef<any | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  // const updateBar = (prog: number) => {
  //   if (!trackRef.current || !barRef.current) return;
  //   const track = trackRef.current.clientWidth;
  //   const bar = barRef.current.clientWidth;
  //   const maxLeft = Math.max(track - bar, 0);
  //   const safeProg = Math.min(Math.max(prog, 0), 1);
  //   setBarOffset(safeProg * maxLeft);
  // };

    const updateBar = (progress: number) => {
    if (!trackRef.current || !barRef.current) return;

    const trackWidth = trackRef.current.clientWidth;
    const barWidth = barRef.current.clientWidth;
    const maxLeft = Math.max(trackWidth - barWidth, 0);

    const safeProgress = Math.min(Math.max(progress, 0), 1);
    setBarOffset(safeProgress * maxLeft);
  };
  
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
    <section
      className="rank-row-anim20"
      style={{ '--enter-progress': `${barOffset}px` } as CSSProperties}
    >
      {title && (
        <h2 className="section-title">{title}</h2>
      )}

      <div className="thumb-controls">
        <div className="enter-pagination" ref={trackRef}>
          <div className="pagenation-line" />
          <div className="pointer-line" ref={barRef} />
        </div>
        <div className="enter-nav">
          <button
            type="button"
            className="nav-btn prev"
            ref={prevRef}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            type="button"
            className="nav-btn next"
            ref={nextRef}
            aria-label="Next slide"
          >
            ›
          </button>
        </div>
      </div>

      <div className="rank-row">
        <Swiper
          slidesPerView={4.3}
          
          spaceBetween={32}
          modules={[Navigation]}
          onBeforeInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          navigation
          onSwiper={(s) => {
            swiperRef.current = s;
            updateBar(0);
          }}
          // onSlideChange={(swiper) => {
          //   const total = data.length;
          //   const visible = Number(swiper.params.slidesPerView) || 1;
          //   const maxIndex = Math.max(total - visible, 1);
          //   const prog = Math.min(Math.max(swiper.realIndex / maxIndex, 0), 1);
          //   updateBar(prog);
          // }}
          // onProgress={(_, prog) => updateBar(prog)}
          onProgress={(_, progress) => {
            updateBar(progress);
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
