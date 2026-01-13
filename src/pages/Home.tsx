import './scss/Home.scss';
import RankRow from '../components/Featured/Top20/RankRowtop20';
import RankRowAnim from '../components/Animation/Top20/RankRowanim20';

import drama from '../data/Drama';
import anim from '../data/Anim';
import movie from '../data/Movie';
import enter from '../data/Enter';

import type { Content } from '../type/content';
import { RankScope } from '../type/enum';
import VOnlySection from '../components/Featured/VOnly/VOnlySection';
import VOriginalSection from '../components/Featured/VOriginal/VOriginalSection';
import MainBanner from '../components/Featured/MainBanner/MainBanner';
import ButtonBanner from '../components/Featured/ButtonBanner/ButtonBanner';
import TvingNew from '../components/Featured/New/TvingNew';
import EnterFeaturedSection from '../components/Entertainment/Featured/EnterFeaturedSection';

import DramaFeaturedSection from '../components/Drama/Featured/DramaFeaturedSection';
import MovieFeaturedSection from '../components/Movie/Featured/MovieFeaturedSection';
import AppleTvSection from '../components/Featured/AppleTV/AppleTvSection';
import KblSection from '../components/Live/Sports/KBL/KblSection';
import LiveNews from '../components/Live/News/LiveNews';
import { liveChannels } from '../data/LiveChannels';
import MyLive from '../components/Live/MyLive/MyLive';
import SportsLive from '../components/Live/Sports/SportsLive';
import WatchHistory from '../components/User/History/WatchHistory';

const Home = () => {
    // 1) 전부 합치기
    const all: Content[] = [...drama, ...anim, ...movie, ...enter];

    // 2) TOP20 랭크 있는 것만 추출 + 랭크 순 정렬(1~20)
    const top20 = all
        .filter((item) => item.rank?.[RankScope.TOP20] != null)
        .sort((a, b) => (a.rank?.[RankScope.TOP20] ?? 999) - (b.rank?.[RankScope.TOP20] ?? 999))
        .slice(0, 20);

    // 2) ANIM 랭크 있는 것만 추출 + 랭크 순 정렬(1~20)
    const anim20 = all
        .filter((item) => item.rank?.[RankScope.POP_ANIM] != null)
        .sort((a, b) => (a.rank?.[RankScope.TOP20] ?? 999) - (b.rank?.[RankScope.TOP20] ?? 999))
        .slice(0, 20);

    return (
        <div className="main-wrap">
            <section className="section-1">
                <h2>반드시 챙겨봐야 하는 회원님을 위한 콘텐츠</h2>
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

            <section className="section-4">
                <LiveNews list={liveChannels} />
            </section>

            <section className="section-5">
                <TvingNew />
            </section>

            <section className="section-6">
                <RankRow data={top20} rankScope={RankScope.TOP20} />
            </section>

            <section className="section-7">
                <MyLive list={liveChannels} />
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

            <section className="section-14">
                <RankRowAnim
                    data={anim20}
                    title="실시간 인기 애니메이션"
                    rankScope={RankScope.POP_ANIM}
                />
            </section>

            <section className="section-15">
                <VOnlySection />
            </section>

            <section className="section-16">
                <SportsLive list={liveChannels} />
            </section>
        </div>
    );
};

export default Home;
