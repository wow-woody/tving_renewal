import React, { useRef } from 'react';
import './scss/Subscription.scss';
import { Link } from 'react-router-dom';

const Subscription = () => {
    // ------------클릭 섹션 이동------------
    const sectionRefs = useRef({});

    const scrollTo = (key) => {
        const target = sectionRefs.current[key];
        if (!target) return;

        const y = target.getBoundingClientRect().top + window.pageYOffset - 500; // header height

        window.scrollTo({
            top: y,
            behavior: 'smooth',
        });
    };

    return (
        <div className="subscription-wrappers">
            <div className="top">
                <Link to="/">
                    <img src="/images/tving-logo-main.svg" alt="logo" />
                </Link>
            </div>
            <div className="subscription-wrap">
                <div className="fixed">
                    <div className="ad-banner">
                        <img src="/images/ad-banner.svg" alt="ad-banner" />
                    </div>

                    <div className="select-section">
                        <button onClick={() => scrollTo('t')}>티빙 이용권</button>
                        <button onClick={() => scrollTo('tw')}>티빙 X 웨이브 이용권</button>
                        <button onClick={() => scrollTo('twd')}>
                            티빙 X 웨이브 X 디즈니 이용권
                        </button>
                    </div>
                </div>

                <div className="select-wrap">
                    <section ref={(el) => (sectionRefs.current.t = el)}>
                        <div className="title-wrap">
                            <h2>
                                <img src="/images/tving-logo-main.svg" alt="tving" />
                                이용권
                            </h2>
                        </div>
                        <div className="subscription">
                            <div>
                                <div className="select">
                                    <div className="select-top">
                                        <p className="title">광고형 스탠다드</p>
                                        <p className="price">월 5,500원</p>
                                    </div>
                                    <div className="select-content">
                                        <p>동시시청 2대</p>
                                        <span>+</span>
                                        <p>최대 1080p FHD 고화질</p>
                                        <span>+</span>
                                        <p>모든 디바이스 지원</p>
                                        <span>+</span>
                                        <p>광고포함</p>
                                    </div>
                                    <div className="select-bottom">이용권 선택</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section ref={(el) => (sectionRefs.current.tw = el)}>
                        <div className="title-wrap">
                            <h2>
                                <img src="/images/tving-logo-main.svg" alt="tving" />
                                <span>X</span>
                                <img src="/images/wave-logo.svg" alt="wave" />
                                이용권
                            </h2>
                        </div>
                        <div className="subscription">
                            <div>
                                <div className="select">
                                    <div className="select-top">
                                        <p className="title">광고형 스탠다드</p>
                                        <p className="price">월 5,500원</p>
                                    </div>
                                    <div className="select-content">
                                        <p>동시시청 2대</p>
                                        <span>+</span>
                                        <p>최대 1080p FHD 고화질</p>
                                        <span>+</span>
                                        <p>모든 디바이스 지원</p>
                                        <span>+</span>
                                        <p>광고포함</p>
                                    </div>
                                    <div className="select-bottom">이용권 선택</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section ref={(el) => (sectionRefs.current.twd = el)}>
                        <div className="title-wrap">
                            <h2>
                                <img src="/images/tving-logo-main.svg" alt="tving" />
                                <span>X</span>
                                <img
                                    className="disney-logo"
                                    src="/images/diseny-logo.svg"
                                    alt="disney"
                                />
                                <span>X</span>
                                <img src="/images/wave-logo.svg" alt="wave" />
                                이용권
                            </h2>
                        </div>
                        <div className="subscription">
                            <div>
                                <div className="select">
                                    <div className="select-top">
                                        <p className="title">광고형 스탠다드</p>
                                        <p className="price">월 5,500원</p>
                                    </div>
                                    <div className="select-content">
                                        <p>동시시청 2대</p>
                                        <span>+</span>
                                        <p>최대 1080p FHD 고화질</p>
                                        <span>+</span>
                                        <p>모든 디바이스 지원</p>
                                        <span>+</span>
                                        <p>광고포함</p>
                                    </div>
                                    <div className="select-bottom">이용권 선택</div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div className="footer-line"></div>
        </div>
    );
};

export default Subscription;
