import { Link } from 'react-router-dom';

import type { Content } from '../../types/content'
import { RankScope } from '../../types/enum'

import './RankingContentCard.scss'

interface RankingContentCardType {
    item: Content;
    rankScope: RankScope; // ✅ 추가
}

const RankingContentCard = ({ item, rankScope }: RankingContentCardType) => {
    const rank = item.rank?.[rankScope];

    return (
        <Link to={`/detail/${item.id}`} className="rank-content-card">
            {/* 숫자 영역 */}
            <div className="rank-box">
                {rank && (
                    <img
                        src={`/images/rank/rank-${String(rank).padStart(2, "0")}.svg`}
                        alt={String(rank)}
                    />
                )}
            </div>

            {/* 포스터 영역 */}
            <div className="poster-box">
                <img className="img1" src={item.img1} alt={item.title} />
            </div>
        </Link>
    );
};

export default RankingContentCard