// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const TeckStack = ({ techStack, isDarkMode }) => {
  return (
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
        {techStack.map((tech) => (
          <motion.div
            key={tech}
            whileHover={{
              y: -3,
            }}
            className={`
                px-4 py-2
                rounded-full border text-sm
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
  );
};

export default TeckStack;
