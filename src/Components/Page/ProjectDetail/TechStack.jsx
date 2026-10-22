// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { itemVariants } from "../../../utils/helper";
import { useLang } from "../../../context/LangContext";

const TechStack = ({ techStack = [], category, isDarkMode }) => {
  const { t } = useTranslation(["projects", "common"]);
  const { lang } = useLang();

  return (
    <motion.div variants={itemVariants} className="mt-10">
      <h3
        className={`text-xl font-medium mb-4 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {t("Tech Stack")}
      </h3>

      <div className="flex flex-wrap gap-2.5">
        {category && (
          <motion.span
            whileHover={{ y: -2 }}
            className={`text-xs md:text-sm px-3.5 py-1.5 rounded-full font-medium transition-colors whitespace-normal break-words ${
              isDarkMode
                ? "bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20"
                : "bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
            } ${lang === "En" ? "tracking-wider" : ""}`}
          >
            {t(category)}
          </motion.span>
        )}

        {techStack.map((tech) => (
          <motion.span
            key={tech}
            whileHover={{ y: -2 }}
            className={`text-xs md:text-sm px-3.5 py-1.5 rounded-full font-medium transition-colors ${
              isDarkMode
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default TechStack;
