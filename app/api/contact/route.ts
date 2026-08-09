import { env } from "cloudflare:workers";

type ContactSubmissionPayload = {
  name?: string;
  phone?: string;
  email?: string;
  enquiryType?: string;
  date?: string;
  location?: string;
  message?: string;
  page_url?: string;
  channel?: string;
};

function jsonResponse(body: {ok: boolean}, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const webhookUrl = env.MAKE_WEBHOOK_URL;
  let payload: ContactSubmissionPayload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ ok: false }, 400);
  }

  // Renamed to match the spreadsheet columns the Make scenario writes to.
  const row = {
    timestamp: new Date().toISOString(),
    name: payload.name ?? "",
    phone: payload.phone ?? "",
    email: payload.email ?? "",
    enquiry_type: payload.enquiryType ?? "",
    event_date: payload.date ?? "",
    location: payload.location ?? "",
    message: payload.message ?? "",
    page_url: payload.page_url ?? "",
    channel: payload.channel ?? "",
  };

  if (!webhookUrl) {
    return jsonResponse({ ok: false }, 500);
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
    });
    if (!webhookResponse.ok) {
      return jsonResponse({ ok: false }, 502);
    }
  } catch {
    return jsonResponse({ ok: false }, 502);
  }

  return jsonResponse({ ok: true }, 200);
}
