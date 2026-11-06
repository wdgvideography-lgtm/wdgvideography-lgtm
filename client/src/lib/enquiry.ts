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

async function post(url: string, body: unknown): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return res.ok && data?.success === true ? { ok: true } : { ok: false, error: data?.error };
  } catch {
    return { ok: false };
  }
}

export async function sendEnquiry(p: EnquiryPayload): Promise<{ success: boolean; error?: string }> {
  const page = typeof window !== "undefined" ? window.location.pathname : "";
  const [bm, email] = await Promise.all([post(BM_ENDPOINT, { ...p, page }), post(EMAIL_ENDPOINT, p)]);
  if (bm.ok || email.ok) return { success: true };
  return { success: false, error: bm.error || email.error || "Something went wrong. Please try again, or call 07584 065559." };
}
