# Khwalo Legacy Hub

## Local dev

- Install dependencies
- Run the dev server

## Payments (PayFast recurring)

This site supports recurring monthly subscription payments via PayFast.

### User flow

- Users can go to `/pay` to start a recurring monthly payment.
- They choose a plan and (optionally) provide a Policy Number or ID Number for reconciliation.
- The site creates a PayFast payment request via a Supabase Edge Function and redirects the user to PayFast.

### Supabase Edge Functions

- `payfast-init`: Creates a PayFast payment request payload (including signature) for recurring monthly subscriptions.
- `payfast-itn`: Receives PayFast ITN callbacks (notify_url) and verifies the signature.

### Environment variables

Frontend (Vercel):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Supabase (Edge Functions secrets):
- `PAYFAST_MERCHANT_ID`
- `PAYFAST_MERCHANT_KEY`
- `PAYFAST_PASSPHRASE` (required for subscriptions)
- `SITE_URL` (e.g. https://khwalo-legacy-hub.vercel.app)
- `PAYFAST_NOTIFY_URL` (the deployed URL of the `payfast-itn` function)

### Notes

- For PayFast subscriptions, a passphrase is required for the signature.
- Use PayFast Sandbox to test before going live.
