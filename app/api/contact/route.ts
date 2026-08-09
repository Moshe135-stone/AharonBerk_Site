type ContactBeaconPayload = {
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

export async function POST(request: Request) {
  const webhookUrl = process.env.MAKE_CONTACT_WEBHOOK_URL;
  let payload: ContactBeaconPayload;
  try {
    payload = await request.json();
  } catch {
    return new Response(null, { status: 400 });
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

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(row),
      });
    } catch {
      // Never block the visitor's mailto fallback if the Make webhook is unreachable.
    }
  }

  return new Response(null, { status: 204 });
}
