export const MOVIE_FILTERS = [
  {
    key: 'all',
    label: '전체보기',
    tmdb: {},
  },

  // 국가 / 권역
  {
    key: 'kr',
    label: '한국영화',
    tmdb: {
      with_original_language: 'ko',
    },
  },
  {
    key: 'us',
    label: '미국영화',
    tmdb: {
      with_original_language: 'en',
      with_origin_country: 'US',
    },
  },
  {
    key: 'uk',
    label: '영국영화',
    tmdb: {
      with_origin_country: 'GB',
    },
  },
  {
    key: 'jp',
    label: '일본영화',
    tmdb: {
      with_original_language: 'ja',
    },
  },
  {
    key: 'cn',
    label: '중국영화',
    tmdb: {
      with_original_language: 'zh',
    },
  },

  // 장르
  {
    key: 'action',
    label: '액션',
    tmdb: {
      with_genres: '28',
    },
  },
  {
    key: 'comedy',
    label: '코미디',
    tmdb: {
      with_genres: '35',
    },
  },
  {
    key: 'romance',
    label: '로맨스',
    tmdb: {
      with_genres: '10749',
    },
  },
  {
    key: 'thriller',
    label: '스릴러',
    tmdb: {
      with_genres: '53',
    },
  },
  {
    key: 'horror',
    label: '공포',
    tmdb: {
      with_genres: '27',
    },
  },
  {
    key: 'sf',
    label: 'SF',
    tmdb: {
      with_genres: '878',
    },
  },
  {
    key: 'fantasy',
    label: '판타지',
    tmdb: {
      with_genres: '14',
    },
  },
  {
    key: 'animation',
    label: '애니메이션',
    tmdb: {
      with_genres: '16',
    },
  },
];

// 장르별 스와이퍼 설정
export interface MovieGenres {
  genreKey: string;
  title: string;
  label: string;
  genreParam: string;
}

export const ACTION_MOVIE_CONFIG: MovieGenres = {
  genreKey: 'action',
  title: '액션 영화',
  label: '액션',
  genreParam: '28',
};

export const COMEDY_MOVIE_CONFIG: MovieGenres = {
  genreKey: 'comedy',
  title: '코미디 영화',
  label: '코미디',
  genreParam: '35',
};

export const ROMANCE_MOVIE_CONFIG: MovieGenres = {
  genreKey: 'romance',
  title: '로맨스 영화',
  label: '로맨스',
  genreParam: '10749',
};

export const THRILLER_MOVIE_CONFIG: MovieGenres = {
  genreKey: 'thriller',
  title: '스릴러 영화',
  label: '스릴러',
  genreParam: '53',
};

export const HORROR_MOVIE_CONFIG: MovieGenres = {
  genreKey: 'horror',
  title: '공포 영화',
  label: '공포',
  genreParam: '27',
};

export const SF_MOVIE_CONFIG: MovieGenres = {
  genreKey: 'sf',
  title: 'SF 영화',
  label: 'SF',
  genreParam: '878',
};

export const FANTASY_MOVIE_CONFIG: MovieGenres = {
  genreKey: 'fantasy',
  title: '판타지 영화',
  label: '판타지',
  genreParam: '14',
};

export const ANIMATION_MOVIE_CONFIG: MovieGenres = {
  genreKey: 'animation',
  title: '애니메이션 영화',
  label: '애니메이션',
  genreParam: '16',
};

export const KOREAN_MOVIE_CONFIG: MovieGenres = {
  genreKey: 'kr',
  title: '한국 영화',
  label: '한국영화',
  genreParam: '',
};

export const US_MOVIE_CONFIG: MovieGenres = {
  genreKey: 'us',
  title: '미국 영화',
  label: '미국영화',
  genreParam: '',
};
