import { useState } from "react";
import type { LiveChannel } from "../../data/LiveChannels";

interface Props {
  list: LiveChannel[];
  activeId: string;              // ✅ number → string
  onSelect: (id: string) => void;
}

type Category = '전체' | '뉴스' | '스포츠' | '예능' | '드라마';

const LiveChannelList = ({
  list,
  activeId,
  onSelect,
}: Props) => {
  const [activeTab, setActiveTab] = useState<Category>('전체');

  const filteredList =
    activeTab === '전체'
      ? list
      : list.filter((ch) => ch.category === activeTab);

  return (
    <aside className="live-channel-list">
      <h3>라이브 채널</h3>

      <div className="tab-menu">
        {(['전체', '뉴스', '스포츠', '예능', '드라마'] as Category[]).map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="channel-list-container">
        {filteredList.map((ch) => (
          <button
            key={ch.id}   // ✅ string OK
            className={`channel-item ${
              activeId === ch.id ? "active" : ""
            }`}
            onClick={() => onSelect(ch.id)}  // ✅ string 전달
          >
            <img className="thumb" src={ch.thumb} alt={ch.title} />

            <div className="info">
              <p className="title">{ch.title}</p>
              {/* <p className="time">{ch.time}</p> */}
            </div>
<div className="info-icon">
            {ch.isFree && <span className="live">LIVE</span>}
            {ch.isFree && <span className="free">무료</span>}
         </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default LiveChannelList;
