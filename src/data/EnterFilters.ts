export const ENTER_FILTERS = [
  {
    key: 'all',
    label: '전체보기',
    tmdb: {}, // discover 기본
  },

  // 국가 / 권역
  {
    key: 'us',
    label: '미국 예능',
    tmdb: {
      with_genres: '10764,10767',
      with_original_language: 'en',
    },
  },
  {
    key: 'kr',
    label: '한국 예능',
    tmdb: {
      with_genres: '10764,10767',
      with_original_language: 'ko',
    },
  },

  // 장르 (TMDB 가능)
  {
    key: 'talk',
    label: '토크쇼',
    tmdb: {
      with_genres: '10767',
    },
  },
  {
    key: 'reality',
    label: '리얼리티',
    tmdb: {
      with_genres: '10764',
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
    key: 'documentary',
    label: '다큐멘터리',
    tmdb: {
      with_genres: '99',
    },
  },
  {
    key: 'family',
    label: '패밀리',
    tmdb: {
      with_genres: '10751',
    },
  },
];

// 장르별 스와이퍼 데이터 값
export interface EnterGenres {
  genreKey: string;
  title: string;
  label: string;
  genreParam?: string;
  keywordParam?: string;
}

// DramaSwiper용 설정
export const TALK_CONFIG: EnterGenres = {
  genreKey: 'talk',
  title: '토크쇼',
  label: '토크쇼',
  genreParam: '10767',
};

export const REALITY_CONFIG: EnterGenres = {
  genreKey: 'reality',
  title: '리얼리티',
  label: '리얼리티',
  genreParam: '10764',
};

export const COMEDY_CONFIG: EnterGenres = {
  genreKey: 'comedy',
  title: '코미디',
  label: '코미디',
  genreParam: '35',
};

export const GAME_CONFIG: EnterGenres = {
  genreKey: 'game',
  title: '다큐멘터리',
  label: '다큐멘터리',
  genreParam: '99', // 다큐멘터리 장르
};

export const FAMILY_CONFIG: EnterGenres = {
  genreKey: 'family',
  title: '패밀리',
  label: '패밀리',
  genreParam: '10751', // 패밀리 장르
};

export const COOKING_CONFIG: EnterGenres = {
  genreKey: 'cooking',
  title: '요리',
  label: '요리',
  keywordParam: '170730',
};

export const TRAVEL_CONFIG: EnterGenres = {
  genreKey: 'travel',
  title: '여행',
  label: '여행',
  keywordParam: '2505',
};
