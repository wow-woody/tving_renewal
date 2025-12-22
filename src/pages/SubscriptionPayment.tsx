import { Link } from 'react-router-dom';
import './scss/SubscriptionPayment.scss';

const SubscriptionPayment = () => {
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
            <h2>
              <img src="/images/tving-logo-main.svg" alt="tving" />
              <span>X</span>
              <img className="disney-logo" src="/images/diseny-logo.svg" alt="disney" />
              <span>X</span>
              <img src="/images/wave-logo.svg" alt="wave" />
              이용권
            </h2>
          </div>

          <div className="complete-info">
            <div className="complete-top">
              <p className="title">광고형 스탠다드</p>
              <div className="price-wrap">
                <p className="price">월 5,500원</p>
                <p className="cost">ddd</p>
              </div>
            </div>
            <div className="complete-middle">
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
            <div className="complete-bottom">구독 완료!</div>
          </div>
        </div>

        <Link to="/" className="back-home">
          <div>홈</div>
        </Link>
      </div>

      <div className="footer-line"></div>
    </div>
  );
};

export default SubscriptionPayment;
