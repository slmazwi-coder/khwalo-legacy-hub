import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";

const PLAN_OPTIONS = [
  { value: "essential", label: "Essential - R99/month" },
  { value: "premium", label: "Premium - R199/month" },
  { value: "prestige", label: "Prestige - R350/month" },
] as const;

type PlanKey = (typeof PLAN_OPTIONS)[number]["value"];

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { first: "", last: "" };
  if (parts.length === 1) return { first: parts[0], last: "" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

const PayMonthly = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState<PlanKey>("premium");
  const [identifier, setIdentifier] = useState(""); // Policy number OR ID number
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nameParts = useMemo(() => splitName(fullName), [fullName]);

  const startPayment = async () => {
    setError(null);
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/payfast-init`;

      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          plan,
          email,
          nameFirst: nameParts.first,
          nameLast: nameParts.last,
          identifier: identifier.trim(),
        }),
      });

      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        throw new Error(data.error || "Payment setup failed");
      }

      // Redirect to PayFast using a POST form to avoid query-string limits.
      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.payfastUrl;

      Object.entries(data.params || {}).forEach(([k, v]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = k;
        input.value = String(v);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-28 pb-16 max-w-2xl">
        <div className="bg-card border border-border rounded-xl p-8">
          <p className="text-gold tracking-[0.2em] uppercase text-xs mb-3">Payments</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Pay monthly premium</h1>
          <p className="text-muted-foreground text-sm mb-8">
            Use this option if you couldn’t set up a debit order. You can start a recurring monthly payment for your plan.
          </p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Full name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground text-sm focus:outline-none focus:border-gold"
                placeholder="e.g. Someleze Mazwi"
              />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground text-sm focus:outline-none focus:border-gold"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">Plan</label>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value as PlanKey)}
                className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground text-sm focus:outline-none focus:border-gold"
              >
                {PLAN_OPTIONS.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">Policy number or ID number (optional)</label>
              <input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground text-sm focus:outline-none focus:border-gold"
                placeholder="e.g. Policy 12345 or 9001015009087"
              />
              <p className="text-muted-foreground text-xs mt-2">
                This helps us match your payment to your account.
              </p>
            </div>

            {error && (
              <div className="border border-red-200 bg-red-50 text-red-700 rounded-md p-3 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={startPayment}
              disabled={loading}
              className="w-full bg-gradient-maroon text-primary-foreground py-4 rounded-md font-medium hover:opacity-90 transition shadow-maroon disabled:opacity-60"
            >
              {loading ? "Redirecting…" : "Continue to PayFast"}
            </button>

            <p className="text-muted-foreground text-xs text-center">
              You will be redirected to PayFast to securely enter your card details.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PayMonthly;
