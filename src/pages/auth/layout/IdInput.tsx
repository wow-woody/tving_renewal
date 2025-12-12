import { useState } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const IdInput = ({ value, onChange }: Props) => {
  const [idtouched, setIdtouched] = useState(false);

  const idRegex = /^[a-z0-9]+$/;

  const isFormatValid = idRegex.test(value);
  const isLengthValid = value.length >= 6 && value.length <= 12;

  const showIdError = idtouched && (!isFormatValid || !isLengthValid);
  return (
    <>
      <div className="id">
        <div>
          <input
            type="id"
            placeholder="아이디"
            value={value}
            onFocus={() => setIdtouched(true)}
            onChange={(e) => onChange(e.target.value)}
          />
          <button
            onClick={() => {
              onChange('');
            }}>
            <img src="/images/login-close.svg" alt="close" />
          </button>
        </div>
        <p className={showIdError ? 'error' : ''}>
          <span>
            <img src="/images/exclamation-mark.svg" alt="exclamation-mark" />
          </span>

          {showIdError
            ? value.length === 0
              ? '내용을 입력해 주세요'
              : !isFormatValid
              ? '영문 소문자 또는 영문 소문자+숫자 조합 6~12자리'
              : value.length < 6
              ? '영문 소문자 또는 영문 소문자+숫자 조합 6자리 이상 입력해 주세요'
              : value.length > 12
              ? '영문 소문자 또는 영문 소문자+숫자 조합 12자리 이하로 입력해 주세요'
              : null
            : '영문 소문자 또는 영문 소문자+숫자 조합 6~12자리'}
        </p>
      </div>
    </>
  );
};

export default IdInput;
