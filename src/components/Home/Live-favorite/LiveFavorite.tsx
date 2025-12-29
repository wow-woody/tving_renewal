import { useState } from 'react';
import { SwiperSlide } from "swiper/react";
import type { LiveChannel } from "../../../data/LiveChannels";
import LiveSwiper from '../../LiveSwiper/LiveSwiper';
import LiveCard from '../../LiveContentCard/LiveContentCard';

interface Props {
  list: LiveChannel[];
}

const LiveFavorite = ({ list = [] }: Props) => {
  const newsList = list.filter((item) => item.state === "mylive");
  const [playingId, setPlayingId] = useState<string | null>(null);

  if (newsList.length === 0) return null;

  return (
    <div className="live-list">

      <LiveSwiper slidesPerView='auto' loop={true}>

        {newsList.map((item) => (
          <SwiperSlide key={item.id}>
            <LiveCard 
              item={item} 
              isPlaying={playingId === item.id} 
              onPlay={setPlayingId} 
            />
          </SwiperSlide>
        ))}

      </LiveSwiper>
    </div>
  );
};

export default LiveFavorite;