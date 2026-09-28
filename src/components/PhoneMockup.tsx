export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[220px] select-none sm:w-[240px]">
      <div className="relative rounded-[2.2rem] border-[6px] border-[#0f1613] bg-[#0f1613] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
        <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-[#0f1613]" />
        <div className="flex flex-col overflow-hidden rounded-[1.7rem] bg-[#ECE5DD]" style={{ aspectRatio: "9/19" }}>
          <div className="flex items-center gap-2 bg-green-deep px-3.5 py-3 pt-6">
            <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-paper text-[0.65rem] font-bold text-ink">
              M
            </span>
            <div>
              <p className="text-[0.7rem] font-semibold text-paper">Mª del Mar</p>
              <p className="text-[0.55rem] text-paper/70">en línia</p>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-end gap-1.5 p-2.5">
            <div className="max-w-[80%] rounded-lg rounded-tl-none bg-white px-2.5 py-1.5 text-[0.6rem] leading-snug text-ink shadow-sm">
              Hola! Voldria fer una consulta puntual, com funciona?
            </div>
            <div className="ml-auto max-w-[85%] rounded-lg rounded-tr-none bg-green-pale px-2.5 py-1.5 text-[0.6rem] leading-snug text-ink shadow-sm">
              Hola! Amb molt de gust — explica&apos;m breument la teva
              situació i et proposo el millor format 🌿
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
