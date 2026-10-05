// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";

import useScrollPosition from "../hooks/useScrollPosition";

// Wrapper placement (design.md spacing "6" = 24px, "px-6" keeps the button
// off the screen edge):
// - "fixed": pinned to the viewport (main page).
// - "absolute": pinned to the ProjectDetail modal container, which locks the
//   body scroll and scrolls an inner div instead of the window.
const WRAPPERS = {
  fixed: "fixed inset-x-0 bottom-6 z-40 px-6",
  absolute: "absolute inset-x-0 bottom-6 z-50 px-6",
};

/**
 * Floating "scroll to top" button (issue #57).
 *
 * - Hidden at the top of the page, fades in as soon as the user scrolls down.
 * - Sits in the bottom corner while scrolling and slides to the bottom center
 *   once the end of the page is reached, where it also expands to reveal the
 *   "Scroll to top" label next to the arrow.
 * - Styling follows design.md `ButtonPrimary`: `bg-blue-500 hover:bg-blue-600`,
 *   `rounded-full`, `text-white`, `duration-300` transitions and a subtle
 *   `shadow-blue-500/10` tint instead of a heavy drop shadow. Static
 *   properties are CSS-transitioned; transforms stay framer-motion's job.
 *
 * @param {React.RefObject<HTMLElement|null>} [containerRef] Scroll container to
 *   watch and to scroll back to the top. Omit to use the window (main page).
 * @param {"fixed"|"absolute"} [variant] Where the button is anchored.
 */
const ScrollToTopButton = ({ containerRef = null, variant = "fixed" }) => {
  const { t, i18n } = useTranslation("common");
  const { isVisible, isAtBottom } = useScrollPosition(containerRef);

  const label = t("Scroll to top");
  const isEn = i18n.language === "En";

  const handleScrollToTop = (event) => {
    // The detail modal closes when a click bubbles up to its overlay.
    event.stopPropagation();

    if (containerRef?.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="scroll-to-top"
          className={`${WRAPPERS[variant]} pointer-events-none`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {/* Bottom corner while scrolling, bottom center at the page end.
              `layout="position"` slides the button between the two instead of
              letting it jump, while CSS transitions handle the expansion. */}
          <div className={`flex ${isAtBottom ? "justify-center" : "justify-end"}`}>
            <motion.button
              type="button"
              layout="position"
              onClick={handleScrollToTop}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={label}
              title={label}
              className={`group pointer-events-auto inline-flex h-11 items-center whitespace-nowrap rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/10 transition-[background-color,box-shadow,padding,max-width,margin-left,opacity] duration-300 hover:bg-blue-600 md:h-12 ${
                isAtBottom ? "px-5" : "px-3.5 md:px-4"
              }`}
            >
              <ArrowUp
                size={16}
                className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
              />

              {/* Collapses to zero width (and no gap) while only the arrow is
                  shown, so the compact state stays a perfect circle. */}
              <span
                className={`block overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 ${
                  isEn ? "uppercase tracking-wider" : ""
                } ${
                  isAtBottom
                    ? "ml-2 max-w-40 opacity-100"
                    : "ml-0 max-w-0 opacity-0"
                }`}
              >
                {label}
              </span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
