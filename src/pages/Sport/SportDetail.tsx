import { useParams } from 'react-router-dom';
import './scss/SportDetail.scss';

const SportDetail = () => {
  const { id } = useParams<{ id: string }>();

  // 실제 데이터 연동 시 id로 fetch
  return (
    <div className="sport-detail-wrap">
      <div className="sport-detail-container">
        <h1>스포츠 상세페이지</h1>
        <p>콘텐츠 ID: {id}</p>
        {/* 여기에 상세 정보, 이미지, 설명 등 추가 */}
      </div>
    </div>
  );
};

export default SportDetail;
