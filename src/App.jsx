import React, { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import HeroSection from "./Components/Sections/HeroSection";
import SkillsSection from "./Components/Sections/SkillsSection";
import ProjectsSection from "./Components/Sections/ProjectsSection";
import AboutSection from "./Components/Sections/AboutSection";
import ContactSection from "./Components/Sections/ContactSection";
import Footer from "./Components/Sections/Footer";

import LoadingScreen from "./Components/LoadingScreen";
import ScrollToTopButton from "./Components/ScrollToTopButton";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "./utils/helper";

// List of assets to preload (images, favicon, fonts)
const ASSETS = [
  // "@/src/assets/images/project-2.png",
  // "@/src/assets/images/project-3.png",
  "@/public/logo.svg", // favicon
  // External profile image (optional, add if used in HeroSection)
  "https://avatars.githubusercontent.com/imanlangaran",
];

// Google Fonts URLs
const FONT_URLS = [
  // "https://fonts.googleapis.com/css2?family=Mona+Sans:ital,wght@0,200..900;1,200..900&family=Urbanist:ital,wght@0,100..900;1,100..900&family=Vazirmatn:wght@100..900&display=swap"

  "https://fonts.googleapis.com/css2?family=Mona+Sans:ital,wght@0,200..900;1,200..900&display=swap",
  "https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap",
  "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap",
];

const TOTAL_ASSETS = ASSETS.length + FONT_URLS.length;

// ponytail: in-memory flag skips preloading on route return; upgrade to service worker / cache API if assets need offline caching.
let assetsPreloaded = false;

const App = () => {
  const [loaded, setLoaded] = useState(() => (assetsPreloaded ? TOTAL_ASSETS : 0));
  const [showApp, setShowApp] = useState(() => assetsPreloaded);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (!showApp) return;

    const sectionId = location.state?.scrollTo; // e.g. "contact"
    if (!sectionId) return;

    scrollToSection(
      sectionId,
      () => {
        if (location.state?.restoreCardId) {
          const cardEl = document.getElementById(location.state.restoreCardId);
          cardEl?.focus();
        }
        navigate(location.pathname, { state: null, replace: true });
      },
      200,
    );
  }, [showApp, location.state, location.pathname, navigate]);

  useEffect(() => {
    if (assetsPreloaded) return;

    let loadedCount = 0;

    const updateProgress = () => {
      loadedCount++;
      setLoaded(loadedCount);
      if (loadedCount === TOTAL_ASSETS) {
        assetsPreloaded = true;
        // Small delay for smoothness
        setTimeout(() => setShowApp(true), 200);
      }
    };

    // Preload images and favicon
    ASSETS.forEach((src) => {
      const img = new window.Image();
      img.onload = img.onerror = updateProgress;
      img.src = src;
    });

    // Preload fonts (by injecting link and waiting for load)
    FONT_URLS.forEach((url) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      link.onload = updateProgress;
      link.onerror = updateProgress;
      document.head.appendChild(link);
    });
  }, []);

  const percent = Math.round((loaded / TOTAL_ASSETS) * 100);

  if (!showApp) {
    return <LoadingScreen percent={percent} />;
  }

  return (
    // <div className={`scroll-smooth scrollbar-thin scrollbar-thumb-blue-500 ${isDarkMode ? "scrollbar-track-gray-950" : "scrollbar-track-gray-200"}`}>
    <>
      <NavBar />
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      {/* Floating scroll-to-top button (watches the window scroll) */}
      <ScrollToTopButton />
    </>
  );
};

export default App;
