import { useState } from 'react';

const IdInput = () => {
  const [id, setId] = useState('');
  const [idtouched, setIdtouched] = useState(false);

  const idRegex = /^[a-z0-9]+$/;

  const isFormatValid = idRegex.test(id);
  const isLengthValid = id.length >= 6 && id.length <= 12;

  const showIdError = idtouched && (!isFormatValid || !isLengthValid);
  return (
    <>
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
            }}>
            <img src="/images/login-close.svg" alt="close" />
          </button>
        </div>
        <p className={showIdError ? 'error' : ''}>
          <span>
            <img src="/images/exclamation-mark.svg" alt="exclamation-mark" />
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
    </>
  );
};

export default IdInput;
