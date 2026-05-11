
const PlaceHolder2 = ({isDarkMode}) => { 

  return (

<div
  className={`relative w-full h-full overflow-hidden ${
    isDarkMode
      ? 'bg-gradient-to-br from-gray-900 via-gray-950 to-black'
      : 'bg-gradient-to-br from-gray-100 via-white to-gray-200'
  }`}
>
  {/* Animated background glow */}
  <div className="absolute inset-0">
    <div
      className={`absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-20 animate-pulse ${
        isDarkMode ? 'bg-blue-500' : 'bg-blue-300'
      }`}
    />
    <div
      className={`absolute bottom-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-20 animate-pulse delay-1000 ${
        isDarkMode ? 'bg-cyan-400' : 'bg-cyan-300'
      }`}
    />
  </div>

  {/* Floating grid */}
  <div className="absolute inset-0 opacity-20">
    <div
      className={`w-full h-full ${
        isDarkMode
          ? 'bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)]'
          : 'bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)]'
      } bg-[size:24px_24px] animate-[pulse_6s_ease-in-out_infinite]`}
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
    <div
      className={`mt-4 text-xs tracking-[0.3em] uppercase font-medium ${
        isDarkMode ? 'text-gray-400' : 'text-gray-500'
      }`}
    >
      Software Project
    </div>
  </div>

  {/* subtle animated scan line */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div
      className={`absolute w-full h-16 opacity-10 blur-xl animate-[scan_5s_linear_infinite] ${
        isDarkMode ? 'bg-cyan-400' : 'bg-blue-400'
      }`}
    />
  </div>

  <style jsx>{`
    @keyframes scan {
      0% {
        transform: translateY(-100%);
      }
      100% {
        transform: translateY(400%);
      }
    }
  `}</style>
</div>

  )
}

export default PlaceHolder2;