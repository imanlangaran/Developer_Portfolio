// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";

// The navbar brand (Code2 + name) as a standalone pill for the ProjectDetail
// TopBar, so direct /project/:id visits still show whose portfolio this is.
// Pill tokens match the other TopBar controls for contrast over the hero.
// max-w-full + truncate let the pill shrink with the row on narrow screens
// (issue #53) instead of overflowing it, so the row's side padding and gaps
// stay intact.
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
      className={`flex items-center gap-2 h-10 px-3 max-w-full overflow-hidden rounded-full border shadow-md transition-all duration-300 ${
        isDarkMode
          ? "bg-gray-900 border-gray-700 text-white hover:border-gray-600"
          : "bg-white border-gray-300 text-gray-900 hover:border-gray-400"
      }`}
    >
      {/* Hidden below `sm` so the full name fits narrow phones while the
          TopBar gaps stay equal (issue #53) */}
      <Code2 size={20} className="text-blue-500 hidden shrink-0 sm:block" />
      <span className="text-lg truncate min-w-0">{t("my name")}</span>
    </motion.button>
  );
};

export default BrandMark;
