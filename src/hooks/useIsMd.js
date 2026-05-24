import { useEffect, useState } from "react";

export function useIsMd() {
  const [isMd, setIsMd] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const onResize = () => {
      setIsMd(window.innerWidth >= 768);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return isMd;
}