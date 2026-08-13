import "./App.css";
import {
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ErrorPage from "./components/ErrorPage";
import ShortenUrlPage from "./components/ShortenUrlPage";

import DashboardLayout from "./components/Dashboard/DashboardLayout";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />

        <Route path="/about" element={<AboutPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<DashboardLayout />}
        />

        {/* Short URL Redirect */}
        <Route
          path="/s/:url"
          element={<ShortenUrlPage />}
        />

        {/* Error */}
        <Route
          path="/error"
          element={<ErrorPage />}
        />

        {/* Unknown URL */}
        <Route
          path="*"
          element={<ErrorPage message="Page not found" />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;