import { NextResponse } from "next/server";
import crypto from "crypto";

const SECRET = process.env.ADMIN_SECRET || "postta-admin-secret-key-2026";

function sign(payload) {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
  return `${data}.${sig}`;
}

function verify(token) {
  try {
    const [data, sig] = token.split(".");
    const expected = crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
    if (sig !== expected) return null;
    return JSON.parse(Buffer.from(data, "base64url").toString());
  } catch {
    return null;
  }
}

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json({ success: false, error: "Admin not configured" }, { status: 500 });
    }

    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    const token = sign({ email, ts: Date.now() });
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return res;
  } catch (err) {
    return NextResponse.json({ success: false, error: "Auth failed" }, { status: 500 });
  }
}

export async function GET(req) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) {
    return NextResponse.json({ success: false, error: "Not logged in" }, { status: 401 });
  }
  const payload = verify(token);
  if (!payload) {
    return NextResponse.json({ success: false, error: "Invalid session" }, { status: 401 });
  }
  return NextResponse.json({ success: true, email: payload.email });
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set("admin_token", "", { maxAge: 0, path: "/" });
  return res;
}
