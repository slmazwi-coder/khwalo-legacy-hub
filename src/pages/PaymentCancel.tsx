const PaymentCancel = () => (
  <div className="min-h-screen flex items-center justify-center bg-background px-4">
    <div className="max-w-md w-full bg-card border border-border rounded-xl p-8 text-center">
      <h1 className="font-display text-3xl font-bold text-foreground mb-3">Payment cancelled</h1>
      <p className="text-muted-foreground text-sm mb-6">
        No worries — your payment was cancelled and no changes were made. You can try again anytime.
      </p>
      <a
        href="/"
        className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-gold text-foreground font-medium hover:bg-gold/10 transition"
      >
        Back to home
      </a>
    </div>
  </div>
);

export default PaymentCancel;
