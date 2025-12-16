import React from 'react';
import styles from './scss/Popup3.module.scss';
import { createPortal } from 'react-dom';

interface PopupProps {
    onClose: () => void;
    onAgree: () => void;
}

const Popup3 = ({ onClose, onAgree }: PopupProps) => {
    return createPortal(
        <div className={styles['popup-bg']}>
            <div className={styles['popup-wrap']}>
                <div className={styles['popup-box']}>
                    <h2 className={styles['title']}>[선택] 개인정보 수집 및 이용 동의 안내</h2>
                    <div className={styles['content']}>
                        <table>
                            <thead>
                                <tr>
                                    <td>수집/이용 목적</td>
                                    <td>수집 항목</td>
                                    <td>보유 및 이용기간</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        서비스/업데이트 정보 제공, 맞춤형 서비스/광고 제공,
                                        이벤트/마케팅/광고 활용
                                    </td>
                                    <td>
                                        회원번호, 이름, ID, 이메일 주소, 휴대폰 번호, 디바이스 토큰,
                                        서비스 이용기록, 성별, 생년월일, ADID, 국가
                                    </td>
                                    <td className="bold">동의 철회 또는 회원탈퇴시까지</td>
                                </tr>
                                <tr>
                                    <td>이벤트 응모 및 경품 신청(네이버폼, 모아폼 등)</td>
                                    <td>
                                        회원번호, 이름, ID, 이메일 주소, 휴대폰 번호, 집 전화번호,
                                        배송지 주소
                                    </td>
                                    <td className="bold">회원탈퇴 후 5일까지</td>
                                </tr>
                                <tr>
                                    <td>CJ ONE 통합회원 가입 및 회원관리</td>
                                    <td>
                                        CJ ONE ID, CJ ONE 회원번호, 비밀번호, 이름, 영어이름, CI,
                                        성별, 휴대폰 번호, 이메일 주소, 생년월일
                                    </td>
                                    <td className="bold">동의 철회 또는 이벤트 목적 달성시까지</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={styles['button-wrap']}>
                        <button onClick={onAgree}>동의합니다</button>
                        <button onClick={onClose}>동의하지 않습니다.</button>
                    </div>
                    <button className={styles['close']} onClick={onClose}>
                        <img src="/images/cancle-white-icon.svg" alt="cancle" />
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')!
    );
};

export default Popup3;
