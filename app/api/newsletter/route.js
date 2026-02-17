import { NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL = process.env.NEWSLETTER_GOOGLE_SCRIPT_URL;

function isValidEmail(value) {
  if (typeof value !== "string" || !value.trim()) return false;
  const email = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

export async function POST(request) {
  if (!GOOGLE_SCRIPT_URL) {
    return NextResponse.json(
      { error: "Newsletter signup is not configured." },
      { status: 503 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      redirect: "manual",
    });

    if (res.status === 302 || res.status === 301) {
      console.error(
        "Newsletter: Google Script returned redirect. Open the script URL once in a browser (while logged in as owner) to authorize it, then try again.",
      );
      return NextResponse.json(
        {
          error:
            "Newsletter is not fully set up yet. The site owner needs to open the Google Script link once in a browser to authorize it.",
        },
        { status: 502 },
      );
    }

    if (!res.ok) {
      const text = await res.text();
      console.error(
        "Newsletter Google Script error:",
        res.status,
        res.statusText,
        text.slice(0, 500),
      );
      return NextResponse.json(
        { error: "Something went wrong. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Newsletter request failed:", err.message || err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 502 },
    );
  }
}
