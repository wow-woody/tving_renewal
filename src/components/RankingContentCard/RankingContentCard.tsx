import { Link } from 'react-router-dom';

import type { Content } from '../../types/content'
import { RankScope } from '../../types/enum'

import styles from'./RankingContentCard.module.scss'

interface RankingContentCardType {
    item: Content;
    rankScope: RankScope;
}

const RankingContentCard = ({ item, rankScope }: RankingContentCardType) => {
    const rank = item.rank?.[rankScope];

    return (
        <Link to={`/detail/${item.id}`} className={styles['rank-content-card']}>
            {/* 숫자 영역 */}
            <div className={styles['rank-box']}>
                {rank && (
                    <img
                        src={`/images/rank/rank-${String(rank).padStart(2, "0")}.svg`}
                        alt={String(rank)}
                    />
                )}
            </div>

            {/* 포스터 영역 */}
            <div className={styles['poster-box']}>
                <img className="img1" src={item.img1} alt={item.title} />
            </div>
        </Link>
    );
};

export default RankingContentCard