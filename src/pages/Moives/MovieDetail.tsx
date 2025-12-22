import MovieDebanner from '../../components/Movie/MovieDetail/MovieDebanner';
import MovieTrail from '../../components/Movie/MovieDetail/MovieTrail';
import MovieImages from '../../components/Movie/MovieDetail/MovieImages';

const MovieDetail = () => {
  return (
    <div className="Movie-detail-wrap">
      <MovieDebanner />
      <MovieTrail />
      <MovieImages />
    </div>
  );
};

export default MovieDetail;
