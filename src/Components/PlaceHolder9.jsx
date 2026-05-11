import { motion } from 'framer-motion'
import {
  Database,
  Server,
  Globe,
  Cpu,
  Boxes,
  Terminal,
} from 'lucide-react'

const icons = [Database, Server, Globe, Cpu, Boxes, Terminal]

export default function PlaceHolder9({ isDarkMode }) {
  return (
    <div
      className={`relative w-full h-full overflow-hidden ${
        isDarkMode
          ? 'bg-[#050816]'
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
      }`}
    >
      {/* Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-blue-500 blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-purple-500 blur-3xl"
      />

      {/* Grid Pattern */}
      <div
        className={`absolute inset-0 opacity-[0.07] ${
          isDarkMode ? 'bg-white' : 'bg-black'
        }`}
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Floating Icons */}
      <div className="absolute inset-0">
        {icons.map((Icon, index) => {
          const positions = [
            'top-6 left-6',
            'top-10 right-10',
            'bottom-8 left-10',
            'bottom-10 right-8',
            'top-1/2 left-1/4',
            'top-1/3 right-1/3',
          ]

          return (
            <motion.div
              key={index}
              className={`absolute ${positions[index]}`}
              animate={{
                y: [0, -8, 0],
                rotate: [0, 4, -4, 0],
              }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div
                className={`p-3 rounded-2xl backdrop-blur-xl border ${
                  isDarkMode
                    ? 'bg-white/5 border-white/10'
                    : 'bg-white/50 border-gray-200'
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isDarkMode
                      ? 'text-blue-400'
                      : 'text-blue-500'
                  }`}
                />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Center Visual */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="relative w-24 h-24"
        >
          {/* Outer Ring */}
          <div
            className={`absolute inset-0 rounded-full border ${
              isDarkMode
                ? 'border-blue-500/20'
                : 'border-blue-400/30'
            }`}
          />

          {/* Inner Ring */}
          <div
            className={`absolute inset-3 rounded-full border ${
              isDarkMode
                ? 'border-purple-500/20'
                : 'border-purple-400/30'
            }`}
          />

          {/* Core */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="absolute inset-[30%] rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shadow-2xl shadow-blue-500/30"
          />
        </motion.div>
      </div>

      {/* Bottom Label */}
      <div className="absolute bottom-4 left-4 right-4">
        <motion.div
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className={`text-xs tracking-[0.25em] uppercase font-medium ${
            isDarkMode
              ? 'text-gray-400'
              : 'text-gray-500'
          }`}
        >
          System Architecture
        </motion.div>

        <div
          className={`mt-2 h-[1px] w-full ${
            isDarkMode
              ? 'bg-gradient-to-r from-transparent via-blue-500/40 to-transparent'
              : 'bg-gradient-to-r from-transparent via-blue-400/50 to-transparent'
          }`}
        />
      </div>
    </div>
  )
}