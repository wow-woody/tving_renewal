import DramaDeBanner from '../../components/Drama/DramaDeBanner';
import DramaList from '../../components/Drama/DramaList';
import '../scss/DramaDetail.scss';

const DramaDetail = () => {
  return (
    <div className="drama-detail-wrap">
      <DramaDeBanner />
      <DramaList />
    </div>
  );
};

export default DramaDetail;
