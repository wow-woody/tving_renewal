import './AlertModal.scss';

interface AlertModalProps {
  title?: string;
  message: string;
  onClose: () => void;
  type?: 'success' | 'error' | 'info';
}

const AlertModal = ({ title, message, onClose, type = 'info' }: AlertModalProps) => {
  return (
    <div className="alert-modal-overlay" onClick={onClose}>
      <div className="alert-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="alert-modal-header">
          {type === 'success' && (
            <svg className="icon success-icon" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {type === 'error' && (
            <svg className="icon error-icon" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
          {type === 'info' && (
            <img src="/images/tving-logo-main.svg" alt="TVING" className="tving-logo-icon" />
          )}
          {title && <h3>{title}</h3>}
        </div>
        <div className="alert-modal-body">
          <p>{message}</p>
        </div>
        <div className="alert-modal-footer">
          <button className="confirm-button" onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
