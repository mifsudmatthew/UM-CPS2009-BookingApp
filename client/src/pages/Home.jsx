import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link to="/booking">Booking</Link>
    </>
  );
}

export default Home;
