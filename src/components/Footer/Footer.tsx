import './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <div className="footer-left">
        <div className="footer-left-top">
          <p>
            대표이사 : 최주희 | 사업자정보확인 | 사업자등록번호 : 188-88-01893 | 통신판매신고번호 :
            2020-서울마포-3641호
          </p>
          <p>
            사업장 : 서울특별시 마포구 상암산로 34, DMC디지털큐브 15층(상암동) | 호스팅사업자 :
            아마존웹서비시즈코리아 유한책임회사
          </p>
          <p>고객센터 (평일 09시~18시/공휴일 휴무) | 유료 ARS : 1670-1525 (음성/메시지 안내)</p>
          <p>
            ENM 시청자 상담실 (편성 문의 및 시청자 의견) : 080-080-0780 | Mnet
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
              <img src="/images/twitter.svg" alt="twitter" />
            </li>
            <li>
              <img src="/images/youtube.svg" alt="youtube" />
            </li>
            <li>
              <img src="/images/instar.svg" alt="instar" />
            </li>
            <li>
              <img src="/images/facebook.svg" alt="facebook" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
