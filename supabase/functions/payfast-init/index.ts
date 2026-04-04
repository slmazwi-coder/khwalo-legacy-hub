import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type PlanKey = "essential" | "premium" | "prestige";

const PLAN_AMOUNT: Record<PlanKey, number> = {
  essential: 99,
  premium: 199,
  prestige: 350,
};

function toMoney(amount: number) {
  // PayFast expects 2 decimals in many integrations
  return amount.toFixed(2);
}

function encodeValue(value: string) {
  // PayFast signature uses URL-encoded values
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
  // Sort by key ascending and concatenate key=value with &
  // Exclude signature itself.
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
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const plan = (body.plan as PlanKey) || "essential";
    const email = (body.email as string) || "";
    const nameFirst = (body.nameFirst as string) || "";
    const nameLast = (body.nameLast as string) || "";
    const identifier = (body.identifier as string) || ""; // policy or ID number (optional)

    if (!PLAN_AMOUNT[plan]) {
      return new Response(JSON.stringify({ error: "Invalid plan" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const merchantId = Deno.env.get("PAYFAST_MERCHANT_ID") ?? "";
    const merchantKey = Deno.env.get("PAYFAST_MERCHANT_KEY") ?? "";
    const passphrase = Deno.env.get("PAYFAST_PASSPHRASE") ?? "";
    const siteUrl = Deno.env.get("SITE_URL") ?? "";
    const notifyUrl = Deno.env.get("PAYFAST_NOTIFY_URL") ?? "";

    if (!merchantId || !merchantKey || !passphrase) {
      return new Response(JSON.stringify({ error: "PayFast merchant config missing" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!siteUrl || !notifyUrl) {
      return new Response(JSON.stringify({ error: "SITE_URL or PAYFAST_NOTIFY_URL missing" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const amount = PLAN_AMOUNT[plan];
    const mPaymentId = crypto.randomUUID();

    // Recurring subscription fields.
    // Note: passphrase is required for subscriptions.
    const params: Record<string, string> = {
      merchant_id: merchantId,
      merchant_key: merchantKey,
      return_url: `${siteUrl}/payment/success`,
      cancel_url: `${siteUrl}/payment/cancel`,
      notify_url: notifyUrl,
      m_payment_id: mPaymentId,
      amount: toMoney(amount),
      item_name: `Khwalo Group - ${plan} plan`,
      item_description: `Monthly subscription payment${identifier ? ` (Ref: ${identifier})` : ""}`,
      name_first: nameFirst,
      name_last: nameLast,
      email_address: email,

      // PayFast subscription integration uses subscription_type=1
      subscription_type: "1",
      recurring_amount: toMoney(amount),
      frequency: "3", // monthly
      cycles: "0", // 0 typically indicates indefinite in PayFast integrations

      custom_str1: plan,
      custom_str2: identifier,
    };

    const signatureStr = buildSignatureString(params, passphrase);
    const signature = await md5Hex(signatureStr);

    return new Response(
      JSON.stringify({
        payfastUrl: "https://www.payfast.co.za/eng/process",
        params: { ...params, signature },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
