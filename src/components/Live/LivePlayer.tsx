import type { LiveChannel } from "../../data/liveChannels";

interface Props {
  channel: LiveChannel;
}

const LivePlayer = ({ channel }: Props) => {
  return (
    <div className="live-player">
      <div
        className="video-area"
        dangerouslySetInnerHTML={{ __html: channel.iframe }}
      />

      {/* <h2 className="live-title">{channel.title}</h2> */}
    </div>
  );
};

export default LivePlayer;
