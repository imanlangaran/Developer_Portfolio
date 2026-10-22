import { useTranslation } from "react-i18next";

/**
 * Loading skeleton matching heading, paragraph lines, and code block layout
 * to approximate README markdown rhythm while preventing layout shifts.
 */
const ReadmeSkeleton = ({ isDarkMode = true }) => {
  const { t } = useTranslation("projects");
  const barClass = isDarkMode ? "bg-gray-700" : "bg-gray-200";

  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      data-testid="readme-skeleton"
    >
      <span className="sr-only">{t("Loading README...")}</span>

      <div
        aria-hidden="true"
        className="space-y-3 animate-pulse motion-reduce:animate-none"
      >
        <div className={`h-7 w-1/2 rounded ${barClass}`} />
        <div className={`h-4 w-full rounded ${barClass}`} />
        <div className={`h-4 w-11/12 rounded ${barClass}`} />
        <div className={`h-4 w-4/5 rounded ${barClass}`} />
        <div className={`h-4 w-full rounded ${barClass}`} />
        <div className={`h-4 w-2/3 rounded ${barClass}`} />
        <div className={`h-4 w-5/6 rounded ${barClass}`} />
        <div className={`h-24 w-full rounded-lg ${barClass}`} />
      </div>
    </div>
  );
};

export default ReadmeSkeleton;
