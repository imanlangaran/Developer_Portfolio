// TODO: seperate this page into components

import { useEffect, useRef } from "react";
import {
  // eslint-disable-next-line no-unused-vars
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
} from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft, ExternalLink, Github, X } from "lucide-react";

import { PROJECTS } from "../utils/data";

import { useTheme } from "../context/ThemeContext";
import NotFound from "./NotFound";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const modalContentRef = useRef(null);

  const project = PROJECTS.find((p) => p.id === parseInt(id));

  // -----------------------------
  // Not found
  // -----------------------------
  if (!project) {
    return <NotFound />;
  }

  // -----------------------------
  // Lock body scroll
  // -----------------------------
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // -----------------------------
  // ESC close
  // -----------------------------
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        navigate(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  // -----------------------------
  // Scroll progress
  // -----------------------------
  const { scrollYProgress } = useScroll({
    container: modalContentRef,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
  });

  const handleClick = () => navigate('/', { state: { scrollTo: "work" } });

  return (
    <AnimatePresence mode="wait">
      {/* BACKDROP */}
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={() => handleClick()}
      >
        {/* PROGRESS BAR */}
        <motion.div
          className={`fixed top-0 left-0 right-0 h-[3px] origin-left z-[10000] ${
            isDarkMode ? "bg-blue-400" : "bg-blue-600"
          }`}
          style={{ scaleX }}
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
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(59,130,246,0.18), transparent 30%)",
            }}
          />

          {/* FLOATING CONTROLS */}
          <div className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between">
            {/* BACK BUTTON */}
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={() => handleClick()}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full
                backdrop-blur-lg border transition-all duration-300
                ${
                  isDarkMode
                    ? `
                      bg-white/10
                      border-white/10
                      text-white
                      hover:bg-white/20
                    `
                    : `
                      bg-white/70
                      border-black/10
                      text-black
                      hover:bg-white
                    `
                }
              `}
            >
              <ArrowLeft size={18} />
              Back
            </motion.button>

            {/* CLOSE BUTTON */}
            <motion.button
              whileHover={{
                rotate: 90,
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.92,
              }}
              onClick={() => handleClick()}
              className={`
                p-3 rounded-full backdrop-blur-lg border
                transition-all duration-300
                ${
                  isDarkMode
                    ? `
                      bg-white/10
                      border-white/10
                      text-white
                      hover:bg-white/20
                    `
                    : `
                      bg-white/70
                      border-black/10
                      text-black
                      hover:bg-white
                    `
                }
              `}
            >
              <X size={20} />
            </motion.button>
          </div>

          {/* SCROLLABLE CONTENT */}
          <div
            ref={modalContentRef}
            className={`
              h-full overflow-y-auto scroll-smooth
              ${isDarkMode ? "scrollbar-dark" : "scrollbar-light"}
            `}
          >
            {/* HERO IMAGE */}
            <motion.div
              layoutId={`project-image-${project.id}`}
              className="relative w-full aspect-video overflow-hidden"
            >
              {/* reserve space / prevent layout shift */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                draggable="false"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* title */}
              <div className="absolute bottom-8 left-8 right-8">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-3xl md:text-5xl font-bold text-white"
                >
                  {project.title}
                </motion.h1>

                {project.subtitle && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22 }}
                    className="mt-3 text-white/80 text-base md:text-lg"
                  >
                    {project.subtitle}
                  </motion.p>
                )}
              </div>
            </motion.div>

            {/* CONTENT */}
            <div className="max-w-4xl mx-auto px-5 md:px-10 py-10">
              {/* ACTION BUTTONS */}
              {(project.githubUrl || project.liveUrl) && (
                <div className="flex flex-wrap gap-4 mb-10">
                  {project.githubUrl && (
                    <motion.a
                      whileHover={{
                        y: -2,
                        scale: 1.02,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        inline-flex items-center gap-2 px-5 py-3 rounded-2xl border
                        transition-all duration-300
                        ${
                          isDarkMode
                            ? `
                              bg-white/5
                              border-white/10
                              text-white
                              hover:bg-white/10
                            `
                            : `
                              bg-black/[0.03]
                              border-black/10
                              text-black
                              hover:bg-black/[0.05]
                            `
                        }
                      `}
                    >
                      <Github size={18} />
                      GitHub
                    </motion.a>
                  )}

                  {project.liveUrl && (
                    <motion.a
                      whileHover={{
                        y: -2,
                        scale: 1.02,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-500/20"
                    >
                      <ExternalLink size={18} />
                      Live Preview
                    </motion.a>
                  )}
                </div>
              )}

              {/* DESCRIPTION */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.2,
                }}
              >
                <h2
                  className={`
                    text-2xl font-semibold mb-5
                    ${isDarkMode ? "text-white" : "text-black"}
                  `}
                >
                  About Project
                </h2>

                <p
                  className={`
                    leading-8 text-[15px] md:text-base
                    ${isDarkMode ? "text-gray-300" : "text-gray-700"}
                  `}
                >
                  {project.description}
                </p>
              </motion.div>

              {/* TECH STACK */}
              {project.techStack?.length > 0 && (
                <div className="mt-12">
                  <h3
                    className={`
                      text-xl font-semibold mb-5
                      ${isDarkMode ? "text-white" : "text-black"}
                    `}
                  >
                    Tech Stack
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {project.techStack.map((tech) => (
                      <motion.div
                        key={tech}
                        whileHover={{
                          y: -3,
                        }}
                        className={`
                          px-4 py-2 rounded-full border text-sm
                          ${
                            isDarkMode
                              ? `
                                bg-white/5
                                border-white/10
                                text-gray-200
                              `
                              : `
                                bg-black/[0.03]
                                border-black/10
                                text-gray-700
                              `
                          }
                        `}
                      >
                        {tech}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* EXTRA SPACE FOR SCROLL */}
              <div className="h-20" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
