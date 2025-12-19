import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import './Tvingnew.scss'

const TvingNew = () => {
    return (
        <>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Link to='/'>
                        <div>
                            <p><img src="/images/test.png" alt="" /></p>
                        </div>
                        <div className='name'>
                            <p><img src="/images/title-png/응팔.png" alt="" />date</p>
                            <p className='date'>date</p>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to='/'>
                        <div>
                            <p><img src="/images/title-png/응팔.png" alt="" /></p>
                            <p className='date'>date</p>
                            <p ><img src="/images/test.png" alt="" /></p>

                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
            </Swiper>
        </>
    )
}

export default TvingNew