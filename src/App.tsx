import { Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Login from './pages/auth/login';
import Join from './pages/auth/join';
import Footer from './components/Footer/Footer';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import Mypage from './pages/auth/Mypage';
import { useUserStore } from './store/useUserStore';
import EditProfile from './pages/EditProfile';
import Subscription from './pages/Subscription';
import SubscriptionCheck from './pages/SubscriptionCheck';
import SubscriptionPayment from './pages/SubscriptionPayment';
import DramaDetail from './pages/Drama/DramaDetail';
import Drama from './pages/Drama/Drama';
import DramaGenre from './pages/Drama/DramaGenre';
import LivePage from './pages/Live/LivePage';
import SportBanner from './pages/Sport/Sport';
import Enter from './pages/Enter/Enter';
import EnterGenre from './pages/Enter/EnterGenre';
import EnterDetail from './pages/Enter/EnterDetail';
import Anim from './pages/Anim/Anim';
import AnimGenre from './pages/Anim/AnimGenre';
import AnimDetail from './pages/Anim/AnimDetail';
import SearchResults from './pages/Search/SearchResults';
import PersonDetail from './pages/Person/PersonDetail';
import Movie from './pages/Moives/Moive';
import MovieDetail from './pages/Moives/MovieDetail';
import MovieGenre from './pages/Moives/MovieGenre';

function App() {
  const location = useLocation();

  const noHeaderPages = [
    '/login',
    '/join',
    '/editprofile',
    '/subscription',
    '/subscription/payment/check',
    '/subscription/payment',
  ];
  const hideHeader = noHeaderPages.includes(location.pathname);

  const noFooterPage = [
    '/login',
    '/join',
    '/editprofile',
    '/subscription',
    '/subscription/payment/check',
    '/subscription/payment',
  ];
  const hideFooter = noFooterPage.includes(location.pathname);

  const initAuth = useAuthStore((state) => state.initAuth);
  const { user } = useAuthStore();
  const { initProfiles } = useUserStore();

  useEffect(() => {
    initAuth();
  }, []);

  useEffect(() => {
    if (user && 'uid' in user) {
      initProfiles(user.uid);
    }
  }, [user]);

  // 페이지 이동 시 스크롤을 맨 위로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {!hideHeader && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/drama" element={<Drama />} />
        <Route path="/drama/genre/:key" element={<DramaGenre />} />
        <Route path="/enter" element={<Enter />} />
        <Route path="/enter/genre/:key" element={<EnterGenre />} />
        <Route path="/enter/detail/:id" element={<EnterDetail />} />
        <Route path="/anim" element={<Anim />} />
        <Route path="/anim/genre/:key" element={<AnimGenre />} />
        <Route path="/anim/detail/:id" element={<AnimDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/person/:id" element={<PersonDetail />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/detail/:id" element={<DramaDetail />} />

        <Route path="/subscription/payment/check" element={<SubscriptionCheck />} />
        <Route path="/subscription/payment" element={<SubscriptionPayment />} />
        <Route path="/live" element={<LivePage />} />
        <Route path="/sport" element={<SportBanner />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/detail/:id" element={<MovieDetail />} />
        <Route path="/movie/genre/:key" element={<MovieGenre />} />
      </Routes>

      {!hideFooter && <Footer />}
    </>
  );
}

export default App;
