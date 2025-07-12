import { useState } from "react";
import { useTheme } from "../context/ThemeContext"
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { Code2, Menu, Moon, Sun, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLang } from "../context/LangContext";


const navLinks = ['Home', 'Skills', 'Work', 'About', 'Contact'];

const NavBar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { i18n } = useTranslation();
  const { setLang } = useLang()

  const changeLanguage = (lang) => {
    setLang(lang);
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(true);
    }
  }

  return (
    <motion.nav
      style={{ opacity: 1 }}
      className={`fixed top-0 w-full z-50 pl-6 pr-4 py-4 ${isDarkMode ? 'bg-gray-950/80' : 'bg-gray-50/80'
        } backdrop-blur-md border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2"
        >
          <Code2 size={24} className="text-blue-500" />{' '}
          {/* <span className={`text-lg ml-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Iman Langaran</span> */}
          <span className={`text-lg ml-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>{i18n.t('my name')}</span>
        </motion.div>

        {/* desktop navigation */}
        {/* <div className="hidden md:flex items-center space-x-12"> */}
        <div className="hidden md:flex items-center space-x-8">

          {navLinks.map((item) => (
            <motion.button
              key={item}
              whileHover={{ y: -2 }}
              onClick={() => scrollToSection(item.toLowerCase())}
              className={`text-sm uppercase ${i18n.language === 'En' ? 'tracking-wider' : ''} transition-colors ${isDarkMode
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              {i18n.t(item)}
            </motion.button>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => changeLanguage(i18n.t('other lang'))}
            className={`p-2 rounded-full transition-colors ${isDarkMode
              ? 'text-gray-400 hover:text-white hover:bg-gray-800'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
          >
            <div className="flex items-center justify-center w-[18px] h-[18px]">
              {i18n.t('other lang')}
            </div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleDarkMode(isDarkMode ? 'light' : 'dark')}
            className={`p-2 rounded-full transition-colors ${isDarkMode
              ? 'text-gray-400 hover:text-white hover:bg-gray-800'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
        </div>
        {/* </div> */}

        {/* mobile menu button */}
        <div className="md:hidden flex grow items-center ml-5 justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => changeLanguage(i18n.t('other lang'))}
            className={`p-2 rounded-full transition-colors ${isDarkMode
              ? 'text-gray-400 hover:text-white hover:bg-gray-800'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
          >
            <div className="flex items-center justify-center w-[18px] h-[18px]">
              {i18n.t('other lang')}
            </div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleDarkMode(isDarkMode ? 'light' : 'dark')}
            className={`p-2 rounded-full transition-colors ${isDarkMode
              ? 'text-gray-400 hover:text-white hover:bg-gray-800'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 rounded-full transition-colors ${isDarkMode
              ? 'text-gray-400 hover:text-white hover:bg-gray-800'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`md:hidden mt-4 p-4 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-white'
              } border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
          >
            {navLinks.map((item) => (
              <motion.button
                key={item}
                whileHover={{ x: 5 }}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`block w-full text-left py-2 text-sm uppercase ${i18n.language === 'En' ? 'tracking-wider' : ''} transition-colors ${isDarkMode
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                {i18n.t(item)}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default NavBar