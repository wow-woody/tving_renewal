import EnterDeBanner from '../../components/Entertainment/EnterDeBanner';
import EnterList from '../../components/Entertainment/EnterList';
import '../scss/DramaDetail.scss';

const EnterDetail = () => {
    return (
        <div className="drama-detail-wrap">
            <EnterDeBanner />
            <EnterList />
        </div>
    );
};

export default EnterDetail;
