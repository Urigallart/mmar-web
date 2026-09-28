import clsx from "clsx";
import { RevealGroup } from "./Reveal";

export function CheckList({
  items,
  columns = 1,
  className,
}: {
  items: React.ReactNode[];
  columns?: 1 | 2;
  className?: string;
}) {
  return (
    <RevealGroup
      className={clsx(
        "grid gap-x-8 gap-y-4",
        columns === 2 && "sm:grid-cols-2",
        className
      )}
      stagger={0.06}
      y={16}
    >
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-3.5">
          <svg
            className="mt-[5px] h-4 w-4 flex-shrink-0 text-green-deep"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M4 10.5L8 14.5L16 5.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="leading-relaxed text-ink-dim">{item}</p>
        </div>
      ))}
    </RevealGroup>
  );
}
