import Image from "next/image";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";

export default function AboutSection() {
  return (
    <section id="sobre-mi" className="py-[var(--section-pad)]">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal y={30}>
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[var(--radius-card)] bg-paper-deep">
            <Image
              src="/images/monitor-reflective.png"
              alt="Mª del Mar treballant, reflexiva, al seu despatx"
              fill
              sizes="(min-width: 1024px) 380px, 90vw"
              className="object-cover"
            />
          </div>
          <div className="mt-5 flex items-center gap-3">
            <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-ink text-sm font-bold text-paper">
              M
            </span>
            <div>
              <p className="font-semibold text-ink">Mª del Mar</p>
              <p className="text-sm text-ink-dim">Psicopedagoga i coach</p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal y={16}>
            <p className="eyebrow mb-4">Sobre mi</p>
          </Reveal>
          <Reveal y={24} delay={0.05}>
            <p
              className="font-medium tracking-tight text-balance text-ink"
              style={{ fontSize: "var(--fs-h3)", lineHeight: 1.4 }}
            >
              &ldquo;El meu objectiu és sempre el mateix: que cadascú se senti
              protagonista del seu propi procés d&apos;evolució.&rdquo;
            </p>
          </Reveal>

          <div className="mt-7 flex flex-col gap-6 text-ink-dim" style={{ fontSize: "var(--fs-lede)", lineHeight: 1.6 }}>
            <Reveal y={20} delay={0.1}>
              <p>
                Soc psicopedagoga i coach i, al llarg de la meva trajectòria,
                he acompanyat infants, joves, adults i famílies en processos
                relacionats amb l&apos;aprenentatge, l&apos;autonomia, la
                motivació i el desenvolupament personal.
              </p>
            </Reveal>
            <Reveal y={20} delay={0.16}>
              <p>
                La meva manera de treballar parteix d&apos;una mirada global
                de la persona. M&apos;interessa entendre no només què li
                costa, sinó també com afronta les dificultats, quines
                fortaleses té, què necessita i què vol aconseguir.
              </p>
            </Reveal>
            <Reveal y={20} delay={0.22}>
              <p>
                Treballo de manera personalitzada i propera, i em coordino,
                quan és necessari, amb la família, l&apos;escola i altres
                professionals.
              </p>
            </Reveal>
          </div>

          <Reveal y={20} delay={0.28}>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8 sm:gap-6">
              <Stat value="+15" label="anys d'experiència" />
              <Stat value="2" label="línies d'acompanyament" />
              <Stat value="BCN" label="Sarrià–Sant Gervasi" />
            </div>
          </Reveal>
        </div>
      </Container>

      <Container className="mt-16">
        <Reveal y={30}>
          <div className="relative overflow-hidden rounded-[var(--radius-card)]">
            <Image
              src="/images/collage.png"
              alt="El despatx de la Mª del Mar: espai de treball, materials i sessions d'acompanyament"
              width={1536}
              height={1024}
              sizes="(min-width: 1240px) 1240px, 100vw"
              className="w-full object-cover"
            />
          </div>
          <p className="mt-4 text-sm text-ink-dim">
            El meu espai a Barcelona — pensat perquè cada sessió sigui un lloc
            per parar, escoltar i créixer.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-semibold text-ink" style={{ fontSize: "1.4rem" }}>
        {value}
      </p>
      <p className="mt-1 text-xs leading-snug text-ink-dim">{label}</p>
    </div>
  );
}
