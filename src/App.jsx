import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  // ✅ Correct Import
// import Navbar from "./_compo/Navbar";
import Navbar from "./components/Navbar/Navbar";
import QuestionsPage from "./pages/QuestionsPage";
import AboutPage from "./pages/AboutPage";
import LoginRegisterForm from "./_compo/LoginRegisterForm";
import AdminPage from "./pages/AdminPage";
import ErrorPage from "./pages/ErrorPage";
import ContactPage from "./pages/ContactPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Router>  {/* ✅ Ensure BrowserRouter wraps your app */}
    <Navbar />
    <div className="pt-16">
        {/* Add consistent top padding */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/Login" element={<LoginRegisterForm />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<ErrorPage code={404} />} />
          <Route path="/error" element={<ErrorPage code={500} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

