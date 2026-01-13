import React from 'react';
import './YoutubeModal.scss';

interface YoutubeModalProps {
  videoId: string;
  onClose: () => void;
}

const YoutubeModal: React.FC<YoutubeModalProps> = ({ videoId, onClose }) => {
  return (
    <div className="youtube-modal__backdrop" onClick={onClose}>
      <div className="youtube-modal__content" onClick={e => e.stopPropagation()}>
        <button className="youtube-modal__close" onClick={onClose}>×</button>
        <div className="youtube-modal__video-box">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&fs=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default YoutubeModal;
