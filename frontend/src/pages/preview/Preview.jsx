import React from 'react';
import './Preview.css';
import videoBg from '../../assets/image/concert-video.mp4';

const Preview = () => {
  return (
    <div className="preview-container">
      <video className="video-bg" src={videoBg} autoPlay loop muted />
      
      <div className="overlay" />
      
      <div className="content">
        <h1 className="title">Serene Radiance</h1>
        <p className="subtitle">One ticket — and everything changed.</p>

        <div className="card-grid">
          <div className="card">
            <div className="card-icon">🎭</div>
            <h3>Teatr</h3>
          </div>
          <div className="card">
            <div className="card-icon">🎵</div>
            <h3>Konsert</h3>
          </div>
          <div className="card">
            <div className="card-icon">🎉</div>
            <h3>Festival</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
