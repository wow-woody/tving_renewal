import { Link } from "react-router-dom";
import type { Content } from "../../type/content";
import { TVING_BADGE } from "../../contents/media";

interface Props {
  item: Content;
}

const VOriginalCard = ({ item }: Props) => {
      const badge = item.badge ? TVING_BADGE[item.badge] : null;
  return (
    <Link to={`/detail/${item.id}`} className="v-original-card">
      <img src={item.img1} alt={item.title} />
       {badge && (
        <img
          className="badge"
          src={badge.image}
          alt={badge.label}
        />
      )}
    </Link>
  );
};

export default VOriginalCard;
