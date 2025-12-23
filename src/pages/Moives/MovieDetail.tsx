import MovieDebanner from '../../components/Movie/MovieDetail/MovieDebanner';
import MovieTrail from '../../components/Movie/MovieDetail/MovieTrail';
import MovieImages from '../../components/Movie/MovieDetail/MovieImages';
import MovieSimilar from '../../components/Movie/MovieDetail/MovieSimilar';
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
