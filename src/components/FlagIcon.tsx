export function FlagIcon({ locale, className }: { locale: string; className?: string }) {
  const common = { width: 20, height: 14, viewBox: "0 0 20 14", className };

  if (locale === "ca") {
    return (
      <svg {...common} aria-hidden>
        <rect width="20" height="14" fill="#FCDD09" />
        {[0, 2, 4, 6, 8].map((y) => (
          <rect key={y} y={y + 1.5} width="20" height="1.5" fill="#DA121A" />
        ))}
      </svg>
    );
  }

  if (locale === "es") {
    return (
      <svg {...common} aria-hidden>
        <rect width="20" height="14" fill="#AA151B" />
        <rect y="3.5" width="20" height="7" fill="#F1BF00" />
      </svg>
    );
  }

  return (
    <svg {...common} aria-hidden>
      <rect width="20" height="14" fill="#012169" />
      <path d="M0 0L20 14M20 0L0 14" stroke="#FFF" strokeWidth="2.4" />
      <path d="M0 0L20 14M20 0L0 14" stroke="#C8102E" strokeWidth="0.9" />
      <path d="M10 0V14M0 7H20" stroke="#FFF" strokeWidth="4" />
      <path d="M10 0V14M0 7H20" stroke="#C8102E" strokeWidth="1.6" />
    </svg>
  );
}
