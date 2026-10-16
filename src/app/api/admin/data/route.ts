import { isAuthed } from "@/lib/auth";
import { getBookings, getSchedule } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isAuthed(request)) return Response.json({ success: false }, { status: 401 });
  const [schedule, bookings] = await Promise.all([getSchedule(), getBookings()]);
  return Response.json({ success: true, schedule, bookings }, { headers: { "Cache-Control": "no-store" } });
}
