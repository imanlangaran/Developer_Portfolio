import { useRef, useState } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Code2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// =============================================================
// CTA BUTTON VARIANTS — DEMO PAGE (Issue #33)
// =============================================================
// Demo-only page: shows every navbar "Contact" button variant
// inside a mini navbar so you can judge each one in context.
// This file is standalone — NavBar.jsx is NOT touched.
//
// The real navbar's active variant is controlled by
// `NAV_CTA_VARIANT` in src/Components/NavBar.jsx.
// =============================================================

const VARIANT_GROUPS = [
  {
    kind: "nav",
    title: "Navbar — Idle Attention",
    note: "These animate on their own — slow, subtle, auto-playing.",
    variants: [
      { key: "dynamicGlow", name: "Halo", description: "Breathing blue ↔ cyan glow" },
      { key: "sonar", name: "Sonar", description: "Expanding radar ping rings" },
      { key: "scanline", name: "Scanline", description: "Terminal scan sweeping down" },
      { key: "electron", name: "Electron", description: "Glowing dot orbiting the pill" },
      { key: "caret", name: "Caret", description: "Blinking terminal cursor" },
      { key: "heartbeat", name: "Heartbeat", description: "Double-pulse glow (lub-dub)" },
      { key: "wave", name: "Wave", description: "Liquid gradient shifting inside" },
      { key: "comet", name: "Comet", description: "Periodic shine sweep" },
      { key: "aurora", name: "Aurora", description: "Blurred gradient behind the pill" },
      { key: "gradientText", name: "Tide", description: "Hero headline gradient text" },
      { key: "gradientBorder", name: "Gradient Border", description: "Rotating gradient border" },
      { key: "animatedUnderline", name: "Underline", description: "Sweeping gradient underline" },
    ],
  },
  {
    kind: "nav",
    title: "Navbar — Hover / Cursor-Driven",
    note: "These respond to your cursor — hover or click to see them.",
    variants: [
      { key: "spotlight", name: "Spotlight", description: "Glow follows your cursor" },
      { key: "magnetic", name: "Magnetic", description: "Pill leans toward the cursor" },
      { key: "tilt", name: "Tilt", description: "3D perspective tilt" },
      { key: "letters", name: "Letters", description: "Letters lift one by one" },
      { key: "arrow", name: "Arrow", description: "Arrow icon slides in" },
      { key: "fill", name: "Fill", description: "Gradient fills across on hover" },
      { key: "lift", name: "Lift", description: "Elevation + soft shadow" },
      { key: "neon", name: "Neon", description: "Flickering cyan neon glow" },
      { key: "ripple", name: "Ripple", description: "Ripple from the click point" },
    ],
  },
  {
    kind: "hero",
    title: "Hero Section — Get In Touch",
    note: "The hero CTA variants (desktop sizing). Hover or click to feel them.",
    variants: [
      { key: "glowPulse", name: "Soft Glow Pulse", description: "Breathing glow, speeds up on hover" },
      { key: "float", name: "Floating / Breathing", description: "Gentle upward drift, pauses on hover" },
      { key: "shine", name: "Shine Sweep", description: "Light streak sweeps periodically" },
      { key: "magneticHover", name: "Magnetic Hover", description: "Button leans toward the cursor" },
      { key: "animatedArrow", name: "Animated Arrow", description: "Arrow icon slides back and forth" },
    ],
  },
];

