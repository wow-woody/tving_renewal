import React, { useState } from 'react';
import './scss/SubscriptionCheck.scss';
import { Link, Navigate } from 'react-router-dom';
import { subscriptionData } from '../data/SubscriptionData';
import { useSubscriptionStore } from '../store/useSubscriptionStore';

const SubscriptionCheck = () => {
    const selectedItemId = useSubscriptionStore((s) => s.selectedItemId);

    const selectedItem = subscriptionData.sections
        .flatMap((section) => section.items.map((item) => ({ ...item, section })))
        .find((x) => x.id === selectedItemId);

    // 🚨 선택 없이 접근 차단
    if (!selectedItem) {
        return <Navigate to="/subscription" replace />;
    }

    // 날짜 포맷
    const formatDate = (date: Date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}.${m}.${d}`;
    };

    const today = new Date();
    const oneYearLater = new Date(today);
    oneYearLater.setFullYear(today.getFullYear() + 1);

    // 결제수단 선택
    const [selectedPay, setSelectedPay] = useState<number | null>(null);

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
                            {selectedItem.section.services.map((service, idx) => (
                                <React.Fragment key={service}>
                                    <img
                                        src={
                                            service === 'TVING'
                                                ? '/images/tving-logo-main.svg'
                                                : service === 'WAVVE'
                                                ? '/images/wave-logo.svg'
                                                : '/images/diseny-logo.svg'
                                        }
                                        alt={service}
                                        className={service === 'DISNEY' ? 'disney-logo' : ''}
                                    />
                                    {idx < selectedItem.section.services.length - 1 && (
                                        <span className="multiply"> X </span>
                                    )}
                                </React.Fragment>
                            ))}
                            이용권
                        </h2>
                    </div>

                    <div className="subscription-info">
                        <div className="info-top">
                            <p className="title">{selectedItem.name}</p>
                            <div className="price-wrap">
                                <p className="price">
                                    월 {selectedItem.price.discount.toLocaleString()}원
                                </p>
                                {selectedItem.price.original && (
                                    <p className="cost">
                                        {selectedItem.price.original.toLocaleString()}원
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="info-middle">
                            <div className="icon-wrap">
                                {Array.isArray(selectedItem.companyIcon) ? (
                                    selectedItem.companyIcon.map((icon) => (
                                        <img key={icon} src={icon} alt="" />
                                    ))
                                ) : (
                                    <img src={selectedItem.companyIcon} alt="" />
                                )}
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
                                        월 {selectedItem.price.discount.toLocaleString()}원
                                        <span>(월 정기결제)</span>
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
                        {['kakao', 'naver', 'toss', 'card'].map((pay, idx) => (
                            <button
                                key={pay}
                                className={`item ${selectedPay === idx ? 'active' : ''}`}
                                onClick={() => setSelectedPay(idx)}
                            >
                                <img src={`/images/${pay}-pay.svg`} alt={pay} />
                                {pay === 'card' && <span>신용카드</span>}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="button-wrap">
                    <Link to="/subscription/payment">
                        <div className="do">이용권 구독하기</div>
                    </Link>
                    <Link to="/subscription">
                        <div className="back">뒤로가기</div>
                    </Link>
                </div>
            </div>

            <div className="footer-line"></div>
        </div>
    );
};

export default SubscriptionCheck;
