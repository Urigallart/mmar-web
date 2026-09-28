import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { CheckList } from "@/components/CheckList";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { CtaBanner } from "@/components/CtaBanner";
import { Reveal } from "@/components/Reveal";
import { PhotoBand } from "@/components/PhotoBand";

export const metadata: Metadata = {
  title: "Coaching i consultes puntuals",
  description:
    "Coaching personal i consultes puntuals per a joves, adults, professionals, esportistes, mares i pares que volen guanyar claredat, seguretat i benestar.",
};

const SITUATIONS = [
  "Estar davant d'una decisió important i sentir que, com més hi penses, menys clar tens què fer.",
  "Assumir un nou repte o més responsabilitats i començar a dubtar de les pròpies capacitats.",
  "Sentir que has arribat a un punt en què necessites replantejar prioritats, però no saber per on començar.",
  "Tenir dificultats per posar límits o expressar el que necessites en determinades relacions.",
  "Viure amb molta exigència, pressió o expectatives i notar que això comença a afectar la confiança o el benestar.",
  "Haver de decidir cap on orientar el futur acadèmic o professional i sentir-se insegur davant de les diferents opcions.",
  "Estar preocupat per una situació familiar i necessitar prendre distància per poder veure-la amb més perspectiva.",
  "Sentir-se bloquejat, desmotivat o insatisfet sense tenir gaire clar què és exactament el que no funciona.",
  "Tenir molts fronts oberts i necessitar ordenar prioritats per recuperar sensació de control i equilibri.",
];

const WORK_AREAS = [
  "Autoconeixement i presa de consciència.",
  "Gestió emocional i benestar personal.",
  "Confiança, autoestima i seguretat en un mateix.",
  "Comunicació i assertivitat.",
  "Relacions personals, familiars o professionals.",
  "Presa de decisions i definició d'objectius.",
  "Canvis personals, acadèmics o professionals.",
  "Organització i gestió de prioritats.",
  "Equilibri entre els diferents àmbits de la vida.",
  "Motivació i gestió de la pressió.",
  "Desenvolupament de recursos personals davant de situacions difícils.",
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Comprendre on ets",
    description:
      "En les primeres sessions explorem què està passant, què t'ha portat fins aquí i què voldries que fos diferent. Identifiquem necessitats, fortaleses, dificultats i possibles objectius de treball.",
  },
  {
    number: "02",
    title: "Definir cap on vols anar",
    description:
      "A partir d'aquí anem concretant objectius i possibles canvis: prendre una decisió que portes temps ajornant, aprendre a posar límits, afrontar un nou repte professional, recuperar confiança o reorganitzar prioritats.",
  },
  {
    number: "03",
    title: "Passar de la reflexió a l'acció",
    description:
      "Durant el procés anem introduint accions, noves estratègies i formes diferents d'afrontar les situacions, perquè el que es treballa a les sessions es traslladi progressivament al dia a dia.",
  },
  {
    number: "04",
    title: "Consolidar",
    description:
      "En la fase final revisem el camí fet, els canvis assolits i els recursos que has anat adquirint, perquè aquests aprenentatges quedin integrats i puguis continuar avançant amb autonomia.",
  },
];

