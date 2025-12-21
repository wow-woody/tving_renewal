import { Link } from 'react-router-dom';

interface Props {
  id: number;
  title: string;
  img1: string;
  order?: number; // ✅ 1,2,3…
}

const ContentCard = ({ id, title, img1, order }: Props) => {
  return (
    <Link to={`/detail/${id}`} className="rank-card">
      {/* 랭킹 이미지 */}
      {order && (
        <div className="rank-box">
          <img
            src={`/images/rank/rank-${String(order).padStart(2, '0')}.svg`}
            alt={`rank-${order}`}
          />
        </div>
      )}

      {/* 포스터 */}
      <div className="poster-box">
        <img className="img1" src={img1} alt={title} />
      </div>
    </Link>
  );
};

export default ContentCard;
