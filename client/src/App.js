import { Routes, Route } from "react-router-dom";

import "./styles/App.css";

import Header from "./components/Header";

import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Account from "./pages/Account";
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
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/booking" element={<Booking />}></Route>
        <Route path="/account" element={<Account />}></Route>
        <Route path="/account/login" element={<Login />}></Route>
        <Route path="/account/register" element={<Register />}></Route>
        <Route path="/account/reset" element={<Reset />}></Route>
        <Route path="/account/profile" element={<Profile />}></Route>
        <Route path="/account/profile/topup" element={<Topup />}></Route>
        <Route path="/account/profile/changepw" element={<ChangePW />}></Route>
      </Routes>
    </>
  );
}

export default App;
