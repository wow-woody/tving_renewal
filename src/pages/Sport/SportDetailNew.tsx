// import React from 'react';
import { useParams } from 'react-router-dom';
import './SportDetailNew.scss';
import { sports } from '../../data/sport';

const SportDetailNew = () => {
  const { id } = useParams<{ id: string }>();
  const sport = sports.find((item) => String(item.id) === id);

  if (!sport) {
    return <div className="sport-detail-new__notfound">경기를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="sport-detail-new__wrapper">
      <div className="sport-detail-new__banner">
        <img src={sport.thumb} alt={sport.title} />
        <div className="sport-detail-new__title">{sport.title}</div>
      </div>
      <div className="sport-detail-new__info">
        {/* <div className="sport-detail-new__desc">{sport.desc || '경기 설명이 없습니다.'}</div> */}
        <div className="sport-detail-new__meta">
          <span>카테고리: {sport.category}</span>
          {/* {sport.date && <span> | 경기일: {sport.date}</span>} */}
        </div>
      </div>
      {/* 추가 정보/디자인 요소는 여기에 */}
    </div>
  );
};

export default SportDetailNew;
