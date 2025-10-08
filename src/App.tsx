import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./ui/pages/landingPage/LandingPage";
import Login from "./ui/pages/login/Login";
import Dashboard from "./ui/pages/dashboard/Dashboard";
import Home from "./ui/pages/home/Home";
import Sensors from "./ui/pages/sensors/Sensors";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path="sensors" element={<Sensors />} />
      </Route>
    </Routes>
  );
}

export default App;
