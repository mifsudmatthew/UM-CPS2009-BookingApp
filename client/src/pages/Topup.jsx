import { useState, useEffect } from "react";
import { Post } from "../utils/ApiFunctions";
import { useToken } from "../hooks/useToken";
import { useLocation, Navigate } from "react-router-dom";

const isLoggedIn = () => {
  return !!localStorage.getItem("accessToken"); // Example check
};

function Topup() {
  const [amount, setAmount] = useState("");
  const { accessToken } = useToken();

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
          console.error(`Error in top-up with session_id: ${error}`);
        }
      }
    }
    fetchData();
  }, [session_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const numericAmount = parseFloat(amount);

    try {
      console.log("Amount: ", numericAmount);
      const data = await Post(
        "/api/topup",
        { amount: numericAmount },
        accessToken
      );

      if (data.url) {
        window.location.href = data.url;
      }

      console.log(data);
    } catch (error) {
      console.error(`Error in top-up: ${error}`);
    }
  };

  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="profile">
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
