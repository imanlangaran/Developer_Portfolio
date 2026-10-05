// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLang } from "../../context/LangContext";
import { useTheme } from "../../context/ThemeContext";

// Design-system variants (see design.md):
// - "navbar": flat text/icon button used inside the NavBar (desktop + mobile).
// - "topbar": pill button matching the ProjectDetail TopBar controls
//   (rounded-full, border, shadow-md, opaque surface).
const VARIANTS = {
  navbar: (isDarkMode) =>
    `p-2 rounded-full transition-colors ${
      isDarkMode
        ? "text-gray-400 hover:text-white hover:bg-gray-800"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
    }`,
  topbar: (isDarkMode, lang) =>
    `p-2.5 rounded-full border text-sm font-medium shadow-md transition-all duration-300 ${
      lang === "En" ? "tracking-wider uppercase" : ""
    } ${
      isDarkMode
        ? "bg-gray-900 border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white"
        : "bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900"
    }`,
};

const LangToggle = ({ variant = "navbar" }) => {
  const { t } = useTranslation("common");
  const { lang, setLang } = useLang();
  const { isDarkMode } = useTheme();

  const changeLanguage = () => setLang(t("other lang"));

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={changeLanguage}
      className={VARIANTS[variant](isDarkMode, lang)}
      aria-label={`${t("Switch language")} (${t("other lang")})`}
      title={t("Switch language")}
    >
      <span className="flex items-center justify-center w-[18px] h-[18px]">
        {t("other lang")}
      </span>
    </motion.button>
  );
};

export default LangToggle;