// -------------------------------------------------------------
// DemoCtaButton — renders one variant. Mirrors the variant
// config from NavBar.jsx (classes + content + motion props).
// All hooks run unconditionally; unused ones are inert.
// -------------------------------------------------------------
const DemoCtaButton = ({ variantKey }) => {
  const { isDarkMode } = useTheme();

  // --- Motion state (used only by cursor-driven variants) ---
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

  const [ripples, setRipples] = useState([]);

  const handleSpotlightMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
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

  // --- Variant styling (mirrors NavBar.jsx config) ---
  const ctaBase =
    "relative px-5 py-2 rounded-full text-sm uppercase font-medium tracking-wider transition-all duration-300 cursor-pointer";
  const glassPill = isDarkMode
    ? "text-gray-100 bg-gray-900/70 hover:bg-gray-800/80"
    : "text-gray-800 bg-white/70 hover:bg-gray-100/80";

  let classes = ctaBase;
  let content = "Contact";
  let extraProps = {};

  switch (variantKey) {
    case "dynamicGlow":
      classes += ` nav-cta-dynamic-glow ${glassPill}`;
      break;
    case "sonar":
      classes += ` nav-cta-sonar ${glassPill}`;
      break;
    case "scanline":
      classes += ` nav-cta-scanline overflow-hidden ${glassPill}`;
      break;
    case "electron":
      classes += ` nav-cta-electron ${glassPill}`;
      break;
    case "caret":
      classes += ` ${glassPill}`;
      content = (
        <span className="inline-flex items-center">
          Contact
          <span className="nav-cta-caret ms-1.5">|</span>
        </span>
      );
      break;
    case "heartbeat":
      classes += ` nav-cta-heartbeat ${glassPill}`;
      break;
    case "wave":
      classes += ` nav-cta-wave ${glassPill}`;
      break;
    case "comet":
      classes += ` nav-cta-comet overflow-hidden ${glassPill}`;
      break;
    case "aurora":
      classes += ` nav-cta-aurora ${
        isDarkMode
          ? "text-gray-200 bg-gray-950/80 hover:bg-gray-900/70"
          : "text-gray-700 bg-gray-50/80 hover:bg-gray-100/70"
      }`;
      break;
    case "gradientText":
      classes +=
        " bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 text-transparent bg-clip-text nav-cta-gradient-text";
      break;
    case "gradientBorder":
      classes += ` nav-cta-gradient-border ${
        isDarkMode
          ? "text-gray-200 bg-gray-900/90 hover:bg-gray-800/90"
          : "text-gray-700 bg-white/90 hover:bg-gray-50/90"
      } shadow-lg ${isDarkMode ? "shadow-blue-500/10" : "shadow-blue-500/5"}`;
      break;
    case "animatedUnderline":
      classes += ` ${
        isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
      } bg-transparent`;
      content = <span className="nav-cta-underline">Contact</span>;
      break;
    case "spotlight":
      classes += ` nav-cta-spotlight overflow-hidden isolate ${glassPill}`;
      extraProps = { onMouseMove: handleSpotlightMove };
      break;
    case "magnetic":
      classes += ` ${glassPill}`;
      extraProps = {
        ref: magneticRef,
        style: { x: springMX, y: springMY },
        onMouseMove: handleMagneticMove,
        onMouseLeave: handleMagneticLeave,
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
      };
      break;
    case "tilt":
      classes += ` ${glassPill}`;
      extraProps = {
        style: { rotateX, rotateY, transformPerspective: 600 },
        onMouseMove: handleTiltMove,
        onMouseLeave: handleTiltLeave,
      };
      break;
    case "letters":
      classes += ` group ${glassPill}`;
      content = (
        <span className="inline-flex">
          {"Contact".split("").map((ch, i) => (
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
      break;
    case "arrow":
      classes += ` group ${glassPill}`;
      content = (
        <span className="inline-flex items-center gap-1.5">
          <span>Contact</span>
          <ArrowRight size={14} className="nav-cta-arrow" />
        </span>
      );
      break;
    case "fill":
      classes += ` nav-cta-fill overflow-hidden isolate group ${glassPill} group-hover:text-white`;
      break;
    case "lift":
      classes += ` shadow-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/15 ${glassPill}`;
      break;
    case "neon":
      classes += ` nav-cta-neon ${
        isDarkMode
          ? "text-cyan-300 bg-gray-900/70 hover:bg-gray-800/80"
          : "text-cyan-600 bg-white/70 hover:bg-gray-100/80"
      }`;
      break;
    case "ripple":
      classes += ` overflow-hidden isolate ${glassPill}`;
      extraProps = { onMouseDown: handleRippleDown };
      content = (
        <>
          Contact
          {ripples.map((r) => (
            <motion.span
              key={r.id}
              className="absolute rounded-full bg-blue-500/30 pointer-events-none"
              style={{
                left: r.x,
                top: r.y,
                width: 60,
                height: 60,
                x: "-50%",
                y: "-50%",
                zIndex: -1,
              }}
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              onAnimationComplete={() => removeRipple(r.id)}
            />
          ))}
        </>
      );
      break;
    default:
      classes += ` ${glassPill}`;
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...extraProps}
      className={classes}
    >
      {content}
    </motion.button>
  );
};

// -------------------------------------------------------------
// DemoHeroButton — renders one hero "Get In Touch" variant.
// Mirrors the config from HeroSection.jsx (desktop sizing).
// -------------------------------------------------------------
const DemoHeroButton = ({ variantKey }) => {
  const { isDarkMode } = useTheme();

  // --- Motion state (used only by the magneticHover variant) ---
  const magneticRef = useRef(null);
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const springMX = useSpring(magneticX, { stiffness: 200, damping: 18 });
  const springMY = useSpring(magneticY, { stiffness: 200, damping: 18 });

  const handleMagneticMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    magneticX.set((e.clientX - (rect.left + rect.width / 2)) * 0.25);
    magneticY.set((e.clientY - (rect.top + rect.height / 2)) * 0.25);
  };
  const handleMagneticLeave = () => {
    magneticX.set(0);
    magneticY.set(0);
  };

  // --- Variant styling (mirrors HeroSection.jsx config) ---
  const heroBase =
    "font-medium transition-all duration-300 rounded-full text-sm uppercase tracking-wider cursor-pointer px-8 py-4";
  const heroGradient =
    "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700";

  let classes = heroBase;
  let content = "Get In Touch";
  let extraProps = { whileHover: { scale: 1.04 }, whileTap: { scale: 0.96 } };

  switch (variantKey) {
    case "glowPulse":
      classes += ` hero-cta-glow-pulse ${heroGradient}`;
      break;
    case "float":
      classes += ` hero-cta-float border ${
        isDarkMode
          ? "border-gray-700 hover:border-gray-600 text-gray-300"
          : "border-gray-300 hover:border-gray-400 text-gray-700"
      }`;
      break;
    case "shine":
      classes += ` hero-cta-shine ${heroGradient}`;
      break;
    case "magneticHover":
      classes += ` ${heroGradient}`;
      extraProps = {
        ref: magneticRef,
        style: { x: springMX, y: springMY },
        onMouseMove: handleMagneticMove,
        onMouseLeave: handleMagneticLeave,
        whileHover: { scale: 1.04 },
        whileTap: { scale: 0.96 },
      };
      break;
    case "animatedArrow":
      classes += ` group ${heroGradient}`;
      content = (
        <span className="inline-flex items-center gap-2">
          Get In Touch
          <ArrowRight size={16} className="hero-cta-arrow-icon" />
        </span>
      );
      break;
    default:
      classes += ` ${heroGradient}`;
  }

  return (
    <motion.button {...extraProps} className={classes}>
      {content}
    </motion.button>
  );
};

// -------------------------------------------------------------
// MiniNavbar — a small navbar mock so each variant is judged
// in context, just like in the real navigation.
// -------------------------------------------------------------
const MiniNavbar = ({ variant }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`rounded-2xl border p-4 ${
        isDarkMode ? "border-gray-800 bg-gray-900/50" : "border-gray-200 bg-white/60"
      }`}
    >
      {/* mini navbar surface (same language as the real navbar) */}
      <div
        className={`flex items-center justify-between gap-2 rounded-xl border-b px-3 py-2 ${
          isDarkMode ? "border-gray-800 bg-gray-950/80" : "border-gray-200 bg-gray-50/80"
        }`}
      >
        <span className="flex items-center gap-1.5 text-sm font-medium">
          <Code2 size={16} className="text-blue-500" />
          <span className={isDarkMode ? "text-white" : "text-black"}>Demo</span>
        </span>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-xs uppercase tracking-wider text-gray-400">
            Home
          </span>
          <span className="hidden sm:inline text-xs uppercase tracking-wider text-gray-400">
            Work
          </span>
          <DemoCtaButton variantKey={variant.key} />
        </div>
      </div>

      {/* caption */}
      <div className="mt-3 flex items-baseline justify-between gap-2">
        <div>
          <h3
            className={`text-sm font-semibold ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            {variant.name}
          </h3>
          <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
            {variant.description}
          </p>
        </div>
        <code
          className={`text-[10px] px-1.5 py-0.5 rounded ${
            isDarkMode ? "bg-gray-800 text-cyan-400" : "bg-gray-200 text-cyan-700"
          }`}
        >
          {variant.key}
        </code>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// MiniHeroCard — hero-styled backdrop (blurred orbs like the
// real hero section) so hero variants are judged in context.
// -------------------------------------------------------------
const MiniHeroCard = ({ variant }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`rounded-2xl border p-4 ${
        isDarkMode ? "border-gray-800 bg-gray-900/50" : "border-gray-200 bg-white/60"
      }`}
    >
      {/* mini hero surface (same language as the real hero) */}
      <div
        className={`relative overflow-hidden rounded-xl ${
          isDarkMode ? "bg-gray-950" : "bg-gray-100"
        } py-16 flex items-center justify-center`}
      >
        {/* decorative blurred orbs, like the hero background */}
        <div className="absolute top-6 right-8 w-24 h-24 rounded-full blur-2xl opacity-20 bg-blue-500" />
        <div className="absolute bottom-6 left-8 w-20 h-20 rounded-full blur-2xl opacity-20 bg-purple-500" />
        <DemoHeroButton variantKey={variant.key} />
      </div>

      {/* caption */}
      <div className="mt-3 flex items-baseline justify-between gap-2">
        <div>
          <h3
            className={`text-sm font-semibold ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            {variant.name}
          </h3>
          <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
            {variant.description}
          </p>
        </div>
        <code
          className={`text-[10px] px-1.5 py-0.5 rounded ${
            isDarkMode ? "bg-gray-800 text-cyan-400" : "bg-gray-200 text-cyan-700"
          }`}
        >
          {variant.key}
        </code>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// CtaDemo — the page itself
// -------------------------------------------------------------
const CtaDemo = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDarkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-12">
          <Link
            to="/"
            className={`inline-flex items-center gap-1.5 text-sm mb-4 ${
              isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            ← Back to portfolio
          </Link>
          <h1 className="text-3xl font-semibold">
            Contact Button — Animation Variants
          </h1>
          <p className={`mt-2 text-sm max-w-2xl ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Demo page for the CTA animations (Issue #33). Navbar "Contact" buttons are shown
            inside a mini navbar; hero "Get In Touch" buttons sit on a hero-style backdrop. The
            live variants are controlled by{" "}
            <code className={isDarkMode ? "text-cyan-400" : "text-cyan-700"}>NAV_CTA_VARIANT</code>{" "}
            in <code className={isDarkMode ? "text-cyan-400" : "text-cyan-700"}>NavBar.jsx</code>{" "}
            and{" "}
            <code className={isDarkMode ? "text-cyan-400" : "text-cyan-700"}>HERO_CTA_VARIANT</code>{" "}
            in <code className={isDarkMode ? "text-cyan-400" : "text-cyan-700"}>HeroSection.jsx</code>.
          </p>
        </header>

        {VARIANT_GROUPS.map((group) => (
          <section key={group.title} className="mb-14">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">{group.title}</h2>
              <p className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                {group.note}
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.variants.map((variant) =>
                group.kind === "hero" ? (
                  <MiniHeroCard key={variant.key} variant={variant} />
                ) : (
                  <MiniNavbar key={variant.key} variant={variant} />
                ),
              )}
            </div>
          </section>
        ))}

        <footer className={`text-xs ${isDarkMode ? "text-gray-600" : "text-gray-400"}`}>
          Respects <code>prefers-reduced-motion</code> — all looping animations pause for
          users who opt out of motion.
        </footer>
      </div>
    </div>
  );
};

export default CtaDemo;
