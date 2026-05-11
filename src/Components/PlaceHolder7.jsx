// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import {
  Database,
  Server,
  Globe,
  Cpu,
  Layers3,
  TerminalSquare,
} from 'lucide-react'

const floatingIcons = [
  { Icon: Database, x: '10%', y: '20%', delay: 0 },
  { Icon: Server, x: '75%', y: '15%', delay: 0.8 },
  { Icon: Globe, x: '20%', y: '70%', delay: 1.2 },
  { Icon: Cpu, x: '80%', y: '75%', delay: 1.8 },
  { Icon: Layers3, x: '50%', y: '40%', delay: 0.5 },
]

export default function PlaceHolder7({ isDarkMode }) {
  return (
    <div
      className={`relative w-full h-full overflow-hidden ${
        isDarkMode
          ? 'bg-[#060816]'
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
      }`}
    >
      {/* Background glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-blue-500/20 blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-0 right-0 w-36 h-36 rounded-full bg-purple-500/10 blur-3xl"
      />

      {/* Animated grid */}
      <div
        className={`absolute inset-0 opacity-[0.08] ${
          isDarkMode ? 'bg-white' : 'bg-black'
        }`}
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Floating tech icons */}
      {/* eslint-disable-next-line no-unused-vars */}
      {floatingIcons.map(({ Icon, x, y, delay }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: [0.15, 0.4, 0.15],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            delay,
            ease: 'easeInOut',
          }}
          className={`absolute ${
            isDarkMode ? 'text-blue-400/50' : 'text-blue-500/40'
          }`}
          style={{
            left: x,
            top: y,
          }}
        >
          <Icon size={28} strokeWidth={1.5} />
        </motion.div>
      ))}

      {/* Center visual */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className={`relative w-24 h-24 rounded-3xl border ${
            isDarkMode
              ? 'border-blue-500/20 bg-white/5'
              : 'border-blue-300/40 bg-white/40'
          } backdrop-blur-xl`}
        >
          {/* Orbit ring */}
          <motion.div
            animate={{
              rotate: [360, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-[-12px] rounded-[30px] border border-dashed border-blue-500/20"
          />

          {/* Core */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
              className="flex items-center justify-center"
            >
              <TerminalSquare
                size={34}
                className={`${
                  isDarkMode ? 'text-blue-400' : 'text-blue-500'
                }`}
                strokeWidth={1.8}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom shimmer */}
      <motion.div
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg]"
      />
    </div>
  )
}