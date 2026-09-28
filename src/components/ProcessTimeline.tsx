"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const line = lineRef.current;
    if (!root || !line) return;

    if (prefersReducedMotion()) {
      gsap.set(line, { scaleY: 1 });
      gsap.set(root.querySelectorAll(".process-step, .process-badge"), {
        opacity: 1,
        y: 0,
        scale: 1,
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(line, { scaleY: 0, transformOrigin: "top" });
      gsap.to(line, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      });

      const items = root.querySelectorAll(".process-step");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
        const badge = item.querySelector(".process-badge");
        if (badge) {
          gsap.fromTo(
            badge,
            { scale: 0.6, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              delay: 0.1,
              ease: "back.out(2.2)",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, [steps]);

  return (
    <div ref={rootRef} className="relative">
      <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border sm:left-[23px]" />
      <div
        ref={lineRef}
        className="absolute left-[19px] top-2 bottom-2 w-px bg-green sm:left-[23px]"
      />
      <ol className="flex flex-col gap-12 sm:gap-14">
        {steps.map((step) => (
          <li key={step.number} className="process-step relative flex gap-6 pl-0 sm:gap-8">
            <span className="process-badge relative z-10 grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border border-border-strong bg-paper text-sm font-semibold text-ink sm:h-12 sm:w-12">
              {step.number}
            </span>
            <div className="pt-1 sm:pt-2">
              <h3 className="font-semibold text-ink" style={{ fontSize: "var(--fs-h3)" }}>
                {step.title}
              </h3>
              <p className="mt-2.5 max-w-xl leading-relaxed text-ink-dim">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function refreshTimelines() {
  ScrollTrigger.refresh();
}
