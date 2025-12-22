import { useEffect, useState } from 'react';
import type { ChangeEvent } from '../../../type/Auth';

import Popup1 from '../../../components/Join-Popup/Popup1';
import Popup2 from '../../../components/Join-Popup/Popup2';
import Popup3 from '../../../components/Join-Popup/Popup3';
import Popup4 from '../../../components/Join-Popup/Popup4';

interface Props {
  onChangeCheck: (checked: boolean) => void;
}

const Agree = ({ onChangeCheck }: Props) => {
  //------------ 하단 체크박스 ------------

  // 마케팅 마스터 체크박스
  const [marketingMasterChecked, setMarketingMasterChecked] = useState(false);

  // 마케팅 세부 체크박스 3개
  const [marketingSelect, setMarketingSelect] = useState([false, false, false]);

  // 나머지 체크박스: 0:만 14세 이상, 1:[필수] 서비스 이용약관, 2:[필수] 개인정보, 3:[선택] 개인정보
  const [otherCheckboxes, setOtherCheckboxes] = useState([false, false, false, false]);

  // 전체 체크박스 변경
  const handleAllChange = (e: ChangeEvent) => {
    const checked = e.target.checked;
    setMarketingMasterChecked(checked);
    setMarketingSelect(marketingSelect.map(() => checked));
    setOtherCheckboxes(otherCheckboxes.map(() => checked));
  };

  // 마케팅 마스터 체크박스 변경
  const handleMarketingMasterChange = (e: ChangeEvent) => {
    const checked = e.target.checked;
    setMarketingMasterChecked(checked);
    setMarketingSelect(marketingSelect.map(() => checked));
  };

  // 마케팅 세부 체크박스 변경
  const handleMarketingSelectChange = (index: number) => (e: ChangeEvent) => {
    const newValues = [...marketingSelect];
    newValues[index] = e.target.checked;
    setMarketingSelect(newValues);

    // 하나라도 체크되면 마케팅 마스터 체크
    setMarketingMasterChecked(newValues.some((v) => v));
  };

  // 나머지 체크박스 변경
  const handleOtherCheckboxChange = (index: number) => (e: ChangeEvent) => {
    const newValues = [...otherCheckboxes];
    newValues[index] = e.target.checked;
    setOtherCheckboxes(newValues);
  };

  // all 체크박스 동기화
  const allChecked = [...otherCheckboxes, marketingMasterChecked, ...marketingSelect].every(
    (v) => v
  );

  // 필수 체크박스 확인
  const isRequiredChecked = otherCheckboxes[0] && otherCheckboxes[1] && otherCheckboxes[2]; // 필수 세 개 체크 여부

  useEffect(() => {
    onChangeCheck(isRequiredChecked);
  }, [isRequiredChecked, onChangeCheck]);

  //------------popup------------
  const [openPopup, setOpenPopup] = useState<string | null>(null);

  const closePopup = () => setOpenPopup(null);

  const handlePopupAgree = (popupName: string) => {
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
    <>
      <div className="agreement">
        <label className="all">
          <input type="checkbox" checked={allChecked} onChange={handleAllChange} />
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
              <span>[필수] 만 14세 이상입니다.</span>
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
      </div>
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
    </>
  );
};

export default Agree;
