import { useNavigate } from 'react-router-dom';
import type { LiveChannel } from "../../data/LiveChannels";

import './LiveContentCard.scss'

interface LiveCardProps {
    item: LiveChannel;
    isPlaying: boolean;
    onPlay: (id: string) => void;
}

const LiveContentCard = ({ item, isPlaying, onPlay }: LiveCardProps) => {
    const Navigate = useNavigate();

        return (
            <div className='live-content-card'>
                <div className="content" onClick={() => onPlay(item.id)}>
                    {isPlaying ? (
                        <div dangerouslySetInnerHTML={{ __html: item.iframe }} />
                    ) : (
                        <img src={item.thumb} alt={item.title} />
                    )}
                </div>

                <div className="meta">
                    <div className="row">
                        <span className="badge">LIVE</span>
                        <p
                            className="title"
                            onClick={() => Navigate('/live', { state: { channelId: item.id } })}
                        >
                            {item.title}
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    export default LiveContentCard