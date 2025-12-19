import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from 'react';
import "swiper/css";
import "swiper/css/navigation";

import ContentCard from './ContentCardtop20';
import type { Content } from '../../type/content';
import { RankScope } from '../../type/enum';
import './RankRow-top20.scss';

interface RankRowProps {
  title?: string;
  data: Content[];
  rankScope: RankScope; // ✅ 추가
}

const RankRowtop20 = ({ title = '오늘의 티빙 TOP 20', data, rankScope }: RankRowProps) => {
  const [barOffset, setBarOffset] = useState(0);
  const swiperRef = useRef<any | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const updateBar = (prog: number) => {
    if (!trackRef.current || !barRef.current) return;
    const track = trackRef.current.clientWidth;
    const bar = barRef.current.clientWidth;
    const maxLeft = Math.max(track - bar, 0);
    const safeProg = Math.min(Math.max(prog, 0), 1);
    setBarOffset(safeProg * maxLeft);
  };

  // 네비게이션 DOM을 스와이퍼에 연결 (드라마 섹션과 동일 패턴)
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
      className="section-6"
      style={{ '--enter-progress': `${barOffset}px` } as CSSProperties}
    >
      {/* 섹션 제목 */}
      {title && (
        <h2 className="section-title">{title}</h2>
      )}
      {/* 드라마 섹션과 동일한 컨트롤 레이아웃 */}
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
          slidesPerView={6}
          spaceBetween={50}
          modules={[Navigation]}
          onBeforeInit={(swiper) => {
            // ❗ swiper 내부에 ref 직접 주입
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
          onSlideChange={(swiper) => {
            const total = data.length;
            const visible = Number(swiper.params.slidesPerView) || 1;
            const maxIndex = Math.max(total - visible, 1);
            const prog = Math.min(Math.max(swiper.realIndex / maxIndex, 0), 1);
            updateBar(prog);
          }}
          onProgress={(_, prog) => updateBar(prog)}
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

export default RankRowtop20;
