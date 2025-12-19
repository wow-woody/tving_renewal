import { Link } from "react-router-dom";
import type { Content } from "../../type/content";

interface Props {
  item: Content;
  rank: number;
}

const AppleTvCard = ({ item, rank }: Props) => {
  return (
    <Link to={`/detail/${item.id}`} className="apple-tv-card-wrapper">
      {/* 랭킹 숫자 */}
      {rank && (
        <div className="rank-box">
          <img
            src={`/images/rank/rank-${String(rank).padStart(2, "0")}.png`}
            alt={String(rank)}
          />
        </div>
      )}

      {/* 카드 */}
      <div className="apple-tv-card">
        <img src={item.img1} alt={item.title} />
      </div>
    </Link>
  );
};

export default AppleTvCard;
