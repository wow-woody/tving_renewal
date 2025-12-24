import type { RefObject } from 'react';

import ArrowLeft from '../../assets/icons/ArrowLeft';
import ArrowRight from '../../assets/icons/ArrowRight'

import './SwiperControl.scss'

type SwiperControlProps = {
    trackRef: RefObject<HTMLDivElement | null>;
    barRef: RefObject<HTMLDivElement | null>;
    prevRef: RefObject<HTMLButtonElement | null> ;
    nextRef: RefObject<HTMLButtonElement | null>;
};

const SwiperControl = ({ trackRef, barRef, prevRef, nextRef }: SwiperControlProps) => {
    return (
        <div className="swiper-control">
            <div className="enter-pagination" ref={trackRef}>
                <div className="pagenation-line" />
                <div className="pointer-line" ref={barRef} />
            </div>

            <div className="enter-nav">
                <button ref={prevRef} className="nav-btn prev">
                    <ArrowLeft/>
                </button>
                <button ref={nextRef} className="nav-btn next">
                    <ArrowRight/>
                </button>
            </div>
        </div>
    );
};

export default SwiperControl;
