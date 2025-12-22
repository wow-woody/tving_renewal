// import { Link, useLocation } from 'react-router-dom';
// import './scss/SubscriptionPayment.scss';
// import React from 'react';
// import { useAuthStore } from '../store/useAuthStore';
// import { useUserStore } from '../store/useUserStore';

// const SubscriptionPayment = () => {
//     const location = useLocation();
//     const { item, section } = location.state as {
//         item: typeof location.state.item;
//         section: { logos: string[]; name: string };
//     };

//     const { user } = useAuthStore();
//     const { saveSubscription, profileId } = useUserStore();

//     const handleSave = async () => {
//         if (!user?.uid || !profileId) return;

//         await saveSubscription(user.uid, profileId, {
//             name: section.name,
//             item,
//             logos: section.logos,
//             features: [], // 필요하면 실제 기능 리스트 넣기
//             startedAt: new Date().toISOString(),
//             expiresAt: oneYearLater.toISOString(),
//         });
//     };

//     // 날짜 포맷 함수
//     const formatDate = (date: Date): string => {
//         const y = date.getFullYear();
//         const m = String(date.getMonth() + 1).padStart(2, '0');
//         const d = String(date.getDate()).padStart(2, '0');

//         return `${y}.${m}.${d}`;
//     };

//     // 오늘
//     const today = new Date();

//     // 1년 뒤
//     const oneYearLater = new Date(today);
//     oneYearLater.setFullYear(today.getFullYear() + 1);

//     return (
//         <div className="subscription-payment-wrappers">
//             <div className="top">
//                 <Link to="/">
//                     <img src="/images/tving-logo-main.svg" alt="logo" />
//                 </Link>
//             </div>
//             <div className="subscription-payment-wrap">
//                 <div className="title-wrap">
//                     <h2>정상적으로 결제되었습니다</h2>
//                 </div>

//                 <div className="complete">
//                     <div className="complete-title">
//                         <h2>
//                             {section.logos.map((logo, idx) => (
//                                 <React.Fragment key={idx}>
//                                     <img
//                                         src={logo}
//                                         alt=""
//                                         className={logo.includes('diseny') ? 'disney-logo' : ''}
//                                     />
//                                     {idx < section.logos.length - 1 && <span> X </span>}
//                                 </React.Fragment>
//                             ))}
//                             {section.name.replace(/.* /, '')}
//                         </h2>
//                     </div>

//                     <div className="complete-info">
//                         <div className="complete-top">
//                             <p className="title">{item.name}</p>
//                             <div className="price-wrap">
//                                 <p className="price">월 {item.price.discount.toLocaleString()}원</p>
//                                 {item.price.original && (
//                                     <p className="cost">{item.price.original.toLocaleString()}원</p>
//                                 )}
//                             </div>
//                         </div>
//                         <div className="complete-middle">
//                             <div className="icon-wrap">
//                                 {Array.isArray(item.companyIcon) ? (
//                                     (item.companyIcon as string[]).map((icon, idx: number) => (
//                                         <img key={idx} src={icon} alt="" />
//                                     ))
//                                 ) : (
//                                     <img src={item.companyIcon} alt="" />
//                                 )}
//                             </div>
//                             <div className="info">
//                                 <div className="period">
//                                     <h4>구독기간</h4>
//                                     <p>
//                                         {formatDate(today)} ~ {formatDate(oneYearLater)}
//                                     </p>
//                                 </div>
//                                 <div className="amount">
//                                     <h4>결제금액</h4>
//                                     <p>
//                                         월 {item.price.discount.toLocaleString()}원
//                                         <span>(월 정기결제)</span>
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="complete-bottom">구독 완료!</div>
//                     </div>
//                 </div>

//                 <Link to="/" className="back-home">
//                     <div onClick={handleSave}>홈</div>
//                 </Link>
//             </div>

//             <div className="footer-line"></div>
//         </div>
//     );
// };

// export default SubscriptionPayment;

import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './scss/SubscriptionPayment.scss';

import { subscriptionData } from '../data/SubscriptionData';
import { useSubscriptionStore } from '../store/useSubscriptionStore';
import { useUserStore } from '../store/useUserStore';
import { useAuthStore } from '../store/useAuthStore';

const SubscriptionPayment = () => {
    // ===== store =====
    const selectedItemId = useSubscriptionStore((s) => s.selectedItemId);
    const resetSelectedItem = useSubscriptionStore((s) => s.reset);

    const { profileId, saveSubscription } = useUserStore();
    const uid = useAuthStore((s) => s.uid);

    // ===== 선택된 이용권 찾기 =====
    const selectedItem = subscriptionData.sections
        .flatMap((section) => section.items)
        .find((item) => item.id === selectedItemId);

    // 🚨 방어: 잘못된 접근
    if (!selectedItem || !uid || !profileId) {
        return <Navigate to="/subscription" replace />;
    }

    // ===== 날짜 =====
    const formatDate = (date: Date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}.${m}.${d}`;
    };

    const today = new Date();
    const oneYearLater = new Date(today);
    oneYearLater.setFullYear(today.getFullYear() + 1);

    // ===== 결제 완료 → Firestore 저장 =====
    useEffect(() => {
        saveSubscription(uid, profileId, {
            id: selectedItem.id,
            name: selectedItem.name,
            grade: selectedItem.grade,
            companies: selectedItem.companies,
            price: selectedItem.price.discount,
            description: selectedItem.description,
            subscribedAt: new Date(),
        });

        // 다음 결제를 대비해 선택 초기화
        resetSelectedItem();
    }, []);

    return (
        <div className="subscription-payment-wrappers">
            <div className="top">
                <Link to="/">
                    <img src="/images/tving-logo-main.svg" alt="logo" />
                </Link>
            </div>

            <div className="subscription-payment-wrap">
                <div className="title-wrap">
                    <h2>정상적으로 결제되었습니다</h2>
                </div>

                <div className="complete">
                    <div className="complete-title">
                        <h2>{selectedItem.name}</h2>
                    </div>

                    <div className="complete-info">
                        <div className="complete-top">
                            <p className="title">{selectedItem.name}</p>
                            <div className="price-wrap">
                                <p className="price">
                                    월 {selectedItem.price.discount.toLocaleString()}원
                                </p>
                            </div>
                        </div>

                        <div className="complete-middle">
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

                        <div className="complete-bottom">구독 완료!</div>
                    </div>
                </div>

                <Link to="/mypage" className="back-home">
                    <div>마이페이지로</div>
                </Link>
            </div>

            <div className="footer-line"></div>
        </div>
    );
};

export default SubscriptionPayment;
