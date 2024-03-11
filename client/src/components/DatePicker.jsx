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
      <h4>Please select a time and date</h4>
      <div className="date-navigator">
        <button className="arrow left-arrow" onClick={handlePrevDay}>←</button>
        <span>{format(currentDate, 'EEEE do MMMM yyyy')}</span>
        <button className="arrow right-arrow" onClick={handleNextDay}>→</button>
      </div>
    </div>
    <TimePicker initialTimes={['10:00', '11:00', '12:00', '13:00', '14:00', '15:00']} />
    </>
  );
};

export default DatePicker;
