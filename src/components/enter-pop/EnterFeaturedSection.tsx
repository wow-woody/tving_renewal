import { useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import './EnterFeaturedSection.scss';
import { getEnterContents } from './getEnterContents';

/** 🔥 iframe 자동재생 src 생성 유틸 */
const getAutoplaySrc = (src: string) => {
    const params = 'autoplay=1&mute=1&controls=0&playsinline=1&rel=0';
    return src.includes('?') ? `${src}&${params}` : `${src}?${params}`;
};

const EnterFeaturedSection = () => {
    const list = useMemo(() => getEnterContents(), []);
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef<SwiperType | null>(null);

    const activeItem = list[activeIndex];
    const iframe = activeItem?.iframe?.[0];

    if (!activeItem) return null;

    return (
        <section className="enter-featured-section">
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
                </div>
            </div>

            {/* ===== 오른쪽: 썸네일 Swiper ===== */}
            <div className="thumb-rail">
                <Swiper
                    slidesPerView={5.5}
                    spaceBetween={14}
                    centeredSlides={false}
                    slidesPerGroup={1}
                    slidesOffsetBefore={0}
                    slidesOffsetAfter={0}
                    roundLengths
                    loopAdditionalSlides={6}
                    navigation
                    loop
                    modules={[Navigation]}
                    onSwiper={(s) => (swiperRef.current = s)}
                    onSlideChange={(swiper) => {
                        // 🔥 네비 버튼 / 드래그 / 루프 이동 시 동기화
                        setActiveIndex(swiper.realIndex);
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
        </section>
    );
};

export default EnterFeaturedSection;
