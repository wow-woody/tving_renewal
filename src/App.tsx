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

function App() {
  const location = useLocation();
  const noHeaderPages = ['/login', '/join', '/editprofile'];
  const hideHeader = noHeaderPages.includes(location.pathname);
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

  return (
    <>
      {!hideHeader && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
