export const BOOKING = {
  timeZone: "Europe/Madrid",
  sessionMinutes: 15,
  stepMinutes: 30,
  minNoticeHours: 24,
  horizonDays: 45,
  // weekday (0 = Sunday) -> available ranges "HH:MM"
  weekly: {
    1: [["10:00", "13:00"], ["16:00", "19:00"]],
    2: [["10:00", "13:00"], ["16:00", "19:00"]],
    3: [["10:00", "13:00"], ["16:00", "19:00"]],
    4: [["10:00", "13:00"], ["16:00", "19:00"]],
    5: [["10:00", "13:00"]],
  } as Record<number, [string, string][]>,
};

export type WallParts = { y: number; m: number; d: number; h: number; min: number };

const pad = (n: number) => String(n).padStart(2, "0");

export function wallNow(date = new Date()): WallParts {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: BOOKING.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return { y: get("year"), m: get("month"), d: get("day"), h: get("hour"), min: get("minute") };
}

export const dateKey = (y: number, m: number, d: number) => `${y}-${pad(m)}-${pad(d)}`;

export function parseKey(key: string): [number, number, number] {
  const [y, m, d] = key.split("-").map(Number);
  return [y, m, d];
}

export function weekdayOf(key: string) {
  const [y, m, d] = parseKey(key);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const toHHMM = (min: number) => `${pad(Math.floor(min / 60))}:${pad(min % 60)}`;

export function slotsFor(key: string, now = new Date()): string[] {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) return [];
  const [y, m, d] = parseKey(key);
  const ranges = BOOKING.weekly[weekdayOf(key)] ?? [];
  const n = wallNow(now);
  const earliest = Date.UTC(n.y, n.m - 1, n.d, n.h, n.min) + BOOKING.minNoticeHours * 3600000;
  const lastDay = Date.UTC(n.y, n.m - 1, n.d) + BOOKING.horizonDays * 86400000;
  if (Date.UTC(y, m - 1, d) > lastDay) return [];

  const out: string[] = [];
  for (const [start, end] of ranges) {
    for (let t = toMinutes(start); t + BOOKING.sessionMinutes <= toMinutes(end); t += BOOKING.stepMinutes) {
      if (Date.UTC(y, m - 1, d, 0, t) >= earliest) out.push(toHHMM(t));
    }
  }
  return out;
}

export function isSlotValid(key: string, time: string, now = new Date()) {
  return slotsFor(key, now).includes(time);
}

export function wallToUtc(key: string, time: string): Date {
  const [y, m, d] = parseKey(key);
  const [h, min] = time.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, h, min);
  const w = wallNow(new Date(guess));
  const offset = Date.UTC(w.y, w.m - 1, w.d, w.h, w.min) - guess;
  return new Date(guess - offset);
}

export function formatDay(key: string, locale: string) {
  const [y, m, d] = parseKey(key);
  return new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, d))
  );
}
