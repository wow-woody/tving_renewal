import { useEffect, useRef, useState } from 'react';
import { useUserStore } from '../../store/useUserStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Link } from 'react-router-dom';
import './ProfileSelect.scss';

const ProfileSelect = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { profiles, profileId, onSetProfile } = useUserStore();
    const { onLogout } = useAuthStore();

    const currentProfile = profiles.find((p) => p.id === profileId);

    const handleToggle = () => setIsOpen(!isOpen);

    const handleSelectProfile = (id: string) => {
        onSetProfile(id);
        setIsOpen(false);
    };

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                isOpen && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const handleScroll = () => setIsOpen(false);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isOpen]);



    return (
        <div className="profile-dropdown" ref={dropdownRef}>
            {/* 현재 프로필 표시 */}
            <div className="current-profile" onClick={handleToggle}>
                <span>{currentProfile?.name}</span>
                <img src={currentProfile?.image} alt={currentProfile?.name} />
                {/* <span className="arrow">{isOpen ? '▲' : '▼'}</span> */}
            </div>

            {/* 드롭다운 메뉴 */}
            {isOpen && (
                <div className="dropdown-menu">
                    {/* 프로필 리스트 */}
                    <div className="profile-list">
                        {profiles
                            .filter((profile) => profile.id !== profileId)
                            .map((profile) => (
                                <div
                                    key={profile.id}
                                    className="profile-item"
                                    onClick={() => handleSelectProfile(profile.id)}
                                >
                                    <span>{profile.name}</span>
                                    <img src={profile.image} alt={profile.name} />
                                </div>
                            ))}
                    </div>

                    {/* 하단 버튼 */}
                    <div className="dropdown-actions">
                        <Link to="/editprofile" onClick={() => setIsOpen(false)}>
                            프로필 수정
                        </Link>
                        <button className="logout-btn" onClick={onLogout}>
                            로그아웃
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileSelect;
