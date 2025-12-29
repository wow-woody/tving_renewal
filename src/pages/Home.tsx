import './scss/Home.scss';

import VOnlySection from '../components/v-only/VOnlySection';
import VOriginalSection from '../components/v-origin/VOriginalSection';
import MainBanner from '../components/main-banner/MainBanner';
import ButtonBanner from '../components/button-banner/ButtonBanner';
import TvingNew from '../components/Home/Tiving-new/TvingNew';
import EnterFeaturedSection from '../components/enter-pop/EnterFeaturedSection';

import DramaFeaturedSection from '../components/drama-pop/DramaFeaturedSection';
import MovieFeaturedSection from '../components/movie-pop/MovieFeaturedSection';
import AppleTvSection from '../components/appletv/AppleTvSection';
import KblSection from '../components/kbl/KblSection';
import WatchHistory from '../components/WatchHistory/WatchHistory';

import TvingTop20 from '../components/Home/Tving-top-20/TvingTop20';
import TvingTopAnimTop20 from '../components/Home/Tving-anim-top-20/TvingTopAnimTop20';

import { liveChannels } from '../data/LiveChannels';
import LiveNews from '../components/Home/Live-news/LiveNews';
import LiveFavorite from '../components/Home/Live-favorite/LiveFavorite';
import LiveSports from '../components/Home/Live-Sports/LiveSports';
import HilightsVOriginal from '../components/Home/Hilights-Voriginal/HilightsVOriginal';


const Home = () => {

  return (
    <div className="main-wrap">
      <div className="inner">
        <section className="section-1">
          <h2 className='section-title'>반드시 챙겨봐야 하는 회원님을 위한 콘텐츠</h2>
          <div className="main-container">
            <MainBanner />
          </div>
        </section>

        <section className="section-2">
          <ButtonBanner />
        </section>

        <section className="section-3">
          <WatchHistory />
        </section>

        <section className='section-4'>
          <h2 className="section-title">뉴스 라이브</h2>
          <LiveNews list={liveChannels} />
        </section>

        <section className="section-5">
          <h2 className="section-title">티빙 NEW! 공개 예정 콘텐츠</h2>
          <TvingNew />
        </section>

        <section className='section-6'>
          <h2 className="section-title">오늘의 티빙 TOP20</h2>
          <TvingTop20 />
        </section>

        <section className='section-7'>
          <h2 className="section-title">내 취향 딱! 인기 라이브</h2>
          <LiveFavorite list={liveChannels} />
        </section>

        <section className="section-8">
          <VOriginalSection />
        </section>

        <section className="section-9">
          <DramaFeaturedSection />
        </section>

        <section className="section-10">
          <AppleTvSection />
        </section>

        <section className="section-11">
          <EnterFeaturedSection />
        </section>

        <section className="section-12">
          <KblSection />
        </section>

        <section className="section-13">
          <MovieFeaturedSection />
        </section>

        <section className='section-14'>
          <h2 className="section-title">실시간 인기 애니메이션</h2>
          <TvingTopAnimTop20/>
        </section>

        <section className="section-15">
          <VOnlySection />
        </section>

        <section className='section-16'>
          <h2 className="section-title">실시간 스포츠 라이브</h2>
          <LiveSports list={liveChannels} />
        </section>


        <section>
          <HilightsVOriginal/>
        </section>


      </div>
    </div>
  );
};

export default Home;
