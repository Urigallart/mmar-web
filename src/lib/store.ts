import { get, put } from "@vercel/blob";
import { normalizeSchedule, type Booking, type Schedule } from "./booking";

const SCHEDULE_PATH = "schedule.json";
const BOOKINGS_PATH = "bookings.json";

async function readJson(path: string): Promise<unknown> {
  try {
    const res = await get(path, { access: "private", useCache: false });
    if (!res) return null;
    return JSON.parse(await new Response(res.stream).text());
  } catch {
    return null;
  }
}

async function writeJson(path: string, data: unknown) {
  await put(path, JSON.stringify(data), {
    access: "private",
    allowOverwrite: true,
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

export async function getSchedule(): Promise<Schedule> {
  return normalizeSchedule(await readJson(SCHEDULE_PATH));
}

export async function saveSchedule(schedule: Schedule) {
  await writeJson(SCHEDULE_PATH, schedule);
}

export async function getBookings(): Promise<Booking[]> {
  const raw = await readJson(BOOKINGS_PATH);
  return Array.isArray(raw) ? (raw as Booking[]) : [];
}

export async function saveBookings(bookings: Booking[]) {
  await writeJson(BOOKINGS_PATH, bookings);
}
