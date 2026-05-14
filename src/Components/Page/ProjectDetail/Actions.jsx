// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiGithub } from "react-icons/fi";
import { ExternalLink } from "lucide-react";

const Actions = ({ githubUrl, liveUrl, isDarkMode }) => {
  return (
    <div
      className="
                  flex flex-wrap gap-4
                  mb-10
                "
    >
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
          className={`
                      inline-flex items-center gap-2
                      px-5 py-3 rounded-2xl border
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
          <FiGithub size={18} />
          GitHub
        </motion.a>
      )}

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
          className="
                      inline-flex items-center gap-2
                      px-5 py-3 rounded-2xl
                      bg-blue-600 text-white
                      hover:bg-blue-500
                      transition-all duration-300
                      shadow-lg shadow-blue-500/20
                    "
        >
          <ExternalLink size={18} />
          Live Preview
        </motion.a>
      )}
    </div>
  );
};

export default Actions;
