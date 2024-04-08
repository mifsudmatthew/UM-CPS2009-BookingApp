import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Post } from "../utils/ApiFunctions";

import Form from "../components/Form";
import InputBox from "../components/InputBox";
import InputButton from "../components/InputButton";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Renders the Topup page component.
 *
 * @returns {JSX.Element} The Topup page component.
 */

function Topup() {
  const [amount, setAmount] = useState(""); // Initialize the amount state
  const history = useHistory();
  const location = useLocation();
  const session_id = new URLSearchParams(location.search).get("session_id");

  useEffect(() => {
    /**
     * Fetches data when the component mounts.
     * If a session_id is present, it sends a POST request to "/api/success" with the session_id.
     * Logs the response or logs an error if the request fails.
     */
    async function fetchData() {
      if (session_id) {
        try {
          // Send a POST request to "/api/success" with the session_id
          const response = await Post("/api/success", {
            session_id: session_id,
          });

          console.log(response);
        } catch (err) {
          // Log an error if the request fails
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
  const handleSubmit = async () => {
    try {
      const numericAmount = parseFloat(amount);
      if (amount.trim() === "") {
        // Check if amount is not a number or empty
        toast.error("Please enter the amount you would like to top-up.");
        return;
      } else if (numericAmount < 0) {
        toast.error("Error! Please enter a positive number.");
        return;
      }

      if (amount.trim() === "") {
        // Check if amount is not a number or empty
        toast.error("Please enter the amount you would like to top-up.");
        return;
      } else if (isNaN(numericAmount)) {
        toast.error("Error! Input is not a number, please enter a number.");
        return;
      } else if (numericAmount < 0) {
        toast.error("Error! Please enter a positive number.");
        return;
      }
      console.log("Amount: ", numericAmount);

      const data = await Post("/api/topup", { amount: numericAmount });
      console.log(data);

      if (data.url) {
        // window.location.href = data.url; // old line
        history.push(data.url); // GPT said this might be better
      }
    } catch (error) {
      // Log an error if the request fails
      console.error(`Error in top-up: ${error}`);
    }
  };

  return (
    <main className="profile">
      <h2 className="header-title">Top Up</h2>
      <Form onSubmit={handleSubmit} buttonLabel="Top Up">
        {" "}
        {/* Form to top up the user's account */}
        <InputBox
          label="Amount"
          type="number"
          value={amount}
          placeholder="€1000"
          onChange={setAmount}
        />
        <br />
        <InputButton label="Top Up" type="submit" />
      </Form>
    </main>
  );
}

export default Topup;
