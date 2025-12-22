import { create } from 'zustand';
import type { TV } from '../type/contents';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

interface Network {
  id: number;
  name: string;
  logo_path: string | null;
}

interface Genre {
  id: number;
  name: string;
}

interface Season {
  id: number;
  name: string;
  season_number: number;
  episode_count: number;
  poster_path: string | null;
}

interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

interface Episode {
  id: number;
  name: string;
  episode_number: number;
  still_path: string | null;
  overview: string;
  air_date?: string;
  runtime?: number;
}

interface Logo {
  iso_639_1: string;
  file_path: string;
}

interface Backdrop {
  iso_639_1: string | null;
  file_path: string;
}

interface ContentRating {
  iso_3166_1: string;
  rating: string;
}

interface CrewMember {
  job: string;
  name: string;
}

interface CastMember {
  name: string;
}

interface TvItem {
  genre_ids: number[];
}

interface TvDetail {
  id: number;
  name: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  age?: string;
  cAge?: string;
  logo: string | null;
  backdrop: string | null;
  directors: string[];
  casts: string[];
  genreNames: string[];
  networks: Network[];
  seasonText: string;
  adult?: boolean;
  genres?: Genre[];
  number_of_seasons?: number;
  vote_average?: number;
  seasons?: Season[];
}

interface TvSeriesStore {
  tvs: TV[];
  koTvs: TV[];
  onair: TV[];
  onairko: TV[];
  seasons: Season[];
  videos: Video[];
  filteredTvs: TV[];
  tvDetail: TvDetail | null;
  episodes: Episode[];
  episodesBySeason: Record<number, Episode[]>;

  // 엔터 관련 상태
  enters: TV[];
  koEnters: TV[];
  filteredEnters: TV[];
  enterDetail: TvDetail | null;

  // 애니 관련 상태
  anims: TV[];
  filteredAnims: TV[];

  onFetchTvs: () => Promise<void>;
  onFetchKoTvs: () => Promise<void>;
  onFetchTvDetail: (id: string) => Promise<void>;
  onFetchOnAir: () => Promise<void>;
  onFetchOnAirKo: () => Promise<void>;
  onFetchTvVideos: (id: string) => Promise<void>;
  onFetchByFilter: (params: Partial<Record<string, string>>) => Promise<void>;
  onFetchSeasons: (id: string) => Promise<void>;
  onFetchEpisodes: (id: string, season: number) => Promise<void>;

  // 엔터 관련 함수
  onFetchEnters: () => Promise<void>;
  onFetchKoEnters: () => Promise<void>;
  onFetchEnterDetail: (id: string) => Promise<void>;
  onFetchEnterByFilter: (params: Record<string, string>) => Promise<void>;

  // 애니 관련 함수
  onFetchAnims: () => Promise<void>;
  onFetchAnimByFilter: (params: Record<string, string>) => Promise<void>;
}

