import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const handleContactClick = () => {
    navigate("/", { state: { scrollTo: "contact" } });
  };

  return (
    <motion.div  
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${
        isDarkMode
          ? "bg-[#060816] text-white"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-slate-900"
      }`}
    >
      {/* Background glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute bottom-10 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-30 ${
          isDarkMode ? "bg-blue-500" : "bg-blue-400"
        }`}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-10 right-1/3 w-48 h-48 rounded-full blur-3xl opacity-30 ${
          isDarkMode ? "bg-purple-500" : "bg-purple-400"
        }`}
      />
      <motion.div
        animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-1/3 left-10 w-32 h-32 rounded-full blur-3xl opacity-20 ${
          isDarkMode ? "bg-cyan-400" : "bg-cyan-300"
        }`}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 0, x: 0 }}
            animate={{
              opacity: [0.15, 0.6, 0.15],
              y: [0, -40 - i * 3, 0],
              x: [0, i % 2 === 0 ? 10 : -10, 0],
            }}
            transition={{
              duration: 6 + (i % 5),
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
            className={`absolute rounded-full ${
              isDarkMode ? "bg-white" : "bg-slate-700"
            }`}
            style={{
              width: `${3 + (i % 4)}px`,
              height: `${3 + (i % 4)}px`,
              top: `${10 + (i * 5) % 80}%`,
              left: `${5 + (i * 7) % 90}%`,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          {/* 404 block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 2, -2, 0], y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className={`text-[6rem] sm:text-[8rem] md:text-[10rem] font-black leading-none tracking-tighter ${
                isDarkMode
                  ? "text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]"
                  : "text-slate-900 drop-shadow-[0_0_20px_rgba(30,41,59,0.12)]"
              }`}
            >
              404
            </motion.div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className={`absolute inset-0 -z-10 mx-auto my-auto h-44 w-44 sm:h-56 sm:w-56 rounded-full border border-dashed ${
                isDarkMode ? "border-white/20" : "border-slate-400/25"
              }`}
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            {/* You&apos;ve drifted off the map */}
            {i18n.t('404 header')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className={`mt-5 max-w-2xl text-sm sm:text-lg leading-7 ${
              isDarkMode ? "text-white/70" : "text-slate-600"
            }`}
          >
            {i18n.t("404 desc")}
          </motion.p>

          {/* Decorative route line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className={`mt-10 h-[2px] w-40 origin-center rounded-full ${
              isDarkMode
                ? "bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                : "bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            }`}
          />

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="/"
                className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm sm:text-base font-semibold shadow-lg transition-all duration-300 ${
                  isDarkMode
                    ? "bg-white text-slate-900 hover:bg-blue-100 shadow-white/10"
                    : "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/10"
                }`}
              >
                <span>←</span>
                {i18n.t("404 Back to Home")}
              </Link>
            </motion.div>

            <motion.button
              type="button"
              onClick={handleContactClick}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm sm:text-base font-semibold border transition-all duration-300 ${
                isDarkMode
                  ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
                  : "border-slate-300 bg-white/70 text-slate-900 hover:bg-white shadow-sm"
              }`}
            >
              {i18n.t("404 Report issue")}
            </motion.button>
          </motion.div>

          {/* Mini animated hint card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            whileHover={{ y: -4 }}
            className={`mt-14 max-w-xl rounded-3xl border p-6 backdrop-blur-xl shadow-2xl ${
              isDarkMode
                ? "border-white/10 bg-white/5 text-white/80"
                : "border-white/60 bg-white/70 text-slate-700"
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className={`h-3 w-3 rounded-full ${
                  isDarkMode ? "bg-cyan-400" : "bg-blue-500"
                }`}
              />
              <p className="text-sm sm:text-base">
                {i18n.t("404 Tip")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* subtle vignette */}
      <div
        className={`pointer-events-none absolute inset-0 ${
          isDarkMode
            ? "bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.45)_100%)]"
            : "bg-[radial-gradient(circle_at_center,transparent_20%,rgba(255,255,255,0.4)_100%)]"
        }`}
      />
    </motion.div>
  );
};

export default NotFound;
