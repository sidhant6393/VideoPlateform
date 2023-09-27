// src/Overlay.js
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import Resizable from 'react-resizable';


const Overlay = ({
  id,
  content,
  positionX,
  positionY,
  size,
  onCreateOverlay,
  onUpdateOverlay,
  onDeleteOverlay,
}) => {
  // Add state to manage overlay content and size
  const [overlayContent, setOverlayContent] = useState(content);
  const [overlaySize, setOverlaySize] = useState(size);

  const handleCreate = () => {
    onCreateOverlay(overlayContent, positionX, positionY, overlaySize);
    // Clear form fields after creation
    setOverlayContent('');
    setOverlaySize(50);
  };

  return (
    <Draggable
      position={{ x: positionX, y: positionY }}
      onStop={(e, data) => onUpdateOverlay(id, { positionX: data.x, positionY: data.y })}
    >
      <Resizable
        width={overlaySize}
        height={overlaySize}
        onResize={(e, { size }) => setOverlaySize(size.width)}
        onResizeStop={(e, { size }) => onUpdateOverlay(id, { size: size.width })}
      >
        <div
          className="absolute"
          style={{ width: overlaySize, height: overlaySize }}
        >
          <div
            className="bg-white p-2"
            style={{ width: '100%', height: '100%' }}
          >
            {/* Overlay content */}
            <div className="text-center">{overlayContent}</div>

            {/* Overlay controls */}
            <div className="flex justify-end mt-2">
              <button
                className="bg-blue-500 text-white p-1 rounded"
                onClick={() => onUpdateOverlay(id, { content: overlayContent })}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white p-1 ml-2 rounded"
                onClick={() => onDeleteOverlay(id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Resizable>
    </Draggable>
  );
};

export default Overlay;
