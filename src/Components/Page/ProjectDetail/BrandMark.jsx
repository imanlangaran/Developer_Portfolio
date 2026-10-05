// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { Code2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";

// Extra width the icon adds to the pill: icon (20) + gap-2 (8) + px-3 (12 x 2).
const ICON_EXTRA_WIDTH = 52;

// The navbar brand (Code2 + name) as a standalone pill for the ProjectDetail
// TopBar, so direct /project/:id visits still show whose portfolio this is.
// Pill tokens match the other TopBar controls for contrast over the hero.
// max-w-full + truncate let the pill shrink with the row on narrow screens
// (issue #53) instead of overflowing it, so the row's side padding and gaps
// stay intact. `available` is the width TopBar measured for the brand: the
// icon is rendered only while icon + name still fit there, so it disappears
// exactly when the name would otherwise start to shrink (and comes back as
// soon as there is room again).
const BrandMark = ({ available }) => {
  const { t } = useTranslation("common");
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const name = t("my name");
  const nameRef = useRef(null);
  const [showIcon, setShowIcon] = useState(true);

  useLayoutEffect(() => {
    const el = nameRef.current;
    if (!el) return undefined;

    const measure = () => {
      // scrollWidth is the full text width even while the name is clipped.
      setShowIcon(
        available == null || available >= el.scrollWidth + ICON_EXTRA_WIDTH
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [available, name]);

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate("/")}
      aria-label={name}
      title={name}
      className={`flex items-center gap-2 h-10 px-3 max-w-full overflow-hidden rounded-full border shadow-md transition-all duration-300 ${
        isDarkMode
          ? "bg-gray-900 border-gray-700 text-white hover:border-gray-600"
          : "bg-white border-gray-300 text-gray-900 hover:border-gray-400"
      }`}
    >
      {showIcon && (
        <Code2 size={20} className="text-blue-500 shrink-0" aria-hidden="true" />
      )}
      <span ref={nameRef} className="text-lg truncate min-w-0">
        {name}
      </span>
    </motion.button>
  );
};

export default BrandMark;
