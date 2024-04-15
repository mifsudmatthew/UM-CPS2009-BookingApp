import { Routes, Route } from "react-router-dom";
import App from "./App.jsx";

/* Context */
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NavbarContext";

/* Components */
import Bookings from "./components/profile/Bookings.jsx";
import Balance from "./components/profile/Balance.jsx";
import AccountDetails from "./components/profile/AccountDetails";
import ConfigCourts from "./components/admin/ConfigCourts.jsx";
import AddNewCourt from "./components/admin/AddNewCourt.jsx";

/* Pages */
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import Profile from "./pages/Profile";
import Topup from "./pages/Topup";
import ChangePW from "./pages/ChangePW";
import Errors from "./pages/Errors";
import AdminPage from "./pages/AdminPage.jsx";

// Modifies div with root id in index.html
export default function AppContainer() {
  return (
    <UserProvider>
      <AuthProvider>
        <NotificationProvider>
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
                <Route path="topup" element={<Topup />} />
                <Route path="changepassword" element={<ChangePW />} />
                <Route path="*" element={<Errors />} />
              </Route>
              <Route path="admin" element={<AdminPage />}>
                <Route index exact element={<ConfigCourts />} />
                <Route path="updatecourts" element={<ConfigCourts />} />
                <Route path="addnewcourt" element={<AddNewCourt />} />
                <Route path="*" element={<Errors />} />
              </Route>
            </Route>
            <Route path="*" element={<Errors />} />
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </UserProvider>
  );
}
