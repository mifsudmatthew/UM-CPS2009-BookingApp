import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/courts.css";

import {
  leftArrow,
  rightArrow,
  grassCourtImage,
  clayCourtImage,
  indoorCourtImage,
} from "./Icons";

const courts = [
  {
    image: grassCourtImage,
    title: "Grass Court",
    description:
      "A grass tennis court offers a unique playing experience, embodying the tradition and elegance of the sport. Characterized by its lush green surface, this type of court is made from natural grass trimmed to a very short height, which influences the game's speed and style.",
  },
  {
    image: clayCourtImage,
    title: "Clay Court",
    description:
      "A clay tennis court provides a distinct and strategic game of tennis, reflecting the rich history and finesse required in the sport. The clay affects ball speed and bounce, promoting longer rallies and a slower game, allowing players to showcase their endurance and tactical skills.",
  },
  {
    image: indoorCourtImage,
    title: "Indoor Court",
    description:
      "An indoor tennis court offers a consistent and controlled playing environment, showcasing the modern and dynamic aspects of the sport. Characterized by its smooth, synthetic surface, this type of court is designed for year-round play, unaffected by weather conditions.",
  },
];

const Courts = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const { image, title, description } = courts[current];

  function handleBook() {
    navigate("/booking");
  }

  const handlePrevClick = () => {
    setCurrent((prev) => (prev - 1 + courts.length) % courts.length);
  };

  const handleNextClick = () => {
    setCurrent((prev) => (prev + 1) % courts.length);
  };

  return (
    <div className="feature-card">
      <div className="left-arrow" onClick={handlePrevClick}>
        <img src={leftArrow} alt="Previous" />
      </div>
      <div className="content">
        <img src={image} alt="Grass Court" className="court-image" />
        <div className="text-content">
          <div className="court-title ">{title}</div>
          <div className="court-desc">{description}</div>
        </div>
      </div>
      <div className="right-arrow" onClick={handleNextClick}>
        <img src={rightArrow} alt="Next" />
      </div>
    </div>
  );
};

export default Courts;
