import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// PayFast ITN posts are x-www-form-urlencoded.
// This handler:
// - parses the payload
// - re-computes the signature (MD5)
// - returns 200 OK if the signature matches
// - logs the subscription token for later reconciliation

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

function buildSignatureString(params: Record<string, string>, passphrase: string) {
  const keys = Object.keys(params)
    .filter((k) => k !== "signature")
    .sort();

  const base = keys
    .map((k) => `${k}=${encodeValue(params[k] ?? "")}`)
    .join("&");

  return `${base}&passphrase=${encodeValue(passphrase.trim())}`;
}

serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    const passphrase = Deno.env.get("PAYFAST_PASSPHRASE") ?? "";
    if (!passphrase.trim()) {
      console.error("PAYFAST_PASSPHRASE missing");
      return new Response("Server misconfigured", { status: 500 });
    }

    const raw = await req.text();
    const form = new URLSearchParams(raw);

    const data: Record<string, string> = {};
    for (const [k, v] of form.entries()) data[k] = v;

    const receivedSig = (data.signature || "").toLowerCase();
    const signatureStr = buildSignatureString(data, passphrase);
    const computedSig = (await md5Hex(signatureStr)).toLowerCase();

    if (!receivedSig || receivedSig !== computedSig) {
      console.error("PayFast ITN signature mismatch", { receivedSig, computedSig });
      return new Response("Invalid signature", { status: 400 });
    }

    console.log("PayFast ITN received", {
      m_payment_id: data.m_payment_id,
      payment_status: data.payment_status,
      pf_payment_id: data.pf_payment_id,
      amount_gross: data.amount_gross,
      amount_fee: data.amount_fee,
      amount_net: data.amount_net,
      item_name: data.item_name,
      custom_str1: data.custom_str1, // plan
      custom_str2: data.custom_str2, // identifier (policy/id)
      token: data.token, // subscription token when applicable
    });

    // TODO: persist to Supabase table for reconciliation/reporting.
    return new Response("OK", { status: 200 });
  } catch (e) {
    console.error("payfast-itn error", e);
    return new Response("Server error", { status: 500 });
  }
});
