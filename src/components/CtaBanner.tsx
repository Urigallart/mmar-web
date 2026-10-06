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
          <div className="dark-surface relative flex flex-col items-start gap-6 overflow-hidden rounded-[calc(var(--radius-card)+8px)] bg-ink px-8 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-12 sm:py-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full opacity-30 blur-3xl"
              style={{ background: "radial-gradient(circle, var(--color-green), transparent 70%)" }}
            />
            <div className="relative max-w-lg">
              <h2 className="font-semibold tracking-tight text-paper" style={{ fontSize: "var(--fs-h3)" }}>
                {title}
              </h2>
              <p className="mt-2.5 text-white/65">{lede}</p>
            </div>
            {onClick ? (
              <button
                type="button"
                onClick={onClick}
                className="btn btn-primary relative flex-shrink-0 !bg-paper !text-ink hover:!bg-green-pale"
              >
                {ctaLabel}
                <span className="btn-arrow bg-ink text-paper">
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
              <Link
                href="/#contacte"
                className="btn btn-primary relative flex-shrink-0 !bg-paper !text-ink hover:!bg-green-pale"
              >
                {ctaLabel}
                <span className="btn-arrow bg-ink text-paper">
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
