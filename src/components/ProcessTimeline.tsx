export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="relative">
      <div className="absolute left-[19px] top-2 bottom-2 w-px bg-green/60 sm:left-[23px]" />
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

