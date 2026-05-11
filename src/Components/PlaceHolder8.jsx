import { motion } from 'framer-motion';
import {
  Database,
  Cpu,
  Cloud,
  Shield,
  Terminal,
  Boxes,
  Workflow,
  ServerCog,
} from 'lucide-react';

const icons = [
  Database,
  Cpu,
  Cloud,
  Shield,
  Terminal,
  Boxes,
  Workflow,
  ServerCog,
];

export default function PlaceHolder8({ isDarkMode }) {
  const FloatingIcon = icons[Math.floor(Math.random() * icons.length)];

  return (
    <div
      className={`relative w-full h-full overflow-hidden group ${
        isDarkMode
          ? 'bg-[#050816]'
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
      }`}
    >
      {/* Ambient background */}
      <div className="absolute inset-0">
        {/* Large blurred blue orb */}
        <motion.div
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -20, 10, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-20 ${
            isDarkMode ? 'bg-blue-500' : 'bg-blue-400'
          }`}
        />

        {/* Purple subtle orb */}
        <motion.div
          animate={{
            x: [0, -15, 10, 0],
            y: [0, 15, -10, 0],
            scale: [1, 0.9, 1.05, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`absolute bottom-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 ${
            isDarkMode ? 'bg-purple-500' : 'bg-purple-300'
          }`}
        />

        {/* Grid lines */}
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
      </div>

      {/* Animated center visual */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'linear',
          }}
          className={`absolute w-28 h-28 rounded-full border ${
            isDarkMode
              ? 'border-blue-500/20'
              : 'border-blue-400/30'
          }`}
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
          }}
          className={`absolute w-20 h-20 rounded-full border-dashed border ${
            isDarkMode
              ? 'border-purple-500/20'
              : 'border-purple-400/30'
          }`}
        />

        {/* Floating icon core */}
        <motion.div
          animate={{
            y: [0, -8, 0],
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`relative z-10 p-5 rounded-2xl backdrop-blur-xl border shadow-2xl ${
            isDarkMode
              ? 'bg-white/5 border-white/10'
              : 'bg-white/70 border-white/60'
          }`}
        >
          <FloatingIcon
            className={`w-10 h-10 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-500'
            }`}
          />

          {/* Pulse */}
          <motion.div
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.6, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
            }}
            className={`absolute inset-0 rounded-2xl ${
              isDarkMode ? 'bg-blue-500/10' : 'bg-blue-400/10'
            }`}
          />
        </motion.div>
      </div>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            x: [0, i % 2 === 0 ? 10 : -10, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.2,
          }}
          className={`absolute rounded-full ${
            isDarkMode ? 'bg-blue-400/40' : 'bg-blue-500/30'
          }`}
          style={{
            width: `${4 + (i % 3) * 2}px`,
            height: `${4 + (i % 3) * 2}px`,
            left: `${10 + i * 7}%`,
            top: `${20 + ((i * 13) % 60)}%`,
          }}
        />
      ))}

      {/* Bottom subtle text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-4 left-4 right-4"
      >
        <div
          className={`text-[11px] tracking-[0.25em] uppercase font-medium ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          Software Architecture
        </div>

        <div
          className={`mt-1 text-xs ${
            isDarkMode ? 'text-gray-500' : 'text-gray-400'
          }`}
        >
          Backend • Infrastructure • Systems
        </div>
      </motion.div>

      {/* Hover shine */}
      <motion.div
        initial={{ x: '-120%' }}
        whileHover={{ x: '120%' }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
      />
    </div>
  );
}