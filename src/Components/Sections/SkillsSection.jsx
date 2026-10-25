import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  // eslint-disable-next-line no-unused-vars
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  containerVariants,
  getChangeLangDuration,
  itemVariants,
} from "../../utils/helper";
import { SKILLS_CATEGORY, STATS, TECH_STACK } from "../../utils/data";
import { useTranslation } from "react-i18next";
import { useLang } from "../../context/LangContext";

// ponytail: toggle between "tabbed" and "grid" view; upgrade to user-facing toggle if runtime switching is needed.
const SKILLS_VIEW_MODE = "grid"; // "tabbed" | "grid"

const skillBarVariants = {
  hidden: { width: 0, opacity: 0 },
  visible: (level) => ({
    width: `${level}%`,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
      delay: 0.15,
    },
  }),
};

// ponytail: extracted CategoryCard prevents React remount churn across parent re-renders; upgrade to separate file if reused outside SkillsSection.
const CategoryCard = ({ category, isDarkMode, lang, isInView, t }) => (
  <motion.div
    variants={itemVariants}
    className={`h-min p-8 rounded-2xl border ${
      isDarkMode
        ? "bg-gray-900/50 border-gray-800 backdrop-blur-sm"
        : "bg-white/80 border-gray-200 backdrop-blur-sm"
    }`}
  >
    <div className="flex items-center mb-6">
      <div
        className={`p-3 rounded-xl ${
          isDarkMode ? "bg-gray-800" : "bg-gray-100"
        } ${lang === "En" ? "mr-4" : "ml-4"}`}
      >
        <category.icon size={24} className="text-blue-500" />
      </div>
      <div>
        <h3 className="text-xl font-medium mb-1">{t(category.title)}</h3>
        <p
          className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {t(category.description)}
        </p>
      </div>
    </div>

    <div className="space-y-4">
      {category.skills.map((skill) => (
        <div key={skill.name} className="group">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">{skill.name}</span>
            <span
              className={`text-sm ${
                isDarkMode ? "text-gray-500" : "text-gray-600"
              }`}
            >
              {skill.level}%
            </span>
          </div>

          <div
            className={`h-2 rounded-full overflow-hidden ${
              isDarkMode ? "bg-gray-800" : "bg-gray-200"
            }`}
          >
            <motion.div
              variants={skillBarVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={skill.level}
              className={`h-full ${skill.color} rounded-full relative`}
            >
              <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const SkillsSection = () => {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { t } = useTranslation('skills');
  const { lang } = useLang();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // ponytail: rotation only runs in tabbed mode; pauses on hover.
  useEffect(() => {
    if (SKILLS_VIEW_MODE !== "tabbed" || !isInView || isPaused) return;
    const timer = setInterval(() => {
      setActiveCategoryIndex((prev) => (prev + 1) % SKILLS_CATEGORY.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isInView, isPaused]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const activeCategory = SKILLS_CATEGORY[activeCategoryIndex] || SKILLS_CATEGORY[0];

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
        }`}
      ref={sectionRef}
    >
      <AnimatePresence mode="wait">
        <motion.section
          id="skills"
          className={`py-24 px-6 ${isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
            } relative overflow-hidden`}
          key={lang}
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{
            duration: getChangeLangDuration("s"),
            ease: "easeInOut",
          }}
        >
          <motion.div
            style={{ y }}
            className="absolute inset-0 overflow-hidden"
          >
            <div
              className={`absolute top-40 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-5 ${isDarkMode ? "bg-blue-500" : "bg-blue-400"
                }`}
            />
            <div
              className={`absolute bottom-40 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-5 ${isDarkMode ? "bg-purple-500" : "bg-purple-400"
                }`}
            />
          </motion.div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
              className="text-center mb-20"
            >
              <motion.div
                variants={itemVariants}
                className={`text-sm uppercase ${lang === "En" ? "tracking-widest" : ""
                  } ${isDarkMode ? "text-gray-500" : "text-gray-600"} mb-4`}
              >
                {t("Technical Experiense")}
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-5xl font-light mb-6"
              >
                {t("Skills &")}
                <span className="text-blue-500 font-medium">
                  {" "}
                  {t("Technologies")}
                </span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"
                  } max-w-2xl mx-auto font-light`}
              >
                {/* A comprehensive toolkit for building modern, scalable web applications from concept to deployment. */}
                {t("skills subtitle")}
              </motion.p>
            </motion.div>

            {SKILLS_VIEW_MODE === "tabbed" ? (
              <div
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <motion.div
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={itemVariants}
                  className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10"
                  role="tablist"
                  aria-label="Skill categories"
                >
                  {SKILLS_CATEGORY.map((category, index) => {
                    const isActive = index === activeCategoryIndex;
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.title}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveCategoryIndex(index)}
                        className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer ${
                          isActive
                            ? "text-white shadow-lg shadow-blue-500/25"
                            : isDarkMode
                            ? "text-gray-400 hover:text-white hover:bg-gray-900 border border-gray-800"
                            : "text-gray-600 hover:text-gray-900 hover:bg-white border border-gray-200"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeCategoryTab"
                            className="absolute inset-0 bg-blue-500 rounded-xl -z-10"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        <Icon size={18} className={isActive ? "text-white" : "text-blue-500"} />
                        <span>{t(category.title)}</span>
                      </button>
                    );
                  })}
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className={`max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl border backdrop-blur-sm ${
                      isDarkMode
                        ? "bg-gray-900/50 border-gray-800"
                        : "bg-white/80 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center mb-6">
                      <div
                        className={`p-3 rounded-xl ${
                          isDarkMode ? "bg-gray-800" : "bg-gray-100"
                        } ${lang === "En" ? "mr-4" : "ml-4"}`}
                      >
                        <activeCategory.icon size={24} className="text-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-medium mb-1">
                          {t(activeCategory.title)}
                        </h3>
                        <p
                          className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {t(activeCategory.description)}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      {activeCategory.skills.map((skill) => (
                        <div key={skill.name} className="group">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span
                              className={`text-sm ${
                                isDarkMode ? "text-gray-500" : "text-gray-600"
                              }`}
                            >
                              {skill.level}%
                            </span>
                          </div>

                          <div
                            className={`h-2 rounded-full overflow-hidden ${
                              isDarkMode ? "bg-gray-800" : "bg-gray-200"
                            }`}
                          >
                            <motion.div
                              variants={skillBarVariants}
                              initial="hidden"
                              animate="visible"
                              custom={skill.level}
                              className={`h-full ${skill.color} rounded-full relative`}
                            >
                              <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {/* ponytail: 6+3 vs 5+4 balanced column stack ends at the exact same baseline; upgrade to dynamic bin-packing if skills are dynamic. */}
                <div className="flex flex-col gap-8">
                  <CategoryCard
                    category={SKILLS_CATEGORY[0]}
                    isDarkMode={isDarkMode}
                    lang={lang}
                    isInView={isInView}
                    t={t}
                  />
                  <CategoryCard
                    category={SKILLS_CATEGORY[3]}
                    isDarkMode={isDarkMode}
                    lang={lang}
                    isInView={isInView}
                    t={t}
                  />
                </div>
                <div className="flex flex-col gap-8">
                  <CategoryCard
                    category={SKILLS_CATEGORY[2]}
                    isDarkMode={isDarkMode}
                    lang={lang}
                    isInView={isInView}
                    t={t}
                  />
                  <CategoryCard
                    category={SKILLS_CATEGORY[1]}
                    isDarkMode={isDarkMode}
                    lang={lang}
                    isInView={isInView}
                    t={t}
                  />
                </div>
              </motion.div>
            )}

            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
              className="mt-16"
            >
              <motion.div variants={itemVariants} className="text-center mb-8">
                <h3 className="text-xl font-medium mb-4">
                  {t("Also Wirking With")}
                </h3>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center gap-3"
              >
                {TECH_STACK.map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ y: -2, scale: 1.05 }}
                    className={`px-4 py-2 text-sm rounded-full border transition-all duration-300 ${isDarkMode
                      ? "bg-gray-900 border-gray-700 text-gray-300 hover:border-gray-600"
                      : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {STATS.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-light text-blue-500 mb-2">
                    {stat.number}
                  </div>
                  <div
                    className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </AnimatePresence>
    </div>
  );
};



export default SkillsSection;
