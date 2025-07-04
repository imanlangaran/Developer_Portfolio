import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import NavBar from './Components/NavBar'
import HeroSection from './Components/Sections/HeroSection'
import SkillsSection from './Components/Sections/SkillsSection'
import ProjectsSection from './Components/Sections/ProjectsSection'
import AboutSection from './Components/Sections/AboutSection'
import ContactSection from './Components/Sections/ContactSection'
import Footer from './Components/Sections/Footer'
import i18n from './lang/i18n'
import { I18nextProvider } from 'react-i18next'

const App = () => {
  return (
    <ThemeProvider>
      <I18nextProvider i18n={i18n}>
        <div>
          <NavBar />
          <HeroSection />
          <SkillsSection />
          <ProjectsSection />
          <AboutSection />
          <ContactSection />
          <Footer />
        </div>
      </I18nextProvider>
    </ThemeProvider>
  )
}

export default App