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
  Server,
  Globe,
  Layers3,
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

const floatingIcons = [
  { Icon: Database, x: '10%', y: '20%', delay: 0 },
  { Icon: Server, x: '75%', y: '15%', delay: 0.8 },
  { Icon: Globe, x: '20%', y: '70%', delay: 1.2 },
  { Icon: Cpu, x: '80%', y: '75%', delay: 1.8 },
  { Icon: Layers3, x: '50%', y: '40%', delay: 0.5 },
]

export default function PlaceHolder10({ isDarkMode }) {
  const FloatingIcon = icons[Math.floor(Math.random() * icons.length)];

  return (
    <div
      className={`relative w-full h-full overflow-hidden group ${isDarkMode
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
          className={`absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-20 ${isDarkMode ? 'bg-blue-500' : 'bg-blue-400'
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
          className={`absolute bottom-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 ${isDarkMode ? 'bg-purple-500' : 'bg-purple-300'
            }`}
        />

        {/* Grid lines */}
        <div
          className={`absolute inset-0 opacity-[0.08] ${isDarkMode ? 'bg-white' : 'bg-black'
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



  {/* Center content */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full">
    
    {/* Animated code window */}
    <div
      className={`w-32 rounded-xl border shadow-2xl backdrop-blur-md overflow-hidden transition-transform duration-500 group-hover:scale-105 ${
        isDarkMode
          ? 'bg-gray-900/80 border-gray-700'
          : 'bg-white/80 border-gray-300'
      }`}
    >
      {/* top bar */}
      <div
        className={`flex items-center gap-1 px-3 py-2 border-b ${
          isDarkMode
            ? 'border-gray-700 bg-gray-800/80'
            : 'border-gray-200 bg-gray-100/80'
        }`}
      >
        <div className="w-2 h-2 rounded-full bg-red-400" />
        <div className="w-2 h-2 rounded-full bg-yellow-400" />
        <div className="w-2 h-2 rounded-full bg-green-400" />
      </div>

      {/* fake code lines */}
      <div className="p-3 space-y-2">
        <div
          className={`h-2 rounded animate-pulse ${
            isDarkMode ? 'bg-blue-400/70' : 'bg-blue-500/60'
          } w-3/4`}
        />
        <div
          className={`h-2 rounded animate-pulse delay-100 ${
            isDarkMode ? 'bg-cyan-300/60' : 'bg-cyan-500/50'
          } w-1/2`}
        />
        <div
          className={`h-2 rounded animate-pulse delay-200 ${
            isDarkMode ? 'bg-purple-400/60' : 'bg-purple-500/50'
          } w-5/6`}
        />
        <div
          className={`h-2 rounded animate-pulse delay-300 ${
            isDarkMode ? 'bg-gray-500/50' : 'bg-gray-400/60'
          } w-2/3`}
        />
      </div>
    </div>

    {/* Optional label */}
    {/* <div
      className={`mt-4 text-xs tracking-[0.3em] uppercase font-medium ${
        isDarkMode ? 'text-gray-400' : 'text-gray-500'
      }`}
    >
      Software Project
    </div> */}
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
          className={`absolute rounded-full ${isDarkMode ? 'bg-blue-400/40' : 'bg-blue-500/30'
            }`}
          style={{
            width: `${4 + (i % 3) * 2}px`,
            height: `${4 + (i % 3) * 2}px`,
            left: `${10 + i * 7}%`,
            top: `${20 + ((i * 13) % 60)}%`,
          }}
        />
      ))}

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
          className={`absolute ${isDarkMode ? 'text-blue-400/50' : 'text-blue-500/40'
            }`}
          style={{
            left: x,
            top: y,
          }}
        >
          <Icon size={28} strokeWidth={1.5} />
        </motion.div>
      ))}

      {/* Bottom subtle text */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-4 left-4 right-4"
      >
        <div
          className={`text-[11px] tracking-[0.25em] uppercase font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
        >
          Software Architecture
        </div>

        <div
          className={`mt-1 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`}
        >
          Backend • Infrastructure • Systems
        </div>
      </motion.div> */}

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