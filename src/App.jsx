import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import NavBar from './Components/NavBar'
import HeroSection from './Components/Sections/HeroSection'
import SkillsSection from './Components/Sections/SkillsSection'

const App = () => {
  return (
    <ThemeProvider>
      <div className='pb-[100vh]'>
        <NavBar />
        <HeroSection />
        <SkillsSection />
      </div>
    </ThemeProvider>
  )
}

export default App