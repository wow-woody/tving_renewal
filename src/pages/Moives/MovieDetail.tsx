import MovieDebanner from '../../components/Movie/Detail/MovieDebanner';
import MovieTrail from '../../components/Movie/Detail/MovieTrail';
import MovieImages from '../../components/Movie/Detail/MovieImages';
import MovieSimilar from '../../components/Movie/Detail/MovieSimilar';
import '../scss/MovieDetail.scss';

const MovieDetail = () => {
    return (
        <div className="Movie-detail-wrap">
            <MovieDebanner />
            <MovieTrail />
            <MovieImages />
            <MovieSimilar />
        </div>
    );
};

export default MovieDetail;
