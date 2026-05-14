// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  ArrowLeft,
  X,
} from "lucide-react";


const TopBar = ({ isDarkMode, handleClose }) => {
  return (
    <div
      className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between"
    >
      {/* BACK */}

      <motion.button
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.95,
        }}
        onClick={handleClose}
        className={`
          flex items-center gap-2
          px-4 py-2 rounded-full
          backdrop-blur-lg border
          transition-all duration-300
          ${isDarkMode
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

      {/* CLOSE */}

      <motion.button
        whileHover={{
          rotate: 90,
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.92,
        }}
        onClick={handleClose}
        className={`
          p-3 rounded-full
          backdrop-blur-lg border
          transition-all duration-300
          ${isDarkMode
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

  )
}

export default TopBar