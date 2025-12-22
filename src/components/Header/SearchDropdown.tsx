import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { SearchResult } from '../../store/useSearchStore';
import './SearchDropdown.scss';

interface SearchDropdownProps {
  results: SearchResult[];
  isSearching: boolean;
  onClose: () => void;
  selectedIndex?: number;
  onNavigate?: (result: SearchResult) => void;
  onIndexChange?: (index: number) => void;
  searchQuery?: string;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  results,
  isSearching,
  onClose,
  selectedIndex = -1,
  onNavigate,
  onIndexChange,
  searchQuery = '',
}) => {
  const selectedItemRef = useRef<HTMLAnchorElement>(null);
  const navigate = useNavigate();

  // 선택된 항목이 변경될 때 스크롤
  useEffect(() => {
    if (selectedIndex >= 0 && selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedIndex]);
  if (isSearching) {
    return (
      <div className="search-dropdown">
        <div className="search-loading">검색 중...</div>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  const getMediaLink = (result: SearchResult) => {
    if (result.media_type === 'tv') {
      return `/detail/${result.id}`;
    } else if (result.media_type === 'movie') {
      return `/movie/detail/${result.id}`;
    } else {
      // person 타입은 개인 프로필 페이지로 이동
      return `/person/${result.id}`;
    }
  };

  const getMediaType = (type: string) => {
    if (type === 'tv') return 'TV';
    if (type === 'movie') return '영화';
    if (type === 'person') return '출연진';
    return '';
  };

  return (
    <div className="search-dropdown">
      <div className="search-results">
        {results.map((result, index) => (
          <Link
            key={`${result.media_type}-${result.id}`}
            ref={selectedIndex === index ? selectedItemRef : null}
            to={getMediaLink(result)}
            className={`search-item ${result.media_type === 'person' ? 'is-person' : ''} ${
              selectedIndex === index ? 'selected' : ''
            }`}
            onClick={() => {
              onClose();
              onNavigate?.(result);
            }}
            onMouseEnter={() => onIndexChange?.(index)}
            onMouseLeave={() => onIndexChange?.(-1)}>
            <div className="search-item-poster">
              {result.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
                  alt={result.title}
                />
              ) : (
                <div className="no-poster">No Image</div>
              )}
            </div>
            <div className="search-item-info">
              <div className="search-item-title">
                {result.title}
                <span className="media-type">{getMediaType(result.media_type)}</span>
              </div>
              {result.media_type === 'person' && result.known_for_department && (
                <div className="search-item-overview">{result.known_for_department}</div>
              )}
              {result.media_type !== 'person' && result.overview && (
                <div className="search-item-overview">
                  {result.overview.length > 80
                    ? `${result.overview.substring(0, 80)}...`
                    : result.overview}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
      {results.length > 0 && searchQuery && (
        <div className="search-footer">
          <button
            className="view-all-btn"
            onClick={() => {
              navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
              onClose();
            }}>
            모든 결과 보기 ({results.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
