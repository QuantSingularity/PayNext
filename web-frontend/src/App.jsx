import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";
import ProtectedRoute from "./components/ProtectedRoute";
import AboutPage from "./pages/AboutPage";
import Dashboard from "./pages/Dashboard";
import HelpCenter from "./pages/HelpCenter";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PricingPage from "./pages/PricingPage";
import ProfilePage from "./pages/ProfilePage";
import Register from "./pages/Register";
import SendMoney from "./pages/SendMoney";
import SettingsPage from "./pages/SettingsPage";
import TransactionHistory from "./pages/TransactionHistory";
import ThemeConfig from "./theme/ThemeConfig";

const App = () => {
  const [authKey, setAuthKey] = useState(0);

  const handleLogin = () => {
    setAuthKey((k) => k + 1);
  };

  return (
    <ThemeConfig>
      <Router>
        <ErrorBoundary>
          <Navbar key={authKey} />
          <PageTransition>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/send-money"
                element={
                  <ProtectedRoute>
                    <SendMoney />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transactions"
                element={
                  <ProtectedRoute>
                    <TransactionHistory />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
          <Footer />
        </ErrorBoundary>
      </Router>
    </ThemeConfig>
  );
};

export default App;
