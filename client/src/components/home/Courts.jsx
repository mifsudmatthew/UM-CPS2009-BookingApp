/**
 * @file Courts.jsx
 * @desc Display Possible Courts that one can book if they sign up to ServeSpot
 */

import "../../styles/courts.css";

import { useState, useEffect } from "react";

import { Post } from "../../utils/ApiFunctions";

import {
  leftArrow,
  rightArrow,
  grassCourtImage,
  clayCourtImage,
  indoorCourtImage,
} from "../Icons"; // Import the icons used in the Courts component

/**
 * Renders the Courts component.
 * This component displays a carousel of courts, allowing the user to navigate between them.
 * @category Front-end
 * @returns {JSX.Element} The Courts component.
 */
const Courts = () => {
  // Declaring variables to store the courts data and the current court index
  const [courtsData, setCourtsData] = useState([]);
  const [current, setCurrent] = useState(0);

  // Fetch the courts data from the server when a change occurs in the component
  useEffect(() => {
    // Fetch data from the server when the component mounts
    const fetchData = async () => {
      // Send a POST request to the server to get all the courts data
      const response = await Post("/api/getAllCourts");

      // If the request fails, throw an error
      if (!response.result) {
        console.error("Failed to fetch courts data", response.error);
        return;
      }

      // Set the courts data to the response data
      setCourtsData(response.data);
    };

    fetchData(); // Call the fetchData function
  }, []);

  // Function to handle when previous arrow is clicked
  const handlePrevClick = () => {
    // Update the current index to the previous court
    setCurrent((prev) => (prev - 1 + courtsData.length) % courtsData.length);
  };

  // Function to handle when next arrow is clicked
  const handleNextClick = () => {
    // Update the current index to the next court
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
              <div className="court-info">
                <ul>
                  <div className="court-title">
                    {courtsData[current].court_name}
                  </div>
                  <div>Price: €{courtsData[current].price.toFixed(2)}</div>
                  <div>Address: {courtsData[current].address}</div>
                  <div>
                    Area: {courtsData[current].area} m<sup>2</sup>
                  </div>
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
