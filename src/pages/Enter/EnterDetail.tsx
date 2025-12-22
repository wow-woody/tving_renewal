import EnterDeBanner from '../../components/Enter/EnterDeBanner';
import EnterList from '../../components/Enter/EnterList';
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
