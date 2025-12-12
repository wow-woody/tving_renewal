interface Props {
  value: string;
  onChange: (v: string) => void;
}

const EmailInput = ({ value, onChange }: Props) => {
  return (
    <>
      <div className="email">
        <div>
          <input
            type="email"
            placeholder="이메일"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <button>
            <img src="/images/login-close.svg" alt="close" />
          </button>
        </div>
        <p>
          <span>
            <img src="/images/exclamation-mark.svg" alt="exclamation-mark" />
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
    </>
  );
};

export default EmailInput;
