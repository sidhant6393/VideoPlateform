// src/App.js
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import VideoPlayer from './components/VideoPlayer';
import Overlay from './components/Overlay';
import axios from 'axios';

function App() {
  const [rtspUrl] = useState('your-rtsp-url-here');
  const [overlays, setOverlays] = useState([]);

  useEffect(() => {
    // Fetch overlays from the API when the component mounts
    axios.get('/api/overlays')
      .then((response) => setOverlays(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleCreateOverlay = (content, positionX, positionY, size) => {
    // Send a POST request to create a new overlay
    axios.post('/api/overlays', { content, positionX, positionY, size })
      .then((response) => {
        setOverlays([...overlays, response.data]);
      })
      .catch((error) => console.error(error));
  };

  const handleUpdateOverlay = (id, updates) => {
    // Send a PUT request to update an overlay
    axios.put(`/api/overlays/${id}`, updates)
      .then((response) => {
        const updatedOverlays = overlays.map((overlay) =>
          overlay._id === id ? { ...overlay, ...updates } : overlay
        );
        setOverlays(updatedOverlays);
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteOverlay = (id) => {
    // Send a DELETE request to delete an overlay
    axios.delete(`/api/overlays/${id}`)
      .then(() => {
        const updatedOverlays = overlays.filter((overlay) => overlay._id !== id);
        setOverlays(updatedOverlays);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <LandingPage />
      <div className="mt-4 p-4 bg-gray-200">
        <h2 className="text-lg font-semibold mb-2">Overlay Options</h2>
        <div className="flex flex-wrap">
          {overlays.map((overlay) => (
            <Overlay
              key={overlay._id}
              id={overlay._id}
              content={overlay.content}
              positionX={overlay.positionX}
              positionY={overlay.positionY}
              size={overlay.size}
              onCreateOverlay={handleCreateOverlay}
              onUpdateOverlay={handleUpdateOverlay}
              onDeleteOverlay={handleDeleteOverlay}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
