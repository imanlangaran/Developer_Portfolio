// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useSpring } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useTheme } from "../context/ThemeContext";
import { PROJECTS } from "../utils/data";
import { containerVariants, itemVariants } from "../utils/helper";
import useProjectReadme from "../hooks/useProjectReadme";
import {
  resolveProjectDate,
  useProjectDates,
} from "../hooks/useProjectDates";

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

  // --------------------------------------------------
  // COMMIT DATE (shared cache with the projects grid)
  // --------------------------------------------------
  const {
    dates: commitDates,
    isLoading: isLoadingCommitDates,
  } = useProjectDates();
  const commitDate = project ? resolveProjectDate(project, commitDates) : null;

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

    // TODO: get this url from config files
    const projectUrl = `https://imanlangaran.github.io/Developer_Portfolio/project/${id}`;

    // Snapshot the current values first so the cleanup below can put the site
    // defaults (from index.html) back when this page unmounts.
    const previousTitle = document.title;
    const restoreFns = [];

    // Update a <meta>/<link> tag, remembering what it held beforehand. A tag
    // that did not exist yet is remembered for removal instead.
    const updateTag = ({ selector, tag, attributes, property, value }) => {
      let element = document.querySelector(selector);

      if (element) {
        const previousValue = element[property];
        restoreFns.push(() => {
          element[property] = previousValue;
        });
      } else {
        element = document.createElement(tag);
        Object.entries(attributes).forEach(([name, attrValue]) => {
          element.setAttribute(name, attrValue);
        });
        document.head.appendChild(element);
        restoreFns.push(() => element.remove());
      }

      element[property] = value;
    };

    // Update document title
    document.title = pageTitle;

    // Update meta description
    updateTag({
      selector: 'meta[name="description"]',
      tag: "meta",
      attributes: { name: "description" },
      property: "content",
      value: pageDescription,
    });

    // Update Open Graph tags
    updateTag({
      selector: 'meta[property="og:title"]',
      tag: "meta",
      attributes: { property: "og:title" },
      property: "content",
      value: pageTitle,
    });

    updateTag({
      selector: 'meta[property="og:description"]',
      tag: "meta",
      attributes: { property: "og:description" },
      property: "content",
      value: pageDescription,
    });

    updateTag({
      selector: 'meta[property="og:url"]',
      tag: "meta",
      attributes: { property: "og:url" },
      property: "content",
      value: projectUrl,
    });

    if (project.image) {
      updateTag({
        selector: 'meta[property="og:image"]',
        tag: "meta",
        attributes: { property: "og:image" },
        property: "content",
        value: project.image,
      });
    }

    // Update canonical URL
    updateTag({
      selector: 'link[rel="canonical"]',
      tag: "link",
      attributes: { rel: "canonical" },
      property: "href",
      value: projectUrl,
    });

    // Undo everything above on unmount, otherwise the tab title and SEO tags
    // keep pointing at the project page after it is closed.
    return () => {
      document.title = previousTitle;
      restoreFns.forEach((restore) => restore());
    };
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
            project={project}
            image={project.image}
            title={t(project.title)}
            subtitle={t(project.subtitle)}
            commitDate={commitDate}
            isLoadingCommitDate={isLoadingCommitDates}
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
