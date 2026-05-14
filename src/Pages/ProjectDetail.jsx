// TODO: separate readme section
// TODO: show a nav bar when detail page directly opens

import { useEffect, useMemo, useRef, useState } from "react";
import {
  // eslint-disable-next-line no-unused-vars
  motion,
  useScroll,
  useSpring,
} from "framer-motion";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import { marked } from "marked";
import { baseUrl } from "marked-base-url";

import { PROJECTS } from "../utils/data";
import { useTheme } from "../context/ThemeContext";
import NotFound from "./NotFound";
import { getGithubReadmeUrl } from "../utils/getGithubReadmeUrl";

import TopBar from "../Components/Page/ProjectDetail/TopBar";
import Hero from "../Components/Page/ProjectDetail/Hero";
import Actions from "../Components/Page/ProjectDetail/Actions";
import Description from "../Components/Page/ProjectDetail/Description";
import TeckStack from "../Components/Page/ProjectDetail/TeckStack";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const modalContentRef = useRef(null);
  const [readmeHtml, setReadmeHtml] = useState("");
  const [isLoadingReadme, setIsLoadingReadme] = useState(false);

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
  // PROJECT
  // --------------------------------------------------

  const project = PROJECTS.find((p) => p.id === parseInt(id));

  // --------------------------------------------------
  // NOT FOUND
  // --------------------------------------------------

  if (!project) {
    return <NotFound />;
  }

  // --------------------------------------------------
  // README URLS
  // --------------------------------------------------

  const readmeUrls = useMemo(() => {
    return getGithubReadmeUrl(project.githubUrl, "en");
  }, [project.githubUrl]);

  // --------------------------------------------------
  // FETCH README
  // --------------------------------------------------

  useEffect(() => {
    if (!readmeUrls) return;

    const fetchReadme = async () => {
      setIsLoadingReadme(true);

      try {
        // 1. localized README
        let response = await fetch(readmeUrls.localized);

        // 2. fallback README
        if (!response.ok) {
          response = await fetch(readmeUrls.fallback);
        }

        if (!response.ok) {
          throw new Error("README not found");
        }

        const markdown = await response.text();

        marked.use(baseUrl(readmeUrls.base), {
          walkTokens(token) {
            if (token.type !== "html") return;

            token.text = token.text.replace(
              /<img\b([^>]*?)\bsrc=(["'])(.*?)\2([^>]*?)>/gi,
              (match, before, quote, src, after) => {
                if (/^(https?:|data:|blob:|\/\/)/i.test(src)) {
                  return match;
                }

                return `<img${before}src=${quote}${new URL(src, readmeUrls.base).href}${quote}${after}>`;
              },
            );
          },
        });

        const html = marked(markdown);

        setReadmeHtml(html);
      } catch (error) {
        console.error(error);

        setReadmeHtml(`
          <p>
            Failed to load README.
          </p>
        `);
      } finally {
        setIsLoadingReadme(false);
      }
    };

    fetchReadme();
  }, [readmeUrls]);

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
  }, []);

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
  // HANDLERS
  // --------------------------------------------------

  const handleClose = () => {
    navigate(navigationData.to, navigationData.options);
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <motion.div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-black/60 backdrop-blur-xl
      "
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.25,
      }}
      onClick={handleClose}
    >
      {/* PROGRESS BAR */}

      <motion.div
        className={`
          fixed top-0 left-0 right-0
          h-[3px]
          origin-left
          z-[10000]
          ${isDarkMode ? "bg-blue-400" : "bg-blue-600"}
        `}
        style={{
          scaleX,
        }}
      />

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
        className={`
          relative
          w-full
          h-full
          md:h-[92vh]
          md:max-w-6xl
          md:rounded-3xl
          overflow-hidden
          border
          shadow-2xl
          ${
            isDarkMode
              ? `
                bg-[#0b1120]
                border-white/10
                shadow-blue-500/10
              `
              : `
                bg-white
                border-black/10
                shadow-blue-500/20
              `
          }
        `}
      >
        {/* GLOW */}

        <div
          className="
            absolute inset-0
            pointer-events-none
          "
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
          className={`
            h-full overflow-y-auto scroll-smooth
            ${isDarkMode ? "scrollbar-dark" : "scrollbar-light"}
          `}
        >
          {/* HERO */}
          <Hero id={project.id} image={project.image} title={project.title} subtitle={project.subtitle} />

          {/* CONTENT */}

          <div
            className="
              max-w-4xl mx-auto
              px-5 md:px-10 py-10
            "
          >
            {/* ACTIONS */}
            {(project.githubUrl || project.liveUrl) && (
                <Actions githubUrl={project.githubUrl} liveUrl={project.liveUrl} isDarkMode={isDarkMode} />
            )}

            {/* DESCRIPTION */}
            <Description description={project.description} isDarkMode={isDarkMode}/>

            {/* TECH STACK */}
            {project.tags?.length > 0 && (<TeckStack techStack={project.tags}/>)}

            {/* README */}
            {project.githubUrl && (
              <div className="mt-14">
                <h3
                  className={`
                    text-xl font-semibold mb-6
                    ${isDarkMode ? "text-white" : "text-black"}
                  `}
                >
                  README
                </h3>

                {isLoadingReadme ? (
                  <div
                    className={`
                      text-sm
                      ${isDarkMode ? "text-gray-400" : "text-gray-600"}
                    `}
                  >
                    Loading README...
                  </div>
                ) : (
                  <div
                    className={`
                      prose prose-lg max-w-none
                      ${isDarkMode ? "prose-invert" : ""}
                    `}
                    dangerouslySetInnerHTML={{
                      __html: readmeHtml,
                    }}
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
