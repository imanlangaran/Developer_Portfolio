// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  Database,
  Server,
  Cpu,
  Layers3,
  Globe,
  TerminalSquare,
  Boxes,
  Braces,
} from 'lucide-react';

const floatingIcons = [
  Database,
  Server,
  Cpu,
  Layers3,
  Globe,
  TerminalSquare,
  Boxes,
  Braces,
];

export default function PlaceHolder6({ isDarkMode }) {
  return (
    <div
      className={`relative w-full h-full overflow-hidden ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950'
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
      }`}
    >
      {/* Ambient Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blue glow */}
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
          className="absolute -top-12 -left-10 w-40 h-40 rounded-full bg-blue-500 blur-3xl"
        />

        {/* Purple glow */}
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
          className="absolute bottom-0 right-0 w-44 h-44 rounded-full bg-purple-500 blur-3xl"
        />

        {/* Tiny grid */}
        <div
          className={`absolute inset-0 opacity-[0.06] ${
            isDarkMode ? 'bg-white' : 'bg-black'
          }`}
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      {/* Floating tech icons */}
      <div className="absolute inset-0">
        {floatingIcons.map((Icon, index) => {
          const positions = [
            'top-5 left-5',
            'top-8 right-10',
            'bottom-8 left-8',
            'bottom-6 right-6',
            'top-1/2 left-6',
            'top-1/3 right-5',
            'bottom-12 left-1/2',
            'top-12 left-1/2',
          ];

          return (
            <motion.div
              key={index}
              className={`absolute ${positions[index]}`}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 4, -4, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 3 + index * 0.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.2,
              }}
            >
              <div
                className={`p-2 rounded-2xl backdrop-blur-md border ${
                  isDarkMode
                    ? 'bg-white/5 border-white/10 text-blue-400'
                    : 'bg-white/50 border-black/5 text-blue-500'
                }`}
              >
                <Icon size={16} strokeWidth={2} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Center visual */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <motion.div
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative"
        >
          {/* Main orb */}
          <motion.div
            animate={{
              scale: [1, 1.06, 1],
              rotate: [0, 180],
            }}
            transition={{
              scale: {
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              },
              rotate: {
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
            className="relative flex items-center justify-center"
          >
            {/* Outer ring */}
            <div
              className={`absolute w-28 h-28 rounded-full border ${
                isDarkMode
                  ? 'border-blue-500/20'
                  : 'border-blue-400/30'
              }`}
            />

            {/* Second ring */}
            <div
              className={`absolute w-20 h-20 rounded-full border ${
                isDarkMode
                  ? 'border-purple-500/20'
                  : 'border-purple-400/30'
              }`}
            />

            {/* Core */}
            <div
              className={`relative w-12 h-12 rounded-2xl backdrop-blur-xl border flex items-center justify-center shadow-2xl ${
                isDarkMode
                  ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-white/10'
                  : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-white/50'
              }`}
            >
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
              >
                <Braces
                  size={22}
                  className={
                    isDarkMode ? 'text-blue-400' : 'text-blue-500'
                  }
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom subtle label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
      >
        <div
          className={`text-[10px] tracking-[0.3em] uppercase font-medium ${
            isDarkMode
              ? 'text-gray-500'
              : 'text-gray-400'
          }`}
        >
          Software Architecture
        </div>
      </motion.div>
    </div>
  );
}