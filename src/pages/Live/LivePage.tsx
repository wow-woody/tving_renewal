import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { liveChannels } from "../../data/LiveChannels";
import LivePlayer from "../../components/Live/LivePlayer";
import LiveChannelList from "../../components/Live/LiveChannelList";
import "./LivePage.scss";

const LivePage = () => {
  const location = useLocation();
  const channelId = location.state?.channelId;
  
  const [activeId, setActiveId] = useState(channelId || liveChannels[0].id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (channelId) {
      setActiveId(channelId);
    }
  }, [channelId]);

  const activeChannel =
    liveChannels.find((ch) => ch.id === activeId) ??
    liveChannels[0];

  return (
    <section className="live-page">
      <div className="live-layout">
        <LivePlayer channel={activeChannel} />
        <LiveChannelList
          list={liveChannels}
          activeId={activeId}
          onSelect={setActiveId}
        />
      </div>
    </section>
  );
};

export default LivePage;
