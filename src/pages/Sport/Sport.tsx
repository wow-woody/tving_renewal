import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './Sport.scss';
import { sports } from '../../data/sport';
import SportsLive from '../../components/sports-live/SportsLive';
import { liveChannels } from '../../data/LiveChannels';

const banners = [
    { title: 'SUPER RACE', image: '/images/spo-banner1.png' },
    { title: 'KBL', image: '/images/spo-banner2.png' },
    { title: 'UFC', image: '/images/spo-banner3.png' },
    { title: 'WIMBLEDON', image: '/images/spo-banner4.png' },
    { title: 'KBO', image: '/images/spo-banner5.png' },

];

const Sport = () => {
    const kblGames = sports.filter(sport => sport.category === 'KBL').slice(0, 4);

    // 카테고리별 데이터
    const superraceData = sports.filter(sport => sport.category === 'SUPERRACE');
    const ufcData = sports.filter(sport => sport.category === 'UFC');
    const kblData = sports.filter(sport => sport.category === 'KBL');
    const wimbledonData = sports.filter(sport => sport.category === 'WIMBLEDON');
    const kboData = sports.filter(sport => sport.category === 'KBO');

    // 각 카드별 시작 시간 (시간 단위를 초로 변환)
    const initialTimes = [93 * 60 * 60, 99 * 60 * 60, 104 * 60 * 60, 120 * 60 * 60]; // 93h, 99h, 104h, 120h
    const [timesLeft, setTimesLeft] = useState(initialTimes);

    // 각 카드별 이미지
    const gameImages = [
        '/images/spo-live1.webp',
        '/images/spo-live2.webp',
        '/images/spo-live3.webp',
        '/images/spo-live4.webp'
    ];

    // 각 카드별 제목
    const gameTitles = [
        'SK vs 현대모비스',
        'KCC vs KT',
        '정관장 vs 삼성',
        'LG vs DB'
    ];

    // 각 카드별 경기 시작 시간 (카운트다운과 매칭)
    const gameDates = [
        '12.24 (화) 오후 9:00',   // 93시간 후
        '12.25 (수) 오전 3:00',   // 99시간 후
        '12.25 (수) 오전 8:00',   // 104시간 후
        '12.26 (목) 오전 12:00'   // 120시간 후
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setTimesLeft((prev) =>
                prev.map((time) => (time <= 0 ? 0 : time - 1))
            );
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <div className='sport-wrappers'>
            <div className="sport-wrap">
                <section className="section-1">
                    <div className="sport-container">
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            loop
                            pagination={{
                                el: '.custom-pagination',
                                clickable: true,
                                renderBullet: (index, className) => {
                                    return `
                        <div class="${className} pager-item">
                          <span class="pager-title">${banners[index].title}</span>
                          <span class="pager-progress"></span>
                        </div>
                      `;
                                },
                            }}
                            className="sportbanner"
                        >
                            {/* 슬라이드 */}
                            {banners.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <img src={item.image} alt={item.title} />
                                </SwiperSlide>
                            ))}

                            {/* 커스텀 페이저 */}
                            <div className="custom-pagination glass" />
                        </Swiper>
                    </div>
                </section>

                <section className="section-2">
                    <h2>2025-2026 LG전자 프로농구 중계</h2>
                    <div className="game-schedule">
                        {kblGames.map((game, index) => (
                            <div key={game.id} className="game-card">
                                <div className="game-thumbnail">
                                    <img src={gameImages[index]} alt={game.title} />
                                    <div className="live-timer">
                                        <span>라이브 시작까지</span>
                                        <span className="time">{formatTime(timesLeft[index])}</span>
                                    </div>
                                </div>
                                <div className="game-info">
                                    <h3>{gameTitles[index]}</h3>
                                    <p className="game-date">{gameDates[index]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <SportsLive list={liveChannels} />

                <section className="section-3">
                    <h2>SUPER RACE</h2>
                    <Swiper
                        modules={[Navigation]}
                        slidesPerView={4}
                        spaceBetween={20}
                        navigation={{
                            nextEl: '.superrace-next',
                            prevEl: '.superrace-prev',
                        }}
                        className="content-swiper"
                    >
                        {superraceData.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="content-card">
                                    <img src={item.thumb} alt={item.title} />
                                    <h3>{item.title}</h3>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="swiper-button-prev superrace-prev"></div>
                    <div className="swiper-button-next superrace-next"></div>
                </section>

                <section className="section-4">
                    <h2>UFC</h2>
                    <Swiper
                        modules={[Navigation]}
                        slidesPerView={4}
                        spaceBetween={20}
                        navigation={{
                            nextEl: '.ufc-next',
                            prevEl: '.ufc-prev',
                        }}
                        className="content-swiper"
                    >
                        {ufcData.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="content-card">
                                    <img src={item.thumb} alt={item.title} />
                                    <h3>{item.title}</h3>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="swiper-button-prev ufc-prev"></div>
                    <div className="swiper-button-next ufc-next"></div>
                </section>

                <section className="section-5">
                    <h2>KBL</h2>
                    <Swiper
                        modules={[Navigation]}
                        slidesPerView={4}
                        spaceBetween={20}
                        navigation={{
                            nextEl: '.kbl-next',
                            prevEl: '.kbl-prev',
                        }}
                        className="content-swiper"
                    >
                        {kblData.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="content-card">
                                    <img src={item.thumb} alt={item.title} />
                                    <h3>{item.title}</h3>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="swiper-button-prev kbl-prev"></div>
                    <div className="swiper-button-next kbl-next"></div>
                </section>

                <section className="section-6">
                    <h2>WIMBLEDON</h2>
                    <Swiper
                        modules={[Navigation]}
                        slidesPerView={4}
                        spaceBetween={20}
                        navigation={{
                            nextEl: '.wimbledon-next',
                            prevEl: '.wimbledon-prev',
                        }}
                        className="content-swiper"
                    >
                        {wimbledonData.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="content-card">
                                    <img src={item.thumb} alt={item.title} />
                                    <h3>{item.title}</h3>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="swiper-button-prev wimbledon-prev"></div>
                    <div className="swiper-button-next wimbledon-next"></div>
                </section>

                <section className="section-7">
                    <h2>KBO</h2>
                    <Swiper
                        modules={[Navigation]}
                        slidesPerView={4}
                        spaceBetween={20}
                        navigation={{
                            nextEl: '.kbo-next',
                            prevEl: '.kbo-prev',
                        }}
                        className="content-swiper"
                    >
                        {kboData.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="content-card">
                                    <img src={item.thumb} alt={item.title} />
                                    <h3>{item.title}</h3>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="swiper-button-prev kbo-prev"></div>
                    <div className="swiper-button-next kbo-next"></div>
                </section>
            </div>
        </div>
    );
};

export default Sport;
