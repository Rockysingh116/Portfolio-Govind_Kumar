import React from "react";
import { personal } from "../data/portfolio.js";

/**
 * Brand logo: a gradient "GK" monogram mark next to the brand name.
 * Uses a unique gradient id so multiple instances never clash.
 */
const Logo = ({ showName = true, size = 36 }) => (
  <span className="flex items-center gap-2.5">
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      role="img"
      aria-label={`${personal.brand} logo`}
      className="flex-shrink-0"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4f46e5" />
          <stop offset="1" stopColor="#9333ea" />
        </linearGradient>
      </defs>
      <rect x="16" y="16" width="480" height="480" rx="112" fill="url(#logoGrad)" />
      <g
        fill="none"
        stroke="#ffffff"
        strokeWidth="34"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M236 186 A80 80 0 1 0 236 326 L236 262 L190 262" />
        <path d="M300 160 L300 352" />
        <path d="M382 160 L302 256 L382 352" />
      </g>
    </svg>
    {showName && (
      <span className="text-xl font-bold gradient-text">{`{${personal.brand}}`}</span>
    )}
  </span>
);

export default Logo;
