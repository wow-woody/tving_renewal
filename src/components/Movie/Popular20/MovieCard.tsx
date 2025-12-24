import { Link } from 'react-router-dom';

interface Props {
  id: number;
  title: string;
  img1: string;
  order?: number;
}

const MovieCard = ({ id, title, img1, order }: Props) => {
  return (
    <Link to={`/movie/detail/${id}`} className="rank-card">
      {order && (
        <div className="rank-box">
          <img
            src={`/images/rank/rank-${String(order).padStart(2, '0')}.svg`}
            alt={`rank-${order}`}
          />
        </div>
      )}

      <div className="poster-box">
        <img className="img1" src={img1} alt={title} />
      </div>
    </Link>
  );
};

export default MovieCard;
