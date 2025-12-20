export const DRAMA_FILTERS = [
  {
    key: 'all',
    label: '전체보기',
    tmdb: {}, // discover 기본
  },

  // 국가 / 권역
  {
    key: 'us',
    label: '미국드라마',
    tmdb: {
      with_genres: '18',
      with_original_language: 'en',
    },
  },
  {
    key: 'uk',
    label: '영국드라마',
    tmdb: {
      with_genres: '18',
      with_origin_country: 'GB',
    },
  },
  {
    key: 'cn',
    label: '중국드라마',
    tmdb: {
      with_genres: '18',
      with_original_language: 'zh',
    },
  },
  {
    key: 'jp',
    label: '일본드라마',
    tmdb: {
      with_genres: '18',
      with_original_language: 'ja',
    },
  },
  {
    key: 'kr',
    label: '한국드라마',
    tmdb: {
      with_genres: '18',
      with_original_language: 'ko',
    },
  },

  // 장르 (TMDB 가능)
  {
    key: 'romance',
    label: '로맨스',
    tmdb: {
      with_genres: '18,10749',
      without_genres: '16',
    },
  },
  {
    key: 'comedy',
    label: '코미디',
    tmdb: {
      with_genres: '18,35',
    },
  },
  {
    key: 'fantasy',
    label: '판타지',
    tmdb: {
      with_genres: '18,10765',
    },
  },
  {
    key: 'action',
    label: '액션/어드벤처/무협',
    tmdb: {
      with_genres: '18,10759',
    },
  },
  {
    key: 'human',
    label: '휴먼',
    tmdb: {
      with_genres: '18,10751',
    },
  },
  {
    key: 'crime',
    label: '범죄/수사극',
    tmdb: {
      with_genres: '18,80',
    },
  },
  {
    key: 'mystery',
    label: '미스터리',
    tmdb: {
      with_genres: '18,9648',
    },
  },
  {
    key: 'history',
    label: '사극/역사',
    tmdb: {
      with_genres: '18,36',
    },
  },
  {
    key: 'war',
    label: '정치/전쟁',
    tmdb: {
      with_genres: '18,10768',
    },
  },
];

// 장르별 스와이퍼 데이터 값
export interface DramaGenres {
  genreKey: string;
  title: string;
  label: string;
  genreParam: string;
}

export const FANTASY_CONFIG: DramaGenres = {
  genreKey: 'fantasy',
  title: '판타지 드라마',
  label: '판타지',
  genreParam: '10765',
};

export const ROMANCE_CONFIG: DramaGenres = {
  genreKey: 'romance',
  title: '로맨스 드라마',
  label: '로맨스',
  genreParam: '18,10749',
};

export const ACTION_CONFIG: DramaGenres = {
  genreKey: 'action',
  title: '액션/어드벤처/무협 드라마',
  label: '액션/어드벤처/무협',
  genreParam: '18,10759',
};

export const Comedy_CONFIG: DramaGenres = {
  genreKey: 'comedy',
  title: '코미디 드라마',
  label: '코미디',
  genreParam: '18,35',
};

export const Human_CONFIG: DramaGenres = {
  genreKey: 'human',
  title: '휴먼 드라마',
  label: '휴먼',
  genreParam: '18,10751',
};

export const Crime_CONFIG: DramaGenres = {
  genreKey: 'crime',
  title: '범죄/수사극 드라마',
  label: '범죄/수사극',
  genreParam: '18,80',
};

export const Mystery_CONFIG: DramaGenres = {
  genreKey: 'mystery',
  title: '미스터리 드라마',
  label: '미스터리',
  genreParam: '18,9648',
};

export const History_CONFIG: DramaGenres = {
  genreKey: 'history',
  title: '사극/역사 드라마',
  label: '사극/역사',
  genreParam: '18,36',
};

export const War_CONFIG: DramaGenres = {
  genreKey: 'war',
  title: '정치/전쟁 드라마',
  label: '정치/전쟁',
  genreParam: '18,10768',
};
