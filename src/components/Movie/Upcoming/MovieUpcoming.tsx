import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';

import { useMovieStore } from '../../../store/useMoviesStore';
import './MovieUpcoming.scss';

const GENRE_MAP: Record<number, string> = {
  28: '액션',
  12: '모험',
  16: '애니메이션',
  35: '코미디',
  80: '범죄',
  99: '다큐멘터리',
  18: '드라마',
  10751: '가족',
  14: '판타지',
  36: '역사',
  27: '공포',
  10402: '음악',
  9648: '미스터리',
  10749: '로맨스',
  878: 'SF',
  10770: 'TV 영화',
  53: '스릴러',
  10752: '전쟁',
  37: '서부',
};

const MovieUpcoming = () => {
  const upcomingMovies = useMovieStore((s) => s.upcomingMovies);
  const onFetchUpcoming = useMovieStore((s) => s.onFetchUpcoming);

  useEffect(() => {
    onFetchUpcoming();
  }, [onFetchUpcoming]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const getGenres = (genreIds: number[] | undefined) => {
    if (!genreIds || genreIds.length === 0) return '';
    return genreIds
      .slice(0, 3)
      .map((id) => GENRE_MAP[id])
      .filter(Boolean)
      .join(' · ');
  };

  return (
    <section className="upcoming-section">
      <h2 className="upcoming-title">공개 예정 영화</h2>

      <div className="upcoming-swiper-container">
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={1}
          spaceBetween={30}
          loop={upcomingMovies.length > 1}
          navigation={true}
          speed={1100}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          className="upcoming-swiper">
          {upcomingMovies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div className="upcoming-card">
                <div className="upcoming-backdrop">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                  />
                </div>

                <div className="upcoming-content">
                  <div className="upcoming-poster">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </div>

                  <div className="upcoming-info">
                    <h3 className="movie-title">{movie.title}</h3>
                    <p className="movie-date">{formatDate(movie.release_date)}</p>
                    <p className="movie-genre">{getGenres(movie.genre_ids)}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default MovieUpcoming;
