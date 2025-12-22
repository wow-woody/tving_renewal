import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LiveChannel } from "../../data/LiveChannels";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from 'swiper';
import "swiper/css";
import "swiper/css/navigation";
import "./SportsLive.scss";

interface Props {
  list: LiveChannel[];
}

const SportsLive = ({ list }: Props) => {
  const navigate = useNavigate();
  const sportsList = list.filter(
    (item) => item.category === "스포츠"
  );

  const [barOffset, setBarOffset] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const progress = barOffset;

  const updateBar = (prog: number) => {
    if (!trackRef.current || !barRef.current) return;
    const track = trackRef.current.clientWidth;
    const bar = barRef.current.clientWidth;
    const maxLeft = Math.max(track - bar, 0);
    const safeProg = Math.min(Math.max(prog, 0), 1);
    setBarOffset(safeProg * maxLeft);
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

  if (sportsList.length === 0) return null;

  return (
    <section
      className="sports-live"
      style={{ '--sports-progress': `${progress}px` } as CSSProperties}
    >
      {/* 헤더 */}
      <div className="section-header">
        <h2>실시간 스포츠 라이브</h2>
        <div className="thumb-controls">
          <div className="sports-pagination" ref={trackRef}>
            <div className="pagenation-line" />
            <div className="pointer-line" ref={barRef} />
          </div>
          <div className="sports-nav">
            <button type="button" className="nav-btn prev" ref={prevRef} aria-label="Previous slide">‹</button>
            <button type="button" className="nav-btn next" ref={nextRef} aria-label="Next slide">›</button>
          </div>
        </div>
      </div>

      {/* 슬라이더 */}
      <Swiper
        modules={[Navigation]}
        slidesPerView={3.2}
        spaceBetween={12}
        navigation
        loop={true}
        onBeforeInit={(swiper) => {
          // @ts-expect-error HTMLElement ok
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-expect-error HTMLElement ok
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onSwiper={(s) => {
          swiperRef.current = s;
          updateBar(0);
        }}
        onSlideChange={(swiper) => {
          const total = sportsList.length;
          const visible = Number(swiper.params.slidesPerView) || 1;
          const maxIndex = Math.max(total - visible, 1);
          const prog = Math.min(Math.max(swiper.realIndex / maxIndex, 0), 1);
          updateBar(prog);
        }}
        onProgress={(_, prog) => updateBar(prog)}
      >
        {sportsList.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="sports-card">
              <div className="thumb" onClick={() => setPlayingId(item.id)}>
                {playingId === item.id ? (
                  <div dangerouslySetInnerHTML={{ __html: item.iframe }} />
                ) : (
                  <img src={item.thumb} alt={item.title} />
                )}
              </div>

              <div className="meta">
                <div className="row">
                  <span className="badge">LIVE</span>
                  <p 
                    className="title" 
                    onClick={() => navigate('/live', { state: { channelId: item.id } })}
                  >
                    {item.title}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default SportsLive;
