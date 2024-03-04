import React from 'react';
import '../styles/courts.css';
import leftArrow from '../assets/arrow-l.svg'; 
import rightArrow from '../assets/arrow-r.svg';
import grassCourtImage from '../assets/grass-court.webp';

function Courts() {
  return (
    <div className="feature-card">
      <div className="navigation-arrow left-arrow" >
        <img src={leftArrow} alt="Previous" />
      </div>
      <div className="content">
        <img src={grassCourtImage} alt="Grass Court" className="court-image" />
        <div className="text-content">
          <div className='court-title '>Grass Court</div>
          <div className='court-desc'>A grass tennis court offers a unique playing experience, embodying the tradition and elegance of the sport. Characterized by its lush green surface, this type of court is made from natural grass trimmed to a very short height, which influences the game's speed and style.</div>
          <button className="login-button">Book now</button>
        </div>
      </div>
      <div className="navigation-arrow right-arrow">
        <img src={rightArrow} alt="Next" />
      </div>
    </div>
  );
}

export default Courts;
