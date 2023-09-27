// src/components/VideoPlayer.js
import React, { useRef } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ rtspUrl }) => {
  // Create a ref for the ReactPlayer component
  const playerRef = useRef(null);

  return (
    <div className="relative">
      <ReactPlayer
        ref={playerRef}
        url={rtspUrl}
        playing={false} // You can set this to true to auto-play
        controls // Show video controls (play, pause, volume, etc.)
        width="100%"
        height="auto"
      />
      {/* Add any additional UI elements or controls here */}
    </div>
  );
};

export default VideoPlayer;
