import { useLayoutEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import LangToggle from "../../Preferences/LangToggle";
import ThemeToggle from "../../Preferences/ThemeToggle";
import BrandMark from "./BrandMark";

// Width of the fixed gaps between the toggles (and the close button), and the
// minimum width of the flexible brand <-> lang gap.
const MIN_GAP = 8;

const TopBar = ({ isDarkMode, handleClose }) => {
  const { t } = useTranslation("common");
  const rowRef = useRef(null);
  const brandRef = useRef(null);
  // Width BrandMark may use before the name would have to shrink: row width
  // minus the controls minus the three minimum gaps. null = not measured yet.
  const [brandAvailable, setBrandAvailable] = useState(null);

  useLayoutEffect(() => {
    const row = rowRef.current;
    const brand = brandRef.current;
    if (!row || !brand) return undefined;

    const measure = () => {
      let controlsWidth = 0;
      for (const child of row.children) {
        if (child === brand || child.dataset.spacer !== undefined) continue;
        controlsWidth += child.offsetWidth;
      }
      setBrandAvailable(row.clientWidth - controlsWidth - 3 * MIN_GAP);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    return () => observer.disconnect();
  }, []);

  return (
    // Only the first spacer flexes: it absorbs all the leftover width, so the
    // toggles keep a constant 8px gap between them at every width while the
    // brand <-> lang gap grows with the row but never drops below 8px either
    // (otherwise BrandMark shrinks instead of pushing the close button past
    // its right inset).
    <div
      ref={rowRef}
      className="absolute top-4 left-4 right-4 z-50 flex items-center pointer-events-none"
    >
      {/* BRAND MARK */}
      <div ref={brandRef} className="pointer-events-auto min-w-0">
        <BrandMark available={brandAvailable} />
      </div>

      <div data-spacer="" aria-hidden="true" className="flex-1 min-w-[8px]" />
      {/* PREFERENCE TOGGLES + CLOSE BUTTON */}
      <div className="pointer-events-auto">
        <LangToggle variant="topbar" />
      </div>

      <div
        data-spacer=""
        aria-hidden="true"
        className="w-2 shrink-0"
      />
      <div className="pointer-events-auto">
        <ThemeToggle variant="topbar" />
      </div>

      <div
        data-spacer=""
        aria-hidden="true"
        className="w-2 shrink-0"
      />
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
