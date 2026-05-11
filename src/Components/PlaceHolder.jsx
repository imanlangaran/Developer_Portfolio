
const PlaceHolder = ({isDarkMode}) => { 

  return (

<div
  className={`w-full h-full flex items-center justify-center relative overflow-hidden ${
    isDarkMode
      ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
      : 'bg-gradient-to-br from-gray-100 via-white to-gray-200'
  }`}
>
  {/* Animated glow */}
  <div
    className={`absolute w-40 h-40 rounded-full blur-3xl opacity-30 animate-pulse ${
      isDarkMode ? 'bg-blue-500' : 'bg-blue-300'
    }`}
  />

  {/* Floating geometric shapes */}
  <div className="absolute inset-0">
    <div
      className={`absolute top-6 left-8 w-10 h-10 rounded-xl rotate-12 animate-bounce ${
        isDarkMode ? 'bg-gray-700' : 'bg-white'
      }`}
      style={{ animationDuration: '3s' }}
    />
    <div
      className={`absolute bottom-8 right-10 w-6 h-6 rounded-full animate-ping ${
        isDarkMode ? 'bg-blue-400/40' : 'bg-blue-500/20'
      }`}
      style={{ animationDuration: '4s' }}
    />
    <div
      className={`absolute top-1/2 right-1/4 w-4 h-16 rounded-full rotate-45 ${
        isDarkMode ? 'bg-gray-700/80' : 'bg-gray-300'
      }`}
    />
  </div>

  {/* Center minimal icon */}
  <div
    className={`relative z-10 flex flex-col items-center gap-3 transition-transform duration-500 hover:scale-105`}
  >
    <div
      className={`w-16 h-16 rounded-2xl border flex items-center justify-center backdrop-blur-md ${
        isDarkMode
          ? 'bg-white/5 border-white/10'
          : 'bg-white/60 border-gray-200'
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-8 h-8 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-12 6h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>

    <span
      className={`text-xs tracking-widest uppercase ${
        isDarkMode ? 'text-gray-500' : 'text-gray-400'
      }`}
    >
      Preview unavailable
    </span>
  </div>
</div>
  )
}

export default PlaceHolder;