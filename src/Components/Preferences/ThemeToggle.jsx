// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";

// Design-system variants (see design.md):
// - "navbar": flat icon button used inside the NavBar (desktop + mobile).
// - "topbar": pill button matching the ProjectDetail TopBar controls
//   (rounded-full, border, shadow-md, opaque surface).
const VARIANTS = {
  navbar: (isDarkMode) =>
    `p-2 rounded-full transition-colors ${
      isDarkMode
        ? "text-gray-400 hover:text-white hover:bg-gray-800"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
    }`,
  topbar: (isDarkMode) =>
    `p-2.5 rounded-full border shadow-md transition-all duration-300 ${
      isDarkMode
        ? "bg-gray-900 border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white"
        : "bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900"
    }`,
};

const ThemeToggle = ({ variant = "navbar" }) => {
  const { t } = useTranslation("common");
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleChange = () => toggleDarkMode(isDarkMode ? "light" : "dark");

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleChange}
      className={VARIANTS[variant](isDarkMode)}
      aria-label={isDarkMode ? t("Switch to light mode") : t("Switch to dark mode")}
      title={isDarkMode ? t("Switch to light mode") : t("Switch to dark mode")}
    >
      {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
    </motion.button>
  );
};

export default ThemeToggle;
