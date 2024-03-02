import { useState } from "react";

import { Post } from "../utils/ApiFunctions";

function BookingForm() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");

  if (count < 0) {
    setCount(0);
  }

  const incCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decCount = () => {
    setCount((prevCount) => prevCount - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name,
      email,
      date,
      numberOfPlayers: count,
    };

    console.log("Data:", data);

    try {
      const response = await Post("/api/booking", data);

      console.log("Success:", response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="userInfo">
        <label>Enter your name:</label>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="userInfo">
        <label>Enter your email:</label>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="userInfo">
        <label>Enter your date:</label>
        <input
          type="date"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </div>
      <div className="card">
        Number of players: {count}
        <button type="button" onClick={incCount}>
          +
        </button>
        <button type="button" onClick={decCount}>
          -
        </button>
        <div>
          <button type="submit">Submit Booking</button>
        </div>
      </div>
    </form>
  );
}

export default BookingForm;
