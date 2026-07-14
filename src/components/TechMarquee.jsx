import React from "react";
import { featuredTech, resolveTech } from "../data/techStack.js";

/** An infinite, auto-scrolling strip of tool logos. Pauses on hover. */
const TechMarquee = ({ speed = 35 }) => {
  const items = featuredTech
    .map((name) => ({ name, entry: resolveTech(name) }))
    .filter((x) => x.entry);

  // Duplicate the list so the loop is seamless.
  const loop = [...items, ...items];

  return (
    <div className="group/marquee marquee-mask relative flex overflow-hidden">
      <div
        className="animate-marquee flex shrink-0 items-center gap-10 pr-10"
        style={{ "--marquee-duration": `${speed}s` }}
      >
        {loop.map(({ name, entry }, i) => (
          <div
            key={`${name}-${i}`}
            className="flex items-center gap-2.5 opacity-70 transition-opacity hover:opacity-100"
            title={name}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg p-1.5 ${
                entry.dark ? "bg-gray-100 dark:bg-gray-200" : ""
              }`}
              style={
                entry.dark ? {} : { backgroundColor: `${entry.color}14` }
              }
            >
              <img
                src={entry.logo}
                alt={name}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
            <span className="whitespace-nowrap text-sm font-medium text-[var(--text-muted)]">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;
