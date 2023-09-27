// src/LandingPage.js
import React from 'react';
import VideoPlayer from './VideoPlayer';

const LandingPage = () => {
  // Replace 'your-rtsp-url-here' with your actual RTSP URL
  const rtspUrl = 'https://www.youtube.com/watch?v=yBYWLGAmJrQ';

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Livestream Video Player</h1>
        <VideoPlayer rtspUrl={rtspUrl} />
      </div>
    </div>
  );
};

export default LandingPage;
