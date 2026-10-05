// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { itemVariants } from "../../../utils/helper";

const Description = ({ description, isDarkMode }) => {
  const { t } = useTranslation("projects");

  return (
    <motion.div variants={itemVariants} className="mb-10">
      <h2
        className={`text-2xl font-medium mb-4 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {t("About Project")}
      </h2>

      <p
        className={`text-base leading-relaxed font-light ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {description}
      </p>
    </motion.div>
  );
};

export default Description;
