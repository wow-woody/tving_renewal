import './LogoutModal.scss';

interface LogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal = ({ onConfirm, onCancel }: LogoutModalProps) => {
  return (
    <div className="logout-modal-overlay" onClick={onCancel}>
      <div className="logout-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="logout-modal-header">
          <img src="/images/tving-logo-main.svg" alt="TVING" className="tving-logo" />
          <h3>로그아웃</h3>
        </div>
        <div className="logout-modal-body">
          <p>로그아웃 하시겠습니까?</p>
        </div>
        <div className="logout-modal-footer">
          <button className="cancel-button" onClick={onCancel}>
            취소
          </button>
          <button className="confirm-button" onClick={onConfirm}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
