import { Link } from "react-router-dom";
import type { Content } from "../../type/content";

interface Props {
  item: Content;
  rank: number;
}

const KblCard = ({ item, rank }: Props) => {
  return (
    <Link to={`/detail/${item.id}`} className="kbl-card-wrapper">
      {rank && (
        <div className="rank-box">
          <img
            src={`/images/rank/rank-${String(rank).padStart(2, "0")}.png`}
            alt={String(rank)}
          />
        </div>
      )}

      <div className="kbl-card">
        <img src={item.img1} alt={item.title} />
      </div>
    </Link>
  );
};

export default KblCard;
