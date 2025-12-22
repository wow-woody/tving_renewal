import './scss/VideoPlay.scss';

interface VideoPlayProps {
  youtubeKey: string;
  onClose: () => void;
}

const VideoPlay = ({ youtubeKey, onClose }: VideoPlayProps) => {
  return (
    <div className="video-play-overlay" onClick={onClose}>
      <div className="video-play-content" onClick={(e) => e.stopPropagation()}>
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

export default VideoPlay;
