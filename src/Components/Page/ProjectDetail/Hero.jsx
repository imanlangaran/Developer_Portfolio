// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import PlaceHolder from "../../PlaceHolder";
import { containerVariants, itemVariants } from "../../../utils/helper";
import { useLang } from "../../../context/LangContext";

const Hero = ({ id, image, title, subtitle, isDarkMode }) => {
  const { lang } = useLang();

  return (
    <motion.div
      layoutId={`project-image-${id}`}
      className={`relative w-full aspect-video overflow-hidden border-b ${
        isDarkMode ? "border-gray-800" : "border-gray-200"
      }`}
    >
      {/* Only show image if no error */}
      {image ? (
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          draggable="false"
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
        />
      ) : (
        <PlaceHolder isDarkMode={isDarkMode} isFullSize />
      )}

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/40 to-transparent" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8 z-10"
      >
        <motion.h1
          variants={itemVariants}
          className={`text-3xl md:text-5xl font-light text-white leading-tight ${
            lang === "En" ? "tracking-wide" : ""
          }`}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            variants={itemVariants}
            className="mt-2 md:mt-3 text-gray-300 text-base md:text-lg font-light leading-relaxed max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Hero;
