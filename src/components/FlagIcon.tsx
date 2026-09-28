export function FlagIcon({ locale, className }: { locale: string; className?: string }) {
  const common = { viewBox: "0 0 30 20", className, preserveAspectRatio: "xMidYMid slice" };

  if (locale === "ca") {
    return (
      <svg {...common} aria-hidden>
        <rect width="30" height="20" fill="#FCDD09" />
        <rect y="2.2" width="30" height="2.9" fill="#DA121A" />
        <rect y="8.55" width="30" height="2.9" fill="#DA121A" />
        <rect y="14.9" width="30" height="2.9" fill="#DA121A" />
      </svg>
    );
  }

  if (locale === "es") {
    return (
      <svg {...common} aria-hidden>
        <rect width="30" height="20" fill="#AA151B" />
        <rect y="5" width="30" height="10" fill="#F1BF00" />
      </svg>
    );
  }

  return (
    <svg {...common} aria-hidden>
      <rect width="30" height="20" fill="#012169" />
      <path d="M0 0L30 20M30 0L0 20" stroke="#FFF" strokeWidth="3.4" />
      <path d="M0 0L30 20M30 0L0 20" stroke="#C8102E" strokeWidth="1.3" />
      <path d="M15 0V20M0 10H30" stroke="#FFF" strokeWidth="5.5" />
      <path d="M15 0V20M0 10H30" stroke="#C8102E" strokeWidth="2.1" />
    </svg>
  );
}
