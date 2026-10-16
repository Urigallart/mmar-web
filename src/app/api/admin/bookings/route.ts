import { isAuthed } from "@/lib/auth";
import { getBookings, saveBookings } from "@/lib/store";

export async function DELETE(request: Request) {
  if (!isAuthed(request)) return Response.json({ success: false }, { status: 401 });
  let id = "";
  try {
    id = String((await request.json()).id ?? "");
  } catch {
    return Response.json({ success: false }, { status: 400 });
  }
  const bookings = await getBookings();
  const next = bookings.filter((b) => b.id !== id);
  if (next.length === bookings.length) return Response.json({ success: false }, { status: 404 });
  await saveBookings(next);
  return Response.json({ success: true, bookings: next });
}
