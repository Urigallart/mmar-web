export const TIME_ZONE = "Europe/Madrid";

export type Range = [string, string];

export type Schedule = {
  sessionMinutes: number;
  stepMinutes: number;
  minNoticeHours: number;
  horizonDays: number;
  /** weekday ("0" = Sunday ... "6" = Saturday) -> open ranges "HH:MM" */
  weekly: Record<string, Range[]>;
  blockedDates: string[];
  blockedSlots: Record<string, string[]>;
};

export type Booking = {
  id: string;
  date: string;
  time: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export const DEFAULT_SCHEDULE: Schedule = {
  sessionMinutes: 15,
  stepMinutes: 30,
  minNoticeHours: 24,
  horizonDays: 45,
  weekly: {
    "1": [["10:00", "13:00"], ["16:00", "19:00"]],
    "2": [["10:00", "13:00"], ["16:00", "19:00"]],
    "3": [["10:00", "13:00"], ["16:00", "19:00"]],
    "4": [["10:00", "13:00"], ["16:00", "19:00"]],
    "5": [["10:00", "13:00"]],
  },
  blockedDates: [],
  blockedSlots: {},
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

const pad = (n: number) => String(n).padStart(2, "0");
const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const toHHMM = (min: number) => `${pad(Math.floor(min / 60))}:${pad(min % 60)}`;
const clampInt = (v: unknown, min: number, max: number, fallback: number) => {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
};

export function normalizeSchedule(raw: unknown): Schedule {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const base = DEFAULT_SCHEDULE;

  const weekly: Record<string, Range[]> = {};
  const rawWeekly = (r.weekly && typeof r.weekly === "object" ? r.weekly : base.weekly) as Record<string, unknown>;
  for (let d = 0; d <= 6; d++) {
    const list = Array.isArray(rawWeekly[String(d)]) ? (rawWeekly[String(d)] as unknown[]) : [];
    const ranges: Range[] = [];
    for (const item of list) {
      if (Array.isArray(item) && TIME_RE.test(String(item[0])) && TIME_RE.test(String(item[1]))) {
        if (toMinutes(String(item[0])) < toMinutes(String(item[1]))) ranges.push([String(item[0]), String(item[1])]);
      }
    }
    ranges.sort((a, b) => toMinutes(a[0]) - toMinutes(b[0]));
    if (ranges.length) weekly[String(d)] = ranges;
  }

  const blockedDates = Array.isArray(r.blockedDates)
    ? [...new Set((r.blockedDates as unknown[]).map(String).filter((d) => DATE_RE.test(d)))].sort()
    : [];

  const blockedSlots: Record<string, string[]> = {};
  if (r.blockedSlots && typeof r.blockedSlots === "object") {
    for (const [date, times] of Object.entries(r.blockedSlots as Record<string, unknown>)) {
      if (!DATE_RE.test(date) || !Array.isArray(times)) continue;
      const clean = [...new Set(times.map(String).filter((t) => TIME_RE.test(t)))].sort();
      if (clean.length) blockedSlots[date] = clean;
    }
  }

  return {
    sessionMinutes: clampInt(r.sessionMinutes, 5, 180, base.sessionMinutes),
    stepMinutes: clampInt(r.stepMinutes, 5, 180, base.stepMinutes),
    minNoticeHours: clampInt(r.minNoticeHours, 0, 720, base.minNoticeHours),
    horizonDays: clampInt(r.horizonDays, 1, 365, base.horizonDays),
    weekly,
    blockedDates,
    blockedSlots,
  };
}

export type WallParts = { y: number; m: number; d: number; h: number; min: number };

export function wallNow(date = new Date()): WallParts {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
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

export function todayKey(now = new Date()) {
  const n = wallNow(now);
  return dateKey(n.y, n.m, n.d);
}

/** Times a day offers according to the weekly rules only (ignores notice, blocks and bookings). */
export function baseSlots(key: string, schedule: Schedule): string[] {
  if (!DATE_RE.test(key)) return [];
  const out: string[] = [];
  for (const [start, end] of schedule.weekly[String(weekdayOf(key))] ?? []) {
    for (let t = toMinutes(start); t + schedule.sessionMinutes <= toMinutes(end); t += schedule.stepMinutes) {
      out.push(toHHMM(t));
    }
  }
  return out;
}

export function availableSlots(key: string, schedule: Schedule, bookings: Booking[], now = new Date()): string[] {
  if (!DATE_RE.test(key) || schedule.blockedDates.includes(key)) return [];
  const [y, m, d] = parseKey(key);
  const n = wallNow(now);
  const earliest = Date.UTC(n.y, n.m - 1, n.d, n.h, n.min) + schedule.minNoticeHours * 3600000;
  const lastDay = Date.UTC(n.y, n.m - 1, n.d) + schedule.horizonDays * 86400000;
  if (Date.UTC(y, m - 1, d) > lastDay) return [];

  const blocked = new Set(schedule.blockedSlots[key] ?? []);
  const taken = new Set(bookings.filter((b) => b.date === key).map((b) => b.time));
  return baseSlots(key, schedule).filter((time) => {
    const [h, min] = time.split(":").map(Number);
    return !blocked.has(time) && !taken.has(time) && Date.UTC(y, m - 1, d, h, min) >= earliest;
  });
}

export function availabilityMap(schedule: Schedule, bookings: Booking[], now = new Date()) {
  const n = wallNow(now);
  const map: Record<string, string[]> = {};
  for (let i = 0; i <= schedule.horizonDays; i++) {
    const day = new Date(Date.UTC(n.y, n.m - 1, n.d + i));
    const key = dateKey(day.getUTCFullYear(), day.getUTCMonth() + 1, day.getUTCDate());
    const slots = availableSlots(key, schedule, bookings, now);
    if (slots.length) map[key] = slots;
  }
  return map;
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
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}
