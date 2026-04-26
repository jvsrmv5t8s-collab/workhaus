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

    const data = body?.data ?? {};

    const conversationId: string = data.conversation_id ?? "";
    const durationSecs: number = data.metadata?.call_duration_secs ?? 0;
    const summary: string = data.analysis?.transcript_summary ?? "";

    // Extract capture_lead_info calls from every agent turn in the transcript
    const transcript: { role: string; tool_calls?: { tool_name: string; parameters?: Record<string, string> }[] }[] =
      data.transcript ?? [];

    const captured: Record<string, string> = {};
    for (const turn of transcript) {
      for (const call of turn.tool_calls ?? []) {
        if (call.tool_name === "capture_lead_info" && call.parameters?.field) {
          captured[call.parameters.field] = call.parameters.value ?? "";
        }
      }
    }

    // Only use ElevenLabs' built-in data_collection_results as fallback for
    // qualified or browsing leads — not for disqualified day-pass calls where
    // the enum would incorrectly map "on-demand" to "Private Offices".
    const isDisqualified = captured.outcome === "disqualified_day_pass";

    if (!isDisqualified) {
      const dcr = data.analysis?.data_collection_results ?? {};
      if (!captured.name && dcr.lead_name?.value)                     captured.name           = dcr.lead_name.value;
      if (!captured.email && dcr.contact_email?.value)                 captured.email          = dcr.contact_email.value;
      if (!captured.phone && dcr.contact_phone?.value)                 captured.phone          = dcr.contact_phone.value;
      if (!captured.city && dcr.desired_location?.value)               captured.city           = dcr.desired_location.value;
      if (!captured.workspace_type && dcr.space_type_interest?.value)  captured.workspace_type = dcr.space_type_interest.value;
      if (!captured.team_size && dcr.team_size?.value)                 captured.team_size      = String(dcr.team_size.value);
    }

    // Columns A–O
    const row = [
      new Date().toLocaleString("en-CA", { timeZone: "America/Toronto" }), // A: Timestamp
      captured.name ?? "",                                                   // B: Name
      captured.email ?? "",                                                  // C: Email
      captured.phone ?? "",                                                  // D: Phone
      captured.city ?? "",                                                   // E: City
      captured.workspace_type ?? "",                                         // F: Workspace Type
      captured.team_size ?? "",                                              // G: Team Size
      captured.physical_requirements ?? "",                                  // H: Physical Requirements
      captured.technical_requirements ?? "",                                 // I: Technical Requirements
      captured.outcome ?? "",                                                // J: Outcome
      "Hazel / Conversational AI",                                           // K: Source
      durationSecs ? `${Math.round(durationSecs)}s` : "",                   // L: Duration
      conversationId,                                                        // M: Conversation ID
      "",                                                                    // N: Follow-Up Status (manual)
      summary,                                                               // O: AI Summary
    ];

    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: "Sheet1!A:O",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/lead] Error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
