// src/components/OnAirDramaList.tsx
import { Link } from 'react-router-dom';

interface DramaItem {
  id: number;
  title?: string;
  name?: string;
  poster?: string;
  poster_path?: string | null;
}

interface DramaSwiperProps {
  tvs: DramaItem[];
}

const DramaSwiper = ({ tvs }: DramaSwiperProps) => {
  return (
    <section className="drama-section">
      <ul className="drama-list">
        {tvs.map((item: DramaItem) => {
          const title = item.title || item.name;
          const poster =
            item.poster ||
            (item.poster_path
              ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
              : '/images/no-poster.png');

          return (
            <li key={item.id}>
              <Link to={`/tv/${item.id}`}>
                <div className="poster">
                  <img src={poster} alt={title} />
                </div>
                <p className="title">{title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default DramaSwiper;
