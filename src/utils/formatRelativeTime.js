/**
 * Formatters are expensive-ish to create and cheap to reuse.
 * Keyed by normalized locale tag (e.g. "en", "fa").
 */
const formatterCache = new Map();

const getFormatter = (locale, numeric) => {
  const key = `${(locale || "en").toLowerCase()}:${numeric}`;
  if (!formatterCache.has(key)) {
    try {
      formatterCache.set(
        key,
        new Intl.RelativeTimeFormat(key.split(":")[0], { numeric })
      );
    } catch {
      // Unknown/unsupported locale → fall back to English.
      formatterCache.set(
        key,
        new Intl.RelativeTimeFormat("en", { numeric })
      );
    }
  }
  return formatterCache.get(key);
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const DAYS_PER_MONTH = 30.44;
const DAYS_PER_YEAR = 365;

/**
 * Formats a date as an approximate relative time ("today", "1 day ago",
 * "2 days ago", "1 month ago", "1 year ago"), localized via
 * `Intl.RelativeTimeFormat` (correct output for both `en` and `fa`).
 *
 * @param {string|number|Date|null|undefined} dateInput - Commit date (ISO string, timestamp, or Date).
 * @param {string} [locale] - BCP-47 locale tag (i18n language code works as-is).
 * @returns {string} Relative time, or an empty string when the date is missing/invalid.
 */
export const formatRelativeTime = (dateInput, locale = "en") => {
  if (!dateInput) return "";

  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (Number.isNaN(date.getTime())) return "";

  // Negative diff (future date / clock skew) is treated as "today".
  const days = Math.max(0, Math.floor((Date.now() - date.getTime()) / MS_PER_DAY));

  if (days === 0) {
    // "numeric: always" would render "0 days ago" — "auto" gives "today".
    return getFormatter(locale, "auto").format(0, "day");
  }

  const formatter = getFormatter(locale, "always");
  if (days < 30) return formatter.format(-days, "day"); // 1 day ago / 2 days ago
  if (days < DAYS_PER_YEAR) {
    const months = Math.max(1, Math.round(days / DAYS_PER_MONTH));
    return formatter.format(-months, "month"); // 1 month ago / 6 months ago
  }

  const years = Math.max(1, Math.floor(days / DAYS_PER_YEAR));
  return formatter.format(-years, "year"); // 1 year ago / 2 years ago
};

export default formatRelativeTime;
