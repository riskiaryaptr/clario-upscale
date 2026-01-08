import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "@/frontend/pages/Index";
import Pricing from "@/frontend/pages/Pricing";
import FaceBlur from "@/frontend/pages/Face-Blur";
import ReimagineUpscaler from "@/frontend/pages/Reimagine-Upscaler";
import BackgroundRemover from "@/frontend/pages/Background-Remover";
import Login from "@/frontend/auth/Login";
import Register from "@/frontend/auth/Register";
import ForgotPassword from "@/frontend/auth/ForgotPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/index" element={<Index />} />
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="/Reimagine" element={<ReimagineUpscaler />} />
        <Route path="/face-blur" element={<FaceBlur />} />
        <Route path="/background-remover" element={<BackgroundRemover />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;