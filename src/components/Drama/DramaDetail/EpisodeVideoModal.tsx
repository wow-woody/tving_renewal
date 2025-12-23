import React, { useEffect, useCallback } from 'react';

interface EpisodeVideoModalProps {
  videoId: string;
  onClose: () => void;
}

const EpisodeVideoModal: React.FC<EpisodeVideoModalProps> = ({ videoId, onClose }) => {
  // ESC 키로 닫기
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div
      className="episode-video-modal__backdrop"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.7)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-modal="true"
      tabIndex={-1}
      role="dialog"
    >
      <div
        className="episode-video-modal__content"
        onClick={e => e.stopPropagation()}
        style={{
          background: 'transparent',
          borderRadius: 0,
          boxShadow: 'none',
          position: 'relative',
          width: '100vw',
          height: '100vh',
          maxWidth: '100vw',
          maxHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
        }}
      >
        <button
          className="episode-video-modal__close"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 24,
            right: 32,
            fontSize: 40,
            background: 'rgba(0,0,0,0.5)',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            zIndex: 2,
            borderRadius: 24,
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="닫기"
        >
          ×
        </button>
        <div className="episode-video-modal__video-box" style={{ width: '100vw', height: '100vh' }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&fs=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            style={{ width: '100vw', height: '100vh', border: 'none', borderRadius: 0 }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default EpisodeVideoModal;
