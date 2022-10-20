import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollTop({ children }) {
  const { pathname } = useLocation();

  // console.log(`scroll to top`)

  useEffect(() => {
    console.log(`scroll to top`);
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
}

export default ScrollTop;
