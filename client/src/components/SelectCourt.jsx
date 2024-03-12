import React, { useState } from 'react';
import '../styles/courtselector.css';

const CourtSelection = () => {
  const [courts, setCourts] = useState([
    { id: 1, name: 'Indoor Court', available: true, selected: false },
    { id: 2, name: 'Clay Court', available: true, selected: false },
    { id: 3, name: 'Grass Court', available: false, selected: false },
  ]);

  const selectCourt = (courtId) => {
    setCourts(courts.map(court => {
      if (court.id === courtId) {
        const selected = !court.selected;
        return { ...court, selected: selected };
      } else {
        return { ...court, selected: false };
      }
    }));
  };

  return (
    <div className="court-container">
      <div
        key={courts[0].id}
        className={`court-option indoor-court ${courts[0].available ? '' : 'not-available'} ${courts[0].selected ? 'selected' : ''}`}
        onClick={() => courts[0].available && selectCourt(courts[0].id)}
      >
        {courts[0].name}
      </div>
      <div className="bottom-court-container">
        {courts.slice(1).map((court) => {
          const courtClass = court.name.replace(' ', '-').toLowerCase();
          return (
            <div
              key={court.id}
              className={`court-option ${courtClass} ${court.available ? '' : 'not-available'} ${court.selected ? 'selected' : ''}`}
              onClick={() => court.available && selectCourt(court.id)}
            >
              {court.name}
            </div>
          );
        })}
      </div>
      <div className="court-availability">
        <span className="available"></span> Available
        <span className="not-available"></span> Not Available
        <span className="selected-indicator"></span> Selected
      </div>
    </div>
  );
};

export default CourtSelection;
