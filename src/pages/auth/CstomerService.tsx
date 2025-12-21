import { useState } from 'react';
import { createPortal } from 'react-dom';
import './scss/CstomerService.scss';
import { useAuthStore } from '../../store/useAuthStore';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

type InquiryForm = {
    title: string;
    category: string;
    content: string;
    email: string;
};

const EMPTY: InquiryForm = {
    title: '',
    category: '일반문의',
    content: '',
    email: '',
};

interface CustomerServiceProps {
    onClose: () => void;
}

const CstomerService = ({ onClose }: CustomerServiceProps) => {
    const { user } = useAuthStore();
    const [form, setForm] = useState<InquiryForm>(EMPTY);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [categoryModal, setCategoryModal] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [categoryClosing, setCategoryClosing] = useState(false);

    const categories = ['일반문의', '기술문제', '결제문제', '콘텐츠문의', '계정관련', '기타'];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setError(null);
    };

    const handleCategorySelect = (category: string) => {
        setForm((prev) => ({ ...prev, category }));
        setCategoryModal(false);
        setError(null);
    };

    const handleCategoryKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!categoryModal) return;

        const buttons = document.querySelectorAll('.category-option');
        const activeElement = document.activeElement as HTMLElement;
        const activeIndex = Array.from(buttons).indexOf(activeElement);

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = activeIndex + 1 < buttons.length ? activeIndex + 1 : 0;
            (buttons[nextIndex] as HTMLButtonElement).focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : buttons.length - 1;
            (buttons[prevIndex] as HTMLButtonElement).focus();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeElement && activeElement.classList.contains('category-option')) {
                (activeElement as HTMLButtonElement).click();
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.title.trim()) {
            setError('제목을 입력해주세요.');
            return;
        }

        if (!form.email.trim()) {
            setError('이메일을 입력해주세요.');
            return;
        }

        if (!form.content.trim()) {
            setError('문의 내용을 입력해주세요.');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const inquiryRef = collection(db, 'inquiries');
            await addDoc(inquiryRef, {
                title: form.title,
                category: form.category,
                content: form.content,
                email: form.email,
                uid: user && 'uid' in user ? user.uid : null,
                createdAt: Timestamp.now(),
                status: '답변대기',
            });

            setSuccess(true);
            setForm(EMPTY);

            // 1초간 성공 메시지 노출 후 부드럽게 닫힘 애니메이션(200ms)
            setTimeout(() => {
                setSuccess(false);
                setIsClosing(true);
                setTimeout(() => {
                    setIsClosing(false);
                    onClose();
                }, 200);
            }, 1000);
        } catch (e: any) {
            console.error('문의 등록 실패:', e);
            setError(e.message || '문의 등록 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return createPortal(
        <div className={`customer-service-page ${isClosing ? 'closing' : ''}`}>
            <div className="customer-service-wrap">
                <div className="customer-service-card">
                    <h2>고객센터 문의</h2>

                    <button className="close" onClick={onClose}>
                        <img src="/images/cancle-white-icon.svg" alt="cancle" />
                    </button>

                    <form onSubmit={handleSubmit} className="customer-service-form">
                        <label>
                            <h3>문의 제목</h3>
                            <input
                                name="title"
                                type="text"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="문의 제목을 입력해주세요"
                                maxLength={100}
                            />
                        </label>

                        <label>
                            <h3>문의 유형</h3>
                            <div className="category-selector" onKeyDown={handleCategoryKeyDown}>
                                <button
                                    type="button"
                                    className="category-button"
                                    onClick={() => setCategoryModal(!categoryModal)}
                                >
                                    {form.category}
                                    <span className="arrow">{categoryModal ? '▲' : '▼'}</span>
                                </button>

                                {(categoryModal || categoryClosing) && (
                                    <div
                                        className={`category-modal ${
                                            categoryClosing ? 'closing' : ''
                                        }`}
                                    >
                                        {categories.map((cat) => (
                                            <button
                                                key={cat}
                                                type="button"
                                                tabIndex={0}
                                                className={`category-option ${
                                                    form.category === cat ? 'active' : ''
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setForm((prev) => ({ ...prev, category: cat }));
                                                    setError(null);
                                                    // 닫힘 애니메이션
                                                    setCategoryModal(false);
                                                    setCategoryClosing(true);
                                                    setTimeout(
                                                        () => setCategoryClosing(false),
                                                        250
                                                    );
                                                }}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </label>

                        <label>
                            <h3>이메일</h3>
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="답변을 받을 이메일 주소"
                                required
                            />
                        </label>

                        <label className="content-label">
                            <h3>문의 내용</h3>
                            <textarea
                                name="content"
                                value={form.content}
                                onChange={handleChange}
                                placeholder="상세한 문의 내용을 입력해주세요"
                                maxLength={2000}
                            />
                            <div className="char-count">{form.content.length} / 2000</div>
                        </label>

                        {error && <p className="error-text">{error}</p>}
                        {success && (
                            <p className="success-text">문의가 등록되었습니다. 감사합니다!</p>
                        )}

                        <div className="actions">
                            <button type="button" onClick={onClose} disabled={loading}>
                                취소
                            </button>
                            <button type="submit" disabled={loading}>
                                {loading ? '등록 중...' : '문의 등록'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')!
    );
};

export default CstomerService;
