import DramaDeBanner from './DramaDeBanner';
import '../scss/DramaDetail.scss';
import DramaList from './DramaList';

const DramaDetail = () => {
  return (
    <div className="drama-detail-wrap">
      <DramaDeBanner />
      <DramaList />
    </div>
  );
};

export default DramaDetail;
