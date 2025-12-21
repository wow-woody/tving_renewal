import './scss/DramaVPopup.scss';

interface VideoPopupProps {
  youtubeKey: string;
  onClose: () => void;
}

const DramaVPopup = ({ youtubeKey, onClose }: VideoPopupProps) => {
  return (
    <div className="video-popup-overlay" onClick={onClose}>
      <div className="video-popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        <div className="video-container">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default DramaVPopup;
