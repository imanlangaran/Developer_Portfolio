// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiGithub } from "react-icons/fi";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { itemVariants } from "../../../utils/helper";
import { useLang } from "../../../context/LangContext";

const Actions = ({ githubUrl, liveUrl, isDarkMode }) => {
  const { t } = useTranslation(["common", "projects"]);
  const { lang } = useLang();

  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-wrap items-center gap-4 mb-10"
    >
      {liveUrl && (
        <motion.a
          whileHover={{
            y: -2,
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-6 md:px-8 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-all duration-300 shadow-lg shadow-blue-500/10 ${
            lang === "En" ? "tracking-wider uppercase" : ""
          }`}
        >
          <ExternalLink size={16} />
          <span>{t("Live Demo")}</span>
        </motion.a>
      )}

      {githubUrl && (
        <motion.a
          whileHover={{
            y: -2,
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-6 md:px-8 py-3 rounded-full border text-sm font-medium transition-all duration-300 ${
            lang === "En" ? "tracking-wider uppercase" : ""
          } ${
            isDarkMode
              ? "border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white"
              : "border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900"
          }`}
        >
          <FiGithub size={16} />
          <span>{t("GitHub")}</span>
        </motion.a>
      )}
    </motion.div>
  );
};

export default Actions;
