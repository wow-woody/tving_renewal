import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../scss/Join.scss';

const Join = () => {
    // ------id------
    const [id, setId] = useState('');
    const [idtouched, setIdtouched] = useState(false);

    const idRegex = /^[a-z0-9]+$/;

    const isFormatValid = idRegex.test(id);
    const isLengthValid = id.length >= 6 && id.length <= 12;

    const showIdError = idtouched && (!isFormatValid || !isLengthValid);

    //------password------
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const [pwTouched, setPwTouched] = useState(false);
    const [pwCheckTouched, setPwCheckTouched] = useState(false);

    const [showPw, setShowPw] = useState(false);
    const [showPwCheck, setShowPwCheck] = useState(false);

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*]).{8,15}$/;

    const isPwFormatValid = passwordRegex.test(password);
    const isPwLengthValid = password.length >= 8 && password.length <= 15;

    const showPwError = pwTouched && (!isPwFormatValid || !isPwLengthValid);

    const isPwMatched = password === passwordCheck;
    const showPwCheckError = pwCheckTouched && !isPwMatched;

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
                    <div className="join-section">
                        <div className="input-area">
                            <div className="id">
                                <div>
                                    <input
                                        type="id"
                                        placeholder="아이디"
                                        value={id}
                                        onFocus={() => setIdtouched(true)}
                                        onChange={(e) => setId(e.target.value)}
                                    />
                                    <button
                                        onClick={() => {
                                            setId('');
                                        }}
                                    >
                                        <img src="/images/login-close.svg" alt="close" />
                                    </button>
                                </div>
                                <p className={showIdError ? 'error' : ''}>
                                    <span>
                                        <img
                                            src="/images/exclamation-mark.svg"
                                            alt="exclamation-mark"
                                        />
                                    </span>

                                    {showIdError
                                        ? id.length === 0
                                            ? '내용을 입력해 주세요'
                                            : !isFormatValid
                                            ? '영문 소문자 또는 영문 소문자+숫자 조합 6~12자리'
                                            : id.length < 6
                                            ? '영문 소문자 또는 영문 소문자+숫자 조합 6자리 이상 입력해 주세요'
                                            : id.length > 12
                                            ? '영문 소문자 또는 영문 소문자+숫자 조합 12자리 이하로 입력해 주세요'
                                            : null
                                        : '영문 소문자 또는 영문 소문자+숫자 조합 6~12자리'}
                                </p>
                            </div>

                            <div className="password">
                                <div>
                                    {/* 비밀번호 */}
                                    <div>
                                        <input
                                            type={showPw ? 'text' : 'password'}
                                            placeholder="비밀번호"
                                            value={password}
                                            onFocus={() => setPwTouched(true)}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button onClick={() => setShowPw(!showPw)}>
                                            <img
                                                src={
                                                    showPw
                                                        ? '/images/hidePW.svg'
                                                        : '/images/showPW.svg'
                                                }
                                                alt="view"
                                            />
                                        </button>
                                    </div>

                                    {/* 비밀번호 확인 */}
                                    <div>
                                        <input
                                            type={showPwCheck ? 'text' : 'password'}
                                            placeholder="비밀번호 확인"
                                            value={passwordCheck}
                                            onFocus={() => setPwCheckTouched(true)}
                                            onChange={(e) => setPasswordCheck(e.target.value)}
                                        />
                                        <button onClick={() => setShowPwCheck(!showPwCheck)}>
                                            <img
                                                src={
                                                    showPwCheck
                                                        ? '/images/hidePW.svg'
                                                        : '/images/showPW.svg'
                                                }
                                                alt="view"
                                            />
                                        </button>
                                    </div>
                                </div>

                                {/* 경고문 */}
                                <p className={showPwError || showPwCheckError ? 'error' : ''}>
                                    <span>
                                        <img
                                            src="/images/exclamation-mark.svg"
                                            alt="exclamation-mark"
                                        />
                                    </span>

                                    {showPwError
                                        ? !isPwFormatValid
                                            ? '영문, 숫자, 특수문자(~!@#$%^&*)를 모두 포함해야 합니다.'
                                            : password.length < 8
                                            ? '8자 이상 입력해주세요.'
                                            : '15자 이하로 입력해주세요.'
                                        : showPwCheckError
                                        ? '비밀번호가 일치하지 않습니다.'
                                        : '영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15 자리'}
                                </p>
                            </div>

                            <div className="email">
                                <div>
                                    <input type="email" placeholder="이메일" />
                                    <button>
                                        <img src="/images/login-close.svg" alt="close" />
                                    </button>
                                </div>
                                <p>
                                    <span>
                                        <img
                                            src="/images/exclamation-mark.svg"
                                            alt="exclamation-mark"
                                        />
                                    </span>
                                    이메일 형식으로 입력해주세요
                                </p>
                            </div>
                            <div className="phone">
                                <div>
                                    <input type="text" placeholder="휴대폰 번호 인증" />
                                    <button>
                                        <img src="/images/login-close.svg" alt="close" />
                                    </button>
                                </div>
                                <button className="send">인증번호 전송</button>
                            </div>
                        </div>

                        <form className="agreement">
                            <label>
                                <input type="checkbox" />
                                <span className="fake"></span>
                                <span>필수 및 선택 항목을 모두 포함하여 동의합니다</span>
                            </label>
                        </form>

                        <button className="join-btn">가입하기</button>

                        <div className="social-login">
                            <p className="line-title">다른 서비스 계정으로 가입하기</p>
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
