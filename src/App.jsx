import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import NavBar from './Components/NavBar'
import HeroSection from './Components/Sections/HeroSection'
import SkillsSection from './Components/Sections/SkillsSection'
import ProjectsSection from './Components/Sections/ProjectsSection'
import AboutSection from './Components/Sections/AboutSection'

const App = () => {
  return (
    <ThemeProvider>
      <div className='pb-[100vh]'>
        <NavBar />
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <AboutSection />
      </div>
    </ThemeProvider>
  )
}

export default App