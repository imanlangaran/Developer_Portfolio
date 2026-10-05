// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useSpring } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useTheme } from "../context/ThemeContext";
import { PROJECTS } from "../utils/data";
import { containerVariants, itemVariants } from "../utils/helper";
import useProjectReadme from "../hooks/useProjectReadme";

import NotFound from "./NotFound";
import TopBar from "../Components/Page/ProjectDetail/TopBar";
import Hero from "../Components/Page/ProjectDetail/Hero";
import Actions from "../Components/Page/ProjectDetail/Actions";
import Description from "../Components/Page/ProjectDetail/Description";
import TeckStack from "../Components/Page/ProjectDetail/TeckStack";
import { useTranslation } from "react-i18next";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const modalContentRef = useRef(null);
  const { t, i18n } = useTranslation("projects");

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
    project,
    i18n.language,
  );

  const hasReadme = Boolean(
    project &&
      (project.type === "private"
        ? project.readme || project.slug
        : project.githubUrl),
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
  // DYNAMIC SEO META TAGS
  // --------------------------------------------------
  useEffect(() => {
    if (!project) return;

    const projectTitle = t(project.title);
    const projectDescription = t(project.description);
    const pageTitle = `${projectTitle} | Iman Langaran Portfolio`;
    const pageDescription = `${projectDescription}. Built with ${project.tags?.join(", ")}. View the source code on GitHub and live demo.`;

    // Update document title
    document.title = pageTitle;

    // Update/create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = pageDescription;

    // Update Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = pageTitle;

    let ogDescription = document.querySelector(
      'meta[property="og:description"]',
    );
    if (!ogDescription) {
      ogDescription = document.createElement("meta");
      ogDescription.setAttribute("property", "og:description");
      document.head.appendChild(ogDescription);
    }
    ogDescription.content = pageDescription;

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }

    // TODO: get this url from config files
    ogUrl.content = `https://imanlangaran.github.io/Developer_Portfolio/project/${id}`;

    if (project.image) {
      let ogImage = document.querySelector('meta[property="og:image"]');
      if (!ogImage) {
        ogImage = document.createElement("meta");
        ogImage.setAttribute("property", "og:image");
        document.head.appendChild(ogImage);
      }
      ogImage.content = project.image;
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `https://imanlangaran.github.io/Developer_Portfolio/project/${id}`;
  }, [project, id, i18n, t]);

  // --------------------------------------------------
  // NOT FOUND
  // --------------------------------------------------
  if (!project) {
    return <NotFound />;
  }

  return (
    <motion.div
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={handleClose}
    >
      {/* PROGRESS BAR */}
      <motion.div
        className={`fixed top-0 left-0 right-0 h-0.5 origin-left z-10000 ${
          isDarkMode ? "bg-blue-400" : "bg-blue-600"
        }`}
        style={{ scaleX }}
      />

      {/* MODAL CONTAINER */}
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
        className={`relative w-full h-full md:h-[85vh] md:max-w-6xl rounded-2xl overflow-hidden border shadow-2xl ${
          isDarkMode
            ? "bg-gray-900 border-gray-800 shadow-blue-500/10"
            : "bg-white border-gray-200 shadow-blue-500/10"
        }`}
      >
        {/* AMBIENT GLOW */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className={`absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-5 ${
              isDarkMode ? "bg-blue-500" : "bg-blue-400"
            }`}
          />
          <div
            className={`absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-5 ${
              isDarkMode ? "bg-purple-500" : "bg-purple-400"
            }`}
          />
        </div>

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
            title={t(project.title)}
            subtitle={t(project.subtitle)}
            isDarkMode={isDarkMode}
          />

          {/* CONTENT */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto px-5 md:px-10 py-10 relative z-10"
          >
            {/* ACTIONS */}
            {((project.type !== "private" && project.githubUrl) || project.liveUrl) && (
              <Actions
                githubUrl={project.type === "private" ? null : project.githubUrl}
                liveUrl={project.liveUrl}
                type={project.type}
                isDarkMode={isDarkMode}
              />
            )}

            {/* DESCRIPTION */}
            <Description
              description={t(project.description)}
              isDarkMode={isDarkMode}
            />

            {/* TECH STACK */}
            {project.tags?.length > 0 && (
              <TeckStack techStack={project.tags} isDarkMode={isDarkMode} />
            )}

            {/* README */}
            {hasReadme && (
              <motion.div variants={itemVariants} className="mt-14">
                <h3
                  className={`text-xl font-medium mb-6 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {t("README")}
                </h3>

                {isLoadingReadme ? (
                  <div
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {t("Loading README...")}
                  </div>
                ) : (
                  <div
                    key={isDarkMode ? "dark" : "light"}
                    className={`markdown-body ${
                      isDarkMode
                        ? "markdown-body-dark text-gray-300"
                        : "markdown-body-light text-gray-700"
                    }`}
                    style={{
                      backgroundColor: "transparent",
                      // Explicit inline color is required: main.jsx imports
                      // github-markdown-light.css followed by github-markdown-dark.css,
                      // so the dark theme base rule (.markdown-body { color: #f0f6fc })
                      // always wins the cascade and would render white text in light mode.
                      color: isDarkMode ? "#d1d5db" : "#374151",
                    }}
                    dangerouslySetInnerHTML={{ __html: readmeHtml }}
                  />
                )}
              </motion.div>
            )}

            {/* SPACER */}
            <div className="h-20" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
