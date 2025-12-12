import { useState } from 'react';

interface Props {
  password: string;
  passwordCheck: string;
  onPasswordChange: (e: string) => void;
  onPasswordCheckChange: (e: string) => void;
}

const PasswordInput = ({
  password,
  onPasswordChange,
  passwordCheck,
  onPasswordCheckChange,
}: Props) => {
  //------password------
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
    <>
      <div className="password">
        <div>
          {/* 비밀번호 */}
          <div>
            <input
              type={showPw ? 'text' : 'password'}
              placeholder="비밀번호"
              value={password}
              onFocus={() => setPwTouched(true)}
              onChange={(e) => onPasswordChange(e.target.value)}
            />
            <button onClick={() => setShowPw(!showPw)}>
              <img src={showPw ? '/images/hidePW.svg' : '/images/showPW.svg'} alt="view" />
            </button>
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <input
              type={showPwCheck ? 'text' : 'password'}
              placeholder="비밀번호 확인"
              value={passwordCheck}
              onFocus={() => setPwCheckTouched(true)}
              onChange={(e) => onPasswordCheckChange(e.target.value)}
            />
            <button onClick={() => setShowPwCheck(!showPwCheck)}>
              <img src={showPwCheck ? '/images/hidePW.svg' : '/images/showPW.svg'} alt="view" />
            </button>
          </div>
        </div>

        {/* 경고문 */}
        <p className={showPwError || showPwCheckError ? 'error' : ''}>
          <span>
            <img src="/images/exclamation-mark.svg" alt="exclamation-mark" />
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
    </>
  );
};

export default PasswordInput;
