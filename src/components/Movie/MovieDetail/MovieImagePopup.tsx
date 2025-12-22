import './scss/MovieImagePopup.scss';

interface MovieImagePopupProps {
  imagePath: string;
  onClose: () => void;
}

const MovieImagePopup = ({ imagePath, onClose }: MovieImagePopupProps) => {
  return (
    <div className="youtube-modal__backdrop" onClick={onClose}>
      <div className="youtube-modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="youtube-modal__close" onClick={onClose}>
          ✕
        </button>
        <div className="youtube-modal__video-box">
          <img
            src={`https://image.tmdb.org/t/p/original${imagePath}`}
            alt="Movie backdrop"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieImagePopup;
