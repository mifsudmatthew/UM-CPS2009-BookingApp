/**
 * @file Topup.jsx
 * @desc Renders a page to top up the user's account.
 */

import { useState, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import ProfileContext from "../context/ProfileContext";
import NotificationContext from "../context/NotificationContext";

import Form from "../components/form/Form";
import InputBox from "../components/form/InputBox";
import InputButton from "../components/form/InputButton";

import { Post } from "../utils/ApiFunctions";

/**
 * Renders the Topup page component.
 * @category Front-end
 * @returns {JSX.Element} The Topup page component.
 */
function Topup() {
  // Getting the location from the router, to get the session_id from the URL
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");

  // Getting the updateToken function from the ProfileContext
  const { updateToken } = useContext(ProfileContext);
  // Getting the storeNotification function from the NotificationContext
  const { storeNotification } = useContext(NotificationContext);

  // Creating a state variable for the amount, defaulting to 20
  const [amount, setAmount] = useState(20);

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
    event.preventDefault(); // Prevent the default form submission behavior

    // Check if the amount is less than 20 or empty
    if ((amount >= 0 && amount < 20) || amount == "" || amount == null) {
      toast.error("Error! Please enter an amount of at least €20.");
      return;
    } else if (isNaN(amount)) {
      // Check if the amount is not a number
      toast.error("Error! Input is not a number, please enter a number.");
      return;
    } else if (amount < 0) {
      // Check if the amount is negative
      toast.error("Error! Please enter a positive number.");
      return;
    }

    // Send a POST request to "/api/topup" with the amount
    const response = await Post("/api/topup", { amount: amount });
    if (!response.result) {
      console.error(`Error in top-up: ${response.error}`);
      return;
    }

    // Redirect the user to the URL returned in the response
    window.location.href = response.data;
  };

  /**
   * If a session_id is present, it sends a POST request to "/api/success" with the session_id.
   * Logs the response or logs an error if the request fails.
   */
  useEffect(() => {
    const handleSuccess = async () => {
      // Send a POST request to "/api/success" with the session_id
      const response = await Post("/api/success", {
        session_id: session_id,
      });

      if (!response.result) {
        storeNotification(`Top Up of ${amount} Failed!`);
        toast.error("Top Up Failed!");
        // Log an error if the request fails
        console.error(`Error in topup success: ${response.error}`);
        return;
      }

      if (!response.data) {
        storeNotification(`Top Up of ${amount} Failed!`);
        console.error("Token that was retured is invalid");
        return;
      }

      // Update the access token if it is present in the response
      updateToken(response.data);
      // Display success toast if the payment was successful
      storeNotification(`Top Up of ${amount} Successful!`);
      toast.success("Top Up Successful!");
    };

    if (session_id) {
      handleSuccess();
      setSearchParams("");
      navigate("/profile/topup", { replace: true });
    }
  });

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
