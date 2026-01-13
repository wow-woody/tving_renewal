import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './scss/SeasonEpisodeSwiper.scss';
import '../scss/DramaList.scss';
import EpisodeVideoModal from './EpisodeVideoModal';
import { useWatchHistoryStore } from '../../../store/useWatchHistoryStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { useTvSeriesStore } from '../../../store/useTvSeriesStore';

interface Props {
    tvDetail: any;
    episodes: any[];
    seasons: any[];
    selectedSeason: number;
    setSelectedSeason: (season: number) => void;
    showSeasonMenu: boolean;
    setShowSeasonMenu: (show: boolean) => void;
}

export default function SeasonEpisodeSwiper({
    tvDetail,
    episodes,
    seasons,
    selectedSeason,
    setSelectedSeason,
    showSeasonMenu,
    setShowSeasonMenu,
}: Props) {
    const episodeSwiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [videoId, setVideoId] = useState<string | null>(null);
    const { videos, onFetchTvVideos } = useTvSeriesStore();
    const { onAddWatchHistory } = useWatchHistoryStore();
    const { user } = useAuthStore();
    const slidesPerView = 2.5;
    const total = episodes.length;
    const maxIndex = total > slidesPerView ? total - slidesPerView : 0;
    // 페이저 전체 길이(px)와 포인터 길이(px)
    // 페이저 바의 빨간 막대(포인터) 길이와 위치를 %로 계산
    const progress = maxIndex > 0 ? activeIndex / maxIndex : 0;
    // 막대 길이: 전체 바의 (1 / (maxIndex+1))
    const pointerWidthPercent = maxIndex > 0 ? 100 / (maxIndex + 1) : 100;
    const pointerLeftPercent = progress * (100 - pointerWidthPercent);

    // 영상 모달 오픈 핸들러
    // 현재 activeIndex로 시청한 에피소드 정보 추출
    const getCurrentEpisode = () => {
        return episodes[activeIndex];
    };

    const handleOpenVideo = async () => {
        await onFetchTvVideos(tvDetail.id);
        // TMDB에서 YouTube 트레일러 우선
        const trailer =
            videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ||
            videos.find((v) => v.site === 'YouTube');
        if (trailer) {
            setVideoId(trailer.key);
            setShowVideoModal(true);
        } else {
            alert('예고편 영상을 찾을 수 없습니다.');
        }
    };

    // 영상 모달 닫힐 때 시청내역 추가 및 마이페이지 이동
    const handleVideoModalClose = async () => {
        setShowVideoModal(false);
        if (user) {
            const ep = getCurrentEpisode();
            if (ep) {
                await onAddWatchHistory({
                    id: ep.id,
                    // title: 드라마 제목, name: 에피소드명
                    title: tvDetail.name || '',
                    name: ep.name,
                    poster_path: ep.still_path || tvDetail.poster_path || '',
                    media_type: 'tv',
                    overview: ep.overview,
                    backdrop_path: ep.still_path || tvDetail.backdrop_path || '',
                    vote_average: ep.vote_average || 0,
                    adult: false,
                    cAge: tvDetail.cAge || '',
                    logo: '',
                    episodeNumber: ep.episode_number,
                    seasonNumber: selectedSeason,
                });
            }
        }
    };

    return (
        <div className="drama-season-section">
            <div className="season-header">
                <div className="season-header-row-flex">
                    <div className="season-title">
                        <h3>{tvDetail.name}</h3>
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: '16px',
                                }}
                            >
                                <button
                                    className="season-inline-btn"
                                    onClick={() => setShowSeasonMenu(!showSeasonMenu)}
                                    type="button"
                                >
                                    {seasons.find((s) => s.season_number === selectedSeason)
                                        ?.name || '시즌'}
                                </button>
                                {showSeasonMenu && (
                                    <div
                                        className="season-inline-list"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: '16px',
                                            marginLeft: '0',
                                        }}
                                    >
                                        {seasons.map((s: any) => (
                                            <button
                                                key={s.id}
                                                className={`season-inline-item${
                                                    s.season_number === selectedSeason
                                                        ? ' active'
                                                        : ''
                                                }`}
                                                onClick={() => {
                                                    setSelectedSeason(s.season_number);
                                                    setShowSeasonMenu(false);
                                                }}
                                                type="button"
                                            >
                                                {s.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* 페이저 & 네비게이션: 시즌선택 아래로 이동 */}
                <div className="episode-controls-below-row">
                    <div className="episode-pagination episode-pagination-row">
                        <div className="pagenation-line" />
                        <div
                            className="pointer-line episode-pointer-line"
                            style={{
                                width: `${pointerWidthPercent}%`,
                                left: `${pointerLeftPercent}%`,
                            }}
                        />
                    </div>
                    <div className="episode-nav">
                        <button
                            type="button"
                            className="nav-btn prev episode-prev"
                            aria-label="Previous slide"
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            className="nav-btn next episode-next"
                            aria-label="Next slide"
                        >
                            ›
                        </button>
                    </div>
                </div>
            </div>
            <div className="drama-episode-swiper-wrap">
                <Swiper
                    modules={[Navigation]}
                    slidesPerView={5.8}
                    spaceBetween={0}
                    loop={false}
                    navigation={{
                        nextEl: '.episode-next',
                        prevEl: '.episode-prev',
                    }}
                    onBeforeInit={(swiper) => {
                        // @ts-expect-error HTMLElement ok
                        swiper.params.navigation.prevEl = document.querySelector('.episode-prev');
                        // @ts-expect-error HTMLElement ok
                        swiper.params.navigation.nextEl = document.querySelector('.episode-next');
                    }}
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                    className="drama-episode-swiper"
                    ref={episodeSwiperRef}
                >
                    {episodes.map((ep: any) => (
                        <SwiperSlide key={ep.id}>
                            <div className="episode-card">
                                <div
                                    className="thumb"
                                    onClick={handleOpenVideo}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img
                                        src={
                                            ep.still_path
                                                ? `https://image.tmdb.org/t/p/w500${ep.still_path}`
                                                : tvDetail.poster_path
                                                ? `https://image.tmdb.org/t/p/w500${tvDetail.poster_path}`
                                                : ''
                                        }
                                        alt={ep.name}
                                    />
                                    <div className="play-overlay">
                                        <div className="play-icon">▶</div>
                                    </div>
                                </div>
                                <div className="episode-title">
                                    <h3>
                                        {ep.episode_number}. {ep.name}
                                    </h3>
                                    <p className="ep-overview">{ep.overview}</p>
                                    <p className="ep-data">
                                        {ep.air_date} · {ep.runtime}분
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {showVideoModal && videoId && (
                <EpisodeVideoModal videoId={videoId} onClose={handleVideoModalClose} />
            )}
        </div>
    );
}
