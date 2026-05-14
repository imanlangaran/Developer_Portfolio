// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Description = ({ description, isDarkMode }) => {
  return (
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
        className={`leading-8 text-[15px] md:text-base ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
      >
        {description}
      </p>
    </motion.div>
  );
};

export default Description;
