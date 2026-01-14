import './Footer.scss';

const Footer = () => {
    return (
        <footer>
            <div className="footer-left">
                <div className="footer-left-top">
                    <p>
                        대표이사 : 최주희&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;사업자정보확인&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;사업자등록번호 : 188-88-01893&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;통신판매신고번호 : 2020-서울마포-3641호
                    </p>
                    <p>
                        사업장 : 서울특별시 마포구 상암산로 34, DMC디지털큐브 15층(상암동)&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;호스팅사업자 : 아마존웹서비시즈코리아 유한책임회사
                    </p>
                    <p>
                        고객센터 (평일 09시~18시/공휴일 휴무)&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;유료 ARS : 1670-1525 (음성/메시지
                        안내)
                    </p>
                    <p>
                        ENM 시청자 상담실 (편성 문의 및 시청자 의견) : 080-080-0780&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Mnet
                        고객센터(방송편성문의) : 1855-1631
                    </p>
                </div>
                <div className="footer-left-bottom">
                    <p>&copy; TVING Corp. ALL RIGHTS RESERVED</p>
                </div>
            </div>
            <div className="footer-right">
                <div className="sns-wrap">
                    <ul>
                        <li>
                            <a
                                href="https://x.com/tvingdotcom"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src="/images/twitter.svg" alt="twitter" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.youtube.com/c/TVING_official" target="_blank" rel="noopener noreferrer">
                                <img src="/images/youtube.svg" alt="youtube" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.instagram.com/tving.official/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src="/images/instar.svg" alt="instar" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/CJTVING/" target="_blank" rel="noopener noreferrer">
                                <img src="/images/facebook.svg" alt="facebook" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
