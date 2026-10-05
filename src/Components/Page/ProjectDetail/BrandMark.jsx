// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";

// The navbar brand (Code2 + name) as a standalone pill for the ProjectDetail
// TopBar, so direct /project/:id visits still show whose portfolio this is.
// Pill tokens match the other TopBar controls for contrast over the hero.
const BrandMark = () => {
  const { t } = useTranslation("common");
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate("/")}
      aria-label={t("my name")}
      title={t("my name")}
      className={`flex items-center gap-2 h-10 px-3 rounded-full border shadow-md transition-all duration-300 ${
        isDarkMode
          ? "bg-gray-900 border-gray-700 text-white hover:border-gray-600"
          : "bg-white border-gray-300 text-gray-900 hover:border-gray-400"
      }`}
    >
      <Code2 size={20} className="text-blue-500 shrink-0" />
      <span className="text-lg whitespace-nowrap">{t("my name")}</span>
    </motion.button>
  );
};

export default BrandMark;
