import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "@/frontend/pages/Index";
import Pricing from "@/frontend/pages/Pricing";
import ReimagineUpscaler from "@/frontend/pages/Reimagine";
import Login from "@/frontend/auth/Login";
import ForgotPassword from "@/frontend/auth/ForgotPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/index" element={<Index />} />
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="/Reimagine" element={<ReimagineUpscaler />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;