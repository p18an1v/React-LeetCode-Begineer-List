import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  // ✅ Correct Import
import Navbar from "./_compo/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
import LoginRegisterForm from "./_compo/LoginRegisterForm";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>  {/* ✅ Ensure BrowserRouter wraps your app */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
        <Route path="/Login" element={<LoginRegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;

