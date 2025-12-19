import { useParams } from 'react-router-dom';
import { useTvSeriesStore } from '../../store/useTvSeriesStore';
import { useEffect, useState } from 'react';
import VideoPopup from '../../components/Drama/VideoPopup';
const DramaList = () => {
  const { id } = useParams<{ id: string }>();

  const {
    tvDetail,
    episodes,
    videos,
    onFetchTvDetail,
    onFetchTvVideos,
    onFetchSeasons,
    onFetchEpisodes,
  } = useTvSeriesStore();

  const [showPopup, setShowPopup] = useState(false);
  const [youtubeKey, setYoutubeKey] = useState('');

  useEffect(() => {
    if (!id) return;
    onFetchTvDetail(id);
    onFetchSeasons(id);
    onFetchEpisodes(id, 1);
    onFetchTvVideos(id);
  }, [id, onFetchTvDetail, onFetchSeasons, onFetchEpisodes, onFetchTvVideos]);

  const handleVideoOpen = () => {
    const trailer = videos.find((v) => v.type === 'Trailer' && v.site === 'YouTube');

    if (!trailer) return;

    setYoutubeKey(trailer.key);
    setShowPopup(true);
  };

  useEffect(() => {
    console.log('티비 디테일', tvDetail);
  }, [tvDetail]);

  if (!tvDetail) {
    return <p>tv 정보 불러오는 중</p>;
  }

  return (
    <section className="dramaList-wrap">
      <h2>{tvDetail.name}</h2>
      <ul className="episodes-list">
        {episodes.map((ep) => (
          <li key={ep.id}>
            <div>
              <button onClick={handleVideoOpen}>
                <img src={`https://image.tmdb.org/t/p/w500${ep.still_path}`} />
              </button>
            </div>
            <div className="episode-title">
              <h3>
                {ep.episode_number}. {ep.name}
              </h3>
              <p>{ep.overview}</p>
              <p>
                {ep.air_date} | {ep.runtime}분
              </p>
            </div>
          </li>
        ))}
      </ul>
      {showPopup && <VideoPopup youtubeKey={youtubeKey} onClose={() => setShowPopup(false)} />}
    </section>
  );
};

export default DramaList;