export const useTvSeriesStore = create<TvSeriesStore>((set) => ({
  tvs: [],
  koTvs: [],
  onair: [],
  onairko: [],
  seasons: [],
  videos: [],
  filteredTvs: [],
  tvDetail: null,

  // 엔터 관련 초기 상태
  enters: [],
  koEnters: [],
  filteredEnters: [],
  enterDetail: null,
  episodesBySeason: {},

  // 애니 관련 초기 상태
  anims: [],
  filteredAnims: [],

  // 드라마 장르
  onFetchTvs: async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=18&sort_by=popularity.desc&language=ko-KR`
    );
    const data = await res.json();

    const dramaOnly = data.results.filter(
      (item: TvItem) => item.genre_ids?.includes(18) && !item.genre_ids?.includes(16)
    );
    set({ tvs: dramaOnly });
  },
  // 한국 드라마 장르
  onFetchKoTvs: async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=18&with_original_language=ko&language=ko-KR&page=2`
    );
    const data = await res.json();
    // console.log('한국 드라마', data.results);
    set({ koTvs: data.results });
  },

  // 단일 드라마 상세
  onFetchTvDetail: async (id: string) => {
    try {
      const [resDetail, resImg, resAge, resCredits] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=ko-KR`),
        fetch(`https://api.themoviedb.org/3/tv/${id}/images?api_key=${API_KEY}`),
        fetch(`https://api.themoviedb.org/3/tv/${id}/content_ratings?api_key=${API_KEY}`),
        fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}&language=ko-KR`),
      ]);

      const detail = await resDetail.json();
      const img = await resImg.json();
      const ageData = await resAge.json();
      const credits = await resCredits.json();

      /* 로고 */
      const logo =
        img.logos?.find((l: Logo) => l.iso_639_1 === 'ko') ||
        img.logos?.find((l: Logo) => l.iso_639_1 === 'en') ||
        img.logos?.[0] ||
        null;

      /* 백드롭 */
      const backdrop =
        img.backdrops?.find((b: Backdrop) => b.iso_639_1 === null) || img.backdrops?.[0] || null;

      /* 연령 */
      const krAge = ageData.results?.find((r: ContentRating) => r.iso_3166_1 === 'KR')?.rating;

      /* 장르 */
      const genreNames = detail.genres?.map((g: Genre) => g.name) || [];

      /* 방송사 */
      const networks = detail.networks || [];

      /* 시즌 */
      const seasonText =
        detail.number_of_seasons === 1
          ? '시즌 1'
          : detail.number_of_seasons
          ? `시즌 ${detail.number_of_seasons}`
          : '';

      /* 감독 / 출연진 */
      const directors =
        credits.crew
          ?.filter((c: CrewMember) => c.job === 'Director' || c.job === 'Executive Producer')
          .map((d: CrewMember) => d.name) || [];

      const casts = credits.cast?.slice(0, 8).map((c: CastMember) => c.name) || [];

      set({
        tvDetail: {
          ...detail,
          age: krAge || (detail.adult ? '19' : '12'),
          logo: logo?.file_path || null,
          backdrop: backdrop?.file_path || detail.backdrop_path,
          directors,
          casts,
          genreNames,
          networks,
          seasonText,
        },
      });
    } catch (error) {
      console.error('TV Detail Fetch Error', error);
      set({ tvDetail: null });
    }
  },

  // 방영중인 드라마
  onFetchOnAir: async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=18&with_status=0&sort_by=popularity.desc&language=ko-KR`
    );
    const data = await res.json();
    // console.log('방영중', data.results);
    set({ onair: data.results });
  },
  // 방영중 한국 드라마
  onFetchOnAirKo: async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=18&with_status=0&with_original_language=ko&sort_by=popularity.desc&language=ko-KR`
    );
    const data = await res.json();
    // console.log('한국방영중', data.results);
    set({ onairko: data.results });
  },

  //
  onFetchTvVideos: async (id) => {
    const koRes = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}&language=ko-KR`
    );
    const koData = await koRes.json();

    if (koData.results?.length > 0) {
      set({ videos: koData.results });
      return;
    }

    // 없으면 영어 fallback
    const enRes = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}&language=en-US`
    );
    const enData = await enRes.json();

    set({ videos: enData.results || [] });
  },

  // 장르
  onFetchByFilter: async (params) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?${new URLSearchParams({
        api_key: API_KEY,
        language: 'ko-KR',
        sort_by: 'popularity.desc',
        ...params,
      })}`
    );

    const data = await res.json();

    // 드라마만 걸러내기 (애니 제외)
    const dramaOnly = data.results.filter(
      (item: TvItem) => item.genre_ids?.includes(18) && !item.genre_ids?.includes(16)
    );

    set({ filteredTvs: dramaOnly });
  },

  // 시리즈 시즌
  onFetchSeasons: async (id) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=ko-KR`
    );
    const data = await res.json();
    console.log('seasons', data);
    set({ seasons: data.seasons });
  },

  // 시즌 에피소드
  episodes: [],
  onFetchEpisodes: async (id, season) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${API_KEY}&language=ko-KR`
    );
    const data = await res.json();
    console.log('에피소드', data.episodes);
    set((state) => ({
      episodesBySeason: {
        ...state.episodesBySeason,
        [season]: data.episodes || [],
      },
    }));
  },

  // 엔터 관련 함수들
  onFetchEnters: async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=10764,10767&without_genres=16,18&sort_by=popularity.desc&language=ko-KR`
    );
    const data = await res.json();
    set({ enters: data.results });
  },

  onFetchKoEnters: async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=10764,10767&without_genres=16,18&with_original_language=ko&language=ko-KR&page=2`
    );
    const data = await res.json();
    set({ koEnters: data.results });
  },

  onFetchEnterDetail: async (id: string) => {
    try {
      const [resDetail, resImg, resAge, resCredits] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=ko-KR`),
        fetch(`https://api.themoviedb.org/3/tv/${id}/images?api_key=${API_KEY}`),
        fetch(`https://api.themoviedb.org/3/tv/${id}/content_ratings?api_key=${API_KEY}`),
        fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}&language=ko-KR`),
      ]);

      const detail = await resDetail.json();
      const img = await resImg.json();
      const ageData = await resAge.json();
      const credits = await resCredits.json();

      const logo =
        img.logos?.find((l: Logo) => l.iso_639_1 === 'ko') ||
        img.logos?.find((l: Logo) => l.iso_639_1 === 'en') ||
        img.logos?.[0] ||
        null;

      const backdrop =
        img.backdrops?.find((b: Backdrop) => b.iso_639_1 === null) || img.backdrops?.[0] || null;

      const krAge = ageData.results?.find((r: ContentRating) => r.iso_3166_1 === 'KR')?.rating;

      const genreNames = detail.genres?.map((g: Genre) => g.name) || [];
      const networks = detail.networks || [];
      const seasonText =
        detail.number_of_seasons === 1
          ? '시즌 1'
          : detail.number_of_seasons
          ? `시즌 ${detail.number_of_seasons}`
          : '';

      const directors =
        credits.crew
          ?.filter((c: CrewMember) => c.job === 'Director' || c.job === 'Executive Producer')
          .map((d: CrewMember) => d.name) || [];

      const casts = credits.cast?.slice(0, 8).map((c: CastMember) => c.name) || [];

      set({
        enterDetail: {
          ...detail,
          age: krAge || (detail.adult ? '19' : '12'),
          logo: logo?.file_path || null,
          backdrop: backdrop?.file_path || detail.backdrop_path,
          directors,
          casts,
          genreNames,
          networks,
          seasonText,
        },
      });
    } catch (error) {
      console.error('Enter Detail Fetch Error', error);
      set({ enterDetail: null });
    }
  },

  onFetchEnterByFilter: async (params) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?${new URLSearchParams({
        api_key: API_KEY,
        language: 'ko-KR',
        sort_by: 'popularity.desc',
        without_genres: '16,18', // 애니메이션과 드라마 제외
        ...params,
      })}`
    );

    const data = await res.json();
    set({ filteredEnters: data.results });
  },

  // 애니메이션 가져오기
  onFetchAnims: async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16&sort_by=popularity.desc&language=ko-KR`
    );
    const data = await res.json();
    set({ anims: data.results });
  },

  // 애니메이션 필터링
  onFetchAnimByFilter: async (params) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?${new URLSearchParams({
        api_key: API_KEY,
        language: 'ko-KR',
        sort_by: 'popularity.desc',
        with_genres: '16',
        ...params,
      })}`
    );

    const data = await res.json();
    set({ filteredAnims: data.results });
  },
}));
