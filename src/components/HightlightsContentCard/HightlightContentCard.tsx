import { Link } from 'react-router-dom';
import type { Content } from '../../types/content';
import styles from './HighlightsCard.module.scss';

interface HightlightsContentCardTypes {
    item: Content;
    rank?: number | string; // 랭킹 숫자가 있을 경우 전달
}

const HightlightsContentCard = ({ item, rank }: HightlightsContentCardTypes) => {
    return (
        <Link to={`/detail/${item.id}`} className={styles['highlights-card']}>
            <div className={styles['card-container']}>
                {/* 1. 랭킹 숫자 영역 (rank가 있을 때만 렌더링) */}
                {rank !== undefined && (
                    <div className={styles['rank-box']}>
                        <img
                            src={`/images/rank/rank-${String(rank).padStart(2, "0")}.svg`}
                            alt={`Rank ${rank}`}
                        />
                    </div>
                )}

                {/* 2. 포스터 영역 */}
                <div className={styles['poster-box']}>
                    {item.img1 ? (
                        <img src={item.img1} alt={item.title} loading="lazy" />
                    ) : (
                        // 이미지가 없을 때 나타나는 영역
                        <div className={styles['no-poster']}>
                            <span className={styles['no-poster-title']}>{item.title}</span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default HightlightsContentCard;