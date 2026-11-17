// Sends a website enquiry to WDG Business Management (Enquiries) and to the
// existing Base44 handler that emails Will. Succeeds if either one accepts it,
// so the form keeps working if one of them is down.
const BM_ENDPOINT = "https://gprzuzgjesnmkaxsrnio.supabase.co/functions/v1/website-enquiry";
const EMAIL_ENDPOINT = "https://assistant-36b1ac32.base44.app/functions/wdgSiteEnquiry";

export type EnquiryPayload = {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  source: string;
  honeypot: string;
};

// One plain, friendly message for every failure. We never pass on what the endpoints say, because
// that can be a raw technical error (stack traces, config names) that visitors shouldn't see.
export const ENQUIRY_FAILED = "Sorry, that didn't send. Your message is still here, so please try again, or call 07584 065559.";

async function post(url: string, body: unknown): Promise<{ ok: boolean }> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data?.success === true) return { ok: true };
    console.warn("[enquiry] endpoint did not accept the enquiry", url, res.status, data?.error);
    return { ok: false };
  } catch {
    return { ok: false };
  }
}

export async function sendEnquiry(p: EnquiryPayload): Promise<{ success: true } | { success: false; error: string }> {
  const page = typeof window !== "undefined" ? window.location.pathname : "";
  const [bm, email] = await Promise.all([post(BM_ENDPOINT, { ...p, page }), post(EMAIL_ENDPOINT, p)]);
  if (bm.ok || email.ok) return { success: true };
  return { success: false, error: ENQUIRY_FAILED };
}
