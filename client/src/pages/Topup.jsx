import { useState } from "react";
import { Post } from "../utils/ApiFunctions";
import { useToken } from "../hooks/useToken";

function Topup() {
  const [amount, setAmount] = useState(""); 
  const { token } = useToken(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    const numericAmount = parseFloat(amount);

    try {
      console.log("Amount: ", numericAmount);
      const data = await Post("/api/topup", { amount: numericAmount }, token);
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
