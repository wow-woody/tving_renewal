import { useState } from 'react';
import type { Profile } from '../../type/Auth';
import { useUserStore } from '../../store/useUserStore';
import { useAuthStore } from '../../store/useAuthStore';
import './OpenEdit.scss';
import { createPortal } from 'react-dom';

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
        if (!user || !('uid' in user)) return;

        await removeProfile(user.uid, profile.id);
        onClose();
    };

    return createPortal(
        <div className="edit-popup-bg">
            <div className="edit-popup-wrap">
                <div className="edit-popup">
                    <img src={profile.image} alt={profile.name} />
                    <div className="edit-popup-right">
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            maxLength={10} />
                        <div className="btn-wrap">
                            <button className='edit' onClick={handleUpdate}>수정</button>

                            {!profile.owner && <button onClick={handleDel}>프로필 삭제</button>}
                        </div>
                    </div>
                    <button className='close' onClick={onClose}><img src="/images/cancle-white-icon.svg" alt="cancle" /></button>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')!
    );
};

export default OpenEdit;
