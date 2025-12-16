import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './scss/Join.scss';
import IdInput from './layout/IdInput';
import PasswordInput from './layout/PasswordInput';
import EmailInput from './layout/EmailInput';
import Agree from './layout/Agree';
import { useAuthStore } from '../../store/useAuthStore';

const Join = () => {
  const { onMember } = useAuthStore();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [email, setEmail] = useState('');
  const [isAgreeChecked, setIsAgreeChecked] = useState(false);

  const navigate = useNavigate();

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAgreeChecked) {
      alert('필수 항목을 모두 체크해주세요.');
      return;
    }

    try {
      await onMember(id, email, password);

      setEmail('');
      setPassword('');
      navigate('/');
    } catch (err) {
      console.log('경로이탈');
    }
  };

  return (
    <div className="join-wrappers">
      <div className="top">
        <Link to="/">
          <img src="/images/tving-logo-main.svg" alt="logo" />
        </Link>
      </div>
      <div className="join-wrap">
        <div className="join-box">
          <h2>아이디와 이메일로 간편하게 시작하세요!</h2>
          <form className="join-section" onSubmit={handleJoin}>
            <div className="input-area">
              <IdInput value={id} onChange={setId} />
              <PasswordInput
                password={password}
                onPasswordChange={setPassword}
                passwordCheck={passwordCheck}
                onPasswordCheckChange={setPasswordCheck}
              />
              <EmailInput value={email} onChange={setEmail} />
            </div>
            <Agree onChangeCheck={setIsAgreeChecked} />
            <button className="join-btn" type="submit">
              가입하기
            </button>
          </form>
          <button className="back">
            <p>뒤로가기</p>
          </button>
        </div>
      </div>
      <div className="footer-line"></div>
    </div>
  );
};

export default Join;
