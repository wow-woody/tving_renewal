import { useParams } from 'react-router-dom';
import { useMovieStore } from '../../../store/useMoviesStore';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import './scss/MovieImages.scss';
import MovieImagePopup from './MovieImagePopup';

const MovieImages = () => {
  const { id } = useParams<{ id: string }>();
  const { images, onFetchImages } = useMovieStore();

  const [showImagePopup, setShowImagePopup] = useState(false);
  const [selectedImagePath, setSelectedImagePath] = useState('');

  const [barOffset, setBarOffset] = useState(0);

  const swiperRef = useRef<SwiperType | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!id) return;
    onFetchImages(id);
  }, [id, onFetchImages]);

  const updateBar = (prog: number) => {
    if (!trackRef.current || !barRef.current) return;

    const track = trackRef.current.clientWidth;
    const bar = barRef.current.clientWidth;
    const maxLeft = Math.max(track - bar, 0);

    setBarOffset(Math.min(Math.max(prog, 0), 1) * maxLeft);
  };

  const handleImageClick = (imagePath: string) => {
    setSelectedImagePath(imagePath);
    setShowImagePopup(true);
  };

  if (!images || images.length === 0) return null;

  const displayImages = images.slice(0, 20);

  return (
    <section className="movieImages-wrap">
      <div
        className="season-section"
        style={{ '--enter-progress': `${barOffset}px` } as CSSProperties}>
        <div className="season-header">
          <div className="season-title">
            <h3>스틸컷 이미지</h3>
          </div>

          <div className="thumb-controls">
            <div className="enter-pagination" ref={trackRef}>
              <div className="pagenation-line" />
              <div className="pointer-line" ref={barRef} />
            </div>
            <div className="enter-nav">
              <button ref={prevRef} className="nav-btn prev">
                ‹
              </button>
              <button ref={nextRef} className="nav-btn next">
                ›
              </button>
            </div>
          </div>
        </div>

        <div className="episode-swiper">
          <Swiper
            modules={[Navigation]}
            slidesPerView={3.8}
            spaceBetween={16}
            navigation
            onBeforeInit={(swiper) => {
              // @ts-expect-error HTMLElement OK
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-expect-error HTMLElement OK
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              updateBar(0);
            }}
            onSlideChange={(swiper) => {
              const total = swiper.slides.length;
              const visible = Number(swiper.params.slidesPerView) || 1;
              const maxIndex = Math.max(total - visible, 1);

              updateBar(swiper.realIndex / maxIndex);
            }}>
            {displayImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="image-card">
                  <button
                    className="image-card-thumb"
                    onClick={() => handleImageClick(image.file_path)}>
                    <img
                      src={`https://image.tmdb.org/t/p/w780${image.file_path}`}
                      alt={`Movie backdrop ${index + 1}`}
                    />
                  </button>
                  <div className="image-title">
                    <h3>스틸컷 {index + 1}</h3>
                    <p>
                      {image.width} x {image.height}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {showImagePopup && (
        <MovieImagePopup imagePath={selectedImagePath} onClose={() => setShowImagePopup(false)} />
      )}
    </section>
  );
};

export default MovieImages;