export default function CoachingPage() {
  return (
    <>
      <PageHero
        eyebrow="Línia 1 · Coaching i consultes puntuals"
        title="Coaching personal i consultes puntuals"
        lede="El coaching ofereix un espai de reflexió i acompanyament per entendre millor com et sents, com estàs vivint una situació, identificar què necessites i avançar cap a més claredat, seguretat i benestar."
      />

      <section className="pb-[var(--section-pad-sm)]">
        <Container className="max-w-3xl">
          <Reveal y={20}>
            <div className="flex flex-col gap-5 text-ink-dim" style={{ fontSize: "var(--fs-lede)", lineHeight: 1.6 }}>
              <p>
                Hi ha moments en què necessitem parar, ordenar el que ens
                està passant i mirar una situació amb una mica més de
                perspectiva. Potser tens una decisió important al davant,
                estàs vivint una etapa de canvi, et costa saber què vols o
                simplement notes que alguna cosa no acaba de funcionar com
                voldries.
              </p>
              <p>
                L&apos;acompanyament es pot fer a través d&apos;un procés de
                diverses sessions o bé mitjançant consultes puntuals, segons
                el moment i les necessitats de cada persona.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <PhotoBand
        src="/images/group-session.png"
        alt="Sessió d'acompanyament amb la Mª del Mar"
        ratio="16/9"
      />

      <section className="border-y border-border bg-white py-[var(--section-pad)]">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="A qui va adreçat"
            title="Quan et pot ajudar un procés de coaching?"
          />
          <div className="mt-8 flex flex-col gap-5 text-ink-dim" style={{ fontSize: "var(--fs-lede)", lineHeight: 1.6 }}>
            <Reveal y={16}>
              <p>
                Treballo amb joves i adults que volen entendre millor una
                situació, prendre decisions, afrontar nous reptes o generar
                canvis en algun àmbit de la seva vida.
              </p>
            </Reveal>
            <Reveal y={16} delay={0.08}>
              <p>
                Al llarg dels anys he acompanyat especialment estudiants i
                joves, professionals, esportistes, mares i pares, així com
                persones que necessiten recuperar claredat, confiança o
                direcció en un moment determinat.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-[var(--section-pad)]">
        <Container>
          <SectionHeading
            eyebrow="Et sona familiar?"
            title="Situacions que em trobo sovint"
            lede="Més enllà del perfil o del moment vital de cada persona, hi ha situacions que al llarg dels anys he anat trobant de manera recurrent."
          />
          <div className="mt-10">
            <CheckList items={SITUATIONS} columns={2} />
          </div>
          <Reveal y={16} delay={0.1}>
            <p className="mt-10 max-w-2xl border-l-2 border-green-deep/30 pl-5 italic text-ink-dim">
              No cal arribar amb l&apos;objectiu perfectament definit. A
              vegades, el primer pas del procés és precisament entendre què
              està passant, què necessites i què voldries que fos diferent.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-y border-border bg-white py-[var(--section-pad)]">
        <Container>
          <SectionHeading
            eyebrow="Àmbits de treball"
            title="Com et pot ajudar un procés de coaching?"
            lede="Cada procés és diferent i s'adapta a la situació i a les necessitats de cada persona. Alguns dels àmbits que podem treballar són:"
          />
          <div className="mt-10">
            <CheckList items={WORK_AREAS} columns={2} />
          </div>
        </Container>
      </section>

      <section className="py-[var(--section-pad)]">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="El procés"
            title="Com t'acompanyem"
            lede="No hi ha dos processos iguals. El ritme, la durada i els objectius s'adapten sempre a cada persona."
          />
          <div className="mt-12">
            <ProcessTimeline steps={PROCESS_STEPS} />
          </div>
        </Container>
      </section>

      <section className="py-[var(--section-pad-sm)]">
        <Container className="grid gap-6 sm:grid-cols-2">
          <Reveal y={24}>
            <div className="h-full rounded-2xl border border-border bg-white p-7 sm:p-8">
              <h3 className="font-semibold text-ink" style={{ fontSize: "var(--fs-h3)" }}>
                Consultes puntuals
              </h3>
              <p className="mt-3 leading-relaxed text-ink-dim">
                No sempre és necessari iniciar un procés de diverses
                sessions. També ofereixo consultes puntuals per a persones
                que necessiten treballar una situació concreta, prendre una
                decisió, ordenar idees o disposar d&apos;un espai professional
                de reflexió i orientació. Una o poques sessions poden ser
                suficients quan hi ha una necessitat específica i ben
                delimitada.
              </p>
            </div>
          </Reveal>
          <Reveal y={24} delay={0.1}>
            <div className="h-full rounded-2xl border border-border bg-white p-7 sm:p-8">
              <h3 className="font-semibold text-ink" style={{ fontSize: "var(--fs-h3)" }}>
                Coaching i psicologia
              </h3>
              <p className="mt-3 leading-relaxed text-ink-dim">
                El coaching està orientat principalment al present i al
                futur, al desenvolupament de recursos i la consecució de
                canvis o objectius. No substitueix un procés psicològic o
                terapèutic quan aquest és necessari. Si durant
                l&apos;acompanyament considero que la necessitat de la
                persona requereix una intervenció psicològica o d&apos;un
                altre professional, ho parlarem amb naturalitat i valorarem
                la millor opció.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border bg-white py-[var(--section-pad-sm)]">
        <Container className="max-w-3xl">
          <Reveal y={20}>
            <p className="eyebrow mb-4">Modalitat</p>
            <p className="text-ink-dim" style={{ fontSize: "var(--fs-lede)" }}>
              Presencial i online. Consulta presencial a Barcelona, zona
              Sarrià-Sant Gervasi.
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaBanner
        title="Vols explicar-me què t'està passant?"
        lede="Si no tens clar si necessites iniciar un procés de coaching o simplement fer una consulta puntual, podem valorar quin format encaixa millor."
      />
    </>
  );
}
