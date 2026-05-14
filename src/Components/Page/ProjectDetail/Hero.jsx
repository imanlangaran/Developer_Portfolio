// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Hero = ({ id, image, title, subtitle }) => {
  return (
    <motion.div
      layoutId={`project-image-${id}`}
      className="
              relative
              w-full
              aspect-video
              overflow-hidden
            "
    >
      <img
        src={image}
        alt={title}
        className="
                w-full h-full object-cover
              "
        draggable="false"
      />

      <div
        className="
                absolute inset-0
                bg-gradient-to-t
                from-black/70
                via-black/10
                to-transparent
              "
      />

      <div
        className="
                absolute bottom-8 left-8 right-8
              "
      >
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.15,
          }}
          className="
                  text-3xl md:text-5xl
                  font-bold
                  text-white
                "
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.22,
            }}
            className="
                    mt-3
                    text-white/80
                    text-base md:text-lg
                  "
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default Hero;
