import Link from "next/link";
import { Container } from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-paper-deep">
      <Container className="flex flex-col gap-10 py-14 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <Link href="/" className="flex items-center gap-2 text-[0.95rem] font-semibold text-ink">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-[0.8rem] font-bold text-paper">
              M
            </span>
            Mª del Mar
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-ink-dim">
            Psicopedagoga i coach. Consulta presencial a Barcelona, zona
            Sarrià–Sant Gervasi, i acompanyament online.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://www.instagram.com/mmar_coach"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center rounded-full border border-border-strong text-ink-dim transition-colors duration-300 hover:border-ink hover:text-ink"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="4.3" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.3" cy="6.7" r="1.15" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/m%C2%AA-del-mar-serracanta-8008929a"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid h-9 w-9 place-items-center rounded-full border border-border-strong text-ink-dim transition-colors duration-300 hover:border-ink hover:text-ink"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="2.5" y="2.5" width="19" height="19" rx="4" stroke="currentColor" strokeWidth="1.6" />
                <path d="M7.5 10.5V17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="7.5" cy="7.2" r="1" fill="currentColor" />
                <path
                  d="M11.2 17V13.4c0-1.4.9-2.4 2.2-2.4s2.1 1 2.1 2.4V17"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm sm:flex sm:gap-16">
          <div className="flex flex-col gap-3">
            <span className="eyebrow mb-1">Acompanyament</span>
            <Link href="/coaching" className="text-ink-dim transition-colors hover:text-ink">
              Coaching
            </Link>
            <Link href="/psicopedagogia" className="text-ink-dim transition-colors hover:text-ink">
              Psicopedagogia
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="eyebrow mb-1">Web</span>
            <Link href="/#sobre-mi" className="text-ink-dim transition-colors hover:text-ink">
              Sobre mi
            </Link>
            <Link href="/#contacte" className="text-ink-dim transition-colors hover:text-ink">
              Contacte
            </Link>
          </div>
        </nav>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-border py-6 text-xs text-ink-dim/80 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Mª del Mar. Tots els drets reservats.</p>
        <p>Barcelona · Presencial i online</p>
      </Container>
    </footer>
  );
}
