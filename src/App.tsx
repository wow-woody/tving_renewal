import { Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import Main from './pages/Home';
import Login from './pages/auth/login';
import Join from './pages/auth/join';
import Footer from './components/Footer/Footer';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import Mypage from './pages/auth/Mypage';

function App() {
  const location = useLocation();
  const noHeaderPages = ['/login', '/join'];
  const hideHeader = noHeaderPages.includes(location.pathname);
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, []);

  return (
    <>
      {!hideHeader && <Header />}

      <Routes>
        <Route path="/" element={<Main />} />

        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
