import { useRef, useState, type CSSProperties } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import './Tvingnew.scss';

import New from '../../../data/New';
import SwiperControl from '../../SwiperControl/SwiperControl';

const TvingNew = () => {

    const swiperRef = useRef<any>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const [barOffset, setBarOffset] = useState(0);

    const updateBar = (prog: number) => {
        if (!trackRef.current || !barRef.current) return;
        const max =
            trackRef.current.clientWidth - barRef.current.clientWidth;
        setBarOffset(Math.min(Math.max(prog, 0), 1) * Math.max(max, 0));
    };

    return (
        <div
            className="tiving-new-wrappers"
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
                className="new-swiper"
                slidesPerView="auto"
                modules={[Navigation]}
                spaceBetween={36}
                slidesOffsetBefore={0}
                grabCursor
                navigation
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

                onProgress={(_, prog) => updateBar(prog)}
            >
                {New.map((item, i) => (
                    <SwiperSlide key={item.id}>
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
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TvingNew;
