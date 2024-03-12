import React, { useState } from 'react';
import '../styles/courtselector.css';

const CourtSelection = () => {
  const [courts, setCourts] = useState([
    { id: 'court-1', name: 'Indoor Court', available: true, selected: false },
    { id: 'court-2', name: 'Clay Court', available: true, selected: false },
    { id: 'court-3', name: 'Grass Court', available: true, selected: false },
  ]);

  const selectCourt = (courtId) => {
    setCourts(courts.map(court => {
      return court.id === courtId ? { ...court, selected: !court.selected } : { ...court, selected: false };
    }));
  };

  const getFillColor = (court) => {
    if (!court.available) return '#f4e1e2';
    if (court.selected) return '#A0CFD0';
    return '#A2B798';
  };

  return (
    <>
    <div className="court-container">
      <svg id="etNlYwVoP9c1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 250" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
        {courts.map(court => (
          <g key={court.id} onClick={() => court.available && selectCourt(court.id)}>
            <rect
              id={court.id}
              width="262.5"
              height={court.id === 'court-1' ? '99.590164' : '99.590164' / 1.6} 
              rx="7"
              ry="7"
              transform={
                court.id === 'court-1'
                  ? "translate(21.209016 16.598361)"
                  : court.id === 'court-2'
                  ? "matrix(.391882 0 0 1.60014 21.209016 125.580867)"
                  : "matrix(.578438 0 0 1.60014 131.869041 125.580867)"
              }
              fill={getFillColor(court)}
              stroke-width="0"
              stroke-linecap="round"
              style={{ cursor: court.available ? 'pointer' : 'not-allowed' }}
            />
            <text
      font-family="Roboto"
      font-size="10"
      font-weight="700"
      text-anchor="middle"
      dominant-baseline="central" 
      fill="#3e493b"
      stroke-width="0"
      transform={`translate(${
        court.id === 'court-1'
          ? "152.5"
          : court.id === 'court-2'
          ? "70.5" 
          : "210"   
      }, ${
        court.id === 'court-1'
          ? "66" 
          : "175"
      })`}
    >
      {court.name}
    </text>
          </g>
        ))}
      </svg>
    </div>
    <div className="court-availability">
    <span className="available"></span> Available
    <span className="not-available"></span> Not Available
    <span className="selected-indicator"></span> Selected
  </div>
  </>
  );
};

export default CourtSelection;
