import { useEffect, useState } from "react"


export const ThemeContext = ({ children }) => {
  const [isDarkMode, toggleDarkMode] = useState(
    localStorage.getItem('theme') || 'light'
  )

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode);
  }, [isDarkMode])

  return (
    <ThemeContext.Provider
      value={{ isDarkMode: isDarkMode === 'dark', toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext