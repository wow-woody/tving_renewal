import { useState } from 'react';
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

  return (
    <div className="profile-dropdown">
      {/* 현재 프로필 표시 */}
      <div className="current-profile" onClick={handleToggle}>
        <img src="/assets/Profile/profile-G.png" alt={currentProfile?.name} />
        <span>{currentProfile?.name}</span>
        <span className="arrow">{isOpen ? '▲' : '▼'}</span>
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
                  onClick={() => handleSelectProfile(profile.id)}>
                  <img src="/assets/Profile/profile-G.png" alt={profile.name} />
                  <span>{profile.name}</span>
                </div>
              ))}
          </div>

          {/* 하단 버튼 */}
          <div className="dropdown-actions">
            <Link to="/editprofile" onClick={() => setIsOpen(false)}>
              프로필 수정
            </Link>
            <button onClick={onLogout}>로그아웃</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSelect;
