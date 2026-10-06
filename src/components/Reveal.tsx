"use client";

import { useRef, useEffect, ElementType } from "react";

type RevealProps = {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  start?: string;
};

const SHOW_MS = 450;

// Hides an element only if it starts below the fold, then fades it in once as it nears the
// viewport. Never reverses, and a scroll check backs up IntersectionObserver so content can't
// get stuck hidden.
function useRevealOnce<T extends HTMLElement>(targets: (root: T) => HTMLElement[], delay: number, y: number) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = targets(root);
    if (items.length === 0) return;

    const nearViewport = () => root.getBoundingClientRect().top < window.innerHeight * 1.3;
    if (nearViewport()) return;

    items.forEach((item, i) => {
      item.style.opacity = "0";
      item.style.transform = `translateY(${Math.min(y, 20)}px)`;
      item.dataset.revealIndex = String(i);
    });

    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      items.forEach((item, i) => {
        const wait = Math.min(delay + i * 0.08, 0.4);
        item.style.transition = `opacity ${SHOW_MS}ms ease-out ${wait}s, transform ${SHOW_MS}ms ease-out ${wait}s`;
        item.style.opacity = "1";
        item.style.transform = "none";
        window.setTimeout(() => {
          item.style.transition = "";
          item.style.transform = "";
          item.style.opacity = "";
        }, (wait * 1000) + SHOW_MS + 60);
      });
    };
    const onScroll = () => {
      if (nearViewport()) show();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) show();
      },
      { rootMargin: "0px 0px 15% 0px", threshold: 0 }
    );
    observer.observe(root);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      items.forEach((item) => {
        item.style.opacity = "";
        item.style.transform = "";
        item.style.transition = "";
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, y]);

  return ref;
}

export function Reveal({ children, as: Tag = "div", className, delay = 0, y = 32 }: RevealProps) {
  const ref = useRevealOnce<HTMLElement>((root) => [root], delay, y);
  const Component = Tag as ElementType;
  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}

type RevealGroupProps = {
  children: React.ReactNode;
  className?: string;
  itemSelector?: string;
  stagger?: number;
  y?: number;
  start?: string;
};

export function RevealGroup({ children, className, itemSelector = ":scope > *", y = 28 }: RevealGroupProps) {
  const ref = useRevealOnce<HTMLDivElement>(
    (root) => Array.from(root.querySelectorAll<HTMLElement>(itemSelector)),
    0,
    y
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
