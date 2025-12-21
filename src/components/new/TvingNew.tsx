import { useRef, useState, useEffect, type CSSProperties } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import './Tvingnew.scss';

import New from '../../data/New';

const TvingNew = () => {
    const [barOffset, setBarOffset] = useState(0);

    const swiperRef = useRef<SwiperType | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const barRef = useRef<HTMLDivElement | null>(null);
    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);

    const progress = barOffset;

        /** progress(0~1) → 실제 px 이동값 */
    const updateBar = (prog: number) => {
        if (!trackRef.current || !barRef.current) return;
        const track = trackRef.current.clientWidth;
        const bar = barRef.current.clientWidth;
        const maxLeft = Math.max(track - bar, 0);
        const safeProg = Math.min(Math.max(prog, 0), 1);
        setBarOffset(safeProg * maxLeft);
    };

    return (
        <div className="tiving-new-wrappers"
            style={{ '--news-progress': `${progress}px` } as CSSProperties}
        >
            {/* 헤더 */}
            <div className="section-header">
                <h2>티빙 NEW! 공개 예정 콘텐츠</h2>
                <div className="thumb-controls">
                    <div className="news-pagination" ref={trackRef}>
                        <div className="pagenation-line" />
                        <div className="pointer-line" ref={barRef} />
                    </div>
                    <div className="news-nav">
                        <button type="button" className="nav-btn prev" ref={prevRef} aria-label="Previous slide">‹</button>
                        <button type="button" className="nav-btn next" ref={nextRef} aria-label="Next slide">›</button>
                    </div>
                </div>
            </div>

            {/* 슬라이더 */}
            <Swiper
                className="new-swiper"
                slidesPerView="auto"
                modules={[Navigation]}
                spaceBetween={40}
                slidesOffsetBefore={88}
                grabCursor
                navigation
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
                    const total = New.length;
                    const visible = 1; // slidesPerView="auto" 보정
                    const maxIndex = Math.max(total - visible, 1);
                    const prog = Math.min(Math.max(swiper.realIndex / maxIndex, 0), 1);
                    updateBar(prog);
                }}
                onProgress={(_, prog) => updateBar(prog)}
            >

                {New.map((item, i) => (
                    <SwiperSlide key={item.id}>
                        <Link to={`/new/${item.id}`}>
                            <div className={`new-wrap ${i % 2 === 1 ? 'reverse' : ''}`}>
                                <div className="img-box">
                                    <img src={item.img2} alt={item.title} />
                                </div>

                                <div className="new-title">
                                    <div className="title-img">
                                        <img src={item.titleimg} alt={item.title} />
                                    </div>
                                    <div className="sub-title">{item.year}</div>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TvingNew;
