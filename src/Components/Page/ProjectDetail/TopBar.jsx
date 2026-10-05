// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLang } from "../../../context/LangContext";
import LangToggle from "../../Preferences/LangToggle";
import ThemeToggle from "../../Preferences/ThemeToggle";
import BrandMark from "./BrandMark";

const TopBar = ({ isDarkMode, handleClose }) => {
  const { t } = useTranslation("common");
  const { lang } = useLang();

  return (
    <div className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between gap-2 pointer-events-none">
      {/* BRAND + BACK BUTTON */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <BrandMark />
        <motion.button
          whileHover={{
            scale: 1.05,
            y: -1,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={handleClose}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
            lang === "En" ? "tracking-wider uppercase" : ""
          } ${
            isDarkMode
              ? "bg-gray-900 border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white"
              : "bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900"
          } shadow-md`}
          aria-label={t("Back")}
        >
          <ArrowLeft size={16} className="rtl:rotate-180" />
          <span>{t("Back")}</span>
        </motion.button>
      </div>

      {/* PREFERENCE TOGGLES + CLOSE BUTTON */}
      <div className="pointer-events-auto flex items-center gap-2">
        <LangToggle variant="topbar" />
        <ThemeToggle variant="topbar" />
        <motion.button
          whileHover={{
            rotate: 90,
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.92,
          }}
          onClick={handleClose}
          className={`p-2.5 rounded-full border transition-all duration-300 ${
            isDarkMode
              ? "bg-gray-900 border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white"
              : "bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900"
          } shadow-md`}
          aria-label={t("Close")}
          title={t("Close")}
        >
          <X size={18} />
        </motion.button>
      </div>
    </div>
  );
};

export default TopBar;
