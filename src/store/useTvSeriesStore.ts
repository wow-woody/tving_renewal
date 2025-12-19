import { create } from 'zustand';
import type { TvSeriesStore } from '../type/contents';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const useTvSeriesStore = create<TvSeriesStore>((set) => ({
  tvs: [],
  koTvs: [],
  onair: [],
  onairko: [],
  seasons: [],
  videos: [],
  tvDetail: null,

  // 드라마 장르
  onFetchTvs: async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=18&sort_by=popularity.desc&language=ko-KR`
    );
    const data = await res.json();

    const dramaOnly = data.results.filter(
      (item) => item.genre_ids?.includes(18) && !item.genre_ids?.includes(16)
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
        img.logos?.find((l) => l.iso_639_1 === 'ko') ||
        img.logos?.find((l) => l.iso_639_1 === 'en') ||
        img.logos?.[0] ||
        null;

      /* 백드롭 */
      const backdrop =
        img.backdrops?.find((b) => b.iso_639_1 === null) || img.backdrops?.[0] || null;

      /* 연령 */
      const krAge = ageData.results?.find((r) => r.iso_3166_1 === 'KR')?.rating;

      /* 장르 */
      const genreNames = detail.genres?.map((g) => g.name) || [];

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
          ?.filter((c) => c.job === 'Director' || c.job === 'Executive Producer')
          .map((d) => d.name) || [];

      const casts = credits.cast?.slice(0, 8).map((c) => c.name) || [];

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
    console.log('한국방영중', data.results);
    set({ onairko: data.results });
  },

  //
  onFetchTvVideos: async (id) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}&language=ko-KR`
    );
    const data = await res.json();
    console.log('영상', data);
    set({ videos: data.results });
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
    set({ episodes: data.episodes });
  },
}));
