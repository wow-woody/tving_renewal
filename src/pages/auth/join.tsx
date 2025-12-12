import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../scss/Join.scss';
import Popup1 from '../../components/Join-Popup/Popup1';
import Popup2 from '../../components/Join-Popup/Popup2';
import Popup3 from '../../components/Join-Popup/Popup3';
import Popup4 from '../../components/Join-Popup/Popup4';

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

    //------------ 하단 체크박스 ------------
    // 전체 체크
    const [allChecked, setAllChecked] = useState(false);

    // 마케팅 마스터 체크박스
    const [marketingMasterChecked, setMarketingMasterChecked] = useState(false);

    // 마케팅 세부 체크박스 3개
    const [marketingSelect, setMarketingSelect] = useState([false, false, false]);

    // 나머지 체크박스: 0:만 14세 이상, 1:[필수] 서비스 이용약관, 2:[필수] 개인정보, 3:[선택] 개인정보
    const [otherCheckboxes, setOtherCheckboxes] = useState([false, false, false, false]);

    // 전체 체크박스 변경
    const handleAllChange = (e) => {
        const checked = e.target.checked;
        setAllChecked(checked);
        setMarketingMasterChecked(checked);
        setMarketingSelect(marketingSelect.map(() => checked));
        setOtherCheckboxes(otherCheckboxes.map(() => checked));
    };

    // 마케팅 마스터 체크박스 변경
    const handleMarketingMasterChange = (e) => {
        const checked = e.target.checked;
        setMarketingMasterChecked(checked);
        setMarketingSelect(marketingSelect.map(() => checked));
    };

    // 마케팅 세부 체크박스 변경
    const handleMarketingSelectChange = (index) => (e) => {
        const newValues = [...marketingSelect];
        newValues[index] = e.target.checked;
        setMarketingSelect(newValues);

        // 하나라도 체크되면 마케팅 마스터 체크
        setMarketingMasterChecked(newValues.some((v) => v));
    };

    // 나머지 체크박스 변경
    const handleOtherCheckboxChange = (index) => (e) => {
        const newValues = [...otherCheckboxes];
        newValues[index] = e.target.checked;
        setOtherCheckboxes(newValues);
    };

    // all 체크박스 동기화
    useEffect(() => {
        const all = [...otherCheckboxes, marketingMasterChecked, ...marketingSelect].every(
            (v) => v
        );
        setAllChecked(all);
    }, [otherCheckboxes, marketingMasterChecked, marketingSelect]);

    // 필수 체크박스 확인
    const isRequiredChecked = otherCheckboxes[1] && otherCheckboxes[2]; // 필수 두 개 체크 여부

    const handleNextStep = () => {
        if (!isRequiredChecked) {
            alert('필수 항목을 모두 체크해주세요.');
            return;
        }
        alert('다음 단계로 진행!');
    };

    //------------popup------------
    const [openPopup, setOpenPopup] = useState(null);

    const closePopup = () => setOpenPopup(null);

    const handlePopupAgree = (popupName) => {
        if (popupName === 'popup1') {
            setOtherCheckboxes((prev) => {
                const newValues = [...prev];
                newValues[1] = true;
                return newValues;
            });
        } else if (popupName === 'popup2') {
            setOtherCheckboxes((prev) => {
                const newValues = [...prev];
                newValues[2] = true;
                return newValues;
            });
        } else if (popupName === 'popup3') {
            setOtherCheckboxes((prev) => {
                const newValues = [...prev];
                newValues[3] = true;
                return newValues;
            });
        } else if (popupName === 'popup4') {
            setMarketingMasterChecked(true);
            setMarketingSelect([true, true, true]);
        }

        closePopup();
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
                            <label className="all">
                                <input
                                    type="checkbox"
                                    checked={allChecked}
                                    onChange={handleAllChange}
                                />
                                <span className="fake"></span>
                                <span>필수 및 선택 항목을 모두 포함하여 동의합니다</span>
                            </label>
                            <div className="select-box">
                                <div>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={otherCheckboxes[0]}
                                            onChange={handleOtherCheckboxChange(0)}
                                        />
                                        <span className="fake"></span>
                                        <span>만 14세 이상입니다.</span>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={otherCheckboxes[1]}
                                            onChange={handleOtherCheckboxChange(1)}
                                        />
                                        <span className="fake"></span>
                                        <span>[필수] 서비스 이용약관 동의</span>
                                    </label>
                                    <button type="button" onClick={() => setOpenPopup('popup1')}>
                                        <img src="/images/arrow-right.svg" alt="more" />
                                    </button>
                                </div>
                                <div>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={otherCheckboxes[2]}
                                            onChange={handleOtherCheckboxChange(2)}
                                        />
                                        <span className="fake"></span>
                                        <span>[필수] 개인정보 수집 및 이용 동의</span>
                                    </label>
                                    <button type="button" onClick={() => setOpenPopup('popup2')}>
                                        <img src="/images/arrow-right.svg" alt="more" />
                                    </button>
                                </div>
                                <div>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={otherCheckboxes[3]}
                                            onChange={handleOtherCheckboxChange(3)}
                                        />
                                        <span className="fake"></span>
                                        <span>[선택] 개인정보 수집 및 이용 동의</span>
                                    </label>
                                    <button type="button" onClick={() => setOpenPopup('popup3')}>
                                        <img src="/images/arrow-right.svg" alt="more" />
                                    </button>
                                </div>
                                <div>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={marketingMasterChecked}
                                            onChange={handleMarketingMasterChange}
                                        />
                                        <span className="fake"></span>
                                        <span>[선택] 마케팅 정보 수신 동의</span>
                                    </label>
                                    <button type="button" onClick={() => setOpenPopup('popup4')}>
                                        <img src="/images/arrow-right.svg" alt="more" />
                                    </button>
                                </div>
                                <div className="marketing-select">
                                    {['푸쉬 알림', '문자 알림', '이메일 알림'].map((label, i) => (
                                        <label key={i}>
                                            <input
                                                type="checkbox"
                                                checked={marketingSelect[i]}
                                                onChange={handleMarketingSelectChange(i)}
                                            />
                                            <span className="fake"></span>
                                            <span>{label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </form>

                        <button className="join-btn" onClick={handleNextStep}>
                            가입하기
                        </button>
                    </div>
                    <button className="back">
                        <p>뒤로가기</p>
                    </button>
                </div>
            </div>
            <div className="footer-line"></div>
            {openPopup === 'popup1' && (
                <Popup1 onClose={closePopup} onAgree={() => handlePopupAgree('popup1')} />
            )}
            {openPopup === 'popup2' && (
                <Popup2 onClose={closePopup} onAgree={() => handlePopupAgree('popup2')} />
            )}
            {openPopup === 'popup3' && (
                <Popup3 onClose={closePopup} onAgree={() => handlePopupAgree('popup3')} />
            )}
            {openPopup === 'popup4' && (
                <Popup4 onClose={closePopup} onAgree={() => handlePopupAgree('popup4')} />
            )}
        </div>
    );
};

export default Join;
