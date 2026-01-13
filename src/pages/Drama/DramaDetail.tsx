import DramaDeBanner from '../../components/Drama/Detail/DramaDeBanner';
import DramaList from '../../components/Drama/Detail/DramaList';
import DramaTrail from '../../components/Drama/Detail/DramaTrail';
import DramaSimilar from '../../components/Drama/Detail/DramaSimilar';
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
