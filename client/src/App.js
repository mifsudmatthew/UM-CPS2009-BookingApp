import { Routes, Route } from "react-router-dom";

import "./styles/App.css";


import Login from "./pages/Login";
import Register from "./pages/Register"

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
}

export default App;
