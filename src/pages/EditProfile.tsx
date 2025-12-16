import { Link } from 'react-router-dom';
import './scss/EditProfile.scss';
import { useUserStore } from '../store/useUserStore';
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';

const EditProfile = () => {
  const { profiles, addProfile } = useUserStore();
  const { user } = useAuthStore();

  const [add, setAdd] = useState(false);
  const [newName, setNewName] = useState('');

  const handleAddProfile = async () => {
    if (!user || !('uid' in user)) return;
    if (profiles.length >= 4) return;
    setAdd(true);
  };

  const handleSaveProfile = async () => {
    if (!user || !('uid' in user)) return;
    if (!newName.trim()) return;

    await addProfile(user.uid, newName.trim());
    setNewName('');
    setAdd(false);
  };

  return (
    <div>
      <Link to="/" className="edit-logo">
        <img src="/images/tving-logo-main.svg" alt="" />
      </Link>
      <div className="edit-title">
        <h2>프로필 수정</h2>
        <h3>수정할 프로필을 선택해 주세요</h3>
      </div>
      <div className="edit-profiles">
        {profiles.map((profile) => (
          <div key={profile.id} className="profile-id">
            <p>
              <img src="/assets/Profile/profile-G.png" alt={profile.name} />
            </p>
            <p>{profile.name}</p>
            <button>프로필 편집</button>
          </div>
        ))}

        {add && (
          <div className="profile-id creating">
            <p>
              <img src="/assets/Profile/profile-G.png" alt="new profile" />
            </p>

            <input
              type="text"
              placeholder="이름을 입력하세요"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              maxLength={10}
              autoFocus
            />

            <button onClick={handleSaveProfile}>완료</button>
          </div>
        )}

        {/* ➕ 추가 버튼 */}
        {!add && profiles.length < 4 && (
          <div className="profile-add" onClick={handleAddProfile}>
            <p></p>
            <button>프로필 추가</button>
          </div>
        )}
      </div>
      <button className="back">
        <p>뒤로가기</p>
      </button>
    </div>
  );
};

export default EditProfile;
