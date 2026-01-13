import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import './Mainbanner.scss';

const banners = [
  { title: '친애하는 X', image: '/images/mainbanner/main-banner1.png' },
  { title: '응답하라 1998', image: '/images/mainbanner/main-banner2.png' },
  { title: '슬기로운 의사생활', image: '/images/mainbanner/main-banner3.png' },
  { title: '벌거벗은 세계사', image: '/images/mainbanner/main-banner4.png' },
  { title: '뭉쳐야찬다4', image: '/images/mainbanner/main-banner5.png' },
  { title: '냉장고를 부탁해', image: '/images/mainbanner/main-banner6.png' },
];

const MainBanner = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop
      pagination={{
        el: '.custom-pagination',
        clickable: true,
        renderBullet: (index, className) => {
          return `
            <div class="${className} pager-item">
              <span class="pager-title">${banners[index].title}</span>
              <span class="pager-progress"></span>
            </div>
          `;
        },
      }}
      className="mainbanner">
      {/* 슬라이드 */}
      {banners.map((item, i) => (
        <SwiperSlide key={i}>
          <img src={item.image} alt={item.title} />
        </SwiperSlide>
      ))}

      {/* 커스텀 페이저 */}
      <div className="custom-pagination glass" />
    </Swiper>
  );
};

export default MainBanner;
