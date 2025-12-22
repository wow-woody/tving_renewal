import '../../YoutubeModal.scss';

interface VideoPopupProps {
  youtubeKey: string;
  onClose: () => void;
}

const DramaVPopup = ({ youtubeKey, onClose }: VideoPopupProps) => {
  return (
    <div className="youtube-modal__backdrop" onClick={onClose}>
      <div className="youtube-modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="youtube-modal__close" onClick={onClose}>
          ✕
        </button>
        <div className="youtube-modal__video-box">
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
