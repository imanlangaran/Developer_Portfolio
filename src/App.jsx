import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import NavBar from './Components/NavBar'
import HeroSection from './Components/Sections/HeroSection'
import SkillsSection from './Components/Sections/SkillsSection'
import ProjectsSection from './Components/Sections/ProjectsSection'
import AboutSection from './Components/Sections/AboutSection'
import ContactSection from './Components/Sections/ContactSection'
import Footer from './Components/Sections/Footer'

const App = () => {
  return (
    <ThemeProvider>
      <div>
        <NavBar />
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App