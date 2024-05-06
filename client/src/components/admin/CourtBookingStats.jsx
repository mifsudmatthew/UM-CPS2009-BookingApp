import { useState, useEffect } from "react";
import { Post } from "../../utils/ApiFunctions";
import "../../styles/accordion.css";
import "../../styles/admin.css";
import { Bar, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

function CourtBookingStats() {
  const [courtStats, setCourtStats] = useState([]);
  const [courtNames, setCourtNames] = useState([]);
  const [courtProfits, setCourtProfits] = useState([]);
  const [currentNav, setCurrentNav] = useState("0");

  useEffect(() => {
    const fetchCourtBookings = async () => {
      try {
        const response = await Post("/api/getBasicStatistics");
        setCourtStats(response.data);
        const names = response.data.map((court) => court.name);
        setCourtNames(names);
        const profit = response.data.map((court) => court.money);
        setCourtProfits(profit);
      } catch (error) {
        console.error(`Error fetching courts: ${error}`);
      }
    };
    fetchCourtBookings();
  }, []);

  const toggleAccordion = (index) => {
    setCourtStats((prevStats) =>
      prevStats.map((court, i) =>
        i === index ? { ...court, isOpen: !court.isOpen } : court
      )
    );
  };

  const navigateForward = () => {
    if (currentNav === "0") {
      setCurrentNav("1");
    } else if (currentNav === "1") {
      setCurrentNav("2");
    } else {
      setCurrentNav("0");
    }
  };

  const navigateBackward = () => {
    if (currentNav === "0") {
      setCurrentNav("2");
    } else if (currentNav === "2") {
      setCurrentNav("1");
    } else {
      setCurrentNav("0");
    }
  };

  const renderChart = () => {
    if (currentNav === "0") {
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
    } else if (currentNav === "1") {
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
      <a href="#" className="horizontalNav previous" onClick={navigateBackward}>
        &#8249;
      </a>
      <a href="#" className="horizontalNav next" onClick={navigateForward}>
        &#8250;
      </a>
      <div className="accordion">
        <div className="chart-container">{renderChart()}</div>
        {currentNav === "2" &&
          courtStats.map((court, index) => (
            <div key={index} className="accordion-item">
              <div
                className={`accordion-header ${
                  court.isOpen ? "open" : "close"
                }`}
                onClick={() => toggleAccordion(index)}
              >
                {court.name}
              </div>
              <div
                className={`accordion-body ${court.isOpen ? "open" : "close"}`}
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
          ))}
      </div>
    </>
  );
}

export default CourtBookingStats;
