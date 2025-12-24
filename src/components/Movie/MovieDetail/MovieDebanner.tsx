import { useEffect, useState } from 'react';
import { useMovieStore } from '../../../store/useMoviesStore';
import { useHeartStore } from '../../../store/useHeartStore';
import { useWatchHistoryStore } from '../../../store/useWatchHistoryStore';
import type { HeartItem, Video } from '../../../type/contents';
import { useParams } from 'react-router-dom';
import './scss/MovieDebanner.scss';

const MovieDebanner = () => {
  const { id } = useParams<{ id: string }>();
  const { movieDetail, videos, onFetchMovieDetail, onFetchVideo } = useMovieStore();
  const { onToggleHeart, hearts } = useHeartStore();
  const [playVideo, setPlayVideo] = useState(false);
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
  const { onAddWatchHistory } = useWatchHistoryStore();

  useEffect(() => {
    if (id) {
      onFetchMovieDetail(id);
      onFetchVideo(id);
    }
  }, [id, onFetchMovieDetail, onFetchVideo]);

  useEffect(() => {
    if (!playVideo) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPlayVideo(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [playVideo]);

  if (!movieDetail) return <div>로딩중...</div>;

  const trailer: Video | undefined = videos.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  );

  const backdropUrl = movieDetail.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`
    : movieDetail.poster_path
    ? `https://image.tmdb.org/t/p/original${movieDetail.poster_path}`
    : '';

  const isHearted: boolean = hearts.some((h: HeartItem) => h.id === movieDetail.id);

  const handleHeartClick = async (): Promise<void> => {
    try {
      const heartItem: HeartItem = {
        id: movieDetail.id,
        name: movieDetail.title,
        poster_path: movieDetail.poster_path,
        backdrop_path: movieDetail.backdrop_path || '',
        overview: movieDetail.overview || '',
        vote_average: movieDetail.vote_average || 0,
        adult: movieDetail.adult || false,
        cAge: movieDetail.cAge?.toString() || '',
        logo: movieDetail.logo || '',
        media_type: 'movie' as const,
      };
      await onToggleHeart(heartItem);
    } catch (error) {
      console.error('찜하기 오류:', error);
    }
  };

  return (
    <>
      <div className="movie-detail-banner">
        <div
          className="hero-bg"
          style={{
            backgroundImage: `url(${backdropUrl})`,
          }}></div>
        <div className="M-detail-left">
          <div className="detail-title">
            {movieDetail.logo ? (
              <img
                src={`https://image.tmdb.org/t/p/original${movieDetail.logo}`}
                alt={movieDetail.title}
              />
            ) : (
              <h1>{movieDetail.title}</h1>
            )}
          </div>
          <div className="detail-info">
            {movieDetail.cAge && movieDetail.cAge !== 'none' && (
              <p className="age">{movieDetail.cAge}</p>
            )}
            {movieDetail.genreNames && movieDetail.genreNames.length > 0 && (
              <p>{movieDetail.genreNames.join(' · ')}</p>
            )}
            {movieDetail.release_date && <p>{movieDetail.release_date}</p>}
            {movieDetail.runtime && <p>{movieDetail.runtime}분</p>}
          </div>
          <div className="detail-overview">
            <p className={isOverviewExpanded ? 'expanded' : 'clamped'}>{movieDetail.overview}</p>
            {movieDetail.overview && movieDetail.overview.length > 100 && (
              <button
                className="btn-more"
                onClick={() => setIsOverviewExpanded(!isOverviewExpanded)}>
                {isOverviewExpanded ? '접기' : '더보기'}
              </button>
            )}
          </div>
          <div className="detail-people">
            <div className="directors">
              {movieDetail.directors && movieDetail.directors.length > 0 && (
                <>
                  <p>감독</p>
                  <p>{movieDetail.directors.join(', ')}</p>
                </>
              )}
            </div>
            <div className="casts">
              {movieDetail.casts && movieDetail.casts.length > 0 && (
                <>
                  <p>출연</p>
                  <p>{movieDetail.casts.join(', ')}</p>
                </>
              )}
            </div>
          </div>
          <div className="detail-btn">
            <button
              className="btn-play"
              onClick={async () => {
                if (movieDetail) {
                  try {
                    await onAddWatchHistory({
                      ...movieDetail,
                      media_type: 'movie',
                    });
                  } catch (e) {
                    // 기록 저장 실패해도 영상 재생은 계속
                    console.error('시청 기록 저장 실패', e);
                  }
                }
                setPlayVideo(true);
              }}>
              <img src="/images/detail-play-btn.png" alt="재생" />
            </button>
            <button
              className={`btn-heart ${isHearted ? 'hearted' : ''}`}
              onClick={handleHeartClick}>
              <img src="/images/detail-hreat-btn.png" alt="찜하기" />
            </button>
            <button className="btn-share">
              <img src="/images/detail-share-btn.png" alt="공유" />
            </button>
          </div>
        </div>
      </div>
      {playVideo && trailer && (
        <div className="movie-video-modal">
          <button className="modal-close" onClick={() => setPlayVideo(false)}>
            ✕
          </button>

          <iframe
            className="modal-video"
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=0&controls=1`}
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      )}
    </>
  );
};

export default MovieDebanner;
