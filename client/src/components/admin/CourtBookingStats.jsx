import { useState, useEffect } from "react"; // Importing hooks from react
import { Post } from "../../utils/ApiFunctions"; // Importing the Post function to make POST requests
import "../../styles/accordion.css"; // Importing the accordion styles
import "../../styles/admin.css"; // Importing the admin styles
import { Bar, Line } from "react-chartjs-2"; // Importing the Bar and Line components from react-chartjs-2
import Chart from "chart.js/auto"; // Importing the Chart component from chart.js/auto to render the chart

function CourtBookingStats() {
  // State variables to store the court statistics, names, and profits
  const [courtStats, setCourtStats] = useState([]);
  const [courtNames, setCourtNames] = useState([]);
  const [courtProfits, setCourtProfits] = useState([]);
  // State variable to store the current navigation index
  const [currentNav, setCurrentNav] = useState(0);

  // Function to fetch court bookings
  useEffect(() => {
    // Fetch court bookings from the API
    const fetchCourtBookings = async () => {
      // Try to fetch court bookings
      try {
        // Make a POST request to the server to get the basic statistics
        const response = await Post("/api/getBasicStatistics");

        // Update the court statistics state variable with the response data
        setCourtStats(response.data);

        // Map the court names and profits from the response data
        const names = response.data.map((court) => court.name);

        // Update the court names state variable with the mapped names
        setCourtNames(names);

        // Map the court profits from the response data
        const profit = response.data.map((court) => court.money);

        // Update the court profits state variable with the mapped profits
        setCourtProfits(profit);
      } catch (error) {
        console.error(`Error fetching courts: ${error}`);
      }
    };
    fetchCourtBookings(); // Call the fetchCourtBookings function
  }, []);

  // Function to toggle the accordion
  const toggleAccordion = (index) => {
    // Update the court statistics state variable with the toggled court statistics based on the index value
    setCourtStats((prevStats) =>
      prevStats.map((court, i) =>
        i === index ? { ...court, isOpen: !court.isOpen } : court
      )
    );
  };

  // Function to navigate forward
  const navigateForward = () => {
    setCurrentNav((currentNav + 1) % 3); // Increment the currentNav state variable by 1 and take the modulo 3
  };

  // Function to navigate backward
  const navigateBackward = () => {
    if (currentNav === 0) {
      // Check if the currentNav state variable is 0
      setCurrentNav(2); // Set the currentNav state variable to 2
    } else {
      setCurrentNav(currentNav - 1); // Decrement the currentNav state variable by 1
    }
  };

  // Function to render the charts
  const renderChart = () => {
    if (currentNav === 0) {
      // Check if the currentNav state variable is 0
      return (
        <div>
          <Bar
            className="graph"
            data={{
              labels: courtNames,
              datasets: [
                {
                  label: "Court Profits",
                  data: courtProfits,
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  borderColor: "rgb(75, 192, 192)",
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              responsive: true,
            }}
          />
        </div>
      );
    } else if (currentNav === 1) {
      // Check if the currentNav state variable is 1
      return (
        <div>
          <Line
            className="graph"
            data={{
              labels: courtNames,
              datasets: [
                {
                  label: "Court Profits",
                  data: courtProfits,
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  borderColor: "rgb(75, 192, 192)",
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              responsive: true,
            }}
          />
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <a className="horizontalNav previous" onClick={navigateBackward}>
        &#8249;
      </a>
      <a className="horizontalNav next" onClick={navigateForward}>
        &#8250;
      </a>
      <div className="accordion">
        <div className="chart-container">
          {
            /*Render the chart based on the currentNav state variable*/
            renderChart()
          }
        </div>
        {currentNav === 2 && // Check if the currentNav state variable is 2
          courtStats.map(
            (
              court,
              index // Map the court statistics to render the accordion
            ) => (
              <div key={index} className="accordion-item">
                <div
                  className={`accordion-header ${
                    court.isOpen ? "open" : "close"
                  }`}
                  onClick={() => toggleAccordion(index)} // Toggle the accordion on click
                >
                  {court.name}
                </div>
                <div
                  className={`accordion-body ${
                    court.isOpen ? "open" : "close"
                  }`}
                >
                  <table>
                    <thead>
                      <tr>
                        <th>Bookings Count</th>
                        <th>Total Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{court.bookings}</td>
                        <td>{court.money}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )
          )}
      </div>
    </>
  );
}

export default CourtBookingStats;
