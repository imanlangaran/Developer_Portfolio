import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { Code2, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLang } from "../context/LangContext";
import { getChangeLangDuration, scrollToSection } from "../utils/helper";
import LangToggle from "./Preferences/LangToggle";
import ThemeToggle from "./Preferences/ThemeToggle";

const navLinks = ["Home", "Skills", "Work", "About", "Contact"];

const NavBar = () => {
  const { isDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation('common');
  const { lang } = useLang();

  const handleClick = (sectionId) => {
    scrollToSection(sectionId, () => setIsMenuOpen(false));
  };

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        style={{ opacity: 1 }}
        className={`fixed top-0 w-full z-50 pl-6 pr-4 py-4 ${
          isDarkMode ? "bg-gray-950/80" : "bg-gray-50/80"
        } backdrop-blur-md border-b ${
          isDarkMode ? "border-gray-800" : "border-gray-200"
        }`}
        key={lang}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 1, y: "-100%" }}
        transition={{
          duration: getChangeLangDuration("s"),
          ease: "easeInOut",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Code2 size={24} className="text-blue-500" />{" "}
            {/* <span className={`text-lg ml-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Iman Langaran</span> */}
            <span
              className={`text-lg ml-1 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {t("my name")}
            </span>
          </motion.div>

          {/* desktop navigation */}
          {/* <div className="hidden md:flex items-center space-x-12"> */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <motion.button
                key={item}
                whileHover={{ y: -2 }}
                onClick={() => handleClick(item)}
                className={`text-sm uppercase ${
                  lang === "En" ? "tracking-wider" : ""
                } transition-colors ${
                  isDarkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {t(item)}
              </motion.button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <LangToggle />
            <ThemeToggle />
          </div>
          {/* </div> */}

          {/* mobile menu button */}
          <div className="md:hidden flex grow items-center ms-5 justify-end space-x-4">
            <LangToggle />
            <ThemeToggle />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
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
              className={`md:hidden mt-4 p-4 rounded-lg ${
                isDarkMode ? "bg-gray-900" : "bg-white"
              } border ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
            >
              {navLinks.map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ x: 5 }}
                  onClick={() => handleClick(item)}
                  className={`block w-full text-left py-2 text-sm uppercase ${
                    lang === "En" ? "tracking-wider" : ""
                  } transition-colors ${
                    isDarkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {t(item)}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </AnimatePresence>
  );
};

export default NavBar;
