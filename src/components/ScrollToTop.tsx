import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll position to the top on every route change.
 * Without this, navigating (client-side) to a new page keeps whatever
 * scroll position the previous page was left at.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) target.scrollIntoView({ behavior: "instant" });
    } else window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
