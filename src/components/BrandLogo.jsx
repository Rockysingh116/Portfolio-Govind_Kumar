import React, { useState } from "react";

/**
 * Shows a company/issuer brand logo, hotlinked from the logo.dev CDN by
 * domain. If the logo fails to load (missing entry, network/token issue),
 * it gracefully falls back to a gradient "lettermark" avatar so a card
 * never shows a broken image.
 *
 * Props:
 *   name    display name (used for alt text + lettermark initials)
 *   domain  company domain, e.g. "tatamotors.com" (optional)
 *   size    px size of the square (default 48)
 *   rounded tailwind rounding class (default "rounded-xl")
 */

// logo.dev publishable token. Swap for your own free key from logo.dev
// if you like; the lettermark fallback covers any miss regardless.
const LOGO_TOKEN = "pk_X-1ZO13GSgeOoUrIuJ6GMQ";

const initials = (name = "") =>
  name
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "•";

const BrandLogo = ({ name, domain, size = 48, rounded = "rounded-xl" }) => {
  const [failed, setFailed] = useState(false);
  const showImg = domain && !failed;

  if (showImg) {
    const src = `https://img.logo.dev/${domain}?token=${LOGO_TOKEN}&size=${size * 2}&format=png`;
    return (
      <div
        className={`flex items-center justify-center overflow-hidden bg-white ${rounded} ring-1 ring-black/5 dark:ring-white/10`}
        style={{ width: size, height: size }}
      >
        <img
          src={src}
          alt={`${name} logo`}
          width={size}
          height={size}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain p-1.5"
        />
      </div>
    );
  }

  // Gradient lettermark fallback.
  return (
    <div
      className={`flex items-center justify-center bg-[var(--accent)] font-bold text-white shadow-inner ${rounded}`}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      aria-label={name}
      title={name}
    >
      {initials(name)}
    </div>
  );
};

export default BrandLogo;
