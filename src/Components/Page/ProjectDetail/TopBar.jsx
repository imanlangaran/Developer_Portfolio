// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import LangToggle from "../../Preferences/LangToggle";
import ThemeToggle from "../../Preferences/ThemeToggle";
import BrandMark from "./BrandMark";

const TopBar = ({ isDarkMode, handleClose }) => {
  const { t } = useTranslation("common");

  return (
    // The flex spacers between the items distribute the leftover width evenly,
    // so all three gaps in the row are always identical and never collapse
    // (the row is at least content + 3 x 8px, otherwise BrandMark shrinks
    // instead of pushing the close button past its right inset).
    <div className="absolute top-4 left-4 right-4 z-50 flex items-center pointer-events-none">
      {/* BRAND MARK */}
      <div className="pointer-events-auto min-w-0">
        <BrandMark />
      </div>

      <div aria-hidden="true" className="flex-1 min-w-[8px]" />
      {/* PREFERENCE TOGGLES + CLOSE BUTTON */}
      <div className="pointer-events-auto">
        <LangToggle variant="topbar" />
      </div>

      <div aria-hidden="true" className="flex-1 min-w-[8px] md:flex-none md:w-2" />
      <div className="pointer-events-auto">
        <ThemeToggle variant="topbar" />
      </div>

      <div aria-hidden="true" className="flex-1 min-w-[8px] md:flex-none md:w-2" />
      <div className="pointer-events-auto">
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
