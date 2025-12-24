import React, { useRef, useState, type CSSProperties} from "react";

import { Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperControl from "../SwiperControl/SwiperControl";
import 'swiper/css';
import './RankingSwiper.scss'


interface RankingSwipperType {
    children: React.ReactNode;
    slidesPerView?: number | "auto";
    spaceBetween?: number;
}

const RankingSwiper = ({
    children,
    slidesPerView = "auto",
    spaceBetween = 32,
}: RankingSwipperType) => {
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
        <div className='swiper-wrap' style={{ '--enter-progress': `${barOffset}px` } as CSSProperties}>

            <SwiperControl
                trackRef={trackRef}
                barRef={barRef}
                prevRef={prevRef}
                nextRef={nextRef}
            />

            <Swiper
                slidesPerView={slidesPerView}
                spaceBetween={spaceBetween}
                modules={[Navigation]}
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
                {children}
            </Swiper>
        </div>
    )
}

export default RankingSwiper