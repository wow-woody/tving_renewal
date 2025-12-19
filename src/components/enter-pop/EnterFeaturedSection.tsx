import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import './EnterFeaturedSection.scss';
import { getEnterContents } from './getEnterContents';
import { AGE } from '../../contents/media';

/** 🔥 iframe 자동재생 src 생성 유틸 */
const getAutoplaySrc = (src: string) => {
    const params = 'autoplay=1&mute=1&controls=0&playsinline=1&rel=0';
    return src.includes('?') ? `${src}&${params}` : `${src}?${params}`;
};

const EnterFeaturedSection = () => {
    const list = useMemo(() => getEnterContents(), []);
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

    // 네비게이션 DOM을 스와이퍼에 연결
    useEffect(() => {
        const swiper = swiperRef.current;
        if (!swiper || !prevRef.current || !nextRef.current) return;

        const nav =
            typeof swiper.params.navigation === 'object' && swiper.params.navigation
                ? swiper.params.navigation
                : {} as NonNullable<Exclude<typeof swiper.params.navigation, boolean>>;

        swiper.params.navigation = {
            ...nav,
            prevEl: prevRef.current!,
            nextEl: nextRef.current!,
        } as any;

        // 재초기화로 버튼 연결 보증
        swiper.navigation.destroy();
        swiper.navigation.init();
        swiper.navigation.update();
    });

    if (!activeItem) return null;

    return (
        <section
            className="enter-featured-section"
            style={{ '--enter-progress': `${progress}px` } as CSSProperties}
        >
            {/* ===== 섹션 헤더: 제목 + 컨트롤 ===== */}
            <div className="section-header">
                <h2 className="section-title">예능 인기 프로그램</h2>
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
            </div>
            <div className="enter-featured-body">
                {/* ===== 왼쪽: 고정 자동재생 영상 ===== */}
                <div className="featured-fixed">
                    <div className="featured-media">
                        {iframe ? (
                            <iframe
                                key={activeItem.id} // 🔥 바뀔 때마다 재마운트 → 자동재생 보장
                                src={getAutoplaySrc(iframe.src)}
                                title={iframe.title || activeItem.title}
                                allow="autoplay; encrypted-media; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <img src={activeItem.img1} alt={activeItem.title} />
                        )}
                    </div>

                    <div className="featured-info">
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
                    </div>
                </div>

                {/* ===== 오른쪽: 썸네일 Swiper ===== */}
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
                            // 커스텀 네비게이션 DOM 연결 (초기 세팅)
                            // @ts-expect-error swiper types allow HTMLElement
                            swiper.params.navigation.prevEl = prevRef.current;
                            // @ts-expect-error swiper types allow HTMLElement
                            swiper.params.navigation.nextEl = nextRef.current;
                        }}
                        onSwiper={(s) => {
                            swiperRef.current = s;
                            updateBar(0);
                        }}
                        onSlideChange={(swiper) => {
                            // 🔥 네비 버튼 / 드래그 / 루프 이동 시 동기화
                            setActiveIndex(swiper.realIndex);

                            const total = list.length;
                            const visible = Number(swiper.params.slidesPerView) || 1;
                            const maxIndex = Math.max(total - visible, 1);
                            const prog = Math.min(Math.max(swiper.realIndex / maxIndex, 0), 1);
                            updateBar(prog);
                        }}
                        onProgress={(_, prog) => {
                            // 드래그/오토플레이 시 실시간 이동
                            updateBar(prog);
                        }}
                        className="thumb-swiper"
                    >
                        {list.map((item, index) => (
                            <SwiperSlide key={item.id}>
                                <button
                                    type="button"
                                    className={`thumb ${index === activeIndex ? 'is-active' : ''}`}
                                    onClick={() => {
                                        setActiveIndex(index);
                                        swiperRef.current?.slideToLoop(index); // 루프 안전 이동
                                    }}
                                >
                                    <img src={item.img1} alt={item.title} />
                                </button>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* ===== 본문: 왼쪽 고정영상 + 오른쪽 스와이퍼 ===== */}
        </section>
    );
};

export default EnterFeaturedSection;
