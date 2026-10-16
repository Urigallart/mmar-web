import { isAuthed } from "@/lib/auth";
import { normalizeSchedule } from "@/lib/booking";
import { saveSchedule } from "@/lib/store";

export async function PUT(request: Request) {
  if (!isAuthed(request)) return Response.json({ success: false }, { status: 401 });
  let body: { schedule?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false }, { status: 400 });
  }
  const schedule = normalizeSchedule(body.schedule);
  await saveSchedule(schedule);
  return Response.json({ success: true, schedule });
}
