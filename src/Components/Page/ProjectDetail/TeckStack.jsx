// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { itemVariants } from "../../../utils/helper";

const TeckStack = ({ techStack, isDarkMode }) => {
  const { t } = useTranslation("projects");

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

export default TeckStack;
