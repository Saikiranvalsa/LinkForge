import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ShortenUrlPage from "./components/ShortenUrlPage";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "./components/ErrorPage";

const AppRouter = () => {
  const location = useLocation();

  // Hide Navbar and Footer for short URL redirect page
  const hideHeaderFooter = location.pathname.startsWith("/s/");

  return (
    <>
      {!hideHeaderFooter && <Navbar />}

      <Toaster position="bottom-center" />

      <Routes>
        {/* Public pages */}
        <Route path="/" element={<LandingPage />} />

        <Route path="/about" element={<AboutPage />} />

        {/* Authentication pages */}
        <Route
          path="/register"
          element={
            <PrivateRoute publicPage={true}>
              <RegisterPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PrivateRoute publicPage={true}>
              <LoginPage />
            </PrivateRoute>
          }
        />

        {/* Protected dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute publicPage={false}>
              <DashboardLayout />
            </PrivateRoute>
          }
        />

        {/* Short URL redirect */}
        <Route path="/s/:url" element={<ShortenUrlPage />} />

        {/* Error page */}
        <Route path="/error" element={<ErrorPage />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <ErrorPage message="We can't seem to find the page you're looking for" />
          }
        />
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default AppRouter;