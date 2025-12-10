import React, { useEffect, useState } from 'react';
import './Header.scss';
import homeIcon from '../../assets/icon/aside-header-icon1.png';
import userIcon from '../../assets/icon/aside-header-icon2.png';
import alertIcon from '../../assets/icon/aside-header-icon3.png';
import favoritIcon from '../../assets/icon/aside-header-icon4.png';
import contactIcon from '../../assets/icon/aside-header-icon5.png';
import settingIcon from '../../assets/icon/aside-header-icon6.png';
import { Link } from 'react-router-dom';

interface menuitem {
  id: number;
  title: string;
  path: string;
  img: string;
}

const asideMenu: menuitem[] = [
  { id: 1, title: '홈', path: '/', img: homeIcon },
  { id: 2, title: '계정설정', path: '/', img: userIcon },
  { id: 3, title: '신작알림', path: '/', img: alertIcon },
  { id: 4, title: '찜한 컨텐츠', path: '/', img: favoritIcon },
  { id: 5, title: '문의하기', path: '/', img: contactIcon },
  { id: 6, title: '설정', path: '/', img: settingIcon },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  //------------ header 숨기기----------------
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const triggerHeight = 50;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY <= triggerHeight);
      console.log('현재 스크롤:', scrollY);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const headerClassName = visible || hovered ? 'visible' : 'hidden';

  return (
    <>
      <header>
        <div className={`aside-header ${isOpen ? 'isOpen' : ''}`} onMouseLeave={handleClose}>
          <h1 className="logo" onMouseEnter={handleOpen}>
            <div className="logo-wrap">
              <Link to="/" className={isOpen ? 'open' : ''}>
                <img className="logo-main" src="/images/tving-logo-s.svg" alt="mainLogo" />
                <img className="logo-small" src="/images/tving-logo-main.svg" alt="smallLogo" />
              </Link>
            </div>
          </h1>

          <ul className="side-menu" onMouseEnter={handleOpen}>
            {asideMenu.map((m) => (
              <li key={m.id} className={m.title === '설정' ? 'setting-icon' : ''}>
                <Link to="/">
                  <img src={m.img} alt={m.title} />
                  <span>{m.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`top-header ${headerClassName}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}>
          <div className="left-wrap">
            <nav>
              <ul className="main-menu">
                <li>
                  <Link to="/">드라마</Link>
                </li>
                <li>
                  <Link to="/">예능</Link>
                </li>
                <li>
                  <Link to="/">영화</Link>
                </li>
                <li>
                  <Link to="/">스포츠</Link>
                </li>
                <li>
                  <Link to="/">애니</Link>
                </li>
                <li>
                  <Link to="/">뉴스</Link>
                </li>
                <li>
                  <Link to="/">라이브</Link>
                </li>
              </ul>
            </nav>
            <div className="search-box">
              <input type="text" placeholder="찾으시는 제목과 인물명을 입력해 보세요!" />
              <div className="search-icon-wrap">
                <img className="seasrch-icon" src="/images/search-icon.svg" alt="search" />
              </div>
              <button className="cancle-icon">
                <img src="/images/cancel-icon.svg" alt="cancel" />
              </button>
            </div>
          </div>

          <div className="user">
            <div className="login-before">
              <div className="login">
                <Link to="/login">
                  <p>로그인</p>
                </Link>
              </div>
              <div className="join">
                <Link to="/join">
                  <p>회원가입</p>
                </Link>
              </div>
            </div>
            <div className="login-after"></div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
