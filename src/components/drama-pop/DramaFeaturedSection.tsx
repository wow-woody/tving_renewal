import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';

import './DramaFeaturedSection.scss';
import { getDramaContents } from './getDramaContents';
import { AGE } from '../../contents/media';

const getAutoplaySrc = (src: string) => {
  const params = 'autoplay=1&mute=1&controls=0&playsinline=1&rel=0';
  return src.includes('?') ? `${src}&${params}` : `${src}?${params}`;
};

const DramaFeaturedSection = () => {
  const list = useMemo(() => getDramaContents(), []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [barOffset, setBarOffset] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const activeItem = list[activeIndex];
  const iframe = activeItem?.iframe?.[0];
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

  if (!activeItem) return null;

  return (
    <section
      className="drama-featured-section"
      style={{ '--enter-progress': `${progress}px` } as CSSProperties}
    >
      <div className="section-header">
        <h2 className="section-title">추천 인기 드라마</h2>
        <div className="thumb-controls">
          <div className="enter-pagination" ref={trackRef}>
            <div className="pagenation-line" />
            <div className="pointer-line" ref={barRef} />
          </div>
          <div className="enter-nav">
            <button type="button" className="nav-btn prev" ref={prevRef} aria-label="Previous slide">‹</button>
            <button type="button" className="nav-btn next" ref={nextRef} aria-label="Next slide">›</button>
          </div>
        </div>
      </div>

      <div className="enter-featured-body">
        <div className="featured-fixed">
          <div className="featured-media">
            {iframe ? (
              <iframe
                key={activeItem.id}
                src={getAutoplaySrc(iframe.src)}
                title={iframe.title || activeItem.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <img src={activeItem.img1} alt={activeItem.title} />
            )}
          </div>

          <Link to={`/detail/${activeItem.id}`} className="featured-info">
            <h3>{activeItem.title}</h3>
            <p className='age'>
              {AGE[String((activeItem as any).age) as keyof typeof AGE]?.image ? (
                <img
                  src={AGE[String((activeItem as any).age) as keyof typeof AGE].image}
                  alt={AGE[String((activeItem as any).age) as keyof typeof AGE].label}
                />
              ) : (
                <span>{activeItem.age}</span>
              )}
            </p>
            <p className='category'>{activeItem.category}</p>
            <p className='broadcast'>{activeItem.broadcast}</p>
            <p className='season'>{activeItem.season}</p>
            <p className='subtitle'>{activeItem.subtitle}</p>
            <span className='desc'>{activeItem.desc}</span>
          </Link>
        </div>

        <div className="thumb-rail">
          <Swiper
            slidesPerView={4.2}
            spaceBetween={30}
            centeredSlides={false}
            slidesPerGroup={1}
            slidesOffsetBefore={0}
            slidesOffsetAfter={0}
            roundLengths
            loopAdditionalSlides={6}
            navigation
            loop
            modules={[Navigation]}
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
              setActiveIndex(swiper.realIndex);
              const total = list.length;
              const visible = Number(swiper.params.slidesPerView) || 1;
              const maxIndex = Math.max(total - visible, 1);
              const prog = Math.min(Math.max(swiper.realIndex / maxIndex, 0), 1);
              updateBar(prog);
            }}
            onProgress={(_, prog) => updateBar(prog)}
            className="thumb-swiper"
          >
            {list.map((item, index) => (
              <SwiperSlide key={item.id}>
                <button
                  type="button"
                  className={`thumb ${index === activeIndex ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveIndex(index);
                    swiperRef.current?.slideToLoop(index);
                  }}
                >
                  <img src={item.img1} alt={item.title} />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default DramaFeaturedSection;
