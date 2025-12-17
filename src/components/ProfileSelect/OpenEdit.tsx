import { useState } from 'react';
import type { Profile } from '../../type/Auth';
import { useUserStore } from '../../store/useUserStore';
import { useAuthStore } from '../../store/useAuthStore';

interface EditPopupProps {
  profile: Profile;
  onClose: () => void;
}

const OpenEdit = ({ profile, onClose }: EditPopupProps) => {
  const { user } = useAuthStore();
  const { removeProfile, updatePro } = useUserStore();
  const [name, setName] = useState(profile.name);

  const handleUpdate = async () => {
    if (!user || !('uid' in user)) return;
    if (!name.trim()) return;

    await updatePro(user.uid, profile.id, name.trim());
    onClose();
  };

  const handleDel = async () => {
    await removeProfile(user.uid, profile.id);
    onClose();
  };

  return (
    <>
      <div className="edit-popup">
        <img src={profile.image} alt={profile.name} />
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={handleUpdate}>수정</button>

        {!profile.owner && <button onClick={handleDel}>프로필 삭제</button>}
        <button onClick={onClose}>닫기</button>
      </div>
    </>
  );
};

export default OpenEdit;
