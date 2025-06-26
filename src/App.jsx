import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import NavBar from './Components/NavBar'
import HeroSection from './Components/Sections/HeroSection'

const App = () => {
  return (
    <ThemeProvider>
      <div>
        <NavBar />
        <HeroSection />
      </div>
    </ThemeProvider>
  )
}

export default App