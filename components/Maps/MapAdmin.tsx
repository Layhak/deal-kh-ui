
import React from 'react';

interface MapProps {
  src: string;
  width?: string;
  height?: string;
}

const Map: React.FC<MapProps> = ({ src, width = "300px", height = "160px" }) => {
  return (
    <div className="map-container" style={{ width, height }}>
      <iframe
        src={src}
        width={width}
        height={height}
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
