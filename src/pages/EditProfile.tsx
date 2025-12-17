import { Link, useNavigate } from 'react-router-dom';
import './scss/EditProfile.scss';
import { useUserStore } from '../store/useUserStore';
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';
import { ProfileImg } from '../constants/ProfileImages';
import type { Profile } from '../type/Auth';
import OpenEdit from '../components/ProfileSelect/OpenEdit';

const EditProfile = () => {
  const { profiles, addProfile } = useUserStore();
  const { user } = useAuthStore();

  const [openEdit, setOpenEdit] = useState<Profile | null>(null);
  const closeEdit = () => setOpenEdit(null);

  const [add, setAdd] = useState(false);
  const [newName, setNewName] = useState('');

  const navigate = useNavigate();

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

  const newImg = profiles.length < 4 ? ProfileImg[profiles.length] : ProfileImg[0];

  return (
    <div className="edit-profile-wrappers">
      <div className="top">
        <Link to="/">
          <img src="/images/tving-logo-main.svg" alt="logo" />
        </Link>
      </div>

      <div className="edit-profile-wrap">
        <h2 className="edit-title">프로필 수정</h2>

        <div className="edit-select-wrap">
          <div className="edit-sub-title-wrap">
            <h3 className="edit-sub-title">수정할 프로필을 선택해 주세요</h3>
          </div>

          <div className="edit-profiles">
            {profiles.map((profile) => (
              <div key={profile.id} className="profile-id">
                <p>
                  <img src={profile.image} alt={profile.name} />
                </p>
                <p className="edit-name">{profile.name}</p>
                <button className="edit-btn" onClick={() => setOpenEdit(profile)}>
                  프로필 편집
                </button>
              </div>
            ))}

            {add && (
              <div className="profile-id creating">
                <p>
                  <img src={newImg} alt="new profile" />
                </p>

                <input
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  maxLength={10}
                  autoFocus
                />

                <button onClick={handleSaveProfile}>추가</button>
              </div>
            )}

            {/* ➕ 추가 버튼 */}
            {!add && profiles.length < 4 && (
              <div className="profile-add" onClick={handleAddProfile}>
                <p></p>
                <button className="add-btn">프로필 추가</button>
              </div>
            )}
          </div>
        </div>
        <div className="back-wrap">
          <button className="back" onClick={() => navigate(-1)}>
            <p className="back-btn">나가기</p>
          </button>
        </div>
      </div>
      <div className="footer-line"></div>
      {openEdit && <OpenEdit profile={openEdit} onClose={() => setOpenEdit(null)} />}
    </div>
  );
};

export default EditProfile;
