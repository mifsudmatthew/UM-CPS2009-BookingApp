import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/App.css";

import Home from "./pages/Home";
import Booking from "./pages/Booking";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/booking" element={<Booking />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
