import { useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useSearchStore } from '../../store/useSearchStore';
import type { SearchResult } from '../../store/useSearchStore';
import '../scss/SearchResults.scss';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { searchResults, isSearching, onSearch } = useSearchStore();

  const filteredResults = useMemo(() => {
    const movies = searchResults.filter((r) => r.media_type === 'movie');
    const tvShows = searchResults.filter((r) => r.media_type === 'tv');
    const people = searchResults.filter((r) => r.media_type === 'person');
    const characters = searchResults.filter((r) => r.media_type === 'character');
    return { movies, tvShows, people, characters };
  }, [searchResults]);

  useEffect(() => {
    if (query) {
      onSearch(query);
    }
  }, [query, onSearch]);

  const getMediaLink = (result: SearchResult) => {
    if (result.media_type === 'tv') {
      return `/detail/${result.id}`;
    } else if (result.media_type === 'movie') {
      return `/movie/detail/${result.id}`;
    } else {
      return `/person/${result.id}`;
    }
  };

  const renderResultCard = (result: SearchResult) => (
    <Link
      key={`${result.media_type}-${result.id}`}
      to={getMediaLink(result)}
      className="result-card">
      <div className="card-poster">
        {result.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w300${result.poster_path}`}
            alt={result.title}
            loading="lazy"
          />
        ) : (
          <div className="no-poster">
            <span>No Image</span>
          </div>
        )}
      </div>
      <div className="card-info">
        <h3 className="card-title">{result.title}</h3>
        {result.release_date && <p className="card-year">{result.release_date.split('-')[0]}</p>}
        {result.vote_average > 0 && (
          <div className="card-rating">
            <span className="star">★</span>
            <span className="rating-value">{result.vote_average.toFixed(1)}</span>
          </div>
        )}
      </div>
    </Link>
  );

  if (!query) {
    return (
      <div className="search-results-page">
        <div className="search-container">
          <div className="search-empty">
            <h2>검색어를 입력해주세요</h2>
            <p>찾으시는 제목이나 인물명을 검색해보세요</p>
          </div>
        </div>
      </div>
    );
  }

  if (isSearching) {
    return (
      <div className="search-results-page">
        <div className="search-container">
          <div className="search-loading">
            <div className="loading-spinner"></div>
            <p>검색 중...</p>
          </div>
        </div>
      </div>
    );
  }

  const totalResults = searchResults.length;

  return (
    <div className="search-results-page">
      <div className="search-container">
        <div className="search-header">
          <h1 className="search-query">
            '<span>{query}</span>' 검색 결과
          </h1>
          <p className="search-count">총 {totalResults}개의 결과</p>
        </div>

        {totalResults === 0 ? (
          <div className="search-empty">
            <h2>검색 결과가 없습니다</h2>
            <p>다른 검색어로 다시 시도해보세요</p>
          </div>
        ) : (
          <div className="search-content">
            {filteredResults.tvShows.length > 0 && (
              <section className="results-section">
                <h2 className="section-title">
                  TV 프로그램 <span className="count">({filteredResults.tvShows.length})</span>
                </h2>
                <div className="results-grid">{filteredResults.tvShows.map(renderResultCard)}</div>
              </section>
            )}

            {filteredResults.movies.length > 0 && (
              <section className="results-section">
                <h2 className="section-title">
                  영화 <span className="count">({filteredResults.movies.length})</span>
                </h2>
                <div className="results-grid">{filteredResults.movies.map(renderResultCard)}</div>
              </section>
            )}

            {filteredResults.people.length > 0 && (
              <section className="results-section">
                <h2 className="section-title">
                  인물 <span className="count">({filteredResults.people.length})</span>
                </h2>
                <div className="results-grid people-grid">
                  {filteredResults.people.map((person) => (
                    <Link
                      key={`person-${person.id}`}
                      to={getMediaLink(person)}
                      className="result-card person-card">
                      <div className="card-poster person-poster">
                        {person.poster_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w300${person.poster_path}`}
                            alt={person.title}
                            loading="lazy"
                          />
                        ) : (
                          <div className="no-poster">
                            <span>No Image</span>
                          </div>
                        )}
                      </div>
                      <div className="card-info">
                        <h3 className="card-title">{person.title}</h3>
                        {person.known_for_department && (
                          <p className="person-department">{person.known_for_department}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

            {filteredResults.characters.length > 0 && (
              <section className="results-section">
                <h2 className="section-title">
                  캐릭터 <span className="count">({filteredResults.characters.length})</span>
                </h2>
                <div className="results-grid people-grid">
                  {filteredResults.characters.map((character) => (
                    <div key={`character-${character.id}`} className="result-card person-card">
                      <div className="card-poster person-poster">
                        {character.poster_path ? (
                          <img
                            src={character.poster_path}
                            alt={character.title}
                            loading="lazy"
                          />
                        ) : (
                          <div className="no-poster">
                            <span>No Image</span>
                          </div>
                        )}
                      </div>
                      <div className="card-info">
                        <h3 className="card-title">{character.title}</h3>
                        {character.known_for_department && (
                          <p className="person-department">{character.known_for_department}</p>
                        )}
                        {character.release_date && (
                          <p className="card-year">{character.release_date}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
      </div>
    </div>
  );
};

export default SearchResults;
