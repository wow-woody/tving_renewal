import { useEffect, useState } from 'react';
import { useTvSeriesStore } from '../../../store/useTvSeriesStore';
import { useHeartStore } from '../../../store/useHeartStore';
import type { HeartItem } from '../../../type/contents';
import { useParams } from 'react-router-dom';
import '../scss/DramaDeBanner.scss';

const DramaDeBanner = () => {
  const { id } = useParams<{ id: string }>();
  const { tvDetail, videos, onFetchTvDetail, onFetchTvVideos } = useTvSeriesStore();
  const { onToggleHeart, hearts } = useHeartStore();
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    if (id) {
      onFetchTvVideos(id);
      onFetchTvDetail(id);
    }
  }, [id, onFetchTvVideos, onFetchTvDetail]);

  if (!tvDetail) return <div>로딩중...</div>;

  const trailer = videos.find((v) => v.type === 'Trailer' && v.site === 'YouTube');

  const backdropUrl = tvDetail.backdrop
    ? `https://image.tmdb.org/t/p/original${tvDetail.backdrop}`
    : tvDetail.poster_path
    ? `https://image.tmdb.org/t/p/original${tvDetail.poster_path}`
    : '';

  const isHearted = hearts.some((h: HeartItem) => h.id === tvDetail.id);

  const handleHeartClick = async () => {
    try {
      const heartItem = {
        id: tvDetail.id,
        name: tvDetail.name,
        poster_path: tvDetail.poster_path,
        backdrop_path: tvDetail.backdrop || '',
        overview: tvDetail.overview || '',
        vote_average: tvDetail.vote_average || 0,
        adult: tvDetail.adult || false,
        cAge: tvDetail.age?.toString() || '',
        logo: tvDetail.logo || '',
        media_type: 'tv' as const,
      };
      await onToggleHeart(heartItem);
    } catch (error) {
      console.error('찜하기 오류:', error);
    }
  };

  return (
    <>
      <div className="drama-detail-banner">
        <div
          className="hero-bg"
          style={{
            backgroundImage: `url(${backdropUrl})`,
          }}>
          {playVideo && trailer && (
            <>
              <iframe
                className="hero-video"
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`}
                allow="autoplay; fullscreen"
                allowFullScreen></iframe>
              <div className="hero-overlay" />
            </>
          )}
        </div>
        <div className="D-detail-left">
          <div className="detail-title">
            {tvDetail.logo ? (
              <img
                src={`https://image.tmdb.org/t/p/original${tvDetail.logo}`}
                alt={tvDetail.name}
              />
            ) : (
              <h1>{tvDetail.name}</h1>
            )}
          </div>
          <div className="detail-info">
            <p className="age">{tvDetail.age}세</p>
            <p>{tvDetail.genreNames.join(' · ')}</p>
            <p>{tvDetail.networks.map((n) => n.name).join(', ')}</p>
            <p>{tvDetail.seasonText}</p>
          </div>
          <div className="detail-overview">
            <p>{tvDetail.overview}</p>
          </div>
          <div className="detail-people">
            <div className="directors">
              {tvDetail.directors?.length > 0 && (
                <>
                  <p>연출</p>
                  <p>{tvDetail.directors.join(', ')}</p>
                </>
              )}
            </div>
            <div className="casts">
              {tvDetail.casts?.length > 0 && (
                <>
                  <p>출연</p>
                  <p>{tvDetail.casts.join(', ')}</p>
                </>
              )}
            </div>
          </div>
          <div className="detail-btn">
            <button
              className="btn-play"
              onClick={() => setPlayVideo((prev) => !prev)}
              aria-label={playVideo ? '일시정지' : '재생'}>
              <img src="/images/detail-play-btn.png" alt={playVideo ? '일시정지' : '재생'} />
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
    </>
  );
};

export default DramaDeBanner;
