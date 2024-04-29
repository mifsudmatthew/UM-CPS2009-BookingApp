import { useState, useEffect } from "react";
import "../../styles/courts.css";
import { Post } from "../../utils/ApiFunctions";

import {
  leftArrow,
  rightArrow,
  grassCourtImage,
  clayCourtImage,
  indoorCourtImage,
} from "../Icons";

/**
 * Renders the Courts component.
 * This component displays a carousel of courts, allowing the user to navigate between them.
 *
 * @returns {JSX.Element} The Courts component.
 */
const Courts = () => {
  const [courtsData, setCourtsData] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await Post("/api/getAllCourts");
        console.log(response);
        if (!response.result) {
          throw new Error("Failed to fetch courts data");
        }
        setCourtsData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handlePrevClick = () => {
    setCurrent((prev) => (prev - 1 + courtsData.length) % courtsData.length);
  };

  const handleNextClick = () => {
    setCurrent((prev) => (prev + 1) % courtsData.length);
  };

  return (
    <div className="feature-card">
      <div className="left-arrow" onClick={handlePrevClick}>
        <img src={leftArrow} alt="Previous" />
      </div>
      <div className="content">
        {courtsData.length > 0 && (
          <>
            <img
              src={
                courtsData[current].type === "Grass Court"
                  ? grassCourtImage
                  : courtsData[current].type === "Clay Court"
                  ? clayCourtImage
                  : indoorCourtImage
              }
              alt={courtsData[current].court_name}
              className="court-image"
            />
            <div className="text-content">
              <div className="court-title">{courtsData[current].court_name}</div>
              <div className="court-info">
                <ul>
                  <li>Price: ${courtsData[current].price}</li>
                  <li>Address: {courtsData[current].address}</li>
                  <li>Area: {courtsData[current].area} sqft</li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="right-arrow" onClick={handleNextClick}>
        <img src={rightArrow} alt="Next" />
      </div>
    </div>
  );
};

export default Courts;
