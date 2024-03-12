import React, { useState } from 'react';
import '../styles/timepicker.css'; 

const TimePicker = ({ initialTimes }) => {
  const [selectedTime, setSelectedTime] = useState(null);

  const selectTime = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className="time-selector-container">
      {initialTimes.map((time, index) => (
        <div 
          key={index}
          className={`time-slot${selectedTime === time ? ' selected' : ''}`}
          onClick={() => selectTime(time)}
        >
          {time}
          {selectedTime === time && <div className="time-pointer" />}
        </div>
      ))}
    </div>
  );
};

export default TimePicker;
