import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './scss/SeasonEpisodeSwiper.scss'
import '../scss/DramaList.scss';

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
  const slidesPerView = 2.5;
  const total = episodes.length;
  const maxIndex = total > slidesPerView ? total - slidesPerView : 0;
  // 페이저 전체 길이(px)와 포인터 길이(px)
  // 페이저 바의 빨간 막대(포인터) 길이와 위치를 %로 계산
  const progress = maxIndex > 0 ? (activeIndex / maxIndex) : 0;
  // 막대 길이: 전체 바의 (1 / (maxIndex+1))
  const pointerWidthPercent = maxIndex > 0 ? (100 / (maxIndex + 1)) : 100;
  const pointerLeftPercent = progress * (100 - pointerWidthPercent);
  return (
    <div className="drama-season-section">
      <div className="season-header">
        <div className="season-header-row-flex">
          <div className="season-title">
            <h3>{tvDetail.name} 시즌</h3>
          </div>
          <button className="season-dropdown-btn" onClick={() => setShowSeasonMenu(!showSeasonMenu)}>
            시즌 선택
          </button>
          {showSeasonMenu && (
            <div className="season-dropdown-menu">
              {seasons.map((s: any) => (
                <button key={s.id} className={`season-menu-item${s.season_number === selectedSeason ? ' active' : ''}`} onClick={() => { setSelectedSeason(s.season_number); setShowSeasonMenu(false); }}>{s.name}</button>
              ))}
            </div>
          )}
          {/* 페이저 & 네비게이션 */}
          <div className="episode-controls-inline">
            <div className="episode-pagination">
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
              <button type="button" className="nav-btn prev episode-prev" aria-label="Previous slide">‹</button>
              <button type="button" className="nav-btn next episode-next" aria-label="Next slide">›</button>
            </div>
          </div>
        </div>
      </div>
      <div className="drama-episode-swiper-wrap">
        <Swiper
          modules={[Navigation]}
          slidesPerView={5.5}
          spaceBetween={14}
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
                <div className="thumb">
                  <img src={ep.still_path ? `https://image.tmdb.org/t/p/w500${ep.still_path}` : tvDetail.poster_path ? `https://image.tmdb.org/t/p/w500${tvDetail.poster_path}` : ''} alt={ep.name} />
                  <div className="play-overlay"><div className="play-icon">▶</div></div>
                </div>
                <div className="episode-title">
                  <h3>{ep.episode_number}. {ep.name}</h3>
                  <p className="ep-overview">{ep.overview}</p>
                  <p className="ep-data">{ep.air_date} · {ep.runtime}분</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
