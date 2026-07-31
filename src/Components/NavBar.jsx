import { useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Code2, Menu, Moon, Sun, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLang } from "../context/LangContext";
import { getChangeLangDuration, scrollToSection } from "../utils/helper";

const navLinks = ["Home", "Skills", "Work", "About"];

const NavBar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation('common');
  const { setLang } = useLang();
  const { lang } = useLang();

  // =============================================================
  // NAVBAR CTA BUTTON — ANIMATION VARIANTS (Issue #33)
  // =============================================================
  // 21 variants available — switch by changing NAV_CTA_VARIANT:
  //
  //  Idle attention:
  //    'dynamicGlow'  Halo — breathing glow            (recommended)
  //    'sonar'        radar ping rings
  //    'scanline'     terminal scan sweep
  //    'electron'     orbiting dot (atom)
  //    'caret'        blinking terminal cursor
  //    'heartbeat'    double-pulse glow
  //    'wave'         liquid gradient shift inside pill
  //    'comet'        periodic shine sweep
  //    'aurora'       blurred gradient breathing behind pill
  //    'gradientText' hero gradient text (Tide)
  //    'gradientBorder' rotating gradient border
  //    'animatedUnderline' sweeping underline (minimal)
  //
  //  Hover / cursor-driven:
  //    'spotlight'    glow follows the cursor
  //    'magnetic'     button leans toward the cursor
  //    'tilt'         3D perspective tilt
  //    'letters'      staggered letter lift on hover
  //    'arrow'        arrow slides in on hover
  //    'fill'         gradient fill sweeps in on hover
  //    'lift'         elevation on hover
  //    'neon'         flickering neon glow on hover
  //    'ripple'       click ripple
  // =============================================================
  const NAV_CTA_VARIANT = 'dynamicGlow';

  // --- Motion state for cursor-driven variants (magnetic / tilt) ---
  const magneticRef = useRef(null);
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const springMX = useSpring(magneticX, { stiffness: 250, damping: 15 });
  const springMY = useSpring(magneticY, { stiffness: 250, damping: 15 });

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 200, damping: 20 });
  const springTiltY = useSpring(tiltY, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springTiltY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springTiltX, [-0.5, 0.5], [-8, 8]);

  // --- Ripple state ---
  const [ripples, setRipples] = useState([]);

  const handleSpotlightMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const handleMagneticMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    magneticX.set((e.clientX - (rect.left + rect.width / 2)) * 0.2);
    magneticY.set((e.clientY - (rect.top + rect.height / 2)) * 0.2);
  };
  const handleMagneticLeave = () => {
    magneticX.set(0);
    magneticY.set(0);
  };

  const handleTiltMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5);
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleTiltLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const handleRippleDown = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipples((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    ]);
  };
  const removeRipple = (id) =>
    setRipples((prev) => prev.filter((r) => r.id !== id));

  // Base classes shared by every variant.
  const ctaBase = `
    relative
    px-5 py-2 rounded-full text-sm uppercase font-medium
    tracking-wider
    transition-all duration-300 cursor-pointer
  `;

  // Translucent pill surface — the navbar's own surface language.
  const glassPill = (dark) =>
    dark
      ? 'text-gray-100 bg-gray-900/70 hover:bg-gray-800/80'
      : 'text-gray-800 bg-white/70 hover:bg-gray-100/80';

  // =============================================================
  // VARIANT MAP — each entry: { classes, content?, props? }
  // =============================================================
  const NAV_CTA_VARIANTS = {
    /* ---------- Idle attention ---------- */

    // Halo — breathing blue↔cyan glow (recommended default)
    dynamicGlow: {
      classes: `${ctaBase} nav-cta-dynamic-glow ${glassPill(isDarkMode)}`,
    },

    // Sonar — expanding radar rings
    sonar: {
      classes: `${ctaBase} nav-cta-sonar ${glassPill(isDarkMode)}`,
    },

    // Scanline — terminal scan sweeping vertically
    scanline: {
      classes: `${ctaBase} nav-cta-scanline overflow-hidden ${glassPill(isDarkMode)}`,
    },

    // Electron — a glowing dot orbiting the pill
    electron: {
      classes: `${ctaBase} nav-cta-electron ${glassPill(isDarkMode)}`,
    },

    // Caret — blinking terminal cursor after the label
    caret: {
      classes: `${ctaBase} ${glassPill(isDarkMode)}`,
      content: (txt) => (
        <span className="inline-flex items-center">
          {txt}
          <span className="nav-cta-caret ms-1.5">|</span>
        </span>
      ),
    },

    // Heartbeat — double-pulse glow (lub-dub)
    heartbeat: {
      classes: `${ctaBase} nav-cta-heartbeat ${glassPill(isDarkMode)}`,
    },

    // Wave — liquid gradient shifting inside the pill
    wave: {
      classes: `${ctaBase} nav-cta-wave ${glassPill(isDarkMode)}`,
    },

    // Comet — periodic shine sweep across the pill
    comet: {
      classes: `${ctaBase} nav-cta-comet overflow-hidden ${glassPill(isDarkMode)}`,
    },

    // Aurora — blurred gradient breathing behind the pill
    aurora: {
      classes: `${ctaBase} nav-cta-aurora ${
        isDarkMode
          ? 'text-gray-200 bg-gray-950/80 hover:bg-gray-900/70'
          : 'text-gray-700 bg-gray-50/80 hover:bg-gray-100/70'
      }`,
    },

    // Tide — hero headline's exact gradient text + glow
    gradientText: {
      classes: `${ctaBase} bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 text-transparent bg-clip-text nav-cta-gradient-text`,
    },

    // Gradient border — rotating conic-like border (kept as option)
    gradientBorder: {
      classes: `${ctaBase} nav-cta-gradient-border ${
        isDarkMode
          ? 'text-gray-200 bg-gray-900/90 hover:bg-gray-800/90'
          : 'text-gray-700 bg-white/90 hover:bg-gray-50/90'
      } shadow-lg ${isDarkMode ? 'shadow-blue-500/10' : 'shadow-blue-500/5'}`,
    },

    // Underline — sweeping gradient underline (minimal)
    animatedUnderline: {
      classes: `${ctaBase} ${
        isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
      } bg-transparent`,
      content: (txt) => <span className="nav-cta-underline">{txt}</span>,
    },

    /* ---------- Hover / cursor-driven ---------- */

    // Spotlight — radial glow that follows the cursor inside the pill
    spotlight: {
      classes: `${ctaBase} nav-cta-spotlight overflow-hidden isolate ${glassPill(isDarkMode)}`,
      props: { onMouseMove: handleSpotlightMove },
    },

    // Magnetic — the pill leans toward the cursor with spring physics
    magnetic: {
      classes: `${ctaBase} ${glassPill(isDarkMode)}`,
      props: {
        ref: magneticRef,
        style: { x: springMX, y: springMY },
        onMouseMove: handleMagneticMove,
        onMouseLeave: handleMagneticLeave,
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
      },
    },

    // Tilt — 3D perspective tilt following the cursor
    tilt: {
      classes: `${ctaBase} ${glassPill(isDarkMode)}`,
      props: {
        style: { rotateX, rotateY, transformPerspective: 600 },
        onMouseMove: handleTiltMove,
        onMouseLeave: handleTiltLeave,
      },
    },

    // Letters — each letter lifts with a stagger on hover
    letters: {
      classes: `${ctaBase} group ${glassPill(isDarkMode)}`,
      content: (txt) => {
        // Arabic-script languages (Fa) must not be split into letters
        if (lang !== 'En') return txt;
        return (
          <span className="inline-flex">
            {txt.split('').map((ch, i) => (
              <span
                key={i}
                className="inline-block transition-transform duration-200 ease-out group-hover:-translate-y-[3px]"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {ch}
              </span>
            ))}
          </span>
        );
      },
    },

    // Arrow — arrow icon slides in on hover
    arrow: {
      classes: `${ctaBase} group ${glassPill(isDarkMode)}`,
      content: (txt) => (
        <span className="inline-flex items-center gap-1.5">
          <span>{txt}</span>
          <ArrowRight size={14} className="nav-cta-arrow" />
        </span>
      ),
    },

    // Fill — gradient fills the pill from left to right on hover
    fill: {
      classes: `${ctaBase} nav-cta-fill overflow-hidden isolate group ${glassPill(isDarkMode)} group-hover:text-white`,
    },

    // Lift — gentle elevation with a growing soft shadow on hover
    lift: {
      classes: `${ctaBase} shadow-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/15 ${glassPill(isDarkMode)}`,
    },

    // Neon — flickering cyan text glow on hover
    neon: {
      classes: `${ctaBase} nav-cta-neon ${
        isDarkMode
          ? 'text-cyan-300 bg-gray-900/70 hover:bg-gray-800/80'
          : 'text-cyan-600 bg-white/70 hover:bg-gray-100/80'
      }`,
    },

    // Ripple — expanding circle from the click point
    ripple: {
      classes: `${ctaBase} overflow-hidden isolate ${glassPill(isDarkMode)}`,
      props: { onMouseDown: handleRippleDown },
      content: (txt) => (
        <>
          {txt}
          {ripples.map((r) => (
            <motion.span
              key={r.id}
              className="absolute rounded-full bg-blue-500/30 pointer-events-none"
              style={{
                left: r.x,
                top: r.y,
                width: 60,
                height: 60,
                x: '-50%',
                y: '-50%',
                zIndex: -1,
              }}
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              onAnimationComplete={() => removeRipple(r.id)}
            />
          ))}
        </>
      ),
    },
  };

  const activeCta =
    NAV_CTA_VARIANTS[NAV_CTA_VARIANT] || NAV_CTA_VARIANTS.dynamicGlow;

  const getNavCtaClasses = () => activeCta.classes;
  const getNavCtaContent = () =>
    activeCta.content ? activeCta.content(t('Contact')) : t('Contact');
  const getNavCtaProps = () => activeCta.props || {};

  const changeLanguage = (lang) => {
    setLang(lang);
    // setTimeout(() => {
    //   window.location.reload();
    // }, getChangeLangDuration("ms")/2);
  };

  const handleClick = (sectionId) => {
    scrollToSection(sectionId, () => setIsMenuOpen(false));
  };

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        style={{ opacity: 1 }}
        className={`fixed top-0 w-full z-50 pl-6 pr-4 py-4 ${
          isDarkMode ? "bg-gray-950/80" : "bg-gray-50/80"
        } backdrop-blur-md border-b ${
          isDarkMode ? "border-gray-800" : "border-gray-200"
        }`}
        key={lang}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 1, y: "-100%" }}
        transition={{
          duration: getChangeLangDuration("s"),
          ease: "easeInOut",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Code2 size={24} className="text-blue-500" />{" "}
            {/* <span className={`text-lg ml-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Iman Langaran</span> */}
            <span
              className={`text-lg ml-1 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {t("my name")}
            </span>
          </motion.div>

          {/* desktop navigation */}
          {/* <div className="hidden md:flex items-center space-x-12"> */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <motion.button
                key={item}
                whileHover={{ y: -2 }}
                onClick={() => handleClick(item)}
                className={`text-sm uppercase ${
                  lang === "En" ? "tracking-wider" : ""
                } transition-colors ${
                  isDarkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {t(item)}
              </motion.button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              onClick={() => handleClick("Contact")}
              className={getNavCtaClasses()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              {...getNavCtaProps()}
            >
              {getNavCtaContent()}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => changeLanguage(t("other lang"))}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center justify-center w-[18px] h-[18px]">
                {t("other lang")}
              </div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleDarkMode(isDarkMode ? "light" : "dark")}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              }`}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
          </div>

          {/* mobile menu button */}
          <div className="md:hidden flex grow items-center ms-5 justify-end space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => changeLanguage(t("other lang"))}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center justify-center w-[18px] h-[18px]">
                {t("other lang")}
              </div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleDarkMode(isDarkMode ? "light" : "dark")}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              }`}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              }`}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`md:hidden mt-4 p-4 rounded-lg ${
                isDarkMode ? "bg-gray-900" : "bg-white"
              } border ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
            >
              {navLinks.map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ x: 5 }}
                  onClick={() => handleClick(item)}
                  className={`block w-full text-left py-2 text-sm uppercase ${
                    lang === "En" ? "tracking-wider" : ""
                  } transition-colors ${
                    isDarkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {t(item)}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </AnimatePresence>
  );
};

export default NavBar;
