import { useParams } from 'react-router-dom';
import { useTvSeriesStore } from '../../store/useTvSeriesStore';
import { useEffect, useState } from 'react';

const DramaList = () => {
  const { id } = useParams<{ id: String }>();
  const { tvs, onFetchTvs, onFetchVideo, onFetchSeasons, onFetchEpisodes } = useTvSeriesStore();

  const [showPopup, setShowPopup] = useState(false);
  const [youtubeKey, setYoutubeKey] = useState('');

  const handleVideoOpen = async () => {
    if (!id) return;
    const videoList = await onFetchVideo(id);
    const trailer = videoList.find((v) => v.type === 'Trailer' && v.site === 'YouTube');

    if (trailer) {
      setYoutubeKey(trailer.key);
      setShowPopup(true);
      return;
    }
  };

  useEffect(() => {
    if (tvs.length === 0) {
      onFetchTvs();
    }
    if (id) {
      onFetchSeasons(id);
      onFetchEpisodes(id, 1);
    }
  }, [tvs, onFetchTvs]);

  const tv = tvs.find((t) => t.id === Number(id));
  if (!tv) {
    return <p>tv 정보 불러오는 중</p>;
  }
  console.log('찾은 tv', tv);

  return <div>DramaList</div>;
};

export default DramaList;
