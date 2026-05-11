
const PlaceHolder3 = ({isDarkMode}) => { 

  return (
<div
  className={`relative w-full h-full overflow-hidden ${
    isDarkMode
      ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950'
      : 'bg-gradient-to-br from-slate-100 via-white to-slate-200'
  }`}
>
  {/* Animated background glow */}
  <div className="absolute inset-0">
    <div
      className={`absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-20 animate-pulse ${
        isDarkMode ? 'bg-cyan-500' : 'bg-blue-400'
      }`}
    />
    <div
      className={`absolute bottom-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 animate-pulse delay-700 ${
        isDarkMode ? 'bg-violet-500' : 'bg-indigo-400'
      }`}
    />
  </div>

  {/* Floating grid */}
  <div
    className={`absolute inset-0 opacity-[0.07] ${
      isDarkMode ? 'bg-white' : 'bg-black'
    }`}
    style={{
      backgroundImage: `
        linear-gradient(to right, currentColor 1px, transparent 1px),
        linear-gradient(to bottom, currentColor 1px, transparent 1px)
      `,
      backgroundSize: '24px 24px',
    }}
  />

  {/* Main content */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full p-6">
    
    {/* Animated terminal window */}
    <div
      className={`w-full max-w-[220px] rounded-2xl border shadow-2xl backdrop-blur-md overflow-hidden transform transition-transform duration-700 group-hover:scale-105 ${
        isDarkMode
          ? 'bg-gray-900/80 border-gray-700'
          : 'bg-white/80 border-gray-300'
      }`}
    >
      {/* Terminal top bar */}
      <div
        className={`flex items-center gap-2 px-4 py-3 border-b ${
          isDarkMode
            ? 'border-gray-700 bg-gray-950/60'
            : 'border-gray-200 bg-slate-100/80'
        }`}
      >
        <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse" />
        <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse delay-150" />
        <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse delay-300" />
      </div>

      {/* Fake code */}
      <div className="p-4 space-y-3">
        <div
          className={`h-2 rounded-full animate-pulse ${
            isDarkMode ? 'bg-cyan-400/60' : 'bg-blue-500/50'
          } w-3/4`}
        />
        <div
          className={`h-2 rounded-full animate-pulse delay-150 ${
            isDarkMode ? 'bg-violet-400/60' : 'bg-indigo-500/50'
          } w-1/2`}
        />
        <div
          className={`h-2 rounded-full animate-pulse delay-300 ${
            isDarkMode ? 'bg-emerald-400/60' : 'bg-emerald-500/50'
          } w-5/6`}
        />
        <div
          className={`h-2 rounded-full animate-pulse delay-500 ${
            isDarkMode ? 'bg-pink-400/60' : 'bg-pink-500/50'
          } w-2/3`}
        />

        {/* Blinking cursor */}
        <div className="flex items-center gap-2 pt-2">
          <span
            className={`text-xs font-mono ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            dev@project:~
          </span>

          <div
            className={`w-2 h-4 rounded-sm animate-pulse ${
              isDarkMode ? 'bg-cyan-400' : 'bg-blue-500'
            }`}
          />
        </div>
      </div>
    </div>

    {/* Floating tech nodes */}
    <div className="absolute inset-0 pointer-events-none">
      {[
        'API',
        'DB',
        'AUTH',
        'CLI',
        'WS',
        'AI',
      ].map((tag, i) => (
        <div
          key={tag}
          className={`absolute text-[10px] px-2 py-1 rounded-full border backdrop-blur-md animate-bounce ${
            isDarkMode
              ? 'bg-gray-800/70 border-gray-700 text-gray-300'
              : 'bg-white/70 border-gray-300 text-gray-700'
          }`}
          style={{
            top: `${15 + i * 10}%`,
            left: `${i % 2 === 0 ? 10 : 70}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${3 + i * 0.4}s`,
          }}
        >
          {tag}
        </div>
      ))}
    </div>

    {/* Bottom text */}
    <div className="mt-6 text-center">
      <p
        className={`text-sm font-semibold tracking-wide ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}
      >
        Software Architecture
      </p>

      <p
        className={`text-xs mt-1 ${
          isDarkMode ? 'text-gray-500' : 'text-gray-500'
        }`}
      >
        Backend • Systems • Infrastructure
      </p>
    </div>
  </div>

  {/* Hover shine */}
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
    <div
      className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-[shine_2s_linear_infinite]"
    />
  </div>
</div>
  )
}

export default PlaceHolder3;