import React, { useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  // eslint-disable-next-line no-unused-vars
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { ArrowDown, Mail, ArrowRight } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";

import {
  containerVariants,
  getChangeLangDuration,
  itemVariants,
} from "../../utils/helper";
import { useTranslation } from "react-i18next";
import { useLang } from "../../context/LangContext";

const PROFILE_PIC = "https://avatars.githubusercontent.com/imanlangaran";

const HeroSection = () => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation('hero');
  const { lang } = useLang();

  // =============================================================
  // HERO CTA BUTTON — ANIMATION VARIANTS (Issue #33)
  // =============================================================
  // 19 variants — switch by changing HERO_CTA_VARIANT:
  //
  //  Idle attention:
  //    'glowPulse'    brand gradient + breathing glow  (recommended)
  //    'sonar'        expanding cyan radar ring
  //    'orbital'      rotating gradient ring (echoes profile image)
  //    'shine'        periodic shine sweep
  //    'levitate'     gentle floating
  //    'gradientShift' brand gradient slowly shifting
  //    'heartbeat'    lub-dub glow pulse
  //    'electron'     orbiting dot
  //    'caret'        blinking terminal cursor
  //    'float'        outline + floating (original secondary style)
  //
  //  Hover / cursor-driven:
  //    'magneticHover' button leans toward the cursor
  //    'spotlight'    glow follows the cursor
  //    'tilt'         3D perspective tilt
  //    'letters'      staggered letter lift
  //    'animatedArrow' arrow slides in on hover
  //    'fill'         outline → gradient fill on hover
  //    'lift'         elevation on hover
  //    'neon'         flickering neon glow on hover
  //    'ripple'       click ripple
  // =============================================================
  const HERO_CTA_VARIANT = 'glowPulse';

  // --- Motion state for cursor-driven variants ---
  // The hero renders TWO buttons (mobile + desktop views), so the
  // magnetic variant keeps a separate ref for each — sharing one
  // ref breaks on mobile (the hidden desktop button would win it).
  const magneticRefMobile = useRef(null);
  const magneticRefDesktop = useRef(null);
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const springMX = useSpring(magneticX, { stiffness: 200, damping: 18 });
  const springMY = useSpring(magneticY, { stiffness: 200, damping: 18 });

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 200, damping: 20 });
  const springTiltY = useSpring(tiltY, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springTiltY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springTiltX, [-0.5, 0.5], [-8, 8]);

  const [ripples, setRipples] = useState([]);

  const handleSpotlightMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const handleMagneticMove = (e, ref) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    magneticX.set((e.clientX - (rect.left + rect.width / 2)) * 0.25);
    magneticY.set((e.clientY - (rect.top + rect.height / 2)) * 0.25);
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
    font-medium transition-all duration-300
    rounded-full text-sm uppercase
    ${lang === "En" ? "tracking-wider" : ""}
    cursor-pointer
  `;

  const padding = (isMobile) => (isMobile ? "px-8 py-3" : "px-8 py-4");

  // The hero's brand gradient (matches the headline: cyan→blue→cyan).
  // Every filled variant uses it, so the CTA reads as *the* accent
  // element while the Resume button keeps its solid blue fill.
  const brandFill = (isMobile) => `
    ${padding(isMobile)}
    bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500
    text-white
    hover:from-cyan-400 hover:via-blue-500 hover:to-cyan-400
  `;

  // The original secondary (outline) surface.
  const outline = (isMobile) => `
    ${padding(isMobile)}
    border ${isDarkMode ? "border-gray-700 text-gray-300" : "border-gray-300 text-gray-700"}
    hover:border-blue-500/60
  `;

  // =============================================================
  // VARIANT MAP — each entry: { classes(isMobile), content?, props? }
  // =============================================================
  const HERO_CTA_VARIANTS = {
    /* ---------- Idle attention ---------- */

    // Brand gradient + breathing cyan↔blue glow (recommended)
    glowPulse: {
      classes: (m) => `${ctaBase} ${brandFill(m)} hero-cta-glow-pulse`,
    },

    // Expanding cyan radar ring
    sonar: {
      classes: (m) => `${ctaBase} ${brandFill(m)} hero-cta-sonar`,
    },

    // Rotating gradient ring — echoes the profile image's rings
    orbital: {
      classes: (m) => `${ctaBase} ${brandFill(m)} hero-cta-orbital`,
    },

    // Periodic shine sweep
    shine: {
      classes: (m) => `${ctaBase} ${brandFill(m)} hero-cta-shine`,
    },

    // Gentle floating (pauses on hover)
    levitate: {
      classes: (m) => `${ctaBase} ${brandFill(m)} hero-cta-levitate`,
    },

    // Brand gradient slowly shifting position
    gradientShift: {
      classes: (m) => `${ctaBase} ${brandFill(m)} hero-cta-gradient-shift`,
    },

    // Lub-dub glow pulse
    heartbeat: {
      classes: (m) => `${ctaBase} ${brandFill(m)} hero-cta-heartbeat`,
    },

    // Glowing dot orbiting the button
    electron: {
      classes: (m) => `${ctaBase} ${brandFill(m)} hero-cta-electron`,
    },

    // Blinking terminal cursor
    caret: {
      classes: (m) => `${ctaBase} ${brandFill(m)}`,
      content: (txt) => (
        <span className="inline-flex items-center">
          {txt}
          <span className="hero-cta-caret ms-2">|</span>
        </span>
      ),
    },

    // Original secondary style: outline + floating
    float: {
      classes: (m) => `${ctaBase} ${outline(m)} hero-cta-float`,
    },

    /* ---------- Hover / cursor-driven ---------- */

    // The pill leans toward the cursor with spring physics
    magneticHover: {
      classes: (m) => `${ctaBase} ${brandFill(m)}`,
      props: (isMobile) => {
        const ref = isMobile ? magneticRefMobile : magneticRefDesktop;
        return {
          ref,
          style: { x: springMX, y: springMY },
          onMouseMove: (e) => handleMagneticMove(e, ref),
          onMouseLeave: handleMagneticLeave,
          whileHover: { scale: 1.04 },
          whileTap: { scale: 0.96 },
        };
      },
    },

    // Radial glow that follows the cursor
    spotlight: {
      classes: (m) => `${ctaBase} ${brandFill(m)} hero-cta-spotlight overflow-hidden isolate`,
      props: () => ({ onMouseMove: handleSpotlightMove }),
    },

    // 3D perspective tilt
    tilt: {
      classes: (m) => `${ctaBase} ${brandFill(m)}`,
      props: () => ({
        style: { rotateX, rotateY, transformPerspective: 600 },
        onMouseMove: handleTiltMove,
        onMouseLeave: handleTiltLeave,
      }),
    },

    // Letters lift with a stagger
    letters: {
      classes: (m) => `${ctaBase} ${brandFill(m)} group`,
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

    // Arrow slides in on hover
    animatedArrow: {
      classes: (m) => `${ctaBase} ${brandFill(m)} group`,
      content: (txt) => (
        <span className="inline-flex items-center gap-2">
          <span>{txt}</span>
          <ArrowRight size={16} className="hero-cta-arrow" />
        </span>
      ),
    },

    // Outline idle → brand gradient sweeps in on hover
    fill: {
      classes: (m) =>
        `${ctaBase} ${outline(m)} hero-cta-fill overflow-hidden isolate group hover:text-white`,
    },

    // Elevation + soft shadow on hover
    lift: {
      classes: (m) =>
        `${ctaBase} ${brandFill(m)} shadow-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/20`,
    },

    // Flickering neon glow on hover
    neon: {
      classes: (m) => `${ctaBase} ${brandFill(m)} hero-cta-neon`,
    },

    // Expanding ripple from the click point
    ripple: {
      classes: (m) => `${ctaBase} ${brandFill(m)} overflow-hidden isolate`,
      props: () => ({ onMouseDown: handleRippleDown }),
      content: (txt) => (
        <>
          {txt}
          {ripples.map((r) => (
            <motion.span
              key={r.id}
              className="absolute rounded-full bg-white/40 pointer-events-none"
              style={{
                left: r.x,
                top: r.y,
                width: 80,
                height: 80,
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
    HERO_CTA_VARIANTS[HERO_CTA_VARIANT] || HERO_CTA_VARIANTS.glowPulse;

  const getHeroCtaClasses = (isMobile) => activeCta.classes(isMobile);
  const getHeroCtaContent = () =>
    activeCta.content
      ? activeCta.content(t("Get In Touch"))
      : t("Get In Touch");
  const getHeroCtaProps = (isMobile) => ({
    // Every variant scrolls to the contact section on click.
    onClick: () => scrollToSection("contact"),
    ...(activeCta.props ? activeCta.props(isMobile) : {}),
  });

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -100]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.5,
      },
    },
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.section
          id="home"
          style={{ y: heroY }}
          className="min-h-screen flex items-center justify-center relative px-6 pt-10"
          key={lang}
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{
            duration: getChangeLangDuration("s"),
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className={`absolute top-20 right-20 w-64 h-64 rounded-full blur-3xl opacity-10 ${
                isDarkMode ? "bg-blue-500" : "bg-blue-400"
              }`}
            />
            <motion.div
              animate={{
                scale: [1.1, 1, 1.1],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className={`absolute bottom-20 left-20 w-48 h-48 rounded-full blur-3xl opacity-10 ${
                isDarkMode ? "bg-purple-500" : "bg-purple-400"
              }`}
            />
          </div>

          <div className="max-w-7xl mx-auto w-full z-10 mt-20">
            {/* mobliw view */}
            <div className="block lg:hidden">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="text-center"
              >
                <motion.div variants={imageVariants} className="mb-8">
                  <div className="w-32 h-32 mx-auto relative">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`w-full h-32 rounded-2xl overflow-hidden border-4 ${
                        isDarkMode ? "border-gray-800" : "border-gray-300"
                      } shadow-2xl`}
                    >
                      <img
                        src={PROFILE_PIC}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                    </motion.div>

                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute -inset-2 rounded-2xl border border-blue-500/20"
                    />
                  </div>
                </motion.div>

                <motion.div
                  variants={textVariants}
                  className={`text-sm uppercase ${
                    lang === "En" ? "tracking-widest" : ""
                  } ${isDarkMode ? "text-gray-500" : "text-gray-600"} mb-4`}
                >
                  {t("Full‑Stack Web Developer")}
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className={`text-3xl md:text-5xl font-light mb-5 leading-tight w-min mx-auto text-start ${
                    lang === "En" ? "tracking-wider" : ""
                  }`}
                >
                  {lang === "En" ? (
                    <>
                      <span
                        className={`${isDarkMode ? "text-white" : "text-gray-900"}`}
                      >
                        Full Stack Developer &amp; Engineer
                      </span>
                      <br />
                      <span
                        className={`bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 text-transparent bg-clip-text font-medium ${
                          lang === "En" ? "tracking-wide" : ""
                        }`}
                        style={{
                          textShadow: "0 4px 24px rgba(0, 168, 255, 0.25)",
                        }}
                      >
                        Digital Experiences,
                      </span>
                      <br />
                      <span
                        className={`${
                          isDarkMode ? "text-white " : "text-gray-900"
                        } italic font-light text-nowrap ${
                          lang === "En" ? "tracking-tight" : ""
                        }`}
                      >
                        Not Just Apps
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        className={`${isDarkMode ? "text-white" : "text-gray-900"}`}
                      >
                        {t("Engineering")}
                      </span>
                      <br />
                      <span
                        className={`bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 text-transparent bg-clip-text font-medium ${
                          lang === "En" ? "tracking-wide" : ""
                        }`}
                        style={{
                          textShadow: "0 4px 24px rgba(0, 168, 255, 0.25)",
                        }}
                      >
                        {t("Experiences")},
                      </span>
                      <br />
                      <span
                        className={`${
                          isDarkMode ? "text-white " : "text-gray-900"
                        } italic font-light text-nowrap ${
                          lang === "En" ? "tracking-tight" : ""
                        }`}
                      >
                        {t("Not Just Apps")}
                      </span>
                    </>
                  )}
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className={`text-base md:text-lg ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  } mb-8 max-w-xl mx-auto font-light leading-relaxed`}
                >
                  {/* I develop scalable web and mobile apps that blend practical features, clean code, and modern technologies—crafted for real users. */}
                  {t("hero subtitle")}
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
                >
                  <motion.a
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    href="./ImanLangaran1404-4-1.pdf"
                    download="Iman_Langaran_Resume.pdf"
                    title="Download Iman Langaran's Resume (PDF)"
                    aria-label="Download resume as PDF"
                    target="_blank"
                    className={`bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-sm uppercase ${
                      lang === "En" ? "tracking-wider" : ""
                    } font-medium transition-all duration-300`}
                  >
                    {t("Resume")}
                  </motion.a>
                  {/* <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection("work")}
                    className={`bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-sm uppercase ${
                      lang === "En" ? "tracking-wider" : ""
                    } font-medium transition-all duration-300`}
                  >
                    {t("View Work")}
                  </motion.button> */}
                  {/* ================================================
                     HERO CTA BUTTON — Issue #33
                     ★ Currently active: glowPulse
                     To switch, change HERO_CTA_VARIANT above.
                     ================================================

                     Variant 1 — Soft Glow Pulse (default) ★
                  */}
                  <motion.button
                    {...getHeroCtaProps(true)}
                    className={getHeroCtaClasses(true)}
                  >
                    {getHeroCtaContent()}
                  </motion.button>

                  {/* ---- Variant 2: Floating / Breathing Animation ----
                  <motion.button
                    {...getHeroCtaProps()}
                    className={getHeroCtaClasses(true)}
                  >
                    {getHeroCtaContent()}
                  </motion.button> */}

                  {/* ---- Variant 3: Shine Sweep ----
                  <motion.button
                    {...getHeroCtaProps()}
                    className={getHeroCtaClasses(true)}
                  >
                    {getHeroCtaContent()}
                  </motion.button> */}

                  {/* ---- Variant 4: Magnetic Hover Effect ----
                  <motion.button
                    {...getHeroCtaProps()}
                    className={getHeroCtaClasses(true)}
                  >
                    {getHeroCtaContent()}
                  </motion.button> */}

                  {/* ---- Variant 5: Animated Arrow ----
                  <motion.button
                    {...getHeroCtaProps()}
                    className={getHeroCtaClasses(true)}
                  >
                    {getHeroCtaContent()}
                  </motion.button> */}
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex justify-center space-x-6 mb-8"
                >
                  {[
                    {
                      icon: FiGithub,
                      href: "https://github.com/imanlangaran",
                      label: "GitHub Profile",
                    },
                    {
                      icon: FiLinkedin,
                      href: "https://www.linkedin.com/in/imanlangaran",
                      label: "LinkedIn Profile",
                    },
                    {
                      icon: Mail,
                      href: "mailto:imanlangaran@gmail.com",
                      label: "Email Contact",
                    },
                  ].map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.href}
                      title={item.label}
                      aria-label={item.label}
                      rel={
                        item.href.startsWith("mailto")
                          ? undefined
                          : "noopener noreferrer"
                      }
                      target={
                        item.href.startsWith("mailto") ? undefined : "_blank"
                      }
                      whileHover={{ y: -3, scale: 1.1 }}
                      className={`p-3 rounded-full transition-colors ${
                        isDarkMode
                          ? "text-gray-400 hover:text-white hover:bg-gray-800"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      <item.icon size={20} />
                    </motion.a>
                  ))}
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className={`flex justify-center items-center space-x-6 text-xs uppercase ${
                    lang === "En" ? "tracking-widest" : ""
                  } flex-wrap`}
                >
                  <span
                    className={isDarkMode ? "text-gray-600" : "text-gray-500"}
                  >
                    React
                  </span>
                  <span
                    className={isDarkMode ? "text-gray-700" : "text-gray-400"}
                  >
                    •
                  </span>
                  <span
                    className={isDarkMode ? "text-gray-600" : "text-gray-500"}
                  >
                    PHP
                  </span>
                  <span
                    className={isDarkMode ? "text-gray-700" : "text-gray-400"}
                  >
                    •
                  </span>
                  <span
                    className={isDarkMode ? "text-gray-600" : "text-gray-500"}
                  >
                    PYTHON
                  </span>
                  <span
                    className={isDarkMode ? "text-gray-700" : "text-gray-400"}
                  >
                    •
                  </span>
                  <span
                    className={isDarkMode ? "text-gray-600" : "text-gray-500"}
                  >
                    SQL DB
                  </span>
                </motion.div>
              </motion.div>
            </div>

            {/* desktop view */}
            <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
              <motion.div
                initial="initial"
                animate="visible"
                variants={containerVariants}
                className="text-start"
              >
                <motion.div
                  variants={textVariants}
                  className={`text-sm uppercase ${
                    lang === "En" ? "tracking-widest" : ""
                  } ${isDarkMode ? "text-gray-500" : "text-gray-600"} mb-6`}
                >
                  {t("Full‑Stack Web Developer")}
                </motion.div>
                <motion.h1
                  variants={itemVariants}
                  className="text-4xl sm:text-6xl xl:text-7xl font-light mb-8 leading-tight"
                >
                  <span
                    className={`${
                      isDarkMode ? "text-white" : "text-gray-900"
                    } ${lang === "En" ? "tracking-tight" : ""}`}
                  >
                    {t("Engineering")}
                  </span>
                  <br />
                  <span
                    // className='bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 text-transparent bg-clip-text font-medium tracking-wide'
                    className={`bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 text-transparent bg-clip-text font-medium ${
                      lang === "En" ? "tracking-wide" : ""
                    }`}
                    // className='text-blue-500 font-medium'
                    style={{ textShadow: "0 4px 24px rgba(0, 168, 255, 0.25)" }}
                  >
                    {t("Experiences")} ,
                  </span>
                  <br />
                  <span
                    className={`${
                      isDarkMode ? "text-white italic" : "text-gray-900 italic"
                    } font-light ${
                      lang === "En" ? "tracking-tight" : ""
                    }`}
                  >
                    {t("Not Just Apps")}
                  </span>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className={`text-xl ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  } mb-12 font-light leading-relaxed max-w-lg`}
                >
                  {/* I develop scalable web and mobile apps that blend practical features, clean code, and modern technologies—crafted for real users. */}
                  {t("hero subtitle")}
                </motion.p>

                <motion.div variants={itemVariants} className="flex gap-6 mb-8">
                  <motion.a
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    href="./ImanLangaran1404-4-1.pdf"
                    download="Iman_Langaran_Resume.pdf"
                    title="Download Iman Langaran's Resume (PDF)"
                    aria-label="Download resume as PDF"
                    target="_blank"
                    className={`bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-sm uppercase ${
                      lang === "En" ? "tracking-wider" : ""
                    } font-medium transition-all duration-300`}
                  >
                    {t("Resume")}
                  </motion.a>
                  {/* <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection("work")}
                    className={`bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-sm uppercase ${
                      lang === "En" ? "tracking-wider" : ""
                    } font-medium transition-all duration-300`}
                  >
                    {t("View Work")}
                  </motion.button> */}
                  {/* ================================================
                     HERO CTA BUTTON — Issue #33
                     ★ Currently active: glowPulse
                     To switch, change HERO_CTA_VARIANT above.
                     ================================================

                     Variant 1 — Soft Glow Pulse (default) ★
                  */}
                  <motion.button
                    {...getHeroCtaProps(false)}
                    className={getHeroCtaClasses(false)}
                  >
                    {getHeroCtaContent()}
                  </motion.button>

                  {/* ---- Variant 2: Floating / Breathing Animation ----
                  <motion.button
                    {...getHeroCtaProps()}
                    className={getHeroCtaClasses(false)}
                  >
                    {getHeroCtaContent()}
                  </motion.button> */}

                  {/* ---- Variant 3: Shine Sweep ----
                  <motion.button
                    {...getHeroCtaProps()}
                    className={getHeroCtaClasses(false)}
                  >
                    {getHeroCtaContent()}
                  </motion.button> */}

                  {/* ---- Variant 4: Magnetic Hover Effect ----
                  <motion.button
                    {...getHeroCtaProps()}
                    className={getHeroCtaClasses(false)}
                  >
                    {getHeroCtaContent()}
                  </motion.button> */}

                  {/* ---- Variant 5: Animated Arrow ----
                  <motion.button
                    {...getHeroCtaProps()}
                    className={getHeroCtaClasses(false)}
                  >
                    {getHeroCtaContent()}
                  </motion.button> */}
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex space-x-6 mb-12"
                >
                  {[
                    { icon: FiGithub, href: "https://github.com/imanlangaran" },
                    {
                      icon: FiLinkedin,
                      href: "https://www.linkedin.com/in/imanlangaran",
                    },
                    { icon: Mail, href: "mailto:imanlangaran@gmail.com" },
                  ].map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.href}
                      target="_blank"
                      whileHover={{ y: -3, scale: 1.1 }}
                      className={`p-3 rounded-full transition-colors ${
                        isDarkMode
                          ? "text-gray-400 hover:text-white hover:bg-gray-800"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      <item.icon size={20} />
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={imageVariants}
                className="flex justify-center lg:justify-end"
              >
                <div className="relative">
                  <motion.div
                    variants={itemVariants}
                    className={`flex items-center space-x-8 text-xs uppercase ${
                      lang === "En" ? "tracking-widest" : ""
                    } absolute -top-16 -start-28`}
                  >
                    <span
                      className={isDarkMode ? "text-gray-600" : "text-gray-500"}
                    >
                      React
                    </span>
                    <span
                      className={isDarkMode ? "text-gray-700" : "text-gray-400"}
                    >
                      •
                    </span>
                    <span
                      className={isDarkMode ? "text-gray-600" : "text-gray-500"}
                    >
                      PHP
                    </span>
                    <span
                      className={isDarkMode ? "text-gray-700" : "text-gray-400"}
                    >
                      •
                    </span>
                    <span
                      className={isDarkMode ? "text-gray-600" : "text-gray-500"}
                    >
                      PYTHON
                    </span>
                    <span
                      className={isDarkMode ? "text-gray-700" : "text-gray-400"}
                    >
                      •
                    </span>
                    <span
                      className={isDarkMode ? "text-gray-600" : "text-gray-500"}
                    >
                      SQL DB
                    </span>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`w-80 h-96 rounded-3xl overflow-hidden border-4 ${
                      isDarkMode ? "border-gray-800" : "border-gray-300"
                    } shadow-2xl`}
                  >
                    <img
                      src={PROFILE_PIC}
                      alt="Iman Langaran - Full Stack Developer specializing in React, Node.js, TypeScript and Python"
                      className="w-full h-full object-cover"
                      loading="eager"
                      decoding="async"
                    />
                  </motion.div>

                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -inset-4 rounded-3xl border border-blue-500/20"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -inset-8 rounded-3xl border border-purple-500/10"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ArrowDown
              size={20}
              className={isDarkMode ? "text-gray-600" : "text-gray-400"}
            />
          </motion.div>
        </motion.section>
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;
