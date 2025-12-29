import React, { useRef, useState, type CSSProperties } from "react";

import { Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperControl from "../SwiperControl/SwiperControl";
import 'swiper/css';
import 'swiper/css/navigation';

import styles from './LiveSwiper.module.scss';

interface LiveSwiperType {
    children: React.ReactNode;
    slidesPerView?: number | "auto";
    spaceBetween?: number;
    loop?: boolean;
}

const LiveSwiper = ({
    children,
    slidesPerView = "auto",
    spaceBetween = 12,
    loop = true,
}: LiveSwiperType) => {
    const swiperRef = useRef<any>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const [barOffset, setBarOffset] = useState(0);

    // 바 위치 업데이트 함수
    const updateBar = (prog: number) => {
        if (!trackRef.current || !barRef.current) return;
        const max = trackRef.current.clientWidth - barRef.current.clientWidth;
        const safeProg = Math.min(Math.max(prog, 0), 1);
        setBarOffset(safeProg * Math.max(max, 0));
    };

    return (
        <div className={styles['swiper-wrap']} style={{ '--enter-progress': `${barOffset}px` } as CSSProperties}>

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
                loop={loop}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    // @ts-ignore
                    swiper.params.navigation.prevEl = prevRef.current;
                    // @ts-ignore
                    swiper.params.navigation.nextEl = nextRef.current;
                }}
                onSwiper={(s) => {
                    swiperRef.current = s;
                    // 네비게이션 및 바 초기화
                    s.navigation.init();
                    s.navigation.update();
                    updateBar(0);
                }}
                // 슬라이드가 바뀔 때마다 바 위치 계산
                onSlideChange={(s) => {
                    const total = React.Children.count(children);
                    const prog = s.realIndex / (total - 1);
                    updateBar(prog);
                }}
            >

                {children}

            </Swiper>
        </div>
    );
};

export default LiveSwiper;