import { useState, useEffect } from "react";
import { Post } from "../utils/ApiFunctions";
import { useToken } from "../hooks/useToken";
import { useParams } from "react-router-dom";

function Topup() {
  const [amount, setAmount] = useState("");
  const { accessToken } = useToken();

  useEffect(async () => {
    // Get the session_id
    let { session_id } = useParams();
    if (session_id) {
      try {
        const response = await Post("/api/success", { session_id: session_id });

        console.log(response);
      } catch (err) {
        console.error(`Error in top-up with session_id: ${error}`);
      }
    }
  }, []);

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

  return (
    <div className="mainContainer">
      <h1 className="titleContainer">Top Up</h1>
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
    </div>
  );
}

export default Topup;
