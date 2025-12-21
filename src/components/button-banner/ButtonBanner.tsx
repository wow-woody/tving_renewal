import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './ButtonBanner.scss';

const buttonbanner = [
    {
        title: '환승연애4',
        img: '/images/buttonbanner/b1.svg',
        titleImg: '/images/buttonbanner/b1-t.svg',
    },
    { title: 'MAMA', img: '/images/buttonbanner/b2.svg', titleImg: 'images/buttonbanner/b2-t.svg' },
    {
        title: 'appletv',
        img: '/images/buttonbanner/b3.svg',
        titleImg: 'images/buttonbanner/b3-t.svg',
    },
    { title: 'kbl', img: '/images/buttonbanner/b4.svg', titleImg: 'images/buttonbanner/b4-t.svg' },
    {
        title: '크리에이터',
        img: '/images/buttonbanner/b5.svg',
        titleImg: 'images/buttonbanner/b5-t.svg',
    },
    { title: 'kbo', img: '/images/buttonbanner/b6.svg', titleImg: 'images/buttonbanner/b6-t.svg' },
    {
        title: '테니스',
        img: '/images/buttonbanner/b7.svg',
        titleImg: 'images/buttonbanner/b7-t.svg',
    },
    {
        title: '키즈',
        img: '/images/buttonbanner/b8.svg',
        titleImg: 'images/buttonbanner/b8-t.svg',
    },
];
const ButtonBanner = () => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const [isDown, setIsDown] = useState(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const onMouseDown = (e: React.MouseEvent) => {
        if (!wrapperRef.current) return;

        setIsDown(true);
        wrapperRef.current.classList.add('dragging');
        startX.current = e.pageX - wrapperRef.current.offsetLeft;
        scrollLeft.current = wrapperRef.current.scrollLeft;
    };

    const onMouseLeave = () => {
        setIsDown(false);
        wrapperRef.current?.classList.remove('dragging');
    };

    const onMouseUp = () => {
        setIsDown(false);
        wrapperRef.current?.classList.remove('dragging');
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDown || !wrapperRef.current) return;

        e.preventDefault();
        const x = e.pageX - wrapperRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.2; // 이동 속도 조절
        wrapperRef.current.scrollLeft = scrollLeft.current - walk;
    };

    return (
        <div
            className="button-banner-wrappers"
            ref={wrapperRef}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
        >
            {buttonbanner.map((item, i) => (
                <Link to="" key={i} draggable={false}>
                    <div className="button-wrap">
                        <div className="img-wrap">
                            <img src={item.img} alt={item.title} draggable={false} />
                        </div>
                        <img
                            className="img-title"
                            src={item.titleImg}
                            alt={item.title}
                            draggable={false}
                        />
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ButtonBanner;
