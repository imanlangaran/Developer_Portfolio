import { useEffect, useState } from "react";

// How close (in px) to the end of the scroll range still counts as "at the
// bottom", so the button does not need a pixel-perfect stop to expand.
const BOTTOM_THRESHOLD = 48;

// Reads the two flags the ScrollToTopButton cares about. `element === null`
// means "the window/document", which is what the main page scrolls; otherwise
// the element is the scrollable container (the ProjectDetail modal content).
const readScrollState = (element) => {
  const isWindow = element === null;

  const scrollTop = isWindow
    ? Math.max(window.scrollY || document.documentElement.scrollTop || 0, 0)
    : Math.max(element.scrollTop, 0);

  const viewport = isWindow ? window.innerHeight : element.clientHeight;

  const content = isWindow
    ? Math.max(
        document.documentElement.scrollHeight,
        document.body ? document.body.scrollHeight : 0,
      )
    : element.scrollHeight;

  const maxScroll = Math.max(content - viewport, 0);

  return {
    // Only show once the user actually left the top of the page.
    isVisible: scrollTop > 0,
    // A page that cannot scroll is never "at the bottom" (it is at the top).
    isAtBottom: maxScroll > 0 && scrollTop + BOTTOM_THRESHOLD >= maxScroll,
  };
};

/**
 * Tracks whether a scroll target has been scrolled away from the top and
 * whether it has reached the bottom of its scroll range.
 *
 * @param {React.RefObject<HTMLElement|null>} [containerRef] Scroll container.
 *   When omitted the window/document is tracked instead (main page).
 * @returns {{isVisible: boolean, isAtBottom: boolean}}
 */
export default function useScrollPosition(containerRef) {
  const [state, setState] = useState(() =>
    containerRef ? { isVisible: false, isAtBottom: false } : readScrollState(null),
  );

  useEffect(() => {
    const element = containerRef ? containerRef.current : null;

    // The container ref is not attached yet (ProjectDetail renders the button
    // as a sibling of the scrollable div); there is nothing to listen to.
    if (containerRef && !element) return undefined;

    // Recompute, but bail out of re-rendering when neither flag changed -
    // scroll events fire far more often than the state actually flips.
    const update = () =>
      setState((previous) => {
        const next = readScrollState(element);
        return previous.isVisible === next.isVisible &&
          previous.isAtBottom === next.isAtBottom
          ? previous
          : next;
      });

    update();

    const scrollTarget = element || window;
    scrollTarget.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    // Content can grow after mount (the project README loads asynchronously),
    // which moves the bottom of the page without any scroll event firing.
    let observer;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(update);
      if (element) {
        observer.observe(element);
        Array.from(element.children).forEach((child) => observer.observe(child));
      } else {
        observer.observe(document.documentElement);
      }
    }

    return () => {
      scrollTarget.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (observer) observer.disconnect();
    };
  }, [containerRef]);

  return state;
}
