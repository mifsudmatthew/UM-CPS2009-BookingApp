import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Post } from "../utils/ApiFunctions";

import Form from "../components/form/Form";
import InputBox from "../components/form/InputBox";
import InputButton from "../components/form/InputButton";

import { toast } from "react-toastify";

import { useProfile } from "../context/ProfileContext";

/**
 * Renders the Topup page component.
 *
 * @returns {JSX.Element} The Topup page component.
 */
function Topup() {
  const location = useLocation();
  const session_id = new URLSearchParams(location.search).get("session_id");
  const { updateToken } = useProfile();
  const [amount, setAmount] = useState(0); // Initialize the amount state

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

          if (response.accessToken) {
            updateToken(response.accessToken);
          }
          console.log(response);
        } catch (err) {
          // Log an error if the request fails
          console.error(`Error in top-up with session_id: ${err}`);
        }
      }
    }

    fetchData();
  }, [session_id, updateToken]);

  /**
   * Handles the form submission.
   * Prevents the default form submission behavior.
   * Converts the amount to a numeric value.
   * Sends a POST request to "/api/topup" with the amount and accessToken.
   * If a URL is returned in the response, redirects the user to that URL.
   * Logs the response or logs an error if the request fails.
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (amount == 0 || amount == "" || amount == null) {
        // Check if amount is not a number or empty
        toast.error("Please enter the amount you would like to top-up.");
        return;
      } else if (isNaN(amount)) {
        toast.error("Error! Input is not a number, please enter a number.");
        return;
      } else if (amount < 0) {
        toast.error("Error! Please enter a positive number.");
        return;
      }
      console.log("Amount: ", amount);

      const data = await Post("/api/topup", { amount: amount });
      console.log(data);

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      // Log an error if the request fails
      console.error(`Error in top-up: ${error}`);
    }
  };

  return (
    <main className="profile">
      <div className="header-title">Top Up</div>
      <Form>
        {/* Form to top up the user's account */}
        <InputBox
          id="topup-amount"
          label="Amount"
          type="number"
          value={amount}
          placeholder="€1000"
          onChange={(event) => setAmount(event.target.value)}
        />
        <br />
        <InputButton label="Top Up" type="submit" onClick={handleSubmit} />
      </Form>
    </main>
  );
}

export default Topup;
