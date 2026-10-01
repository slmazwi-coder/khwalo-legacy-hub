import { useState } from "react";

/**
 * Luloyiso wordmark. Renders the approved logo at /logo.png when available and
 * falls back to a styled text-mark so the header never appears broken.
 */
export function Logo({ className = "" }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  if (!failed) {
    return (
      <img
        className={className}
        src="/logo.png"
        alt="Luloyiso Funeral Services logo"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span className={`logo-fallback ${className}`}>
      <span className="logo-fallback-name">Luloyiso</span>
      <span className="logo-fallback-sub">Funeral Services</span>
    </span>
  );
}
