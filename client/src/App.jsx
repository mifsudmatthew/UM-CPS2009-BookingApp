/* App.jsx
 * Main react page */

/* React imports */
import { Routes, Route } from "react-router-dom";

/* CSS */
import "./styles/app.css";

/* Components */
import Navbar from "./components/Navbar";
import Bookings from "./components/Bookings";
import Balance from "./components/Balance";
import AccountDetails from "./components/AccountDetails";

/* Pages */
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import Profile from "./pages/Profile";
import Topup from "./pages/Topup";
import ChangePW from "./pages/ChangePW";

import { UserProvider } from "./context/User";
import { AuthProvider } from "./context/Auth";
// Main react app
function App() {
  return (
    <>
      <UserProvider>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/reset" element={<Reset />}></Route>
            <Route path="/booking" element={<Booking />}></Route>
            <Route path="/profile" element={<Profile />}>
              <Route path="" element={<AccountDetails />} />
              <Route path="bookings" element={<Bookings />}></Route>
              <Route path="balance" element={<Balance />}></Route>
              <Route path="topup" element={<Topup />}></Route>
              <Route path="changepassword" element={<ChangePW />}></Route>
            </Route>
          </Routes>
        </AuthProvider>
      </UserProvider>
    </>
  );
}

export default App;
