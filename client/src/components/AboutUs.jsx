import React from 'react';
import '../styles/aboutus.css';
import happy from '../assets/happy.svg'
import tennis from '../assets/tennis.svg'
import players from '../assets/players.svg'

function AboutUs() {
  return (
    <div className="aboutus-container">
      <div className='aboutus-title'>About Us</div>
      <div className='aboutus-text'>Welcome to ServeSpot! At ServeSpot, we understand that tennis is more than just a sport; it's a lifestyle. That's why we're committed to providing you with a seamless experience, from finding the perfect court to enhancing your skills through our curated resources and community features.</div>
      <br></br>
      <div className='aboutus-text'>Join us in celebrating the joy of tennis and embark on a journey filled with matches, memories, and endless opportunities to ace your game. Whether you're here to compete, socialize, or simply unwind, ServeSpot is your home court for all things tennis. Let's start swinging!</div>
      <div className="statistics">
        <div className="stat-item">
            <img src={happy} className='stat-logo'></img>
          <span className="stat-count">300K+</span>
          <span className="stat-label">Happy customers</span>
        </div>
        <div className="stat-item">
          <img src={tennis} className='stat-logo'></img>
          <span className="stat-count">1.1M</span>
          <span className="stat-label">Completed games</span>
        </div>
        <div className="stat-item">
            <img src={players} className='stat-logo'></img>
          <span className="stat-count">9K+</span>
          <span className="stat-label">Players</span>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
