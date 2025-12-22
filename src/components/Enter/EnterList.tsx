import { useParams } from 'react-router-dom';
import { useTvSeriesStore } from '../../store/useTvSeriesStore';
import { useEffect, useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import './scss/EnterList.scss';
import VideoPlay from '../Drama/VideoPlay';

const EnterList = () => {
  const { id } = useParams<{ id: string }>();

  const {
    enterDetail,
    episodes,
    videos,
    onFetchEnterDetail,
    onFetchSeasons,
    onFetchEpisodes,
    onFetchTvVideos,
  } = useTvSeriesStore();

  const [showPopup, setShowPopup] = useState(false);
  const [youtubeKey, setYoutubeKey] = useState('');

  const swiperRef = useRef<SwiperType | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!id) return;
    onFetchEnterDetail(id);
    onFetchSeasons(id);
    onFetchEpisodes(id, 1);
    onFetchTvVideos(id);
  }, [id]);

  const handleVideoOpen = () => {
    const trailer = videos.find((v) => v.type === 'Trailer' && v.site === 'YouTube');
    if (!trailer) return;

    setYoutubeKey(trailer.key);
    setShowPopup(true);
  };

  if (!enterDetail) return <p>예능 정보 불러오는 중</p>;

  return (
    <section className="enterList-wrap">
      <h2>{enterDetail.name}</h2>

      {/* ▶ 에피소드 Swiper */}
      <div className="episode-swiper">
        <button ref={prevRef} className="nav-btn prev">
          ‹
        </button>
        <button ref={nextRef} className="nav-btn next">
          ›
        </button>

        <Swiper
          modules={[Navigation]}
          slidesPerView={3.8}
          spaceBetween={16}
          navigation
          onBeforeInit={(swiper) => {
            // @ts-expect-error HTMLElement OK
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-expect-error HTMLElement OK
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          onSwiper={(s) => (swiperRef.current = s)}>
          {episodes.map((ep) => (
            <SwiperSlide key={ep.id}>
              <div className="episode-card">
                <button className="thumb" onClick={handleVideoOpen}>
                  <img src={`https://image.tmdb.org/t/p/w500${ep.still_path}`} alt={ep.name} />
                </button>

                <div className="episode-title">
                  <h3>
                    {ep.episode_number}. {ep.name}
                  </h3>
                  <p>{ep.overview}</p>
                  <p>
                    {ep.air_date} · {ep.runtime ? `${ep.runtime}분` : ''}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {showPopup && <VideoPlay youtubeKey={youtubeKey} onClose={() => setShowPopup(false)} />}
    </section>
  );
};

export default EnterList;
