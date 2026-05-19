// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useSpring } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useTheme } from "../context/ThemeContext";

import { PROJECTS } from "../utils/data";

import useProjectReadme from "../hooks/useProjectReadme";

import NotFound from "./NotFound";
import TopBar from "../Components/Page/ProjectDetail/TopBar";
import Hero from "../Components/Page/ProjectDetail/Hero";
import Actions from "../Components/Page/ProjectDetail/Actions";
import Description from "../Components/Page/ProjectDetail/Description";
import TeckStack from "../Components/Page/ProjectDetail/TeckStack";
import NavBar from "../Components/NavBar";
import { useTranslation } from "react-i18next";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const modalContentRef = useRef(null);
  const { i18n } = useTranslation();

  // --------------------------------------------------
  // PROJECT
  // --------------------------------------------------
  const project = PROJECTS.find((p) => p.id === parseInt(id));

  // --------------------------------------------------
  // NAVIGATION DATA
  // --------------------------------------------------
  const navigationData = useMemo(
    () => ({
      to: location.state?.from || "/",
      options: location.state?.section
        ? {
            state: {
              scrollTo: location.state.section,
            },
          }
        : undefined,
    }),
    [location.state],
  );

  // --------------------------------------------------
  // README
  // --------------------------------------------------
  const { readmeHtml, isLoading: isLoadingReadme } = useProjectReadme(
    project?.githubUrl,
    i18n.language,
  );

  // --------------------------------------------------
  // HANDLERS
  // --------------------------------------------------
  const handleClose = useCallback(() => {
    navigate(navigationData.to, navigationData.options);
  }, [navigate, navigationData]);

  // --------------------------------------------------
  // LOCK BODY SCROLL
  // --------------------------------------------------
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // --------------------------------------------------
  // ESC CLOSE
  // --------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose]);

  // --------------------------------------------------
  // SCROLL PROGRESS
  // --------------------------------------------------
  const { scrollYProgress } = useScroll({
    container: modalContentRef,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
  });

  // --------------------------------------------------
  // NOT FOUND
  // --------------------------------------------------
  if (!project) {
    return <NotFound />;
  }

  return (
    <motion.div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={handleClose}
    >
      {/* PROGRESS BAR */}
      <motion.div
        className={`fixed top-0 left-0 right-0 h-3px origin-left z-10000 ${
          isDarkMode ? "bg-blue-400" : "bg-blue-600"
        }`}
        style={{ scaleX }}
      />

      {/* NAVBAR */}
      <NavBar />

      {/* MODAL */}
      <motion.div
        layoutId={`project-card-${project.id}`}
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 20,
          scale: 0.96,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full h-full mt-34 md:mt-14 md:h-[85vh] md:max-w-6xl md:rounded-3xl overflow-hidden border shadow-2xl ${
          isDarkMode
            ? "bg-gray-900 border-white/10 shadow-blue-500/10"
            : "bg-gray-50 border-black/10 shadow-blue-500/20"
        }`}
      >
        {/* GLOW */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(59,130,246,0.18), transparent 30%)",
          }}
        />

        {/* FLOATING CONTROLS */}
        <TopBar isDarkMode={isDarkMode} handleClose={handleClose} />

        {/* SCROLLABLE CONTENT */}
        <div
          ref={modalContentRef}
          className={`h-full overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-blue-500 ${
            isDarkMode ? "scrollbar-track-gray-950" : "scrollbar-track-gray-200"
          }`}
        >
          {/* HERO */}
          <Hero
            id={project.id}
            image={project.image}
            title={i18n.t(project.title)}
            subtitle={i18n.t(project.subtitle)}
            isDarkMode={isDarkMode}
          />

          {/* CONTENT */}
          <div className="max-w-4xl mx-auto px-5 md:px-10 py-10">
            {/* ACTIONS */}
            {(project.githubUrl || project.liveUrl) && (
              <Actions
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
                isDarkMode={isDarkMode}
              />
            )}

            {/* DESCRIPTION */}
            <Description
              description={i18n.t(project.description)}
              isDarkMode={isDarkMode}
            />

            {/* TECH STACK */}
            {project.tags?.length > 0 && (
              <TeckStack techStack={project.tags} isDarkMode={isDarkMode} />
            )}

            {/* README */}
            {project.githubUrl && (
              <div className="mt-14">
                <h3
                  className={`text-xl font-semibold mb-6 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  README
                </h3>

                {isLoadingReadme ? (
                  <div
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Loading README...
                  </div>
                ) : (
                  <div
                    key={isDarkMode ? "dark" : "light"}
                    // className={`prose prose-lg max-w-none transition-colors duration-300 ${
                    //   isDarkMode ? "prose-invert text-white" : "text-black"
                    // }`}
                    className="markdown-body"
                    dangerouslySetInnerHTML={{ __html: readmeHtml }}
                  />
                )}
              </div>
            )}

            {/* SPACER */}
            <div className="h-20" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
