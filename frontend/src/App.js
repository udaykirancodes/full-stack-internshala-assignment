import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login"
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Dashboard />} exact path="/" />
          <Route element={<Login />} exact path="/login" />
          <Route element={<Register />} exact path="/register" />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
