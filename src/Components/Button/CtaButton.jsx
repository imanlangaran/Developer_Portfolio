// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useLang } from "../../context/LangContext";

// =============================================================
// CtaButton — the single site-wide primary call-to-action
// =============================================================
// Implements design.md:ButtonPrimary (solid blue-500 fill, white
// label, rounded-full pill, uppercase text-sm, 300ms transition)
// with one subtle attention animation — a soft breathing blue
// glow defined as `.cta-primary` in index.css. It renders a real
// <button>, so callers pass the click handler and label.
// =============================================================

const SIZES = {
  // NavBar: compact so it fits the 64px nav bar.
  nav: "px-5 py-2",
  // Hero (mobile): design.md ButtonPrimary padding.
  heroMobile: "px-8 py-3",
  // Hero (desktop): design.md ButtonPrimary padding at md+.
  hero: "px-8 py-4",
};

const CtaButton = ({ children, onClick, size = "nav", className = "" }) => {
  const { lang } = useLang();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`cta-primary inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 text-sm font-medium uppercase text-white transition-all duration-300 hover:bg-blue-600 ${
        lang === "En" ? "tracking-wider" : ""
      } ${SIZES[size] || SIZES.nav} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default CtaButton;
