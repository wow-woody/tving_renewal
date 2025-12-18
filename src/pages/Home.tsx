import { Link } from 'react-router-dom';
import './scss/Home.scss';
import RankRow from '../components/tving-top20/RankRowtop20';

import drama from '../data/Drama';
import anim from '../data/Anim';
import movie from '../data/Movie';
import enter from '../data/Enter';

import type { Content } from '../type/content';
import { RankScope } from '../type/enum';
import VOnlySection from '../components/v-only/VOnlySection';
import VOriginalSection from '../components/v-origin/VOriginalSection';
import MainBanner from '../components/main-banner/MainBanner';
import EnterFeaturedSection from '../components/enter-pop/EnterFeaturedSection';



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
                  <MainBanner/>
                </div>
            </section>

      <hr />

      <section className="section-2">
        <h2 className="hidden">바로가기</h2>
        <div className="link-container">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>

      <hr />

      <section className="section-3">
        <h2 className="hidden">시청중인 프로그램</h2>
        <div className="watching-container">
          <div className="pagenation-wrap">
            <div className="pagenation-area">
              <div className="pagenation-line"></div>
              <div className="pointer-line"></div>
            </div>
            <div className="nav-btn">
              <button className="prev">
                <img src="/images/arrow-left.svg" alt="prev" />
              </button>
              <button className="next">
                <img src="/images/arrow-right.svg" alt="next" />
              </button>
            </div>
          </div>
          <div className="watching-wrap">
            <div className="side-wrap">
              <h2 className="section-title">
                현재
                <br />
                시청중인
                <br />
                프로그램
              </h2>
              <div className="more-btn-area">
                <Link to="/" className="more-btn">
                  더보기 +
                </Link>
              </div>
            </div>
            <div className="watching-main-wrap"></div>
          </div>
        </div>
      </section>

      <section className="section-4">
        <div className="title-wrap">
          <h2 className="section-title">
            <Link to="/">뉴스 라이브</Link>
          </h2>
          <div className="pagenation-wrap">
            <div className="pagenation-area">
              <div className="pagenation-line"></div>
              <div className="pointer-line"></div>
            </div>
            <div className="nav-btn">
              <button className="prev">
                <img src="/images/arrow-left.svg" alt="prev" />
              </button>
              <button className="next">
                <img src="/images/arrow-right.svg" alt="next" />
              </button>
            </div>
          </div>
        </div>
        <div className="live-container">
          <div className="live-wrap">
            <div className="img-wrap"></div>
            <div className="s-banner">
              <p>mbc 라디오 시사</p>
            </div>
            <div className="s-title">MBC 라디오 시사 하이라이트</div>
          </div>
        </div>
      </section>

      <section className="section-5">
        <div className="title-wrap">
          <h2 className="section-title">
            <Link to="/">티빙 NEW! 공개 예정 콘텐츠</Link>
          </h2>
          <div className="pagenation-wrap">
            <div className="pagenation-area">
              <div className="pagenation-line"></div>
              <div className="pointer-line"></div>
            </div>
            <div className="nav-btn">
              <button className="prev">
                <img src="/images/arrow-left.svg" alt="prev" />
              </button>
              <button className="next">
                <img src="/images/arrow-right.svg" alt="next" />
              </button>
            </div>
          </div>
        </div>
        <div className="new-container">
          <div className="new-wrap">
            <div className="img-wrap"></div>
            <div className="new-title">
              <div className="title-img">
                <img src="/images/tving-logo-main.svg" alt="" />
              </div>
              <div className="sub-title">asdfasdf</div>
            </div>
          </div>
          <div className="new-wrap">
            <div className="img-wrap"></div>
            <div className="new-title">
              <div className="title-img">
                <img src="/images/tving-logo-main.svg" alt="" />
              </div>
              <div className="sub-title">asdfasdf</div>
            </div>
          </div>
          <div className="new-wrap">
            <div className="img-wrap"></div>
            <div className="new-title">
              <div className="title-img">
                <img src="/images/tving-logo-main.svg" alt="" />
              </div>
              <div className="sub-title">asdfasdf</div>
            </div>
          </div>
          <div className="new-wrap">
            <div className="img-wrap"></div>
            <div className="new-title">
              <div className="title-img">
                <img src="/images/tving-logo-main.svg" alt="" />
              </div>
              <div className="sub-title">asdfasdf</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-6">
        <h2 className="section-title">
          <Link to="/">오늘의 티빙 TOP 20</Link>
        </h2>
        <div className="poster-wrap">
          <RankRow data={top20} rankScope={RankScope.TOP20} />
        </div>
      </section>

            <section className="section-8">
                <VOriginalSection />
            </section>

            <section className='section-11'>
               <h2 className="section-title">
            <Link to="/">예능 인기 프로그램</Link>
          </h2>
              <EnterFeaturedSection/>
            </section>

      <section className="section-14">
        <h2 className="section-title">
          <Link to="/">실시간 인기 애니메이션</Link>
        </h2>

        <div className="poster-wrap">
          <RankRow data={anim20} rankScope={RankScope.POP_ANIM} />
        </div>
      </section>
      <section className="section-15">
        <VOnlySection />
      </section>
    </div>
  );
};

export default Home;
