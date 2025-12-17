import { useEffect } from 'react';
import { useTvSeriesStore } from '../store/useTvSeriesStore';

const Drama = () => {
  const { onFetchTvs, onFetchKoTvs, onFetchOnAir, onFetchOnAirKo } = useTvSeriesStore();

  useEffect(() => {
    onFetchTvs();
    onFetchKoTvs();
    onFetchOnAir();
    onFetchOnAirKo();
  }, [onFetchTvs, onFetchKoTvs, onFetchOnAir, onFetchOnAirKo]);
  return <div>드라마</div>;
};

export default Drama;
