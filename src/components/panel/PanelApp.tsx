"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import {
  baseSlots,
  dateKey,
  formatDay,
  todayKey,
  wallNow,
  weekdayOf,
  type Booking,
  type Range,
  type Schedule,
} from "@/lib/booking";

type Tab = "reserves" | "calendari" | "horari";

const DAYS: { idx: number; name: string }[] = [
  { idx: 1, name: "Dilluns" },
  { idx: 2, name: "Dimarts" },
  { idx: 3, name: "Dimecres" },
  { idx: 4, name: "Dijous" },
  { idx: 5, name: "Divendres" },
  { idx: 6, name: "Dissabte" },
  { idx: 0, name: "Diumenge" },
];

const inputClass =
  "rounded-xl border border-border bg-paper px-4 py-3 text-ink outline-none focus:border-green-deep focus:ring-2 focus:ring-green-deep/20";

export default function PanelApp() {
  const [phase, setPhase] = useState<"loading" | "login" | "ready">("loading");
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tab, setTab] = useState<Tab>("reserves");
  const [toast, setToast] = useState<string | null>(null);

  const notify = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2600);
  }, []);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/data", { cache: "no-store" });
      if (res.status === 401) {
        setPhase("login");
        return;
      }
      const json = await res.json();
      setSchedule(json.schedule);
      setBookings(json.bookings);
      setPhase("ready");
    } catch {
      setPhase("login");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function saveSchedule(next: Schedule, okMessage = "Desat") {
    const previous = schedule;
    setSchedule(next);
    try {
      const res = await fetch("/api/admin/schedule", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schedule: next }),
      });
      if (res.status === 401) return setPhase("login");
      if (!res.ok) throw new Error();
      const json = await res.json();
      setSchedule(json.schedule);
      notify(okMessage);
    } catch {
      setSchedule(previous);
      notify("No s'ha pogut desar. Torna-ho a provar.");
    }
  }

  async function cancelBooking(id: string) {
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.status === 401) return setPhase("login");
      if (!res.ok) throw new Error();
      const json = await res.json();
      setBookings(json.bookings);
      notify("Reserva cancel·lada. L'hora torna a estar lliure.");
    } catch {
      notify("No s'ha pogut cancel·lar. Torna-ho a provar.");
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setSchedule(null);
    setPhase("login");
  }

  if (phase === "loading") {
    return <main className="grid min-h-screen place-items-center text-ink-dim">Carregant...</main>;
  }

  if (phase === "login") return <Login onSuccess={load} />;

  if (!schedule) return null;

  return (
    <main className="mx-auto max-w-3xl px-5 py-10 text-ink sm:py-14">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">Mª del Mar</p>
          <h1 className="font-semibold tracking-tight" style={{ fontSize: "var(--fs-h2)", lineHeight: 1.1 }}>
            Panell de gestió
          </h1>
          <p className="mt-2 text-ink-dim">Gestiona les reserves i la teva disponibilitat. Els canvis es veuen a la web al moment.</p>
        </div>
        <button type="button" onClick={logout} className="btn btn-ghost !px-4 !py-2 text-sm">
          Tanca la sessió
        </button>
      </header>

      <nav className="mt-8 flex flex-wrap gap-2" aria-label="Seccions">
        {(
          [
            ["reserves", "Reserves"],
            ["calendari", "Calendari"],
            ["horari", "Horari setmanal"],
          ] as [Tab, string][]
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={clsx(
              "rounded-full border px-5 py-2 text-sm font-medium transition-colors",
              tab === key ? "border-ink bg-ink text-paper" : "border-border-strong text-ink"
            )}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-8">
        {tab === "reserves" && <BookingsTab bookings={bookings} onCancel={cancelBooking} />}
        {tab === "calendari" && (
          <CalendarTab schedule={schedule} bookings={bookings} onChange={(next) => saveSchedule(next)} />
        )}
        {tab === "horari" && <WeeklyTab schedule={schedule} onSave={(next) => saveSchedule(next, "Horari desat")} />}
      </div>

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-5 py-3 text-sm text-paper shadow-lg"
        >
          {toast}
        </div>
      )}
    </main>
  );
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) return onSuccess();
      setError(res.status === 429 ? "Massa intents. Espera uns minuts." : "Contrasenya incorrecta.");
    } catch {
      setError("No s'ha pogut connectar. Torna-ho a provar.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-5 text-ink">
      <form onSubmit={submit} className="w-full max-w-sm rounded-[var(--radius-card)] border border-border bg-white p-8">
        <p className="eyebrow mb-2">Mª del Mar</p>
        <h1 className="font-semibold tracking-tight" style={{ fontSize: "var(--fs-h3)" }}>
          Panell de gestió
        </h1>
        <label className="mt-6 flex flex-col gap-2 text-sm">
          <span className="font-medium">Contrasenya</span>
          <input
            type="password"
            autoFocus
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </label>
        {error && (
          <p role="alert" className="mt-3 text-sm text-red-600">
            {error}
          </p>
        )}
        <button type="submit" disabled={busy} className="btn btn-primary mt-6 w-full justify-center disabled:opacity-60">
          {busy ? "Entrant..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}

function BookingsTab({ bookings, onCancel }: { bookings: Booking[]; onCancel: (id: string) => void }) {
  const today = todayKey();
  const upcoming = useMemo(
    () =>
      bookings
        .filter((b) => b.date >= today)
        .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)),
    [bookings, today]
  );
  const pastCount = bookings.length - upcoming.length;

  if (upcoming.length === 0) {
    return (
      <p className="rounded-2xl border border-border bg-white p-6 text-ink-dim">
        Ara mateix no tens cap reserva pendent. Quan algú reservi una primera sessió, apareixerà aquí.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {upcoming.map((b) => (
        <article key={b.id} className="rounded-2xl border border-border bg-white p-6">
          <p className="text-sm font-medium text-green-deep first-letter:uppercase">
            {formatDay(b.date, "ca")} · {b.time}
          </p>
          <p className="mt-2 text-lg font-semibold">{b.name}</p>
          <a href={`mailto:${b.email}`} className="text-ink-dim underline underline-offset-4">
            {b.email}
          </a>
          {b.message && <p className="mt-3 whitespace-pre-wrap text-ink-dim">{b.message}</p>}
          <button
            type="button"
            onClick={() => {
              if (window.confirm(`Vols cancel·lar la reserva de ${b.name}? L'hora quedarà lliure.`)) onCancel(b.id);
            }}
            className="btn btn-ghost mt-5 !px-4 !py-2 text-sm"
          >
            Cancel·la la reserva
          </button>
        </article>
      ))}
      {pastCount > 0 && <p className="text-sm text-ink-dim">Hi ha {pastCount} reserves passades que no es mostren.</p>}
    </div>
  );
}

function CalendarTab({
  schedule,
  bookings,
  onChange,
}: {
  schedule: Schedule;
  bookings: Booking[];
  onChange: (next: Schedule) => void;
}) {
  const today = useMemo(() => wallNow(), []);
  const [cursor, setCursor] = useState({ y: today.y, m: today.m });
  const [selected, setSelected] = useState<string | null>(null);

  const monthLabel = new Intl.DateTimeFormat("ca", { month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(cursor.y, cursor.m - 1, 1))
  );
  const firstOffset = (weekdayOf(dateKey(cursor.y, cursor.m, 1)) + 6) % 7;
  const daysInMonth = new Date(Date.UTC(cursor.y, cursor.m, 0)).getUTCDate();
  const cells: (string | null)[] = [
    ...Array.from({ length: firstOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => dateKey(cursor.y, cursor.m, i + 1)),
  ];
  const shiftMonth = (delta: number) => {
    const d = new Date(Date.UTC(cursor.y, cursor.m - 1 + delta, 1));
    setCursor({ y: d.getUTCFullYear(), m: d.getUTCMonth() + 1 });
  };

  const toggleDay = (key: string) => {
    const blocked = schedule.blockedDates.includes(key);
    onChange({
      ...schedule,
      blockedDates: blocked ? schedule.blockedDates.filter((d) => d !== key) : [...schedule.blockedDates, key].sort(),
    });
  };

  const toggleSlot = (key: string, time: string) => {
    const current = schedule.blockedSlots[key] ?? [];
    const next = current.includes(time) ? current.filter((t) => t !== time) : [...current, time].sort();
    const blockedSlots = { ...schedule.blockedSlots };
    if (next.length) blockedSlots[key] = next;
    else delete blockedSlots[key];
    onChange({ ...schedule, blockedSlots });
  };

  const selectedBase = selected ? baseSlots(selected, schedule) : [];
  const selectedBookings = selected ? bookings.filter((b) => b.date === selected) : [];
  const dayBlocked = selected ? schedule.blockedDates.includes(selected) : false;

  return (
    <div>
      <div className="max-w-md rounded-2xl border border-border bg-white p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            aria-label="Mes anterior"
            className="grid h-9 w-9 place-items-center rounded-full border border-border-strong"
          >
            ‹
          </button>
          <p className="font-medium first-letter:uppercase">{monthLabel}</p>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            aria-label="Mes següent"
            className="grid h-9 w-9 place-items-center rounded-full border border-border-strong"
          >
            ›
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs uppercase text-ink-dim">
          {["dl", "dt", "dc", "dj", "dv", "ds", "dg"].map((d) => (
            <span key={d} className="py-1">
              {d}
            </span>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {cells.map((key, i) => {
            if (!key) return <span key={`e${i}`} />;
            const hasHours = baseSlots(key, schedule).length > 0;
            const isBlocked = schedule.blockedDates.includes(key);
            const hasBooking = bookings.some((b) => b.date === key);
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelected(key)}
                className={clsx(
                  "relative aspect-square rounded-full text-sm transition-colors",
                  isBlocked
                    ? "bg-red-50 text-red-700 line-through"
                    : hasHours
                      ? "bg-green-pale font-medium"
                      : "text-ink-dim/50",
                  selected === key && "ring-2 ring-ink"
                )}
              >
                {Number(key.slice(8))}
                {hasBooking && <span className="absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-ink" />}
              </button>
            );
          })}
        </div>
        <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink-dim">
          <span>Verd: dia amb horari</span>
          <span>Vermell: dia bloquejat</span>
          <span>Punt negre: hi ha reserves</span>
        </p>
      </div>

      {selected && (
        <div className="mt-6 rounded-2xl border border-border bg-white p-5 sm:p-6">
          <p className="font-semibold first-letter:uppercase">{formatDay(selected, "ca")}</p>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => toggleDay(selected)}
              className={clsx("btn !px-5 !py-2.5 text-sm", dayBlocked ? "btn-primary" : "btn-ghost")}
            >
              {dayBlocked ? "Desbloqueja el dia" : "Bloqueja tot el dia"}
            </button>
          </div>

          {dayBlocked && (
            <p className="mt-3 text-sm text-red-700">Aquest dia està bloquejat: no es pot reservar cap hora.</p>
          )}

          {selectedBase.length === 0 ? (
            <p className="mt-4 text-sm text-ink-dim">
              Aquest dia de la setmana no tens horari obert. Pots canviar-ho a «Horari setmanal».
            </p>
          ) : (
            <>
              <p className="mt-5 text-sm text-ink-dim">Toca una hora per bloquejar-la o desbloquejar-la.</p>
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {selectedBase.map((time) => {
                  const booking = selectedBookings.find((b) => b.time === time);
                  const blocked = dayBlocked || (schedule.blockedSlots[selected] ?? []).includes(time);
                  return (
                    <button
                      key={time}
                      type="button"
                      disabled={Boolean(booking) || dayBlocked}
                      onClick={() => toggleSlot(selected, time)}
                      className={clsx(
                        "rounded-full border px-2 py-2 text-sm transition-colors",
                        booking
                          ? "border-ink bg-ink text-paper"
                          : blocked
                            ? "border-red-200 bg-red-50 text-red-700 line-through"
                            : "border-border-strong text-ink"
                      )}
                      title={booking ? `Reservat per ${booking.name}` : undefined}
                    >
                      {time}
                      {booking && <span className="block text-[0.65rem] leading-tight opacity-80">{booking.name.split(" ")[0]}</span>}
                    </button>
                  );
                })}
              </div>
              {selectedBookings.length > 0 && (
                <p className="mt-3 text-xs text-ink-dim">
                  Les hores en negre són reserves. Per alliberar-les, cancel·la la reserva a la pestanya «Reserves».
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function WeeklyTab({ schedule, onSave }: { schedule: Schedule; onSave: (next: Schedule) => void }) {
  const [weekly, setWeekly] = useState<Record<string, Range[]>>(schedule.weekly);
  const [params, setParams] = useState({
    sessionMinutes: schedule.sessionMinutes,
    stepMinutes: schedule.stepMinutes,
    minNoticeHours: schedule.minNoticeHours,
    horizonDays: schedule.horizonDays,
  });

  const dirty =
    JSON.stringify(weekly) !== JSON.stringify(schedule.weekly) ||
    params.sessionMinutes !== schedule.sessionMinutes ||
    params.stepMinutes !== schedule.stepMinutes ||
    params.minNoticeHours !== schedule.minNoticeHours ||
    params.horizonDays !== schedule.horizonDays;

  const setRanges = (idx: number, ranges: Range[]) => {
    const next = { ...weekly };
    if (ranges.length) next[String(idx)] = ranges;
    else delete next[String(idx)];
    setWeekly(next);
  };

  const select = (label: string, value: number, key: keyof typeof params, options: [number, string][]) => (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-medium">{label}</span>
      <select
        value={value}
        onChange={(e) => setParams({ ...params, [key]: Number(e.target.value) })}
        className={inputClass}
      >
        {options.map(([v, text]) => (
          <option key={v} value={v}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-2xl border border-border bg-white p-5 sm:p-6">
        <h2 className="font-semibold">Dies i hores en què atens</h2>
        <p className="mt-1 text-sm text-ink-dim">
          Marca els dies que atens i afegeix les franges horàries. Per tancar un dia, desmarca&apos;l.
        </p>
        <div className="mt-5 flex flex-col divide-y divide-border">
          {DAYS.map(({ idx, name }) => {
            const ranges = weekly[String(idx)] ?? [];
            const open = ranges.length > 0;
            return (
              <div key={idx} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-start sm:gap-6">
                <label className="flex w-36 flex-shrink-0 items-center gap-3 font-medium">
                  <input
                    type="checkbox"
                    checked={open}
                    onChange={(e) => setRanges(idx, e.target.checked ? [["10:00", "13:00"]] : [])}
                    className="h-4 w-4"
                  />
                  {name}
                </label>
                <div className="flex flex-1 flex-col gap-2">
                  {!open && <span className="text-sm text-ink-dim">Tancat</span>}
                  {ranges.map((range, i) => (
                    <div key={i} className="flex flex-wrap items-center gap-2">
                      <input
                        type="time"
                        step={900}
                        value={range[0]}
                        onChange={(e) => setRanges(idx, ranges.map((r, j) => (j === i ? [e.target.value, r[1]] : r)))}
                        className={inputClass}
                      />
                      <span className="text-ink-dim">a</span>
                      <input
                        type="time"
                        step={900}
                        value={range[1]}
                        onChange={(e) => setRanges(idx, ranges.map((r, j) => (j === i ? [r[0], e.target.value] : r)))}
                        className={inputClass}
                      />
                      <button
                        type="button"
                        onClick={() => setRanges(idx, ranges.filter((_, j) => j !== i))}
                        aria-label="Treu aquesta franja"
                        className="grid h-9 w-9 place-items-center rounded-full border border-border-strong text-ink-dim"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {open && (
                    <button
                      type="button"
                      onClick={() => setRanges(idx, [...ranges, ["16:00", "19:00"]])}
                      className="w-fit text-sm text-green-deep underline underline-offset-4"
                    >
                      + Afegeix una franja
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-5 sm:p-6">
        <h2 className="font-semibold">Com es reserva</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {select("Durada de la sessió", params.sessionMinutes, "sessionMinutes", [
            [15, "15 minuts"],
            [20, "20 minuts"],
            [30, "30 minuts"],
            [45, "45 minuts"],
            [60, "1 hora"],
          ])}
          {select("Cada quant es pot reservar", params.stepMinutes, "stepMinutes", [
            [15, "Cada 15 minuts"],
            [20, "Cada 20 minuts"],
            [30, "Cada 30 minuts"],
            [60, "Cada hora"],
          ])}
          {select("Antelació mínima", params.minNoticeHours, "minNoticeHours", [
            [0, "Cap"],
            [2, "2 hores"],
            [6, "6 hores"],
            [12, "12 hores"],
            [24, "24 hores"],
            [48, "48 hores"],
          ])}
          {select("Fins a quants dies endavant", params.horizonDays, "horizonDays", [
            [14, "2 setmanes"],
            [30, "1 mes"],
            [45, "45 dies"],
            [60, "2 mesos"],
            [90, "3 mesos"],
          ])}
        </div>
      </div>

      <div>
        <button
          type="button"
          disabled={!dirty}
          onClick={() => onSave({ ...schedule, weekly, ...params })}
          className="btn btn-primary disabled:opacity-40"
        >
          Desa els canvis
        </button>
        {dirty && <span className="ml-4 text-sm text-ink-dim">Tens canvis sense desar.</span>}
      </div>
    </div>
  );
}
