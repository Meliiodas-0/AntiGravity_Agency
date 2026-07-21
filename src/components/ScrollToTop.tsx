import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Reset scroll to the top on every route change so legal pages open at the top
// rather than inheriting the home page's scroll position.
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
