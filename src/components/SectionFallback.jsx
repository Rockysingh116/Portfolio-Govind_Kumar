import React from "react";

/**
 * Lightweight placeholder shown while a lazily-loaded section chunk
 * is being fetched. Keeps layout height so the page doesn't jump.
 */
const SectionFallback = () => (
  <div className="flex min-h-[40vh] items-center justify-center py-20">
    <div className="flex flex-col items-center gap-3">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
      <span className="text-sm text-gray-400 dark:text-gray-500">Loading…</span>
    </div>
  </div>
);

export default SectionFallback;
