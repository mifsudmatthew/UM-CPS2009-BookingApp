import { useState } from "react";

function BookingForm() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrementCount = () => {
    if (count === 0) {
      return;
    }
    setCount((prevCount) => prevCount - 1);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
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
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle response here
        console.log("Success:", data);
      } else {
        // Handle errors here
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="userInfo">
        Enter your name: <input type="text" onChange={handleNameChange} />
      </div>
      <div className="userInfo">
        Enter your email: <input type="email" onChange={handleEmailChange} />
      </div>
      <div className="userInfo">
        Enter your date: <input type="date" onChange={handleDateChange} />
      </div>
      <div className="card">
        Number of players: {count}
        <button type="button" onClick={incrementCount}>
          +
        </button>
        <button type="button" onClick={decrementCount}>
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
