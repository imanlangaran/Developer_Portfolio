import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import NavBar from './Components/NavBar'

const App = () => {
  return (
    <ThemeProvider>
      <div>
        <NavBar />
      </div>
    </ThemeProvider>
  )
}

export default App