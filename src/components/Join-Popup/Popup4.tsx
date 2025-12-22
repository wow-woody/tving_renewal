import styles from '../Join-Popup/scss/Popup4.module.scss';
import { createPortal } from 'react-dom';

interface PopupProps {
  onClose: () => void;
  onAgree: () => void;
}

const Popup4 = ({ onClose, onAgree }: PopupProps) => {
  return createPortal(
    <div className={styles['popup-bg']}>
      <div className={styles['popup-wrap']}>
        <div className={styles['popup-box']}>
          <h2 className={styles['title']}>[선택] 개인정보 수집 및 이용 동의 안내</h2>
          <div className={styles['content']}>
            <p>
              티빙은 회원님이 동의하신 개인정보를 이용하여 푸시알림, SMS(MMS), 이메일를 통해 서비스
              이벤트 및 업데이트, 마케팅 정보, 고객 맞춤 서비스 정보를 전송할 수 있습니다.
            </p>
            <br />
            <p>
              본 동의는 거부하실 수 있으나, 거부 시 이벤트 및 프로모션 안내, 유용한 정보를 받아보실
              수 없습니다.
            </p>
            <br />
            <p>
              광고성정보수신의 변경은 "MY &gt; 회원정보 수정 &gt; 마케팅 정보 수신 동의" 에서
              언제든지 변경할 수 있습니다.
            </p>
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

export default Popup4;
