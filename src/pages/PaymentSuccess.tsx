const PaymentSuccess = () => (
  <div className="min-h-screen flex items-center justify-center bg-background px-4">
    <div className="max-w-md w-full bg-card border border-border rounded-xl p-8 text-center">
      <h1 className="font-display text-3xl font-bold text-foreground mb-3">Payment setup complete</h1>
      <p className="text-muted-foreground text-sm mb-6">
        Thank you. Your subscription payment has been initiated. If your payment was successful, you will receive confirmation shortly.
      </p>
      <a
        href="/"
        className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-gradient-maroon text-primary-foreground font-medium hover:opacity-90 transition shadow-maroon"
      >
        Back to home
      </a>
    </div>
  </div>
);

export default PaymentSuccess;
