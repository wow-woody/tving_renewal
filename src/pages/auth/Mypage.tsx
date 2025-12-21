import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/useUserStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useEffect, useState } from 'react';
import { getLiveAlarms, removeLiveAlarm, type LiveAlarm } from '../../firebase/liveAlarms';
import CstomerService from './CstomerService';
import Edit_Members from './Edit_Members';
import './scss/Mypage.scss';

const Mypage = () => {
    const { profiles, profileId } = useUserStore();
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const currentProfile = profiles.find((p) => p.id === profileId);
    const [liveAlarms, setLiveAlarms] = useState<LiveAlarm[]>([]);
    const [showCustomerService, setShowCustomerService] = useState(false);
    const [showEditMembers, setShowEditMembers] = useState(false);

    useEffect(() => {
        const fetchAlarms = async () => {
            if (user?.uid) {
                const alarms = await getLiveAlarms(user.uid);
                setLiveAlarms(alarms);
            }
        };
        fetchAlarms();
    }, [user]);

    const handleRemoveAlarm = async (channelId: string) => {
        if (!user?.uid) return;
        const success = await removeLiveAlarm(user.uid, channelId);
        if (success) {
            setLiveAlarms(prev => prev.filter(alarm => alarm.channelId !== channelId));
            alert('알림이 삭제되었습니다.');
        }
    };

    const handleAlarmClick = (channelId: string) => {
        navigate('/live', { state: { channelId } });
    };
    return (
        <div className="mypage-wrap">
            <div className="user-info-wrap">
                <div className="user-info">
                    <div className="user">
                        <div className="top-title">
                            <h3 className="sub-title">계정관리</h3>
                            <div className="link">
                                <Link to="/editprofile">
                                    <p>프로필 수정</p>
                                    <img src="/images/edit.svg" alt="edit" />
                                </Link>
                            </div>
                        </div>
                        <div className="current-profile">
                            {currentProfile && (
                                <>
                                    <img src={currentProfile.image} alt={currentProfile.name} />
                                    <span>{currentProfile.name}</span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="subscribe">
                        <div className="top-title">
                            <h3 className="sub-title">이용권 관리</h3>
                            <div className="link">
                                <Link to="/subscription">
                                    {/* 이용권 이름 들어와야 함 */}
                                    <p>3PACK 이용권</p>
                                    <img src="/images/edit.svg" alt="edit" />
                                </Link>
                            </div>
                        </div>
                        {/* 이용권 선택 */}
                        <div className="current-subscribe">
                            <div className="subscribe-info">
                                <img src="/images/tving-icon.svg" alt="" />
                                <p>동시시청 2대 | 고화질 | 모든 디바이스</p>
                            </div>
                            <div className="subscribe-info">
                                <img src="/images/tving-icon.svg" alt="" />
                                <p>동시시청 2대 | 고화질 | 모든 디바이스</p>
                            </div>
                            <div className="subscribe-info">
                                <img src="/images/tving-icon.svg" alt="" />
                                <p>동시시청 2대 | 고화질 | 모든 디바이스</p>
                            </div>
                        </div>
                    </div>

                    <div className="cs">
                        <div className="top-title">
                            <h3 className="sub-title">설정 및 관리</h3>
                        </div>
                        <div className="setting">
                            <div onClick={() => setShowCustomerService(true)} style={{ cursor: 'pointer' }}>
                                <img src="/images/cs-1.svg" alt="cs-1" />
                                <p>고객센터 문의</p>
                            </div>
                            <div onClick={() => setShowEditMembers(true)} style={{ cursor: 'pointer' }}>
                                <img src="/images/cs-2.svg" alt="cs-2" />
                                <p>회원정보 수정</p>
                            </div>
                            <div>
                                <img src="/images/cs-3.svg" alt="cs-3" />
                                <p>보유캐시</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="watching-list">
                <div className="title-wrap">
                    <h2>전체 시청 내역</h2>
                    <div className="pagenation-wrap">
                        <div className="pagenation-area">
                            <div className="pagenation-line"></div>
                            <div className="pointer-line"></div>
                        </div>
                        <div className="nav-btn">
                            <button className="prev">
                                <img src="/images/arrow-left.svg" alt="prev" />
                            </button>
                            <button className="next">
                                <img src="/images/arrow-right.svg" alt="next" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="interest">
                <div className="title-wrap">
                    <h2>관심 컨텐츠</h2>
                    <div className="pagenation-wrap">
                        <div className="pagenation-area">
                            <div className="pagenation-line"></div>
                            <div className="pointer-line"></div>
                        </div>
                        <div className="nav-btn">
                            <button className="prev">
                                <img src="/images/arrow-left.svg" alt="prev" />
                            </button>
                            <button className="next">
                                <img src="/images/arrow-right.svg" alt="next" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="live">
                <div className="title-wrap">
                    <h2>라이브 예약 알림</h2>
                </div>
                <div className="live-alarm-list">
                    {liveAlarms.length === 0 ? (
                        <p className="empty-message">설정된 알림이 없습니다.</p>
                    ) : (
                        liveAlarms.map((alarm) => (
                            <div key={alarm.id} className="alarm-item">
                                <div className="alarm-thumb" onClick={() => handleAlarmClick(alarm.channelId)}>
                                    <img src={alarm.thumb} alt={alarm.title} />
                                </div>
                                <div className="alarm-info">
                                    <p className="alarm-title" onClick={() => handleAlarmClick(alarm.channelId)}>{alarm.title}</p>
                                    <button 
                                        className="remove-btn"
                                        onClick={() => handleRemoveAlarm(alarm.channelId)}
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {showCustomerService && (
                <CstomerService onClose={() => setShowCustomerService(false)} />
            )}
            {showEditMembers && (
                <div className="modal-overlay" onClick={() => setShowEditMembers(false)}>
                    <div onClick={(e) => e.stopPropagation()}>
                        <Edit_Members onClose={() => setShowEditMembers(false)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Mypage;
