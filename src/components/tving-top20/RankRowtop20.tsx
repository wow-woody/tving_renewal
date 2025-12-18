import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';

import ContentCard from './ContentCardtop20';
import type { Content } from '../../type/content';
import { RankScope } from '../../type/enum';
import './RankRow-top20.scss';

interface RankRowProps {
    title: string;
    data: Content[];
    rankScope: RankScope;
}

const RankRowtop20 = ({ data, rankScope }: RankRowProps) => {
    const barRef = useRef<HTMLDivElement | null>(null);
    const areaRef = useRef<HTMLDivElement | null>(null);
    const lineRef = useRef<HTMLDivElement | null>(null);
    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);

    return (
        <div className="ranking-wrappers">
            {/* Pagination */}
            <div className="pagenation-wrap">
                <div className="pagenation-area" ref={areaRef}>
                    <div className="pagenation-line" ref={lineRef} />
                    <div className="pointer-line" ref={barRef} />
                </div>

                <div className="nav-btn">
                    <button className="rank-prev" ref={prevRef}>
                        <img src="/images/arrow-left.svg" />
                    </button>
                    <button className="rank-next" ref={nextRef}>
                        <img src="/images/arrow-right.svg" />
                    </button>
                </div>
            </div>

            {/* Swiper */}
            <div className="rank-row">
                <Swiper
                    slidesPerView={6.4}
                    spaceBetween={12}
                    slidesOffsetBefore={108} // 첫 카드 여백
                    slidesOffsetAfter={24} // 마지막 카드 여백
                    modules={[Navigation]}
                    navigation
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current!;
                        swiper.params.navigation.nextEl = nextRef.current!;
                    }}
                    onSwiper={() => {
                        if (barRef.current) {
                            barRef.current.style.left = '0px';
                        }
                    }}
                    onSlideChange={(swiper) => {
                        if (!barRef.current || !lineRef.current) return;

                        const totalSlides = swiper.slides.length;
                        const visibleSlides = swiper.params.slidesPerView as number;
                        const maxIndex = totalSlides - visibleSlides;

                        if (maxIndex <= 0) return;

                        // 🔥 핵심: progress clamp
                        const rawProgress = swiper.activeIndex / maxIndex;
                        const progress = Math.min(Math.max(rawProgress, 0), 1);

                        const maxLeft = lineRef.current.clientWidth - barRef.current.clientWidth;

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
        </div>
    );
};

export default RankRowtop20;
