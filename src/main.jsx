import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from './Pages/NotFound.js'
import ProjectDetail from './Pages/ProjectDetail.js'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { LangProvider } from './context/LangContext.jsx'

createRoot(document.getElementById('root')).render(
  // TODO: get basename from vite.config.js
  <BrowserRouter basename='/Developer_Portfolio'>
    <ThemeProvider>
    <LangProvider>
        {/* TODO: what does StrictMode do, is it necessary to use it here */}
        <StrictMode>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='project/:id' element={<ProjectDetail />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </StrictMode>
      </LangProvider>
    </ThemeProvider>
  </BrowserRouter>

)
