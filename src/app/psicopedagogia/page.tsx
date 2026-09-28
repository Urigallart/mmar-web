import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { CheckList } from "@/components/CheckList";
import { InfoBlockGrid } from "@/components/InfoBlockGrid";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { CtaBanner } from "@/components/CtaBanner";
import { Reveal } from "@/components/Reveal";
import { PhotoBand } from "@/components/PhotoBand";
import { BioSection } from "@/components/BioSection";

export const metadata: Metadata = {
  title: "Intervenció psicopedagògica",
  description:
    "Acompanyament personalitzat per a infants i joves amb dificultats o necessitats relacionades amb l'aprenentatge, l'atenció, l'organització, l'autonomia o la motivació.",
};

const AUDIENCE = [
  "Presenta dificultats en lectura, escriptura, comprensió o matemàtiques.",
  "Estudia i s'esforça, però els resultats no reflecteixen aquest esforç.",
  "Li costa concentrar-se, mantenir l'atenció o controlar la impulsivitat.",
  "Té dificultats per organitzar-se, planificar-se o gestionar el temps.",
  "Necessita constantment un adult que li recordi què ha de fer o l'ajudi a començar i acabar les tasques.",
  "No sap com estudiar o com preparar de manera eficaç un examen, un treball o els deures.",
  "Evita les tasques que li resulten difícils, es bloqueja o es frustra amb facilitat.",
  "Ha perdut motivació o confiança en les seves capacitats.",
  "Necessita adquirir més autonomia i responsabilitat davant els estudis.",
  "Presenta dificultats específiques d'aprenentatge, com dislèxia o discalcúlia, o dificultats d'atenció, amb diagnòstic de TDAH o sense.",
  "Viu situacions personals, socials o escolars que estan interferint en el seu benestar o en el procés d'aprenentatge.",
  "Necessita orientació davant decisions relacionades amb els estudis o el seu itinerari acadèmic.",
];

