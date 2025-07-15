import React, { useEffect, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import NavBar from "./Components/NavBar";
import HeroSection from "./Components/Sections/HeroSection";
import SkillsSection from "./Components/Sections/SkillsSection";
import ProjectsSection from "./Components/Sections/ProjectsSection";
import AboutSection from "./Components/Sections/AboutSection";
import ContactSection from "./Components/Sections/ContactSection";
import Footer from "./Components/Sections/Footer";
import { LangProvider } from "./context/LangContext";

import LoadingScreen from "./Components/LoadingScreen";


// List of assets to preload (images, favicon, fonts)
const ASSETS = [
  // "@/src/assets/images/project-1.png",
  // "@/src/assets/images/project-2.png",
  // "@/src/assets/images/project-3.png",
  // "@/src/assets/images/project-4.png",
  // "@/src/assets/images/project-5.png",
  // "@/src/assets/images/project-6.png",
  // "@/src/assets/images/project-7.png",
  "@/logo.svg", // favicon
  // External profile image (optional, add if used in HeroSection)
  "https://avatars.githubusercontent.com/imanlangaran",
];

// Google Fonts URLs
const FONT_URLS = [
  // "https://fonts.googleapis.com/css2?family=Mona+Sans:ital,wght@0,200..900;1,200..900&family=Urbanist:ital,wght@0,100..900;1,100..900&family=Vazirmatn:wght@100..900&display=swap"

  "https://fonts.googleapis.com/css2?family=Mona+Sans:ital,wght@0,200..900;1,200..900&display=swap",
  "https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap",
  "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap"
];

const TOTAL_ASSETS = ASSETS.length + FONT_URLS.length;

const App = () => {
  const [loaded, setLoaded] = useState(0);
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    let loadedCount = 0;

    const updateProgress = () => {
      loadedCount++;
      setLoaded(loadedCount);
      if (loadedCount === TOTAL_ASSETS) {
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
    <ThemeProvider>
      <LangProvider>
        <NavBar />
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </LangProvider>
    </ThemeProvider>
  );
};


export default App;
