import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Post } from "../utils/ApiFunctions";

import Form from "../components/Form";
import InputBox from "../components/InputBox";
import InputButton from "../components/InputButton";

function Topup() {
  const [amount, setAmount] = useState("");
  const history = useHistory();
  const location = useLocation();
  const session_id = new URLSearchParams(location.search).get("session_id");

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

  const handleSubmit = async () => {
    try {
      const numericAmount = parseFloat(amount);
      console.log("Amount: ", numericAmount);

      const data = await Post("/api/topup", { amount: numericAmount });
      console.log(data);

      if (data.url) {
        // window.location.href = data.url; // old line
        history.push(data.url); // GPT said this might be better
      }
    } catch (error) {
      console.error(`Error in top-up: ${error}`);
    }
  };

  return (
    <main className="profile">
      <h2 className="header-title">Top Up</h2>
      <Form onSubmit={handleSubmit} buttonLabel="Top Up">
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
