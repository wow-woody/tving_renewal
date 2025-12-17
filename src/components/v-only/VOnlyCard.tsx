import { Link } from "react-router-dom";
import type { Content } from "../../type/content";

interface Props {
  item: Content;
  rank: number;
}

const VOnlyCard = ({ item, rank }: Props) => {
  return (
    <div className="v-only-item">
      <img
        className="rank"
        src={`/images/rank/rank-${String(rank).padStart(2, "0")}.svg`}
        alt={`rank ${rank}`}
      />

      <Link to={`/detail/${item.id}`} className="v-only-card">
        <img src={item.img1} alt={item.title} />
      </Link>
    </div>
  );
};

export default VOnlyCard;
