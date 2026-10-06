"use client";

import { useLayoutEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    document.querySelector("main")?.classList.remove("page-leaving");
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

  return <div className="page-enter">{children}</div>;
}
