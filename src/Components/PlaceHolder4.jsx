// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
const PlaceHolder4 = ({isDarkMode}) => { 

  return (
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className={`relative w-full h-full overflow-hidden ${
    isDarkMode
      ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950'
      : 'bg-gradient-to-br from-gray-100 via-white to-gray-200'
  }`}
>
  {/* Ambient animated glow */}
  <motion.div
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.15, 0.25, 0.15],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    className="absolute inset-0"
  >
    <div
      className={`absolute top-[-20%] left-[-10%] w-72 h-72 rounded-full blur-3xl ${
        isDarkMode ? 'bg-blue-500/20' : 'bg-blue-400/20'
      }`}
    />

    <div
      className={`absolute bottom-[-30%] right-[-10%] w-72 h-72 rounded-full blur-3xl ${
        isDarkMode ? 'bg-purple-500/20' : 'bg-purple-400/20'
      }`}
    />
  </motion.div>

  {/* Animated grid */}
  <div className="absolute inset-0 opacity-[0.07]">
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

  {/* Floating particles */}
  {[...Array(12)].map((_, i) => (
    <motion.div
      key={i}
      className={`absolute rounded-full ${
        isDarkMode ? 'bg-white/10' : 'bg-black/10'
      }`}
      style={{
        width: Math.random() * 6 + 2,
        height: Math.random() * 6 + 2,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.2, 0.8, 0.2],
      }}
      transition={{
        duration: 3 + Math.random() * 4,
        repeat: Infinity,
        delay: Math.random() * 2,
      }}
    />
  ))}

  {/* Main content */}
  <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
    {/* Orbit rings */}
    <div className="relative flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 12,
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
          duration: 18,
          repeat: Infinity,
          ease: 'linear',
        }}
        className={`absolute w-40 h-40 rounded-full border border-dashed ${
          isDarkMode
            ? 'border-purple-500/10'
            : 'border-purple-400/20'
        }`}
      />

      {/* Center core */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`relative w-20 h-20 rounded-2xl backdrop-blur-xl border flex items-center justify-center shadow-2xl ${
          isDarkMode
            ? 'bg-white/5 border-white/10'
            : 'bg-white/60 border-black/5'
        }`}
      >
        {/* Tech symbol */}
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className={`text-3xl font-black tracking-tight ${
            isDarkMode ? 'text-white/80' : 'text-black/70'
          }`}
        >
          &lt;/&gt;
        </motion.div>

        {/* Ping effect */}
        <motion.div
          animate={{
            scale: [1, 1.8],
            opacity: [0.4, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className={`absolute inset-0 rounded-2xl ${
            isDarkMode
              ? 'bg-blue-500/10'
              : 'bg-blue-400/20'
          }`}
        />
      </motion.div>
    </div>

    {/* Labels */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-6 text-center px-4"
    >
      <div
        className={`text-sm font-semibold tracking-wide ${
          isDarkMode ? 'text-white/80' : 'text-gray-800'
        }`}
      >
        SYSTEM ARCHITECTURE
      </div>

      <div
        className={`text-xs mt-1 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}
      >
        Backend • Infrastructure • APIs • Distributed Systems
      </div>
    </motion.div>

    {/* Animated code lines */}
    <div className="absolute bottom-4 left-4 right-4 space-y-2 opacity-70">
      {[70, 50, 85].map((w, i) => (
        <motion.div
          key={i}
          initial={{ width: 0 }}
          animate={{ width: `${w}%` }}
          transition={{
            duration: 1.2,
            delay: i * 0.15,
          }}
          className={`h-[2px] rounded-full ${
            isDarkMode
              ? 'bg-gradient-to-r from-blue-500/40 to-transparent'
              : 'bg-gradient-to-r from-blue-400/50 to-transparent'
          }`}
        />
      ))}
    </div>
  </div>

  {/* Noise overlay */}
  <div
    className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
    style={{
      backgroundImage:
        'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27200%27 height=%27200%27 viewBox=%270 0 200 200%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27/%3E%3C/filter%3E%3Crect width=%27200%27 height=%27200%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")',
    }}
  />
</motion.div>
  )
}

export default PlaceHolder4;