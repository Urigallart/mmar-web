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
                he acompanyat infants, joves i famílies en diferents etapes
                del seu procés educatiu i personal, treballant aspectes
                relacionats amb l&apos;aprenentatge, la motivació,
                l&apos;autonomia i el desenvolupament personal.
                L&apos;esport ha estat també un àmbit molt present en la meva
                trajectòria, donant suport a infants, joves i famílies
                davant els reptes que comporta la pràctica esportiva.
              </p>
            </Reveal>
            <Reveal y={20} delay={0.16}>
              <p>
                Entenc la psicopedagogia i el coaching com dues disciplines
                diferents però complementàries. El meu enfocament parteix
                d&apos;una mirada global de la persona: m&apos;interessa
                conèixer les dificultats que poden aparèixer en
                l&apos;aprenentatge, comprendre com aprèn cada infant o jove
                i identificar les estratègies més adequades, tenint en
                compte també els factors emocionals, socials i personals
                que hi poden influir.
              </p>
            </Reveal>
            <Reveal y={20} delay={0.22}>
              <p>
                Ofereixo una atenció personalitzada i propera, basada en el
                vincle, l&apos;escolta i la creació d&apos;un clima de
                confiança en què cada infant o jove se senti còmode per
                expressar-se i implicar-se en el procés. Busco que
                progressivament prengui consciència de les seves fortaleses
                i necessitats i participi activament en la definició dels
                seus objectius. Quan és necessari, em coordino amb la
                família, l&apos;escola i altres professionals.
              </p>
            </Reveal>
            <Reveal y={20} delay={0.28}>
              <p>
                Fora de l&apos;àmbit professional, l&apos;esport, la
                família, la natura, les relacions personals i continuar
                aprenent formen part important de la meva vida i també de
                la manera com entenc el benestar i l&apos;equilibri.
                M&apos;agrada viure amb curiositat, mantenir-me activa i
                apreciar aquelles petites coses que donen sentit i qualitat
                a la vida.
              </p>
            </Reveal>
          </div>

          <Reveal y={20} delay={0.34}>
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
