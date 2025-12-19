import { Link } from "react-router-dom";
import type { Content } from "../../type/content";
import { RankScope } from "../../type/enum";
import "./ContentCard-anim20.scss"

interface Props {
  item: Content;
  rankScope: RankScope; // ✅ 추가
}

const ContentCardanim20 = ({ item,  rankScope}: Props) => {
  const rank = item.rank?.[rankScope];

  return (
   <Link to={`/detail/${item.id}`} className="rank-card">
  {/* 숫자 영역 */}
  <div className="rank-box">
    {rank && (
      <img
        src={`/images/rank/rank-${String(rank).padStart(2, "0")}.png`}
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

export default ContentCardanim20;
