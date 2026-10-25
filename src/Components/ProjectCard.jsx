// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiGithub } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PlaceHolder from "./PlaceHolder";
import ProjectMetaLine from "./ProjectMetaLine";

// ponytail: 5-column bento layout alternating 3:2 and 2:3 columns on wide screens; upgrade to layout config if custom ratios are needed.
const ProjectCard = ({
  project,
  isDarkMode,
  commitDate,
  isLoadingCommitDate,
  isBigger = false,
}) => {
  const { t } = useTranslation('projects');
  const navigate = useNavigate();

  const cardVariants = {
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

  const handleClick = () =>
    navigate(`/project/${project.id}`, {
      state: {
        from: "/",
        section: "work",
        cardId: `project-card-${project.id}`,
      },
    });

  return (
    <motion.div
      id={`project-card-${project.id}`}
      layoutId={`project-card-${project.id}`}
      variants={cardVariants}
      whileHover={{
        y: -6,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      tabIndex={0}
      role="button"
      aria-label={`Project: ${t(project.title)}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`group/bento relative cursor-pointer rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 h-auto md:h-full max-h-[80vh] md:max-h-none col-span-1 ${
        isBigger ? "md:col-span-3" : "md:col-span-2"
      }`}
      onClick={() => handleClick()}
    >
      <div
        className={`h-full flex flex-col justify-between rounded-2xl overflow-hidden border transition-all duration-300 ${
          isDarkMode
            ? "bg-gray-900/60 border-white/[0.1] hover:border-white/[0.2] hover:shadow-2xl hover:shadow-blue-500/10"
            : "bg-white/80 border-black/[0.08] hover:border-black/[0.15] hover:shadow-2xl hover:shadow-blue-500/10 shadow-sm"
        } backdrop-blur-md`}
      >
        <motion.div
          layoutId={`project-image-${project.id}`}
          className="relative overflow-hidden w-full h-48 sm:h-52 shrink-0"
        >
          {/* Only show image if no error */}
          {project.image ? (
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover/bento:scale-105"
              loading="lazy"
              title={project.title}
            />
          ) : (
            // no Image → show placeholder UI
            <PlaceHolder isDarkMode={isDarkMode} />
          )}

          {/* Featured and Category Badges */}
          {project.featured && (
            <div className="absolute top-4 left-4">
              <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                {t("Featured")}
              </span>
            </div>
          )}

          <div className="absolute top-4 right-4">
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                isDarkMode
                  ? "bg-gray-800/80 text-gray-300"
                  : "bg-white/80 text-gray-700"
              } backdrop-blur-sm`}
            >
              {t(project.category)}
            </span>
          </div>

          {/* Hover overlay (Live Demo & GitHub) */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center space-x-4"
          >
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                initial={{ y: 5, opacity: 0.5 }}
                whileHover={{ y: 0, opacity: 1, scale: 1.05 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 text-sm font-medium transition-colors"
              >
                <ExternalLink size={16} />
                <span>{t('Live Demo')}</span>
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                initial={{ y: 5, opacity: 0.5 }}
                whileHover={{ y: 0, opacity: 1, scale: 1.05 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-4 py-2 rounded-full flex items-center space-x-2 text-sm font-medium transition-all"
              >
                <FiGithub size={16} />
                <span>{t('GitHub')}</span>
              </motion.a>
            )}
          </motion.div> */}
        </motion.div>

        <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 overflow-hidden">
          <div className="transition-transform duration-200 group-hover/bento:translate-x-1.5 rtl:group-hover/bento:-translate-x-1.5">
            <h3 className="text-xl font-medium mb-2 group-hover/bento:text-blue-500 transition-colors">
              {t(project.title)}
            </h3>

            {/* Status + approximate commit time meta line (skeleton while dates load) */}
            <ProjectMetaLine
              project={project}
              commitDate={commitDate}
              isLoading={isLoadingCommitDate}
              variant="card"
              isDarkMode={isDarkMode}
            />

            <p
              className={`text-sm leading-relaxed mt-3 line-clamp-8 md:line-clamp-3 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {t(project.description)}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-4">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className={`text-xs px-3 py-1 rounded-full ${
                  isDarkMode
                    ? "bg-gray-800/80 text-gray-300 border border-gray-700/50"
                    : "bg-gray-100 text-gray-700 border border-gray-200"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
