import { useState, useEffect } from "react";
import { Post } from "../utils/ApiFunctions";
import { useLocation } from "react-router-dom";

import { useAuth } from "../context/Auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Renders the Topup page component.
 *
 * @returns {JSX.Element} The Topup page component.
 */

function Topup() {
  const [amount, setAmount] = useState(""); // Initialize the amount state
  const { token, setToken } = useAuth(); // Get the token and setToken from the Auth context
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [buttonColor, setButtonColor] = useState(null); // Add state to store button color
  const [buttonCursor, setButtonCursor] = useState("pointer"); // Add state to store button cursor

  const session_id = new URLSearchParams(useLocation().search).get(
    "session_id"
  );

  useEffect(() => {
    /**
     * Fetches data when the component mounts.
     * If a session_id is present, it sends a POST request to "/api/success" with the session_id.
     * Logs the response or logs an error if the request fails.
     */
    async function fetchData() {
      if (session_id) {
        try { // Send a POST request to "/api/success" with the session_id
          const response = await Post("/api/success", {
            session_id: session_id,
          });

          console.log(response);
        } catch (err) { // Log an error if the request fails
          console.error(`Error in top-up with session_id: ${err}`);
        }
      }
    }

    fetchData();
  }, [session_id]);

  /**
   * Handles the form submission.
   * Prevents the default form submission behavior.
   * Converts the amount to a numeric value.
   * Sends a POST request to "/api/topup" with the amount and token.
   * If a URL is returned in the response, redirects the user to that URL.
   * Logs the response or logs an error if the request fails.
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsButtonDisabled(true); // Disable the button when the form is submitted
    setButtonCursor("not-allowed"); // Change cursor to not-allowed
    setButtonColor("#CCCCCC"); // Change button color to visually indicate disabled state
    setTimeout(() => {
      setIsButtonDisabled(false);
      setButtonCursor("pointer"); // Change cursor back to pointer
      setButtonColor(null); // Re-enable the button after 2 seconds and reset color
    }, 2000);
    const numericAmount = parseFloat(amount);

    if(amount.trim() === "") {
      // Check if amount is not a number or empty
      toast.error("Please enter the amount you would like to top-up.");
      return;
    } else if (numericAmount < 0) {
      toast.error("Error! Please enter a positive number.");
      return;
    }

    if(amount.trim() === "") {
      // Check if amount is not a number or empty
      toast.error("Please enter the amount you would like to top-up.");
      return;
    }else if (isNaN(numericAmount)){
      toast.error("Error! Input is not a number, please enter a number.");
      return;
    } else if (numericAmount < 0) {
      toast.error("Error! Please enter a positive number.");
      return;
    }


    try { // Send a POST request to top up the user's account
      console.log("Amount: ", numericAmount);
      const data = await Post("/api/topup", { amount: numericAmount }, token);

      if (data.url) {
        window.location.href = data.url;
      }

      console.log(data);
    } catch (error) { // Log an error if the request fails
      console.error(`Error in top-up: ${error}`);
    }
  };

  return (
    <main className="profile">
      <ToastContainer />
      <h1 className="header-title">Top Up</h1>
      <form onSubmit={handleSubmit} className="inputContainer"> {/* Form to top up the user's account */}
        <label>Amount</label>
        <input
          placeholder="€1000"
          className="inputBox"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <br />
        <input
          className={"inputButton"}
          type="button"
          value={"Top Up"}
          onClick={handleSubmit}
          disabled={isButtonDisabled} // Add the disabled attribute here
          style={{
            backgroundColor: buttonColor,
            cursor: buttonCursor, // Apply dynamic cursor style
          }}
        />
      </form>
    </main>
  );
}

export default Topup;
