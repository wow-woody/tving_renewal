import { create } from 'zustand';
import type { Movie, Video } from '../type/contents';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

interface CrewMember {
  name: string;
  job: string;
}

interface CastMember {
  name: string;
}

interface MovieImage {
  file_path: string;
  width: number;
  height: number;
}

interface MovieState {
  movies: Movie[];
  videos: Video[];
  images: MovieImage[];
  filteredMovies: Movie[];
  movieDetail: Movie | null;
  upcomingMovies: Movie[];
  classicMovies: Movie[];

  onFetchPopular: () => Promise<void>;
  onFetchVideo: (id: string) => Promise<Video[]>;
  onFetchImages: (id: string) => Promise<void>;
  onFetchByFilter: (params: Record<string, string>) => Promise<void>;
  onFetchMovieDetail: (id: string) => Promise<void>;
  onFetchUpcoming: () => Promise<void>;
  onFetchClassic: () => Promise<void>;
}

export const useMovieStore = create<MovieState>((set) => ({
  movies: [],
  videos: [],
  images: [],
  filteredMovies: [],
  movieDetail: null,
  upcomingMovies: [],
  classicMovies: [],

  // 인기 영화를 가져올 메서드
  onFetchPopular: async () => {
    const res = await fetch(
      // key라고 명시!, &로 연결
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR-US&page=1`
    );
    const data = await res.json();
    // console.log('인기 영화', data.results);

    // 연령, 제목 이미지
    const movieExtra = await Promise.all(
      data.results.map(async (movie: Movie) => {
        // 1) 연령 등급 요청
        const resAge = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/release_dates?api_key=${API_KEY}`
        );
        const dataAge = await resAge.json();
        // console.log('연령?', dataAge.results);

        const krInfo = dataAge.results.find((item: any) => item.iso_3166_1 === 'KR');
        const cAge = krInfo?.release_dates?.[0].certification || 'none';

        // 2) 로고 이미지
        const resLogo = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=${API_KEY}`
        );
        const dataLogo = await resLogo.json();
        // console.log('로고?', dataLogo);

        const logo = dataLogo.logos?.[0]?.file_path || null;

        return {
          ...movie, // 원래 영화 기본정보
          cAge, // 추가한 연령 등급
          logo,
        };
      })
    );

    // 19세 등급 필터링 + 몽골어 제외
    const filtered = movieExtra.filter(
      (m) => m.cAge !== '청소년관람불가' && m.cAge !== '19' && m.original_language !== 'mn'
    );
    set({ movies: filtered });
  },

  // 인기 영화 예고편 가져올 메서드
  onFetchVideo: async (id) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
    );
    const data = await res.json();
    set({ videos: data.results });
    return data.results;
  },

  // 영화 이미지 가져오기
  onFetchImages: async (id) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${API_KEY}`);
    const data = await res.json();
    set({ images: data.backdrops || [] });
  },

  // 필터링된 영화 가져오기
  onFetchByFilter: async (params) => {
    const queryString = new URLSearchParams({
      api_key: API_KEY,
      language: 'ko-KR',
      page: '1',
      sort_by: 'popularity.desc',
      ...params,
    }).toString();

    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?${queryString}`);
    const data = await res.json();

    const moviesWithExtra = await Promise.all(
      data.results.map(async (movie: Movie) => {
        // 연령 등급
        const resAge = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/release_dates?api_key=${API_KEY}`
        );
        const dataAge = await resAge.json();
        const krInfo = dataAge.results.find((item: any) => item.iso_3166_1 === 'KR');
        const cAge = krInfo?.release_dates?.[0].certification || 'none';

        // 로고
        const resLogo = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=${API_KEY}`
        );
        const dataLogo = await resLogo.json();
        const logo = dataLogo.logos?.[0]?.file_path || null;

        return { ...movie, cAge, logo };
      })
    );

    // 19세 등급 필터링 + 몽골어 제외
    const filtered = moviesWithExtra.filter(
      (m) => m.cAge !== '청소년관람불가' && m.cAge !== '19' && m.original_language !== 'mn'
    );
    set({ filteredMovies: filtered });
  },

  // 영화 상세 정보 가져오기
  onFetchMovieDetail: async (id) => {
    const [resDetail, resCredits] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR&append_to_response=images,release_dates`
      ),
      fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=ko-KR`),
    ]);

    const data = await resDetail.json();
    const credits = await resCredits.json();

    // 연령 등급
    const krInfo = data.release_dates?.results.find((item: any) => item.iso_3166_1 === 'KR');
    const cAge = krInfo?.release_dates?.[0].certification || 'none';

    // 로고
    const logo = data.images?.logos?.[0]?.file_path || null;

    // 감독
    const directors =
      credits.crew
        ?.filter((c: CrewMember) => c.job === 'Director')
        .map((d: CrewMember) => d.name) || [];

    // 출연진 (상위 8명)
    const casts = credits.cast?.slice(0, 8).map((c: CastMember) => c.name) || [];

    // 장르명
    const genreNames = data.genres?.map((g: any) => g.name) || [];

    set({
      movieDetail: {
        ...data,
        cAge,
        logo,
        directors,
        casts,
        genreNames,
      },
    });
  },

  // 개봉 예정 영화 가져오기
  onFetchUpcoming: async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1`
    );
    const data = await res.json();

    const upcomingExtra = await Promise.all(
      data.results.slice(0, 20).map(async (movie: Movie) => {
        // 연령 등급
        const resAge = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/release_dates?api_key=${API_KEY}`
        );
        const dataAge = await resAge.json();
        const krInfo = dataAge.results.find((item: any) => item.iso_3166_1 === 'KR');
        const cAge = krInfo?.release_dates?.[0].certification || 'none';

        // 로고
        const resLogo = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=${API_KEY}`
        );
        const dataLogo = await resLogo.json();
        const logo = dataLogo.logos?.[0]?.file_path || null;

        return { ...movie, cAge, logo };
      })
    );

    // 19세 등급 필터링 + 몽골어 제외
    const filtered = upcomingExtra.filter(
      (m) => m.cAge !== '청소년관람불가' && m.cAge !== '19' && m.original_language !== 'mn'
    );
    set({ upcomingMovies: filtered });
  },

  // 고전 명작 영화 가져오기 (1990년 이전, 평점 7.5 이상, 투표수 1000 이상)
  onFetchClassic: async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ko-KR&sort_by=vote_average.desc&vote_count.gte=1000&primary_release_date.lte=1990-12-31&vote_average.gte=7.5&page=1`
    );
    const data = await res.json();

    const classicExtra = await Promise.all(
      data.results.slice(0, 20).map(async (movie: Movie) => {
        // 연령 등급
        const resAge = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/release_dates?api_key=${API_KEY}`
        );
        const dataAge = await resAge.json();
        const krInfo = dataAge.results.find((item: any) => item.iso_3166_1 === 'KR');
        const cAge = krInfo?.release_dates?.[0].certification || 'none';

        // 로고 (한국어 우선, 없으면 영어)
        const resLogo = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=${API_KEY}`
        );
        const dataLogo = await resLogo.json();
        const koLogo = dataLogo.logos?.find((l: any) => l.iso_639_1 === 'ko');
        const enLogo = dataLogo.logos?.find((l: any) => l.iso_639_1 === 'en');
        const logo = koLogo?.file_path || enLogo?.file_path || null;

        return { ...movie, cAge, logo };
      })
    );

    // 19세 등급 필터링 + 몽골어 제외
    const filtered = classicExtra.filter(
      (m) => m.cAge !== '청소년관람불가' && m.cAge !== '19' && m.original_language !== 'mn'
    );
    set({ classicMovies: filtered });
  },
}));
