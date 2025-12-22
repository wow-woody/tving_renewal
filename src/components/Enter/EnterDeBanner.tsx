import { useEffect, useState } from 'react';
import { useTvSeriesStore } from '../../store/useTvSeriesStore';
import { useParams } from 'react-router-dom';
import './scss/EnterDeBanner.scss';

const EnterDeBanner = () => {
  const { id } = useParams<{ id: string }>();
  const { enterDetail, videos, onFetchEnterDetail, onFetchTvVideos } = useTvSeriesStore();
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    if (id) {
      onFetchTvVideos(id);
      onFetchEnterDetail(id);
    }
  }, [id, onFetchTvVideos, onFetchEnterDetail]);

  if (!enterDetail) return <div>로딩중...</div>;

  const trailer = videos.find((v) => v.type === 'Trailer' && v.site === 'YouTube');

  const backdropUrl = enterDetail.backdrop
    ? `https://image.tmdb.org/t/p/original${enterDetail.backdrop}`
    : enterDetail.poster_path
    ? `https://image.tmdb.org/t/p/original${enterDetail.poster_path}`
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
            {enterDetail.logo ? (
              <img
                src={`https://image.tmdb.org/t/p/original${enterDetail.logo}`}
                alt={enterDetail.name}
              />
            ) : (
              <h1>{enterDetail.name}</h1>
            )}
          </div>
          <div className="detail-info">
            <p className="age">{enterDetail.age}세</p>
            <p>{enterDetail.genreNames.join(' · ')}</p>
            <p>{enterDetail.networks.map((n) => n.name).join(', ')}</p>
            <p>{enterDetail.seasonText}</p>
          </div>
          <div className="detail-overview">
            <p>{enterDetail.overview}</p>
          </div>
          <div>
            {enterDetail.directors?.length > 0 && (
              <p>
                <strong>연출</strong> {enterDetail.directors.join(', ')}
              </p>
            )}
            {enterDetail.casts?.length > 0 && (
              <p>
                <strong>출연</strong> {enterDetail.casts.join(', ')}
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

export default EnterDeBanner;
