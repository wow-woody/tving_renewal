import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LiveChannel } from "../../data/LiveChannels";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from 'swiper';
import "swiper/css";
import "swiper/css/navigation";
import "./LiveNews.scss";
import SwiperControl from '../SwiperControl/SwiperControl';

interface Props {
  list: LiveChannel[];
}

const LiveNewsss = ({ list }: Props) => {
  const navigate = useNavigate();
  const newsList = list.filter(
    (item) => item.category === "뉴스"
  );

  const [playingId, setPlayingId] = useState<string | null>(null);

  const swiperRef = useRef<SwiperType | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [barOffset, setBarOffset] = useState(0);

  const updateBar = (prog: number) => {
    if (!trackRef.current || !barRef.current) return;
    const track = trackRef.current.clientWidth;
    const bar = barRef.current.clientWidth;
    const maxLeft = Math.max(track - bar, 0);

    const safeProg = Math.min(Math.max(prog, 0), 1);
    setBarOffset(safeProg * maxLeft);
  };

  if (newsList.length === 0) return null;

  return (
    <section
      className="live-news"
      style={{ '--enter-progress': `${barOffset}px` } as CSSProperties}
    >
      {/* 헤더 */}
      <SwiperControl
        trackRef={trackRef}
        barRef={barRef}
        prevRef={prevRef}
        nextRef={nextRef}
      />

      {/* 슬라이더 */}
      <Swiper
        modules={[Navigation]}
        slidesPerView={3.2}
        spaceBetween={12}
        navigation
        loop={true}
        onBeforeInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onSwiper={(s) => {
          swiperRef.current = s;
          updateBar(0);
        }}
        onSlideChange={(swiper) => {
          const total = newsList.length;
          const prog = swiper.realIndex / (total - 1);
          updateBar(prog);
        }}
        onProgress={(_, prog) => updateBar(prog)}
      >
        {newsList.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="news-card">
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

export default LiveNewsss;
