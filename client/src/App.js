import { Routes, Route } from "react-router-dom";

import "./styles/App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
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
