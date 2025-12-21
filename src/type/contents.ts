// 공통타입
export interface MediaBase {
  id: number;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  adult: boolean;
  cAge: string;
  logo: string;
}

//movie
export interface Movie extends MediaBase {
  title: string;
  release_date: string;
  genre_ids?: number[];
  original_language?: string;
}

//video 타입
export interface Video {
  id: string;
  key: string; //youtube key
  name: string;
  site: string; //youtube, video
  type: string; //trailer, teaser
}

//tv 타입
export interface TV extends MediaBase {
  name: string;
  poster_path: string;
  first_air_date: string;
}

//season 타입
export interface Season extends MediaBase {
  name: string;
  season_number: number;
  poster_path: string;
}

//episodes 타입
export interface Episodes extends MediaBase {
  id: string;
  name: string;
  episode_number: number;
  still_path: string;
}

export interface MovieState {
  movies: Movie[];
  videos: [];
  tvs: TV[];
  seasons: Season[];
  episodes: Episodes[];

  // episodesBySeason: Record<number, any[]>;

  onFetchPopular: () => Promise<void>;
  onFetchVideo: (id: string) => Promise<Video[]>;
  onFetchTvs: () => Promise<void>;
  onFetchTvVideos: (id: string) => Promise<void>;
  onFetchSeasons: (id: string) => Promise<void>;
  onFetchEpisodes: (id: string, season: number) => Promise<void>;
}

// heart 찜목록 타입
export interface HeartItem extends MediaBase {
  title?: string;
  name?: string;
  poster_path: string;
}

//zustand 관리에 대한 상태 타입 정의
export interface HeartState {
  hearts: HeartItem[];
  onToggleHeart: (movie: HeartItem) => Promise<void>;
  onFetchHeart: () => Promise<void>;
  onResetHeart: () => void;
}
