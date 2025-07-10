import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import NavBar from "./Components/NavBar";
import HeroSection from "./Components/Sections/HeroSection";
import SkillsSection from "./Components/Sections/SkillsSection";
import ProjectsSection from "./Components/Sections/ProjectsSection";
import AboutSection from "./Components/Sections/AboutSection";
import ContactSection from "./Components/Sections/ContactSection";
import Footer from "./Components/Sections/Footer";
import { LangProvider } from "./context/LangContext";

// const AppContainer = () => {
//   const { i18n: i18nInstance } = useTranslation();
//   const lang = i18nInstance.language;

//   return (
//     <I18nextProvider i18n={i18n}>
//       <div className={`${lang === "En" ? "font-en" : "font-fa"}`}>
//         <NavBar />
//         <HeroSection />
//         <SkillsSection />
//         <ProjectsSection />
//         <AboutSection />
//         <ContactSection />
//         <Footer />
//       </div>
//     </I18nextProvider>
//   );
// };

const App = () => {

  return (
    <ThemeProvider>
      <LangProvider>
        {/* <div className={`${lang === "En" ? "font-en" : "font-fa"}`}> */}
          <NavBar />
          <HeroSection />
          <SkillsSection />
          <ProjectsSection />
          <AboutSection />
          <ContactSection />
          <Footer />
        {/* </div> */}
      </LangProvider>
    </ThemeProvider>
  );
};


export default App;
