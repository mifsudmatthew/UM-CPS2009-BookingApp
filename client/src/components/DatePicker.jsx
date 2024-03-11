import React, { useState } from 'react';
import { format, addDays, subDays } from 'date-fns';
import '../styles/datepicker.css';
import TimePicker from './TimePicker';

const DatePicker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevDay = () => {
    setCurrentDate(prevDate => subDays(prevDate, 1));
  };

  const handleNextDay = () => {
    setCurrentDate(prevDate => addDays(prevDate, 1));
  };

  return (
    <>
      <div className="time-slot-container">
        <h1>Book a Court</h1>
        <h4>Please select a time and date</h4>
        <div className="date-navigator">
          <button className="arrow left-arrow" onClick={handlePrevDay}>←</button>
          <span>{format(currentDate, 'EEEE do MMMM yyyy')}</span>
          <button className="arrow right-arrow" onClick={handleNextDay}>→</button>
        </div>
      </div>
      <TimePicker initialTimes={['10:00', '11:00', '12:00', '13:00', '14:00', '15:00']} />
      <br />
      <h4>
          Pick a court
      </h4>
      <div className="court-container">
        <label for="courtType">Choose a court type: </label>
        <select name="courtType" id="courtType" class="custom-dropdown">
          <option value="clay">Clay Court</option>
          <option value="grass">Grass Court</option>
          <option value="indoor">Indoor Court</option>
        </select>      
      </div>
      <br />
      <button type="submit" className="inputButton">Submit Booking</button>
    </>
  );
};

export default DatePicker;
