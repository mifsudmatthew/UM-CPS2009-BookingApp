import { useState, useEffect } from "react";
import { Post } from "../utils/ApiFunctions";
import { useLocation } from "react-router-dom";

import { useAuth } from "../context/Auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Topup() {
  const [amount, setAmount] = useState("");
  const { token, setToken } = useAuth();

  const session_id = new URLSearchParams(useLocation().search).get(
    "session_id"
  );

  useEffect(() => {
    async function fetchData() {
      // Get the session_id
      if (session_id) {
        try {
          const response = await Post("/api/success", {
            session_id: session_id,
          });

          console.log(response);
        } catch (err) {
          console.error(`Error in top-up with session_id: ${err}`);
        }
      }
    }

    fetchData();
  }, [session_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const numericAmount = parseFloat(amount);

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

    try {
      console.log("Amount: ", numericAmount);
      const data = await Post("/api/topup", { amount: numericAmount }, token);

      if (data.url) {
        window.location.href = data.url;
      }

      console.log(data);
    } catch (error) {
      console.error(`Error in top-up: ${error}`);
    }
  };

  return (
    <main className="profile">
      <ToastContainer />
      <h1 className="header-title">Top Up</h1>
      <form onSubmit={handleSubmit} className="inputContainer">
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
        />
      </form>
    </main>
  );
}

export default Topup;
