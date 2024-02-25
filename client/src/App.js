import { Routes, Route } from "react-router-dom";

import "./styles/App.css";

import Header from "./components/Header";

import Home from "./pages/Home";
import Booking from "./pages/Booking";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/booking" element={<Booking />}></Route>
      </Routes>
    </>
  );
}

export default App;
