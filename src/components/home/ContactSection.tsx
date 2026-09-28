import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";

export default function ContactSection() {
  return (
    <section id="contacte" className="py-[var(--section-pad)]">
      <Container>
        <div className="relative overflow-hidden rounded-[calc(var(--radius-card)+8px)] bg-ink px-8 py-16 sm:px-16 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--color-green), transparent 70%)" }}
          />
          <div className="relative grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <Reveal y={28}>
              <p className="eyebrow mb-5" style={{ color: "var(--color-green-pale)" }}>
                Parlem-ne
              </p>
              <h2
                className="text-balance font-semibold tracking-tight text-paper"
                style={{ fontSize: "var(--fs-h2)", lineHeight: 1.15 }}
              >
                Vols explicar-me què t&apos;està passant?
              </h2>
              <p className="mt-5 max-w-lg text-white/65" style={{ fontSize: "var(--fs-lede)" }}>
                Si no tens clar si necessites iniciar un procés o simplement
                fer una consulta puntual, podem valorar junts quin format
                encaixa millor amb la teva situació.
              </p>
              <a
                href="https://www.instagram.com/mmar_coach"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-8 !bg-paper !text-ink hover:!bg-green-pale"
              >
                Escriu per Instagram
              </a>
            </Reveal>

            <Reveal y={28} delay={0.1}>
              <div className="flex flex-col gap-5 border-t border-white/15 pt-8 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
                <ContactRow label="Ubicació" value="Barcelona · Sarrià–Sant Gervasi" />
                <ContactRow label="Modalitat" value="Presencial i online" />
                <ContactRow label="Telèfon / WhatsApp" value="Pendent de confirmar" muted />
                <ContactRow label="Correu electrònic" value="Pendent de confirmar" muted />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ContactRow({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 text-sm">
      <span className="text-white/50">{label}</span>
      <span className={muted ? "text-white/40 italic" : "font-medium text-paper"}>{value}</span>
    </div>
  );
}
