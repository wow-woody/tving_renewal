import { useEffect } from 'react';
import { usePersonStore } from '../../store/usePersonStore';
import './PersonDetail.scss';
import { useParams } from 'react-router-dom';

const PersonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { personDetail, personCredits, loading, onFetchPersonDetail } = usePersonStore();

  useEffect(() => {
    if (id) {
      onFetchPersonDetail(Number(id));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="person-detail-container">
        <div className="loading">로딩 중...</div>
      </div>
    );
  }

  if (!personDetail) {
    return (
      <div className="person-detail-container">
        <div className="not-found">정보를 찾을 수 없습니다.</div>
      </div>
    );
  }

  const getGenderText = (gender: number) => {
    if (gender === 1) return '여성';
    if (gender === 2) return '남성';
    return '미정';
  };

  return (
    <div className="person-detail-container">
      {/* 배경 이미지 */}
      {personDetail.profile_path && (
        <div
          className="person-backdrop"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${personDetail.profile_path})`,
          }}>
          <div className="backdrop-overlay"></div>
        </div>
      )}

      <div className="person-content">
        {/* 프로필 섹션 */}
        <div className="person-profile-section">
          <div className="person-poster">
            {personDetail.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${personDetail.profile_path}`}
                alt={personDetail.name}
              />
            ) : (
              <div className="no-image">프로필 없음</div>
            )}
          </div>

          <div className="person-info">
            <h1 className="person-name">{personDetail.name}</h1>

            <div className="person-meta">
              <div className="meta-item">
                <span className="label">직업</span>
                <span className="value">{personDetail.known_for_department}</span>
              </div>

              {personDetail.gender && (
                <div className="meta-item">
                  <span className="label">성별</span>
                  <span className="value">{getGenderText(personDetail.gender)}</span>
                </div>
              )}

              {personDetail.birthday && (
                <div className="meta-item">
                  <span className="label">생년월일</span>
                  <span className="value">
                    {personDetail.birthday}
                    {personDetail.deathday && ` ~ ${personDetail.deathday}`}
                  </span>
                </div>
              )}

              {personDetail.place_of_birth && (
                <div className="meta-item">
                  <span className="label">출생지</span>
                  <span className="value">{personDetail.place_of_birth}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 소개 섹션 */}
        {personDetail.biography && (
          <div className="person-biography-section">
            <h2>소개</h2>
            <p>{personDetail.biography}</p>
          </div>
        )}

        {/* 출연작 섹션 */}
        {personCredits && personCredits.cast && personCredits.cast.length > 0 && (
          <div className="person-works-section">
            <h2>출연작</h2>
            <div className="works-grid">
              {personCredits.cast.map((work) => (
                <div key={`cast-${work.id}-${work.character}`} className="work-card">
                  <div className="work-poster">
                    {work.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w300${work.poster_path}`}
                        alt={work.title}
                      />
                    ) : (
                      <div className="no-poster">No Image</div>
                    )}
                  </div>
                  <div className="work-info">
                    <h3>{work.title}</h3>
                    <p className="year">
                      {work.release_date?.split('-')[0] || work.first_air_date?.split('-')[0]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 스태프 섹션 */}
        {personCredits && personCredits.crew && personCredits.crew.length > 0 && (
          <div className="person-works-section">
            <h2>스태프</h2>
            <div className="works-grid">
              {personCredits.crew.map((work) => (
                <div key={`crew-${work.id}-${work.job}`} className="work-card">
                  <div className="work-poster">
                    {work.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w300${work.poster_path}`}
                        alt={work.title}
                      />
                    ) : (
                      <div className="no-poster">No Image</div>
                    )}
                  </div>
                  <div className="work-info">
                    <h3>{work.title}</h3>
                    <p className="job">{work.job}</p>
                    <p className="year">
                      {work.release_date?.split('-')[0] || work.first_air_date?.split('-')[0]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonDetail;
