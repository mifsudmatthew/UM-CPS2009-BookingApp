import { Routes, Route } from "react-router-dom";

import "./styles/App.css";

import Header from "./components/Header";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import Profile from "./pages/Profile";
import Topup from "./pages/Topup";
import ChangePW from "./pages/ChangePW";

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/booking" element={<Booking />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/reset" element={<Reset />}></Route>
        <Route path="/profile" exact element={<Profile />}></Route>
        <Route path="/profile/topup" element={<Topup />}></Route>
        <Route path="/profile/changepassword" element={<ChangePW />}></Route>
      </Routes>
    </>
  );
}

export default App;
