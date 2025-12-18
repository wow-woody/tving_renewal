import React, { useState } from 'react';
import './scss/SubscriptionCheck.scss';
import { Link } from 'react-router-dom';

const SubscriptionCheck = () => {
    // 날짜 포맷 함수
    const formatDate = (date: Date): string => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');

        return `${y}.${m}.${d}`;
    };

    // 오늘
    const today = new Date();

    // 1년 뒤
    const oneYearLater = new Date(today);
    oneYearLater.setFullYear(today.getFullYear() + 1);

    //------------ 결제수단 선택 ------------
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <div className="subscription-ckeck-wrappers">
            <div className="top">
                <Link to="/">
                    <img src="/images/tving-logo-main.svg" alt="logo" />
                </Link>
            </div>

            <div className="subscription-ckeck-wrap">
                <div className="title-wrap">
                    <h2>결제정보를 입력해주세요</h2>
                    <p>정기결제에 사용할 결제 정보를 입력해주세요.</p>
                </div>

                <div className="check">
                    <div className="subscription-title">
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

                    <div className="subscription-info">
                        <div className="info-top">
                            <p className="title">광고형 스탠다드</p>
                            <div className="price-wrap">
                                <p className="price">월 5,500원</p>
                                <p className="cost">ddd</p>
                            </div>
                        </div>
                        <div className="info-middle">
                            <div className="icon-wrap">
                                <img src="/images/tving-icon.svg" alt="" />
                                <img src="/images/wave-icon.svg" alt="" />
                                <img src="/images/diseny-icon.svg" alt="" />
                            </div>
                            <div className="info">
                                <div className="period">
                                    <h4>구독기간</h4>
                                    <p>
                                        {formatDate(today)} ~ {formatDate(oneYearLater)}
                                    </p>
                                </div>
                                <div className="amount">
                                    <h4>결제금액</h4>
                                    <p>
                                        5000원 &nbsp;&nbsp;<span>(월 정기결제)</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="info-bottom">반드시 구독 정보를 확인하세요!</div>
                    </div>
                </div>

                <div className="select-payment">
                    <div className="payment-title">결제수단 선택</div>
                    <div className="payment-type">
                        <button
                            className={`item ${selected === 0 ? 'active' : ''}`}
                            onClick={() => setSelected(0)}
                        >
                            <img src="/images/kakao-pay.svg" alt="kakao-pay" />
                        </button>
                        <button
                            className={`item ${selected === 1 ? 'active' : ''}`}
                            onClick={() => setSelected(1)}
                        >
                            <img src="/images/naver-pay.svg" alt="naver-pay" />
                        </button>
                        <button
                            className={`item ${selected === 2 ? 'active' : ''}`}
                            onClick={() => setSelected(2)}
                        >
                            <img src="/images/toss-pay.svg" alt="toss-pay" />
                        </button>
                        <button
                            className={`item ${selected === 3 ? 'active' : ''}`}
                            onClick={() => setSelected(3)}
                        >
                            <img src="/images/card-icon.svg" alt="card" />
                            신용카드
                        </button>
                    </div>
                </div>

                <div className="button-wrap">
                    <Link to="/subscription/payment">
                        <div className="do">이용권 구독하기</div>
                    </Link>
                    <Link to="">
                        <div className="back">뒤로가기</div>
                    </Link>
                </div>
            </div>

            <div className="footer-line"></div>
        </div>
    );
};

export default SubscriptionCheck;
