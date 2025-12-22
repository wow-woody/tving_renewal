import DramaDeBanner from '../../components/Drama/DramaDetail/DramaDeBanner';
import DramaList from '../../components/Drama/DramaDetail/DramaList';
import DramaTrail from '../../components/Drama/DramaDetail/DramaTrail';
import DramaSimilar from '../../components/Drama/DramaDetail/DramaSimilar';
import '../scss/DramaDetail.scss';

const DramaDetail = () => {
  return (
    <div className="drama-detail-wrap">
      <DramaDeBanner />
      <DramaList />
      <DramaTrail />
      <DramaSimilar />
    </div>
  );
};

export default DramaDetail;
