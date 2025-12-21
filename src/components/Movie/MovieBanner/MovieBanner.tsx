import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MovieBanner.scss';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

interface DuneMovie {
  id: number;
  title: string;
  backdrop_path: string;
  logo: string;
}

const MovieBanner = () => {
  const [duneMovie, setDuneMovie] = useState<DuneMovie | null>(null);

  useEffect(() => {
    const fetchDuneMovie = async () => {
      try {
        // 듄(Dune) 영화 검색
        const searchRes = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Dune&language=ko-KR`
        );
        const searchData = await searchRes.json();

        // 듄: Part Two (2024) 영화 찾기
        const duneMovie = searchData.results.find(
          (m: any) => m.title.includes('듄') && m.release_date?.startsWith('2024')
        );

        if (!duneMovie) return;

        // 로고 가져오기
        const resLogo = await fetch(
          `https://api.themoviedb.org/3/movie/${duneMovie.id}/images?api_key=${API_KEY}`
        );
        const dataLogo = await resLogo.json();
        const koLogo = dataLogo.logos?.find((l: any) => l.iso_639_1 === 'ko');
        const enLogo = dataLogo.logos?.find((l: any) => l.iso_639_1 === 'en');
        const logo = koLogo?.file_path || enLogo?.file_path || null;

        setDuneMovie({
          id: duneMovie.id,
          title: duneMovie.title,
          backdrop_path: duneMovie.backdrop_path,
          logo,
        });
      } catch (error) {
        console.error('듄 영화 정보 가져오기 실패:', error);
      }
    };

    fetchDuneMovie();
  }, []);

  if (!duneMovie) return null;

  return (
    <div className="movie-banner">
      <div className="banner-backdrop">
        <img
          src={`https://image.tmdb.org/t/p/original${duneMovie.backdrop_path}`}
          alt={duneMovie.title}
        />
        <div className="backdrop-overlay" />
      </div>

      <div className="banner-content">
        {duneMovie.logo ? (
          <div className="banner-logo">
            <img src={`https://image.tmdb.org/t/p/w500${duneMovie.logo}`} alt={duneMovie.title} />
          </div>
        ) : (
          <h1 className="banner-title">{duneMovie.title}</h1>
        )}
        <Link to={`/movie/${duneMovie.id}`} className="banner-link">
          자세히 보기
        </Link>
      </div>
    </div>
  );
};

export default MovieBanner;
