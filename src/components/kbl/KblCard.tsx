import { Link } from 'react-router-dom';
import type { Sport } from '../../data/sport';

interface Props {
  item: Sport;
  rank: number;
}

const KblCard = ({ item }: Props) => {
  return (
    <Link to={`/detail/${item.id}`} className="kbl-card-wrapper">
      <div className="kbl-card">
        <img src={item.thumb} alt={item.title} />
      </div>
    </Link>
  );
};

export default KblCard;
