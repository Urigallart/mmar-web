import clsx from "clsx";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
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
          <p className="eyebrow mb-4">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal y={20} delay={0.05}>
        <h2
          className="text-balance font-semibold tracking-tight text-ink"
          style={{ fontSize: "var(--fs-h2)", lineHeight: 1.1 }}
        >
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal y={20} delay={0.12}>
          <p
            className="mt-5 text-ink-dim"
            style={{ fontSize: "var(--fs-lede)", lineHeight: 1.55 }}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
