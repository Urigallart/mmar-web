import { availabilityMap } from "@/lib/booking";
import { getBookings, getSchedule } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const [schedule, bookings] = await Promise.all([getSchedule(), getBookings()]);
  return Response.json(
    { days: availabilityMap(schedule, bookings), sessionMinutes: schedule.sessionMinutes },
    { headers: { "Cache-Control": "no-store" } }
  );
}
