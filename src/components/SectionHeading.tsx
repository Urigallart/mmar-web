import clsx from "clsx";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
  light = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={clsx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal y={12}>
          <p className={clsx("eyebrow mb-4", light && "!text-white/80")}>{eyebrow}</p>
        </Reveal>
      )}
      <Reveal y={20} delay={0.05}>
        <h2
          className={clsx("text-balance font-semibold tracking-tight", light ? "text-paper" : "text-ink")}
          style={{ fontSize: "var(--fs-h2)", lineHeight: 1.1 }}
        >
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal y={20} delay={0.12}>
          <p
            className={clsx("mt-5", light ? "text-white/70" : "text-ink-dim")}
            style={{ fontSize: "var(--fs-lede)", lineHeight: 1.55 }}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
