import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login"
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LoginOtp from "./pages/LoginOtp";
import RegisterOtp from "./pages/RegisterOtp";
import ValidateLogin from "./pages/ValidateLogin";
import ValiateRegister from "./pages/ValidateRegister";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Dashboard />} exact path="/" />
          <Route element={<Login />} exact path="/login" />
          <Route element={<Register />} exact path="/register" />
          <Route element={<LoginOtp />} exact path="/loginotp" />
          <Route element={<RegisterOtp />} exact path="/registerotp" />
          <Route element={<ValidateLogin />} exact path="/validatelogin" />
          <Route element={<ValiateRegister />} exact path="/validateregister" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
