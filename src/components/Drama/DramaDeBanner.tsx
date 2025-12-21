import { useEffect, useState } from 'react';
import { useTvSeriesStore } from '../../store/useTvSeriesStore';
import { useParams } from 'react-router-dom';
import './scss/DramaDeBanner.scss';

const DramaDeBanner = () => {
  const { id } = useParams<{ id: string }>();
  const { tvDetail, videos, onFetchTvDetail, onFetchTvVideos } = useTvSeriesStore();
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

  return (
    <>
      <div className="detail-banner">
        <div
          className="hero-bg"
          style={{
            backgroundImage: `url(${backdropUrl})`,
          }}>
          {playVideo && trailer && (
            <iframe
              className="hero-video"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`}
              allow="autoplay; fullscreen"
              allowFullScreen></iframe>
          )}
        </div>
        <div className="detail-left">
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
          <div>
            {tvDetail.directors?.length > 0 && (
              <p>
                <strong>연출</strong> {tvDetail.directors.join(', ')}
              </p>
            )}
            {tvDetail.casts?.length > 0 && (
              <p>
                <strong>출연</strong> {tvDetail.casts.join(', ')}
              </p>
            )}
          </div>
          <div className="detail-btn">
            <div onClick={() => setPlayVideo(true)}>play</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DramaDeBanner;
