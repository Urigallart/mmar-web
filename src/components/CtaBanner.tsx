import { Link } from "@/i18n/navigation";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

export function CtaBanner({
  title,
  lede,
  ctaLabel,
  onClick,
}: {
  title: string;
  lede: string;
  ctaLabel: string;
  onClick?: () => void;
}) {
  return (
    <section className="py-[var(--section-pad-sm)]">
      <Container>
        <Reveal y={24}>
          <div className="flex flex-col items-start gap-6 rounded-[var(--radius-card)] border border-border bg-white px-8 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-12 sm:py-12">
            <div className="max-w-lg">
              <h2 className="font-semibold tracking-tight text-ink" style={{ fontSize: "var(--fs-h3)" }}>
                {title}
              </h2>
              <p className="mt-2.5 text-ink-dim">{lede}</p>
            </div>
            {onClick ? (
              <button type="button" onClick={onClick} className="btn btn-primary flex-shrink-0">
                {ctaLabel}
                <span className="btn-arrow bg-paper text-ink">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            ) : (
              <Link href="/#contacte" className="btn btn-primary flex-shrink-0">
                {ctaLabel}
                <span className="btn-arrow bg-paper text-ink">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
