export const ANIM_FILTERS = [
  {
    key: 'all',
    label: '전체보기',
    tmdb: {}, // discover 기본
  },
  {
    key: 'jp',
    label: '일본 애니',
    tmdb: {
      with_genres: '16',
      with_original_language: 'ja',
    },
  },
  {
    key: 'comedy',
    label: '코미디',
    tmdb: {
      with_genres: '16,35',
    },
  },
  {
    key: 'family',
    label: '가족',
    tmdb: {
      with_genres: '16,10751',
    },
  },
  {
    key: 'drama',
    label: '드라마',
    tmdb: {
      with_genres: '16,18',
    },
  },
  {
    key: 'kids',
    label: '키즈',
    tmdb: {
      with_genres: '16,10762',
    },
  },
];

// 인기 일본 애니
export const JP_ANIM_CONFIG = {
  sectionTitle: '인기 일본 애니',
  filters: {
    with_genres: '16',
    with_original_language: 'ja',
  },
};

// 액션 애니
export const ACTION_ANIM_CONFIG = {
  sectionTitle: '액션 애니메이션',
  filters: {
    with_genres: '16,28',
  },
};

// 판타지 애니
export const FANTASY_ANIM_CONFIG = {
  sectionTitle: '판타지 애니메이션',
  filters: {
    with_genres: '16,14',
  },
};

// 코미디 애니
export const COMEDY_ANIM_CONFIG = {
  sectionTitle: '코미디 애니메이션',
  filters: {
    with_genres: '16,35',
  },
};

// 드라마 애니
export const DRAMA_ANIM_CONFIG = {
  sectionTitle: '드라마 애니메이션',
  filters: {
    with_genres: '16,18',
  },
};

// 가족 애니
export const FAMILY_ANIM_CONFIG = {
  sectionTitle: '가족 애니메이션',
  filters: {
    with_genres: '16,10751',
  },
};

// 키즈 애니
export const KIDS_ANIM_CONFIG = {
  sectionTitle: '키즈 애니메이션',
  filters: {
    with_genres: '16,10762',
  },
};
