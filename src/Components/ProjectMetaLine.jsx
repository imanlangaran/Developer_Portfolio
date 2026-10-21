import { Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatRelativeTime } from "../utils/formatRelativeTime";

/** i18n keys for each `status` value defined in `data.js`. */
const STATUS_LABEL_KEYS = {
  completed: "Completed",
  "in-development": "In Development",
};

/** Dot + label colors per status (identical on card and detail hero). */
const STATUS_STYLES = {
  completed: {
    dot: "bg-emerald-500",
    text: "text-emerald-500",
  },
  "in-development": {
    dot: "bg-amber-500",
    text: "text-amber-500",
  },
};

/** Pulsing clock + bar placeholders sized like the real time tag. */
const TimeSkeleton = ({ isHero, isDarkMode }) => {
  const barColor = isHero
    ? "bg-white/25"
    : isDarkMode
      ? "bg-gray-700"
      : "bg-gray-200";

  return (
    <span
      className="inline-flex items-center gap-1.5"
      aria-hidden="true"
      data-testid="time-skeleton"
    >
      <span className={`w-3 h-3 rounded-full animate-pulse ${barColor}`} />
      <span className={`h-3 w-14 rounded-full animate-pulse ${barColor}`} />
    </span>
  );
};

/**
 * "● Completed · 🕐 2 days ago" meta line, shared by the project card and the
 * project detail hero.
 *
 * The status tag comes from config and renders instantly; the time tag renders
 * the fetched/configured date, or a skeleton while commit dates are loading,
 * or nothing at all when no date is known.
 *
 * @param {object} props
 * @param {import("../utils/data").Project} props.project
 * @param {string|null} [props.commitDate] - Resolved commit date (ISO) or null.
 * @param {boolean} [props.isLoading] - True while commit dates are being fetched.
 * @param {"card"|"hero"} [props.variant] - Compact card style or detail-hero style.
 * @param {boolean} [props.isDarkMode]
 */
const ProjectMetaLine = ({
  project,
  commitDate,
  isLoading = false,
  variant = "card",
  isDarkMode = true,
}) => {
  const { t, i18n } = useTranslation("projects");

  const statusStyle = STATUS_STYLES[project?.status];
  const statusLabel = statusStyle ? t(STATUS_LABEL_KEYS[project.status]) : "";
  const timeLabel = formatRelativeTime(commitDate, i18n.language);
  const hasTime = Boolean(timeLabel);
  const showSkeleton = !hasTime && isLoading;

  if (!statusLabel && !hasTime && !showSkeleton) return null;

  const isHero = variant === "hero";

  return (
    <div
      className={`flex items-center gap-2 ${
        isHero ? "text-sm mt-3" : "text-xs mb-3"
      } ${
        isHero
          ? "text-gray-300" // over the always-dark hero gradient
          : isDarkMode
            ? "text-gray-500"
            : "text-gray-400"
      }`}
    >
      {statusLabel && (
        <span
          className={`inline-flex items-center gap-1.5 font-medium ${statusStyle.text}`}
        >
          <span
            className={`w-2 h-2 rounded-full ${statusStyle.dot}`}
            aria-hidden="true"
          />
          {statusLabel}
        </span>
      )}

      {statusLabel && (hasTime || showSkeleton) && (
        <span className="opacity-40" aria-hidden="true">
          ·
        </span>
      )}

      {hasTime && (
        <span className="inline-flex items-center gap-1.5">
          <Clock size={isHero ? 14 : 12} className="shrink-0" aria-hidden="true" />
          {timeLabel}
        </span>
      )}

      {showSkeleton && (
        <TimeSkeleton isHero={isHero} isDarkMode={isDarkMode} />
      )}
    </div>
  );
};

export default ProjectMetaLine;
