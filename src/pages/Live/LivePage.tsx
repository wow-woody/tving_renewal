import { useState } from "react";
import { liveChannels } from "../../data/liveChannels";
import LivePlayer from "../../components/Live/LivePlayer";
import LiveChannelList from "../../components/Live/LiveChannelList";
import "./LivePage.scss";

const LivePage = () => {
  const [activeId, setActiveId] = useState(liveChannels[0].id);

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
