import type { Content } from "../../type/content";

interface FeaturedCardProps {
  item: Content;
  active: boolean;
  onClick: () => void;
}

const FeaturedCard = ({ item, active, onClick }: FeaturedCardProps) => {
  const iframe = item.iframe?.[0];

  return (
    <div
      className={`featured-card ${active ? "active" : ""}`}
      onClick={!active ? onClick : undefined}
    >
      {active && iframe ? (
        <iframe
          src={`${iframe.src}?autoplay=1&mute=1&controls=0`}
          title={iframe.title || item.title}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : (
        <img src={item.img1} alt={item.title} />
      )}
    </div>
  );
};

export default FeaturedCard;
