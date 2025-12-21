import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './scss/Edit_Members.scss';
import { useAuthStore } from '../../store/useAuthStore';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebase';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

type MemberForm = {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    phone: string;
};

const EMPTY: MemberForm = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
};

interface EditMembersProps {
    onClose?: () => void;
}

const Edit_Members = ({ onClose }: EditMembersProps = {}) => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [form, setForm] = useState<MemberForm>(EMPTY);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [emailEditing, setEmailEditing] = useState(false);
    const [phoneEditing, setPhoneEditing] = useState(false);

    // Firestore에서 사용자 정보 로드
    useEffect(() => {
        const fetchProfile = async () => {
            if (!user || !('uid' in user)) {
                setError('로그인이 필요합니다.');
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const userRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setForm((prev) => ({
                        ...prev,
                        name: userData.id || userData.name || '',
                        email: userData.email || '',
                        phone: userData.phone || '',
                    }));
                } else {
                    setError('사용자 정보를 찾을 수 없습니다.');
                }
            } catch (e) {
                console.error('프로필 조회 실패:', e);
                setError('회원 정보를 불러오지 못했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    const passwordsMatch = useMemo(
        () => !form.password || form.password === form.passwordConfirm,
        [form.password, form.passwordConfirm]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setSuccess(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!passwordsMatch) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (!user || !('uid' in user)) {
            setError('로그인이 필요합니다.');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // Firestore 사용자 정보 업데이트
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, {
                email: form.email,
                phone: form.phone,
            });

            // 비밀번호 변경 (입력된 경우에만)
            if (form.password) {
                const currentUser = auth.currentUser;
                if (currentUser && currentUser.email) {
                    // Firebase Auth 비밀번호 업데이트
                    await updatePassword(currentUser, form.password);
                }
            }

            setSuccess(true);
            setEmailEditing(false);
            setPhoneEditing(false);

            // 비밀번호 필드 초기화
            setForm((prev) => ({
                ...prev,
                password: '',
                passwordConfirm: '',
            }));

            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        } catch (e: any) {
            console.error('프로필 수정 실패:', e);
            setError(e.message || '수정 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="edit-members-page">
            {/* <div className="top">
                <Link to="/">
                    <img src="/images/tving-logo-main.svg" alt="logo" />
                </Link>
            </div> */}
            <div className="edit-members-wrap">
                <div className="edit-members-card">
                    <h2>회원정보 수정</h2>

                    {onClose && (
                        <button className="close" onClick={onClose}>
                            <img src="/images/cancle-white-icon.svg" alt="close" />
                        </button>
                    )}

                    <form onSubmit={handleSubmit} className="edit-members-form">
                        <label>
                            아이디
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="아이디"
                                readOnly
                                disabled
                            />
                        </label>

                        <label>
                            이메일
                            <div className="input-with-button">
                                <input
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="email@example.com"
                                    required
                                    readOnly={!emailEditing}
                                />
                                <button
                                    type="button"
                                    className="edit-btn"
                                    onClick={() => setEmailEditing(!emailEditing)}
                                >
                                    {emailEditing ? '완료' : '수정'}
                                </button>
                            </div>
                        </label>

                        <label>
                            비밀번호 (변경 시에만 입력)
                            <input
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="새 비밀번호"
                            />
                        </label>

                        <label>
                            비밀번호 확인
                            <input
                                name="passwordConfirm"
                                type="password"
                                value={form.passwordConfirm}
                                onChange={handleChange}
                                placeholder="새 비밀번호 확인"
                            />
                        </label>
                        {!passwordsMatch && (
                            <p className="error-text">비밀번호가 일치하지 않습니다.</p>
                        )}

                        <label>
                            전화번호
                            <div className="input-with-button">
                                <input
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="010-1234-5678"
                                    readOnly={!phoneEditing}
                                />
                                <button
                                    type="button"
                                    className="edit-btn"
                                    onClick={() => setPhoneEditing(!phoneEditing)}
                                >
                                    {phoneEditing ? '완료' : '수정'}
                                </button>
                            </div>
                        </label>

                        {error && <p className="error-text">{error}</p>}
                        {success && <p className="success-text">저장되었습니다.</p>}

                        <div className="actions">
                            <button type="button" onClick={() => onClose ? onClose() : navigate(-1)} disabled={loading}>
                                취소
                            </button>
                            <button type="submit" disabled={loading || !passwordsMatch}>
                                {loading ? '저장 중...' : '저장'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {/* <div className="footer-line"></div> */}
        </div>
    );
};

export default Edit_Members;