const WORK_BLOCKS = [
  {
    title: "Aprenentatge i estratègies acadèmiques",
    description:
      "Es treballen les necessitats específiques relacionades amb la lectura, la comprensió, l'expressió escrita, l'ortografia, el càlcul i altres aprenentatges, incorporant tècniques per afrontar de manera més eficaç els deures, l'estudi i la preparació d'exàmens.",
  },
  {
    title: "Organització, planificació i autonomia",
    description:
      "A partir d'eines reals —agenda, llibretes, material, deures, treballs o exàmens— es treballa l'organització, la planificació, la gestió del temps i l'adquisició progressiva d'autonomia i responsabilitat.",
  },
  {
    title: "Atenció i funcions executives",
    description:
      "Es treballen habilitats com l'atenció, la memòria de treball, la planificació, la flexibilitat o la inhibició, per facilitar iniciar i mantenir una tasca, seguir instruccions, anticipar-se i revisar el que s'ha fet.",
  },
  {
    title: "Objectius propis i motivació",
    description:
      "Progressivament, busco que l'infant o jove pugui identificar també què vol millorar i en què considera que necessita ajuda. Quan els objectius tenen sentit per a la persona, augmenten la implicació i la motivació.",
  },
  {
    title: "Autoconeixement i confiança",
    description:
      "S'acompanya l'infant o jove perquè pugui identificar les seves fortaleses i dificultats, entendre millor com aprèn i afrontar les dificultats amb més confiança en les pròpies capacitats.",
  },
  {
    title: "Autoregulació i aspectes emocionals",
    description:
      "Es poden treballar aspectes com la tolerància a la frustració, la inseguretat, la por a equivocar-se o la impulsivitat, quan tenen incidència en el procés d'aprenentatge i en el dia a dia.",
  },
  {
    title: "Àmbit social i relacional",
    description:
      "Les relacions amb els companys, la família i l'entorn també es poden abordar quan tenen incidència en el benestar: comunicació, empatia, límits i resolució de conflictes.",
  },
  {
    title: "Interessos i lleure",
    description:
      "Els interessos, les aficions, l'esport i el temps de lleure aporten informació valuosa sobre les motivacions i capacitats de l'infant, i permeten partir d'allò que ja funciona.",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Primera entrevista amb la família",
    description:
      "Es recull la demanda inicial, la història i la situació actual de l'infant o jove, així com les principals preocupacions, necessitats i expectatives de la família, i la informació prèvia disponible.",
  },
  {
    number: "02",
    title: "Avaluació psicopedagògica",
    description:
      "Permet conèixer les necessitats, dificultats i fortaleses de l'infant o jove, combinant observació, activitats i proves, la informació de la família i, quan sigui convenient, la de l'escola.",
  },
  {
    number: "03",
    title: "Definició del pla de treball",
    description:
      "A partir de la informació recollida es defineixen els objectius prioritaris i les estratègies més adequades, incorporant també els que el mateix infant o jove identifica com a significatius.",
  },
  {
    number: "04",
    title: "Sessions d'intervenció psicopedagògica",
    description:
      "Es treballen els objectius establerts a través d'activitats i situacions adaptades a cada persona, connectant el treball de la sessió amb les necessitats reals del seu dia a dia.",
  },
  {
    number: "05",
    title: "Seguiment amb la família",
    description:
      "Es fan retorns periòdics per compartir l'evolució, revisar objectius i oferir orientacions que ajudin a donar continuïtat al procés des de casa.",
  },
  {
    number: "06",
    title: "Coordinació amb l'escola i altres professionals",
    description:
      "Quan és necessari, es manté coordinació amb tutors, mestres o altres professionals per compartir informació rellevant i afavorir una línia de treball coherent.",
  },
  {
    number: "07",
    title: "Revisió del procés",
    description:
      "Els objectius i les estratègies es revisen periòdicament i s'adapten als progressos i a les noves necessitats que van apareixent.",
  },
];

