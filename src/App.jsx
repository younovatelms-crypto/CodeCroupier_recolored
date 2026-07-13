import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/sections/Navbar";
import BottomNav from "./components/sections/BottomNav";
import Footer from "./components/sections/Footer";
import ScrollToTop from "./components/ui/ScrollToTop";
import PageTransition from "./components/ui/PageTransition";

import Home from "./pages/Home";
import HowItWorksPage from "./pages/HowItWorksPage";
import AboutPage from "./pages/AboutPage";
import FaqPage from "./pages/FaqPage";
import ContactPage from "./pages/ContactPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className={`min-h-screen bg-black overflow-x-hidden ${!isAuthPage ? "has-bottom-nav" : ""}`}>
      <ScrollToTop />
      {!isAuthPage && <Navbar />}
      <main>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/how-it-works" element={<PageTransition><HowItWorksPage /></PageTransition>} />
            <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
            <Route path="/faq" element={<PageTransition><FaqPage /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
            <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
            <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isAuthPage && <Footer />}
      {!isAuthPage && <BottomNav />}
    </div>
  );
}
