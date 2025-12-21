import { useEffect, useState } from 'react';
import './Header.scss';
import homeIcon from '../../assets/icon/aside-header-icon1.png';
import userIcon from '../../assets/icon/aside-header-icon2.png';
import alertIcon from '../../assets/icon/aside-header-icon3.png';
import favoritIcon from '../../assets/icon/aside-header-icon4.png';
import contactIcon from '../../assets/icon/aside-header-icon5.png';
import settingIcon from '../../assets/icon/aside-header-icon6.png';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import ProfileSelect from '../ProfileSelect/ProfileSelect';
import SearchDropdown from './SearchDropdown';
import { useSearchStore } from '../../store/useSearchStore';

interface menuitem {
  id: number;
  title: string;
  path: string;
  img: string;
}

const asideMenu: menuitem[] = [
  { id: 1, title: '홈', path: '/', img: homeIcon },
  { id: 2, title: '마이페이지', path: '/mypage', img: userIcon },
  { id: 3, title: '신작알림', path: '/', img: alertIcon },
  { id: 4, title: '찜한 컨텐츠', path: '/', img: favoritIcon },
  { id: 5, title: '문의하기', path: '/', img: contactIcon },
  { id: 6, title: '설정', path: '/', img: settingIcon },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useAuthStore();
  const { searchResults, isSearching, onSearch, clearSearch } = useSearchStore();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  //------------ header 숨기기----------------
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const triggerHeight = 50;

  //------------ search-box 보이기 ------------
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sValue, setSValue] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSValue('');
    clearSearch();
    setSelectedIndex(-1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSValue(value);
    if (value.trim()) {
      onSearch(value);
    } else {
      clearSearch();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isSearchOpen || searchResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : searchResults.length - 1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      // Enter 키로 선택된 항목으로 이동
      const selectedResult = searchResults[selectedIndex];
      if (selectedResult) {
        handleSearchClose();
      }
    }
  };

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
  const headerShow = visible || hovered ? 'visible' : 'hidden';

  return (
    <header>
      <div
        className={`aside-header ${isOpen ? 'isOpen' : ''}`}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}>
        <h1 className="logo">
          <div className="logo-wrap">
            <Link to="/" className={isOpen ? 'open' : ''}>
              <img className="logo-main" src="/images/tving-logo-s.svg" alt="mainLogo" />
              <img className="logo-small" src="/images/tving-logo-main.svg" alt="smallLogo" />
            </Link>
          </div>
        </h1>

        <ul className="side-menu">
          {asideMenu.map((m) => (
            <li key={m.id} className={m.title === '설정' ? 'setting-icon' : ''}>
              <Link to={m.path}>
                <img src={m.img} alt={m.title} />
                <span>{m.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`top-header ${headerShow}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>
        <div className="header-left">
          <nav>
            <ul className="main-menu">
              <li>
                <Link to="/drama">드라마</Link>
              </li>
              <li>
                <Link to="/enter">예능</Link>
              </li>
              <li>
                <Link to="/">영화</Link>
              </li>
              <li>
                <Link to="/sport">스포츠</Link>
              </li>
              <li>
                <Link to="/">애니</Link>
              </li>
              <li>
                <Link to="/">뉴스</Link>
              </li>
              <li>
                <Link to="/live">라이브</Link>
              </li>
            </ul>
          </nav>

          <div className={`search ${isSearchOpen ? 'open' : ''}`}>
            <button className="search-action" onClick={() => setIsSearchOpen(true)}>
              <img
                src={isSearchOpen ? '/images/search-active-icon.svg' : '/images/search-icon.svg'}
                alt="search"
              />
            </button>

            {isSearchOpen && (
              <div className="search-box">
                <input
                  type="text"
                  value={sValue}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  placeholder="찾으시는 제목과 인물명을 입력해 보세요!"
                  autoFocus
                />

                <button className="search-close" onClick={handleSearchClose} aria-label="검색 닫기">
                  <img src="/images/login-close.svg" alt="cancel" />
                </button>

                {(searchResults.length > 0 || isSearching) && (
                  <SearchDropdown
                    results={searchResults}
                    isSearching={isSearching}
                    onClose={handleSearchClose}
                    selectedIndex={selectedIndex}
                    onIndexChange={setSelectedIndex}
                  />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="user">
          {!loading && !user && (
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
          )}
          {!loading && user && (
            <div className="login-after">
              <ProfileSelect />
            </div>
          )}
        </div>

        <div className="top-show">
          <img src="/images/top-show.svg" alt="" />
        </div>
      </div>
    </header>
  );
};

export default Header;