export default function PsicopedagogiaPage() {
  return (
    <>
      <PageHero
        eyebrow="Línia 2 · Intervenció psicopedagògica"
        title="Intervenció psicopedagògica"
        lede="Un acompanyament personalitzat adreçat a infants i joves que presenten dificultats o necessitats relacionades amb l'aprenentatge, l'atenció, l'organització, l'autonomia, la motivació o l'adaptació a les demandes escolars."
      />

      <section className="pb-[var(--section-pad-sm)]">
        <Container className="max-w-3xl">
          <Reveal y={20}>
            <div className="flex flex-col gap-5 text-ink-dim" style={{ fontSize: "var(--fs-lede)", lineHeight: 1.6 }}>
              <p>
                Va més enllà del reforç acadèmic. No es treballen únicament
                els continguts escolars, sinó també els processos que
                intervenen en l&apos;aprenentatge i aquells factors personals,
                emocionals i socials que poden estar-hi influint.
              </p>
              <p>
                L&apos;objectiu és ajudar cada infant o jove a comprendre
                millor com aprèn, identificar què necessita i què vol
                aconseguir, i desenvolupar estratègies i recursos propis que
                li permetin avançar amb més autonomia i confiança.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <PhotoBand
        src="/images/psicopedagogia-session.png"
        alt="Sessió d'intervenció psicopedagògica amb una infant"
        ratio="16/9"
      />

      <section className="border-y border-border bg-white py-[var(--section-pad)]">
        <Container>
          <SectionHeading
            eyebrow="A qui pot ajudar"
            title="Quan pot ser adequada la intervenció psicopedagògica?"
            lede="Pot ser adequada quan un infant o jove:"
          />
          <div className="mt-10">
            <CheckList items={AUDIENCE} columns={2} />
          </div>
        </Container>
      </section>

      <section className="py-[var(--section-pad)]">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="El punt de partida"
            title="Què treballem a les sessions?"
          />
          <div className="mt-8 flex flex-col gap-5 text-ink-dim" style={{ fontSize: "var(--fs-lede)", lineHeight: 1.6 }}>
            <Reveal y={16}>
              <p>
                El punt de partida és l&apos;avaluació psicopedagògica, que
                permet identificar les necessitats, dificultats i fortaleses
                de l&apos;infant o jove i orientar els objectius inicials de
                treball.
              </p>
            </Reveal>
            <Reveal y={16} delay={0.08}>
              <p>
                A partir d&apos;aquí, la intervenció es va ajustant a
                l&apos;evolució de cada persona i al que va apareixent en el
                seu dia a dia: una dificultat d&apos;aprenentatge,
                l&apos;organització de l&apos;agenda, els deures, un
                conflicte a l&apos;escola o les relacions amb els companys.
              </p>
            </Reveal>
          </div>
          <div className="mt-12">
            <InfoBlockGrid items={WORK_BLOCKS} />
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-white py-[var(--section-pad)]">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Metodologia" title="Com treballo?" />
          <div className="mt-8 flex flex-col gap-5 text-ink-dim" style={{ fontSize: "var(--fs-lede)", lineHeight: 1.6 }}>
            <Reveal y={16}>
              <p>
                Les sessions són personalitzades i s&apos;adapten a
                l&apos;edat, les necessitats, els objectius i el moment de
                cada infant o jove. Podem treballar a partir del mateix
                material escolar i combinar-lo amb activitats de lectura,
                escriptura, raonament, planificació, jocs, reptes, material
                de manipulació o recursos audiovisuals.
              </p>
            </Reveal>
            <Reveal y={16} delay={0.08}>
              <p>
                Busco que l&apos;infant o jove no sigui un receptor passiu de
                l&apos;ajuda, sinó protagonista del seu procés. Per això,
                l&apos;acompanyo perquè pugui definir també els seus
                objectius, comprendre què li passa i descobrir quines
                estratègies li funcionen.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-[var(--section-pad)]">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="El procés"
            title="Com estructurem el procés?"
          />
          <div className="mt-12">
            <ProcessTimeline steps={PROCESS_STEPS} />
          </div>
        </Container>
      </section>

      <BioSection
        image="/images/hero-photo-existing.jpg"
        imageAlt="Mª del Mar, psicopedagoga i coach, al seu despatx"
        paragraphs={[
          "Soc psicopedagoga i coach i, al llarg de la meva trajectòria, he acompanyat infants, joves i famílies en processos relacionats amb l'aprenentatge, l'autonomia, la motivació i el desenvolupament personal.",
          "La meva manera de treballar parteix d'una mirada global de la persona. M'interessa entendre no només què li costa, sinó també com aprèn, com afronta les dificultats, quines fortaleses té, què necessita i què vol aconseguir.",
          "Treballo de manera personalitzada i propera, i em coordino, quan és necessari, amb la família, l'escola i altres professionals.",
        ]}
      />

      <section className="bg-white py-[var(--section-pad-sm)]">
        <Container className="max-w-3xl">
          <Reveal y={20}>
            <p className="eyebrow mb-4">Modalitat</p>
            <div className="flex flex-col gap-3 text-ink-dim" style={{ fontSize: "var(--fs-lede)", lineHeight: 1.6 }}>
              <p>
                Les sessions d&apos;intervenció psicopedagògica amb infants i
                joves es realitzen de manera presencial.
              </p>
              <p>
                Les entrevistes i els seguiments amb les famílies, així com
                les coordinacions amb l&apos;escola o altres professionals,
                poden ser presencials o online segons les necessitats de
                cada cas.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBanner
        title="Parlem de la situació del vostre fill o filla?"
        lede="Si voleu explicar-me breument la vostra situació, podem valorar junts quin tipus d'acompanyament pot ser més adequat."
      />
    </>
  );
}
