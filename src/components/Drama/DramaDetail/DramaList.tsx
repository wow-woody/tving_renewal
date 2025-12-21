import { useParams } from 'react-router-dom';
import { useTvSeriesStore } from '../../../store/useTvSeriesStore';
import { useWatchHistoryStore } from '../../../store/useWatchHistoryStore';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import VideoPlay from '../VideoPlay';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import '../scss/DramaList.scss';

const DramaList = () => {
  const { id } = useParams<{ id: string }>();

  const {
    tvDetail,
    episodesBySeason,
    videos,
    onFetchTvDetail,
    onFetchSeasons,
    onFetchEpisodes,
    onFetchTvVideos,
  } = useTvSeriesStore();

  const { onAddWatchHistory } = useWatchHistoryStore();

  const [showPopup, setShowPopup] = useState(false);
  const [youtubeKey, setYoutubeKey] = useState('');
  const [barOffsets, setBarOffsets] = useState<{ [key: number]: number }>({});
  const [showSeasonMenu, setShowSeasonMenu] = useState(false);
  const [selectedSeasonNumber, setSelectedSeasonNumber] = useState<number>(1);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<number | null>(null);

  // 각 시즌마다 독립적인 ref 관리
  const navigationRefs = useRef<{
    [key: number]: {
      swiper: SwiperType | null;
      prev: HTMLButtonElement | null;
      next: HTMLButtonElement | null;
      bar: HTMLDivElement | null;
      track: HTMLDivElement | null;
    };
  }>({});

  // 시즌 섹션 ref
  const seasonSectionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (!id) return;
    onFetchTvDetail(id);
    onFetchSeasons(id);
    // onFetchEpisodes(id, 1);
    onFetchTvVideos(id);
  }, [id]);

  useEffect(() => {
    if (!tvDetail?.seasons || !id) return;

    tvDetail.seasons.forEach((season) => {
      if (season.season_number > 0) {
        onFetchEpisodes(id, season.season_number);
      }
    });
  }, [tvDetail]);

  const initSeasonRefs = (seasonNumber: number) => {
    if (!navigationRefs.current[seasonNumber]) {
      navigationRefs.current[seasonNumber] = {
        swiper: null,
        prev: null,
        next: null,
        bar: null,
        track: null,
      };
    }
  };

  const setSeasonRef = (
    seasonNumber: number,
    key: keyof (typeof navigationRefs.current)[number],
    el: any
  ) => {
    initSeasonRefs(seasonNumber);
    navigationRefs.current[seasonNumber][key] = el;
  };

  const updateBar = (seasonNumber: number, prog: number) => {
    const refs = navigationRefs.current[seasonNumber];
    if (!refs?.track || !refs?.bar) return;

    const track = refs.track.clientWidth;
    const bar = refs.bar.clientWidth;
    const maxLeft = Math.max(track - bar, 0);
    const offset = Math.min(Math.max(prog, 0), 1) * maxLeft;

    setBarOffsets((prev) => ({ ...prev, [seasonNumber]: offset }));
  };

  const handleVideoOpen = (episodeId: number) => {
    // 시청 내역에 추가 (재생 버튼 클릭 시 무조건 추가)
    if (tvDetail) {
      const episode = episodes.find((ep) => ep.id === episodeId);
      onAddWatchHistory({
        id: tvDetail.id,
        name: tvDetail.name,
        poster_path: tvDetail.poster_path,
        backdrop_path: tvDetail.backdrop_path || '',
        overview: tvDetail.overview || '',
        vote_average: tvDetail.vote_average || 0,
        adult: tvDetail.adult || false,
        cAge: tvDetail.cAge || '',
        logo: tvDetail.logo || '',
        media_type: 'tv',
        episodeNumber: episode?.episode_number,
        seasonNumber: selectedSeasonNumber,
      });
    }

    // 트레일러가 있으면 비디오 팝업 표시
    const trailer = videos.find((v) => v.type === 'Trailer' && v.site === 'YouTube');
    if (!trailer) return;

    setSelectedEpisodeId(episodeId);
    setYoutubeKey(trailer.key);
    setShowPopup(true);
  };

  const selectSeason = (seasonNumber: number) => {
    setSelectedSeasonNumber(seasonNumber);
    setShowSeasonMenu(false);
  };

  if (!tvDetail) return <p>tv 정보 불러오는 중</p>;

  // 선택된 시즌 찾기
  const selectedSeason = tvDetail.seasons?.find((s) => s.season_number === selectedSeasonNumber);
  const episodes = selectedSeason ? episodesBySeason[selectedSeasonNumber] || [] : [];

  return (
    <section className="dramaList-wrap">
      {/* 시즌 */}
      {selectedSeason && episodes.length > 0 && (
        <div
          className="season-section"
          style={
            {
              '--enter-progress': `${barOffsets[selectedSeasonNumber] || 0}px`,
            } as CSSProperties
          }>
          <div className="season-header">
            <div className="season-title">
              <h3>
                {tvDetail.name} {selectedSeason.name} (총 {episodes.length}화)
              </h3>
              <button
                className="season-dropdown-btn"
                onClick={() => setShowSeasonMenu(!showSeasonMenu)}>
                ▼
              </button>
              {showSeasonMenu && (
                <div className="season-dropdown-menu">
                  {tvDetail.seasons
                    ?.filter((s) => s.season_number > 0)
                    .map((s) => (
                      <button
                        key={s.id}
                        className={`season-menu-item ${
                          s.season_number === selectedSeasonNumber ? 'active' : ''
                        }`}
                        onClick={() => selectSeason(s.season_number)}>
                        {s.name}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
          <div className="thumb-controls">
            <div
              className="enter-pagination"
              ref={(el) => setSeasonRef(selectedSeasonNumber, 'track', el)}>
              <div className="pagenation-line" />
              <div
                className="pointer-line"
                ref={(el) => setSeasonRef(selectedSeasonNumber, 'bar', el)}
              />
            </div>
            <div className="enter-nav">
              <button
                ref={(el) => setSeasonRef(selectedSeasonNumber, 'prev', el)}
                className="nav-btn prev">
                ‹
              </button>
              <button
                ref={(el) => setSeasonRef(selectedSeasonNumber, 'next', el)}
                className="nav-btn next">
                ›
              </button>
            </div>
          </div>

          <div className="episode-swiper">
            <Swiper
              key={selectedSeasonNumber}
              modules={[Navigation]}
              slidesPerView={3.8}
              spaceBetween={16}
              navigation
              onBeforeInit={(swiper) => {
                const refs = navigationRefs.current[selectedSeasonNumber];
                if (refs) {
                  // @ts-expect-error HTMLElement OK
                  swiper.params.navigation.prevEl = refs.prev;
                  // @ts-expect-error HTMLElement OK
                  swiper.params.navigation.nextEl = refs.next;
                }
              }}
              onSwiper={(s) => {
                setSeasonRef(selectedSeasonNumber, 'swiper', s);
                updateBar(selectedSeasonNumber, 0);
              }}
              onSlideChange={(swiper) => {
                const total = episodes.length;
                const visible = Number(swiper.params.slidesPerView) || 1;
                const maxIndex = Math.max(total - visible, 1);
                updateBar(selectedSeasonNumber, swiper.realIndex / maxIndex);
              }}
              onProgress={(_, prog) => updateBar(selectedSeasonNumber, prog)}>
              {episodes.map((ep) => {
                const isUpcoming = ep.air_date && new Date(ep.air_date) > new Date();
                const episodeImage = isUpcoming
                  ? tvDetail.logo
                    ? `https://image.tmdb.org/t/p/w500${tvDetail.logo}`
                    : `https://image.tmdb.org/t/p/w500${tvDetail.poster_path}`
                  : `https://image.tmdb.org/t/p/w500${ep.still_path}`;

                return (
                  <SwiperSlide key={ep.id}>
                    <div className="episode-card">
                      <button
                        className={`thumb ${isUpcoming ? 'is-logo' : ''}`}
                        onClick={() => handleVideoOpen(ep.id)}>
                        <img src={episodeImage} alt={ep.name} />
                        {!isUpcoming && (
                          <div className="play-overlay">
                            <div className="play-icon">▶</div>
                          </div>
                        )}
                      </button>

                      <div className="episode-title">
                        <h3>
                          {ep.episode_number}. {ep.name}
                        </h3>
                        <p>{ep.overview}</p>
                        <p>
                          {ep.air_date} · {isUpcoming ? '방영예정' : `${ep.runtime}분`}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      )}

      {showPopup && <VideoPlay youtubeKey={youtubeKey} onClose={() => setShowPopup(false)} />}
    </section>
  );
};

export default DramaList;
