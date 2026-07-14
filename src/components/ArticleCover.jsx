import React from "react";

/**
 * A lightweight, always-available article cover.
 * If `image` is provided, it's used directly. Otherwise we render a
 * gradient cover from `cover` = { from, to, emoji } — no network request,
 * looks consistent in light & dark, and never 404s.
 */
const ArticleCover = ({ image, cover, title, className = "" }) => {
  if (image) {
    return (
      <img
        src={image}
        alt={title}
        loading="lazy"
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  const from = cover?.from || "#6366f1";
  const to = cover?.to || "#a855f7";
  const emoji = cover?.emoji || "✍️";

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      aria-hidden="true"
    >
      {/* soft geometric texture */}
      <svg
        className="absolute inset-0 h-full w-full opacity-25"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`grid-${from.replace("#", "")}`}
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M28 0H0V28"
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.4"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#grid-${from.replace("#", "")})`}
        />
      </svg>
      <span className="relative text-5xl drop-shadow-lg">{emoji}</span>
      <span className="absolute -bottom-6 -right-4 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
    </div>
  );
};

export default ArticleCover;
