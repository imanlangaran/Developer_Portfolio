import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";

import App from "./App";
import NotFound from "./Pages/NotFound";
import ProjectDetail from "./Pages/ProjectDetail";
import { useEffect } from "react";

function RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = sessionStorage.redirect;

    if (redirect) {
      sessionStorage.removeItem("redirect");
      navigate(redirect);
    }
  }, [navigate]);

  return null;
}

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <MotionConfig reducedMotion="user">
      <RedirectHandler />
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<App />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </MotionConfig>
  );
}
