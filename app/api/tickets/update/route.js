import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    const { ticketId, adminReply, status } = await req.json();
    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({ success: false, error: "DB not configured" }, { status: 500 });

    const update = { updated_at: new Date().toISOString() };
    if (adminReply !== undefined) update.admin_reply = adminReply;
    if (status !== undefined) update.status = status;

    const { error } = await supabase.from("tickets").update(update).eq("id", ticketId);
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
