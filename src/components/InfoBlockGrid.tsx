import { Reveal } from "./Reveal";

export type InfoBlock = {
  title: string;
  description: string;
};

export function InfoBlockGrid({ items }: { items: InfoBlock[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {items.map((item, i) => (
        <Reveal key={item.title} delay={(i % 2) * 0.08} y={24}>
          <div className="card-hover h-full rounded-2xl border border-border bg-white p-6 hover:border-border-strong hover:shadow-[0_20px_40px_-24px_rgba(32,43,40,0.25)] sm:p-7">
            <h3 className="font-semibold text-ink" style={{ fontSize: "1.05rem" }}>
              {item.title}
            </h3>
            <p className="mt-2.5 leading-relaxed text-ink-dim">{item.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
