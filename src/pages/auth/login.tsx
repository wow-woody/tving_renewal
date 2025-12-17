import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './scss/Login.scss';
import { useAuthStore } from '../../store/useAuthStore';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const { onLogin, onGoogleLogin, onKakaoLogin } = useAuthStore();
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onLogin(id, password);
      setId('');
      setPassword('');
      navigate('/');
    } catch (err) {
      console.log('로그인 에러');
    }
  };
  const handleGoogle = async () => {
    await onGoogleLogin();
    navigate('/');
  };
  const handleKakao = async () => {
    await onKakaoLogin();
    navigate('/');
  };

  return (
    <div className="login-wrappers">
      <div className="top">
        <Link to="/">
          <img src="/images/tving-logo-main.svg" alt="logo" />
        </Link>
      </div>
      <div className="login-wrap">
        <div className="login-box">
          <h2>티빙 계정으로 로그인</h2>
          <div className="login-section">
            <form className="input" onSubmit={handleLogin}>
              <div className="id">
                <div>
                  <input
                    type="id"
                    value={id}
                    placeholder="아이디"
                    onChange={(e) => setId(e.target.value)}
                  />
                  <button>
                    <img src="/images/login-close.svg" alt="close" onClick={() => setId('')} />
                  </button>
                </div>
                <p>이메일 형식으로 입력해주세요</p>
              </div>
              <div className="password">
                <div>
                  <input
                    type="password"
                    value={password}
                    placeholder="비밀번호"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button>
                    <img
                      src="/images/login-close.svg"
                      alt="close"
                      onClick={() => setPassword('')}
                    />
                  </button>
                </div>
                <p>
                  비밀번호는 반드시 8~20자 이내로 영문 대소문자, 숫자, 특수문자 중 3가지 이상
                  혼용하여 입력해 주세요.
                </p>
              </div>
            </form>
            <form className="select">
              <label>
                <input type="checkbox" />
                <span className="fake"></span>
                <span>아이디 저장</span>
              </label>
              <label>
                <input type="checkbox" />
                <span className="fake"></span>
                <span>자동로그인</span>
              </label>
            </form>
            <button className="do-login" onClick={handleLogin}>
              로그인 하기
            </button>
            <div className="social-login">
              <button className="kakao" type="button" onClick={handleKakao}>
                <img src="/images/kakao.svg" alt="kakao" />
                <span>카카오 로그인</span>
              </button>
              <button className="google" type="button" onClick={handleGoogle}>
                <img src="/images/google.svg" alt="google" />
                <span>구글 로그인</span>
              </button>
            </div>
          </div>
          <div className="login-etc">
            <ul>
              <li>
                <Link to="">아이디 찾기</Link>
              </li>
              <li>
                <Link to="">비밀번호 재설정</Link>
              </li>
              <li>
                <Link to="/join">회원가입</Link>
              </li>
            </ul>
          </div>
          <button className="back" onClick={() => navigate(-1)}>
            <p>뒤로가기</p>
          </button>
        </div>
      </div>
      <div className="footer-line"></div>
    </div>
  );
};

export default Login;
