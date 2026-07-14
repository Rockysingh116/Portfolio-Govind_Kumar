import React from "react";
import { resolveTech } from "../data/techStack.js";

/**
 * Renders a technology's logo with its brand color as a tinted chip.
 * Near-black logos (`dark: true`) get a light chip so they stay visible
 * in dark mode. Falls back to a colored initial when no logo exists.
 */
const TechLogo = ({ name, size = 40, showLabel = false }) => {
  const entry = resolveTech(name);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`flex items-center justify-center rounded-2xl p-2.5 transition-transform ${
          entry?.dark ? "bg-gray-100 dark:bg-gray-200" : "bg-transparent"
        }`}
        style={{
          width: size + 20,
          height: size + 20,
          ...(entry && !entry.dark
            ? { backgroundColor: `${entry.color}18` }
            : {}),
        }}
      >
        {entry ? (
          <img
            src={entry.logo}
            alt={`${name} logo`}
            width={size}
            height={size}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        ) : (
          <span
            className="flex h-full w-full items-center justify-center rounded-xl text-lg font-bold text-white"
            style={{ backgroundColor: "#6366f1" }}
          >
            {name.charAt(0)}
          </span>
        )}
      </div>
      {showLabel && (
        <span className="text-center text-xs font-medium text-[var(--text-muted)]">
          {name}
        </span>
      )}
    </div>
  );
};

export default TechLogo;
