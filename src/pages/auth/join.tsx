import { Link } from 'react-router-dom';
import '../scss/Join.scss';

const Join = () => {
  return (
    <div className="join-wrappers">
      <div className="top">
        <Link to="/">
          <img src="/images/tving-logo-main.svg" alt="logo" />
        </Link>
      </div>
      <div className="join-wrap">
        <div className="join-box">
          <h2>아이디와 이메일로 간편하게 티빙을 시작하세요!</h2>
          <div className="join-box">
            <div className="input-area">
              <div className="id">
                <div>
                  <input type="id" placeholder="아이디" />
                  <button>
                    <img src="" alt="" />
                  </button>
                </div>
                <p>
                  <span>
                    <img src="" alt="" />
                  </span>
                  영문 소문자 또는 영문 소문자, 숫자 조합 6~12 자리
                </p>
              </div>
              <div className="password">
                <div>
                  <input type="text" />
                  <input type="text" />
                </div>
                <p>
                  <span>
                    <img src="" alt="" />
                  </span>
                  영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15 자리
                </p>
              </div>
              <div className="email">
                <div>
                  <input type="text" />
                </div>
                <p>이메일 형식으로 입력해주세요</p>
              </div>
              <div className="phone">
                <input type="text" />
                <button>인증번호 전송</button>
              </div>
            </div>
            <form>
              <label>
                <input type="checkbox" />
                <span>필수 및 선택 항목을 모두 포함하여 동의합니다</span>
              </label>
            </form>
            <button className="join-btn">가입하기</button>
            <div className="social-login">
              <p>다른 서비스 계정으로 가입하기</p>
              <div>
                <button className="kakao">
                  <img src="/images/kakao.svg" alt="kakao" />
                  <span>카카오 로그인</span>
                </button>
                <button className="google">
                  <img src="/images/google.svg" alt="google" />
                  <span>구글 로그인</span>
                </button>
              </div>
            </div>
          </div>
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
