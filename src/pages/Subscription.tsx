import React, { useRef, useState } from 'react';
import './scss/Subscription.scss';
import { Link } from 'react-router-dom';
import { subscriptionData } from '../data/SubscriptionData.ts';

import { useSubscriptionStore } from '../store/useSubscriptionStore';

const Subscription = () => {
    // ------------클릭 섹션 이동------------
    const sectionRefs = useRef<{
        t?: HTMLElement | null;
        tw?: HTMLElement | null;
        twd?: HTMLElement | null;
    }>({});

    //--------------- section별 데이터 찾기 ----------------
    const tvingOnlySection = subscriptionData.sections.find((sec) => sec.id === 'tving_only');

    const tvingWavveSection = subscriptionData.sections.find((sec) => sec.id === 'tving_wavve');

    const tvingWavveDisneySection = subscriptionData.sections.find(
        (sec) => sec.id === 'tving_wavve_disney'
    );

    //------------- 버튼 누르면 빨갛게 ----------------
    const [activeKey, setActiveKey] = useState<'t' | 'tw' | 'twd' | null>(null);

    //-------------- 스크롤 이동 ------------------
    const scrollTo = (key: 't' | 'tw' | 'twd' | 'top') => {
        if (key === 'top') {
            setActiveKey(null);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            return;
        }

        setActiveKey(key);

        const target = sectionRefs.current[key];
        if (!target) return;

        const y = target.getBoundingClientRect().top + window.pageYOffset - 193; // header height

        window.scrollTo({
            top: y,
            behavior: 'smooth',
        });
    };

    const { selectItem } = useSubscriptionStore();



    return (
        <div className="subscription-wrappers">
            <div className="top">
                <Link to="/">
                    <img src="/images/tving-logo-main.svg" alt="logo" />
                </Link>
            </div>

            <div className="ad-banner">
                <img src="/images/ad-banner.svg" alt="ad-banner" />
            </div>

            <div className="select-section">
                <button onClick={() => scrollTo('top')}>전체</button>
                <button onClick={() => scrollTo('t')} className={activeKey === 't' ? 'active' : ''}>티빙 이용권</button>
                <button onClick={() => scrollTo('tw')} className={activeKey === 'tw' ? 'active' : ''}>티빙 X 웨이브 이용권</button>
                <button onClick={() => scrollTo('twd')} className={activeKey === 'twd' ? 'active' : ''}>티빙 X 웨이브 X 디즈니 이용권</button>
            </div>

            <div className="subscription-wrap">
                <div className="select-wrap">
                    <section
                        ref={(el) => {
                            sectionRefs.current.t = el;
                        }}
                    >
                        <div className="title-wrap">
                            <h2>
                                <img src="/images/tving-logo-main.svg" alt="tving" />
                                이용권
                            </h2>
                        </div>
                        <div className="subscription">
                            {tvingOnlySection?.items.map((item) => (
                                <div key={item.id}>
                                    <Link
                                        key={item.id}
                                        to="/subscription/payment/check"
                                        onClick={() => selectItem(item.id)}
                                        state={{
                                            item,
                                            section: {
                                                logos: ['/images/tving-logo-main.svg'],
                                                name: '티빙 이용권',
                                            },
                                        }}
                                    >
                                        <div className="select">
                                            <div className="select-top">
                                                <p className="title">{item.name}</p>
                                                <div className="price-wrap">
                                                    <p className="price">
                                                        월 {item.price.discount.toLocaleString()}원
                                                    </p>
                                                    {item.price.original && (
                                                        <p className="cost">
                                                            {item.price.original.toLocaleString()}원
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="select-content">
                                                <div className="img-wrap">
                                                    {Array.isArray(item.companyIcon) ? (
                                                        item.companyIcon.map((icon, idx) => (
                                                            <img key={idx} src={icon} alt="" />
                                                        ))
                                                    ) : (
                                                        <img src={item.companyIcon} alt="" />
                                                    )}
                                                </div>

                                                {item.description.map((desc, idx) => (
                                                    <React.Fragment key={idx}>
                                                        <p>{desc}</p>
                                                        {idx < item.description.length - 1 && (
                                                            <span className="plus">+</span>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                            <div className="select-bottom">이용권 선택</div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section
                        ref={(el) => {
                            sectionRefs.current.tw = el;
                        }}
                    >
                        <div className="title-wrap">
                            <h2>
                                <img src="/images/tving-logo-main.svg" alt="tving" />
                                <span>X</span>
                                <img src="/images/wave-logo.svg" alt="wave" />
                                이용권
                            </h2>
                        </div>
                        <div className="subscription">
                            {tvingWavveSection?.items.map((item) => (
                                <div key={item.id}>
                                    <Link
                                        key={item.id}
                                        to="/subscription/payment/check"
                                        onClick={() => selectItem(item.id)}
                                        state={{
                                            item,
                                            section: {
                                                logos: [
                                                    '/images/tving-logo-main.svg',
                                                    '/images/wave-logo.svg',
                                                ],
                                                name: '티빙 X 웨이브 이용권',
                                            },
                                        }}
                                    >
                                        <div className="select">
                                            <div className="select-top">
                                                <p className="title">{item.name}</p>
                                                <div className="price-wrap">
                                                    <p className="price">
                                                        월 {item.price.discount.toLocaleString()}원
                                                    </p>
                                                    {item.price.original && (
                                                        <p className="cost">
                                                            {item.price.original.toLocaleString()}원
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="select-content">
                                                <div className="img-wrap">
                                                    {Array.isArray(item.companyIcon) ? (
                                                        item.companyIcon.map((icon, idx) => (
                                                            <img key={idx} src={icon} alt="" />
                                                        ))
                                                    ) : (
                                                        <img src={item.companyIcon} alt="" />
                                                    )}
                                                </div>

                                                {item.description.map((desc, idx) => (
                                                    <React.Fragment key={idx}>
                                                        <p>{desc}</p>
                                                        {idx < item.description.length - 1 && (
                                                            <span className="plus">+</span>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                            <div className="select-bottom">이용권 선택</div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section
                        ref={(el) => {
                            sectionRefs.current.twd = el;
                        }}
                    >
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
                            {tvingWavveDisneySection?.items.map((item) => (
                                <div key={item.id}>
                                    <Link
                                        key={item.id}
                                        to="/subscription/payment/check"
                                        onClick={() => selectItem(item.id)}
                                        state={{
                                            item,
                                            section: {
                                                logos: [
                                                    '/images/tving-logo-main.svg',
                                                    '/images/diseny-logo.svg',
                                                    '/images/wave-logo.svg',
                                                ],
                                                name: '티빙 X 웨이브 X 디즈니 이용권',
                                            },
                                        }}
                                    >
                                        <div className="select">
                                            <div className="select-top">
                                                <p className="title">{item.name}</p>
                                                <div className="price-wrap">
                                                    <p className="price">
                                                        월 {item.price.discount.toLocaleString()}원
                                                    </p>
                                                    {item.price.original && (
                                                        <p className="cost">
                                                            {item.price.original.toLocaleString()}원
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="select-content">
                                                <div className="img-wrap">
                                                    {Array.isArray(item.companyIcon) ? (
                                                        item.companyIcon.map((icon, idx) => (
                                                            <img key={idx} src={icon} alt="" />
                                                        ))
                                                    ) : (
                                                        <img src={item.companyIcon} alt="" />
                                                    )}
                                                </div>

                                                {item.description.map((desc, idx) => (
                                                    <React.Fragment key={idx}>
                                                        <p>{desc}</p>
                                                        {idx < item.description.length - 1 && (
                                                            <span className="plus">+</span>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                            <div className="select-bottom">이용권 선택</div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
            <div className="footer-line"></div>
        </div>
    );
};

export default Subscription;

