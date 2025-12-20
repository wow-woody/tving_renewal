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
