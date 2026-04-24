import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !key) throw new Error("Missing Google credentials");

  return new google.auth.JWT({ email, key, scopes: SCOPES });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ElevenLabs post-call webhook payload shape
    const conversationId: string =
      body?.data?.conversation_id ??
      body?.conversation_id ??
      "";

    const durationSecs: number =
      body?.data?.metadata?.call_duration_secs ??
      body?.data?.call_duration_secs ??
      0;

    // client_tool_calls is an array of { tool_name, parameters } objects
    const toolCalls: { tool_name: string; parameters: Record<string, string> }[] =
      body?.data?.client_tool_calls ?? [];

    // Extract fields captured via capture_lead_info tool calls
    const captured: Record<string, string> = {};
    for (const call of toolCalls) {
      if (call.tool_name === "capture_lead_info" && call.parameters?.field) {
        captured[call.parameters.field] = call.parameters.value ?? "";
      }
    }

    const row = [
      new Date().toLocaleString("en-CA", { timeZone: "America/Toronto" }),
      captured.name ?? "",
      captured.email ?? "",
      captured.phone ?? "",
      captured.city ?? "",
      captured.workspace_type ?? "",
      captured.team_size ?? "",
      durationSecs ? `${Math.round(durationSecs)}s` : "",
      conversationId,
    ];

    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: "Sheet1!A:I",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/lead] Error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
