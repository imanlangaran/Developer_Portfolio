// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  Braces,
  Database,
  Server,
  Cpu,
  Globe,
  Terminal,
  Layers3,
} from 'lucide-react';

const icons = [Braces, Database, Server, Cpu, Globe, Terminal, Layers3];

const PlaceHolder = ({isDarkMode}) => { 

  return (
<div
        className={`relative w-full h-full overflow-hidden ${
          isDarkMode
            ? 'bg-[#050816]'
            : 'bg-gradient-to-br from-white via-blue-50 to-purple-50'
        }`}
      >
        {/* Animated gradient glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-20 -left-16 w-56 h-56 rounded-full bg-blue-500 blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.12, 0.2, 0.12],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-purple-500 blur-3xl"
        />

        {/* Floating grid */}
        <div className="absolute inset-0 opacity-[0.08]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, currentColor 1px, transparent 1px),
                linear-gradient(to bottom, currentColor 1px, transparent 1px)
              `,
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        {/* Animated code particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: [0, 0.15, 0],
              y: [30, -30],
              x: [0, i % 2 === 0 ? 12 : -12],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
            className={`absolute text-[10px] font-mono ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}
            style={{
              left: `${10 + i * 7}%`,
              bottom: '-10px',
            }}
          >
            {'</>'}
          </motion.div>
        ))}

        {/* Center piece */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <motion.div
            whileHover={{
              rotate: 6,
              scale: 1.04,
            }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 12,
            }}
            className={`relative p-6 rounded-3xl border backdrop-blur-xl ${
              isDarkMode
                ? 'bg-white/5 border-white/10'
                : 'bg-white/60 border-white/50'
            }`}
          >
            {/* Orbiting icons */}
            {icons.map((Icon, index) => {
              const angle = (index / icons.length) * Math.PI * 2;
              const radius = 58;

              return (
                <motion.div
                  key={index}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `
                      translate(-50%, -50%)
                      translate(
                        ${Math.cos(angle) * radius}px,
                        ${Math.sin(angle) * radius}px
                      )
                    `,
                  }}
                >
                  <div
                    className={`p-2 rounded-xl ${
                      isDarkMode
                        ? 'bg-gray-900/80 text-blue-400'
                        : 'bg-white/90 text-blue-500 shadow-lg'
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                </motion.div>
              );
            })}

            {/* Main icon */}
            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`relative z-10 p-5 rounded-2xl ${
                isDarkMode
                  ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-400'
                  : 'bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600'
              }`}
            >
              <Layers3 size={42} strokeWidth={1.8} />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom subtle text */}
        <motion.div
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.35em] uppercase font-medium ${
            isDarkMode ? 'text-gray-500' : 'text-gray-400'
          }`}
        >
          Software Architecture
        </motion.div>
      </div>
  )
}

export default PlaceHolder;