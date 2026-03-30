import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PageLoader from "./components/PageLoader";
import PageTransition from "./components/PageTransition";
import AboutPage from "./pages/AboutPage";
import Dashboard from "./pages/Dashboard";
import HelpCenter from "./pages/HelpCenter";
// Pages
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PricingPage from "./pages/PricingPage";
import Register from "./pages/Register";
import SendMoney from "./pages/SendMoney";
import ThemeConfig from "./theme/ThemeConfig";

const App = () => {
  const [loading, _setLoading] = React.useState(false);

  return (
    <ThemeConfig>
      <Router>
        <PageLoader loading={loading}>
          <Navbar />
          <PageTransition>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/login" element={<Login onLogin={() => {}} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/send-money" element={<SendMoney />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
          <Footer />
        </PageLoader>
      </Router>
    </ThemeConfig>
  );
};

export default App;
