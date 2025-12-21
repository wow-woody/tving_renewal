import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './DramaBanner.scss';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

interface DramaShow {
  id: number;
  name: string;
  backdrop_path: string;
  logo: string;
}

const DramaBanner = () => {
  const [dramaShow, setDramaShow] = useState<DramaShow | null>(null);

  useEffect(() => {
    const fetchDramaShow = async () => {
      try {
        // '좋거나 나쁜 동재' TV 시리즈 검색
        const searchRes = await fetch(
          `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=좋거나 나쁜 동재&language=ko-KR`
        );
        const searchData = await searchRes.json();

        // 첫 번째 결과 사용
        const drama = searchData.results[0];

        if (!drama) return;

        // 로고 가져오기
        const resLogo = await fetch(
          `https://api.themoviedb.org/3/tv/${drama.id}/images?api_key=${API_KEY}`
        );
        const dataLogo = await resLogo.json();
        const koLogo = dataLogo.logos?.find((l: any) => l.iso_639_1 === 'ko');
        const enLogo = dataLogo.logos?.find((l: any) => l.iso_639_1 === 'en');
        const logo = koLogo?.file_path || enLogo?.file_path || null;

        setDramaShow({
          id: drama.id,
          name: drama.name,
          backdrop_path: drama.backdrop_path,
          logo,
        });
      } catch (error) {
        console.error('드라마 정보 가져오기 실패:', error);
      }
    };

    fetchDramaShow();
  }, []);

  if (!dramaShow) return null;

  return (
    <div className="drama-banner">
      <div className="banner-backdrop">
        <img
          src={`https://image.tmdb.org/t/p/original${dramaShow.backdrop_path}`}
          alt={dramaShow.name}
        />
        <div className="backdrop-overlay" />
      </div>

      <div className="banner-content">
        <img src="/images/v-o/v-origin.svg" alt="V ORIGINAL" className="v-original-badge" />
        {dramaShow.logo ? (
          <div className="banner-logo">
            <img src={`https://image.tmdb.org/t/p/w500${dramaShow.logo}`} alt={dramaShow.name} />
          </div>
        ) : (
          <h1 className="banner-title">{dramaShow.name}</h1>
        )}
        <Link to={`/detail/${dramaShow.id}`} className="banner-link">
          자세히 보기
        </Link>
      </div>
    </div>
  );
};

export default DramaBanner;
