import styles from './scss/Popup2.module.scss';
import { createPortal } from 'react-dom';

interface PopupProps {
  onClose: () => void;
  onAgree: () => void;
}

const Popup2 = ({ onClose, onAgree }: PopupProps) => {
  return createPortal(
    <div className={styles['popup-bg']}>
      <div className={styles['popup-wrap']}>
        <div className={styles['popup-box']}>
          <h2 className={styles['title']}>[필수] 개인정보 수집 및 이용 동의</h2>
          <div className={styles['content']}>
            <table>
              <thead>
                <tr>
                  <td>수집/이용 목적</td>
                  <td>수집 항목</td>
                  <td>보유 및 이용기간</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    TVING ID 회원 가입
                    <br />및 회원관리
                  </td>
                  <td>
                    [회원가입 시]
                    <br />
                    TVING ID, 이메일 주소, 비밀번호, 휴대폰 번호
                    <br />
                    [추가정보 입력 시]
                    <br />
                    이름
                  </td>
                  <td className="bold">회원탈퇴 후 5일까지</td>
                </tr>
                <tr>
                  <td>
                    SNS ID 회원 가입
                    <br />및 회원관리
                  </td>
                  <td>
                    Naver : 이름, 이메일 주소, 성별, 출생연도, 휴대폰 번호
                    <br />
                    Kakao : 이름, 이메일 주소, 닉네임, 휴대폰 번호
                    <br />
                    Facebook : 이름, 이메일 주소, 프로필 사진, 휴대폰 번호
                    <br />
                    Twitter : 이름, 이메일 주소, 휴대폰 번호
                    <br />
                    Apple : 이름, 이메일 주소, 휴대폰 번호
                  </td>
                  <td className="bold">회원탈퇴 후 5일까지</td>
                </tr>
                <tr>
                  <td>CJ ONE 통합회원 가입 및 회원관리</td>
                  <td>
                    CJ ONE ID, CJ ONE 회원번호, 비밀번호, 이름, 영어이름, CI, 성별, 휴대폰 번호,
                    이메일 주소, 생년월일
                  </td>
                  <td className="bold">회원탈퇴 후 5일까지</td>
                </tr>
                <tr>
                  <td>
                    사용자 인증을 통한
                    <br />
                    본인 및 연령 확인,
                    <br />
                    사용자 인증에 따른
                    <br />
                    서비스 제공 및 응대
                  </td>
                  <td>이름, CI, DI, 생년월일, 성별, 휴대폰 번호</td>
                  <td className="bold">회원탈퇴 후 5일까지</td>
                </tr>
                <tr>
                  <td>만 14세 미만 회원가입 법정대리인 동의</td>
                  <td>ID, 요청일시, 법정대리인의 성인여부, 법정대리인의 인증일시</td>
                  <td className="bold">회원탈퇴 후 5일까지</td>
                </tr>
                <tr>
                  <td>상품 구매 환불</td>
                  <td>이름, 휴대폰 번호, 계좌주명, 계좌번호, 요금청구 및 결제 기록</td>
                  <td className="bold">상품 구매 및 환불 후 5년까지</td>
                </tr>
                <tr>
                  <td>
                    서비스 개선 및 안정화, 서비스 부정 이용 방지, 서비스 분석 및 통계, 최적화/추천
                    컨텐츠 및 서비스 제공
                  </td>
                  <td>이름, ID, 이메일 주소, 서비스 이용기록, 생년월일, 기기정보</td>
                  <td className="bold">회원탈퇴 후 5일까지</td>
                </tr>
                <tr>
                  <td>
                    고객 문의 및 응대
                    <br />
                    (웹/앱 게시판 및 고객센터)
                  </td>
                  <td>이름, ID, 이메일 주소, 휴대폰 번호, 서비스 이용기록, 기기정보</td>
                  <td className="bold">접수 후 3년까지</td>
                </tr>
                <tr>
                  <td>제휴/광고/입점 문의 및 응대</td>
                  <td>
                    이름, 회사명, 이메일 주소, 휴대폰 번호
                    <br />
                    [추가정보 입력 시]
                    <br />
                    대표 전화번호
                  </td>
                  <td className="bold">접수 후 3년까지</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles['button-wrap']}>
            <button onClick={onAgree}>동의합니다</button>
            <button onClick={onClose}>동의하지 않습니다.</button>
          </div>
          <button className={styles['close']} onClick={onClose}>
            <img src="/images/cancle-white-icon.svg" alt="cancle" />
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default Popup2;
