/* App.jsx
 * Main react page */

/* React imports */
import { Routes, Route } from "react-router-dom";

/* CSS */
import "./styles/app.css";

/* Components */
import Navbar from "./components/Navbar";
import Bookings  from './components/Bookings';
import Balance  from './components/Balance';

/* Pages */
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import Profile from "./pages/Profile";
import Topup from "./pages/Topup";
import ChangePW from "./pages/ChangePW";

import { AuthContext } from "./context/Authenication";
import { UserContext } from "./context/User";
import { useToken } from "./hooks/useToken";
import { useUser } from "./hooks/useUser";
// Main react app
function App() {
  const { accessToken } = useToken();
  const { user } = useUser();
  return (
    <>
      <UserContext.Provider value={user}>
        <AuthContext.Provider value={accessToken}>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/reset" element={<Reset />}></Route>
            <Route path="/booking" element={<Booking />}></Route>
            <Route path="/profile" exact element={<Profile />}></Route>
            <Route path="/profile" element={<Profile />}>
              <Route path="bookings" element={<Bookings />}></Route>
              <Route path="balance" element={<Balance />}></Route>
            </Route>
            <Route path="/profile/topup" element={<Topup />}></Route>
            <Route
              path="/profile/changepassword"
              element={<ChangePW />}></Route>
          </Routes>
        </AuthContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
