import type React from "react";
import { useEffect, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import 'swiper/css'
import 'swiper/css/navigation'

import './Highlights.scss'


interface HightlightsType {
    config: {
        logoUrl: string;
        description: string;
        bgType: 'color' | 'image';
        bgValue: string;
        slidesPerView?: number | 'auto';
        spaceBetween?: number;
    };
    contents: any[];
    contentCards: (item: any, index: number) => React.ReactNode;
}

const Highlights = ({ config, contents, contentCards }: HightlightsType) => {
    const swiperRef = useRef<any>(null);
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (swiperRef.current && prevRef.current && nextRef.current) {
            const swiper = swiperRef.current;
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
        }
    }, [contents]);

    const containerStyle: React.CSSProperties = {
        backgroundImage: config.bgValue.includes('linear-gradient')
            ? config.bgValue
            : (config.bgType === 'image' ? `url(${config.bgValue})` : 'none'),
        backgroundColor: config.bgType === 'color' && !config.bgValue.includes('linear-gradient')
            ? config.bgValue
            : 'transparent',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div className="hilight-section-wrappers">
            <div
                className="hilight-section"
                style={containerStyle}
            >

                <div className="section-info">
                    <div className="info-main">
                        <div className="info-top">
                            {config.logoUrl && <img src={config.logoUrl} alt="logo" />}
                        </div>
                        <div className="info-middle">{config.description}</div>
                    </div>
                    <div className="info-bottom">더보기 +</div>
                </div>

                <div className="section-sliders">
                    <Swiper
                        slidesPerView={config.slidesPerView || 'auto'}
                        spaceBetween={config.spaceBetween ?? 12}
                        modules={[Navigation]}
                        onSwiper={(s) => (swiperRef.current = s)}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                    >
                        {contents.map((item, index) => (
                            <SwiperSlide key={item.id || index}>
                                {contentCards(item, index)}
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="slider-nav">
                        <button ref={prevRef} className="nav-btn prev">
                            <img src="/images/arrow-LW.svg" alt="prev" />
                        </button>
                        <button ref={nextRef} className="nav-btn next">
                            <img src="/images/arrow-RW.svg" alt="next" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Highlights