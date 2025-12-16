import { Link } from 'react-router-dom';
import './scss/Home.scss';

const Home = () => {
    return (
        <div className="main-wrap">
            <section className="section-1">
                <h2>반드시 챙겨봐야 하는 회원님을 위한 콘텐츠</h2>
                <div className="main-container"></div>
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
                <div className="title-wrap">
                    <h2 className="section-title">
                        <Link to="/">오늘의 티빙 TOP 20</Link>
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
                <div className="ranking-container">
                    <div className="ranking-wrap">
                        <h3 className="ranking">1</h3>
                        <div className="ranking-img"></div>
                    </div>
                    <div className="ranking-wrap">
                        <h3 className="ranking">2</h3>
                        <div className="ranking-img"></div>
                    </div>
                </div>
            </section>

            <div>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
                <p>13</p>
                <p>14</p>
                <p>15</p>
                <p>16</p>
                <p>17</p>
                <p>18</p>
                <p>19</p>
                <p>20</p>
                <p>21</p>
                <p>22</p>
                <p>23</p>
                <p>24</p>
                <p>25</p>
                <p>26</p>
                <p>27</p>
                <p>28</p>
                <p>29</p>
                <p>30</p>
            </div>
        </div>
    );
};

export default Home;
