import { Routes, Route } from "react-router-dom";
import App from "./App.jsx";

/* Context */
import User from "./context/User";
import Auth from "./context/Auth";

/* Components */
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

// Modifies div with root id in index.html
export default function AppContainer() {
  /* Context Initialization */
  const { AuthProvider } = Auth();
  const { UserProvider } = User();

  return (
    <UserProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index exact element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="reset" element={<Reset />} />
            <Route path="booking" element={<Booking />} />
            <Route path="profile" element={<Profile />}>
              <Route index exact element={<AccountDetails />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="balance" element={<Balance />} />
              <Route path="topup" element={<Topup />} />
              <Route path="changepassword" element={<ChangePW />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </UserProvider>
  );
}
