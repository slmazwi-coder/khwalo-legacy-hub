import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// PayFast sends Instant Transaction Notifications (ITN) to your notify_url.
// This endpoint should:
// 1) Read the form-encoded payload
// 2) Verify the signature
// 3) Optionally validate with PayFast server (recommended)
// 4) Persist subscription/payment state in your DB
//
// For now we:
// - parse and verify signature (MD5)
// - return 200 so PayFast stops retrying
// - log details to help wiring and debugging

function encodeValue(value: string) {
  return encodeURIComponent(value).replace(/%20/g, "+");
}

async function md5Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("MD5", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function buildSignatureString(params: Record<string, string>, passphrase?: string) {
  const keys = Object.keys(params)
    .filter((k) => params[k] !== "" && k !== "signature")
    .sort();

  const base = keys
    .map((k) => `${k}=${encodeValue(params[k])}`)
    .join("&");

  if (passphrase && passphrase.trim().length > 0) {
    return `${base}&passphrase=${encodeValue(passphrase.trim())}`;
  }
  return base;
}

serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    const text = await req.text();
    const form = new URLSearchParams(text);
    const data: Record<string, string> = {};
    for (const [k, v] of form.entries()) data[k] = v;

    const passphrase = Deno.env.get("PAYFAST_PASSPHRASE") ?? "";

    const signatureProvided = (data.signature || "").toLowerCase();
    const signatureStr = buildSignatureString(data, passphrase);
    const signatureComputed = (await md5Hex(signatureStr)).toLowerCase();

    const ok = signatureProvided && signatureProvided === signatureComputed;

    console.log("PayFast ITN received:", {
      ok,
      m_payment_id: data.m_payment_id,
      pf_payment_id: data.pf_payment_id,
      payment_status: data.payment_status,
      item_name: data.item_name,
      amount_gross: data.amount_gross,
      amount_fee: data.amount_fee,
      amount_net: data.amount_net,
      custom_str1: data.custom_str1,
      custom_str2: data.custom_str2,
    });

    if (!ok) {
      console.error("PayFast ITN signature mismatch", {
        signatureProvided,
        signatureComputed,
      });
      // Still return 200 to avoid repeated retries while configuring.
      // Once live, consider returning 400 on signature mismatch.
    }

    return new Response("OK", { status: 200 });
  } catch (e) {
    console.error("payfast-itn error:", e);
    return new Response("OK", { status: 200 });
  }
});
