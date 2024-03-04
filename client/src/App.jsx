/* App.jsx
 * Main react page */

/* React imports */
import { Routes, Route } from "react-router-dom";

/* CSS */
import "./styles/app.css";

/* Components */
import Navbar from "./components/Navbar";

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
import { useToken } from "./hooks/useToken";
// Main react app
function App() {
  const { token } = useToken();
  return (
    <>
      <AuthContext.Provider value={token}>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/reset" element={<Reset />}></Route>
          <Route path="/booking" element={<Booking />}></Route>
          <Route path="/profile" exact element={<Profile />}></Route>
          <Route path="/profile/topup" element={<Topup />}></Route>
          <Route path="/profile/changepassword" element={<ChangePW />}></Route>
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;
