import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  Command,
} from "lucide-react";

/**
 * A ⌘K / Ctrl+K command palette for fast navigation and quick actions.
 *
 * Props:
 *   commands: [{ id, label, hint?, icon: LucideIcon, keywords?, perform() }]
 * Opens on ⌘K / Ctrl+K (and "/"), closes on Esc. Arrow keys + Enter to run.
 */
const CommandPalette = ({ commands }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Global open/close shortcuts.
  useEffect(() => {
    const onKey = (e) => {
      const cmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      const slash =
        e.key === "/" &&
        !/input|textarea/i.test(document.activeElement?.tagName || "");
      if (cmdK || slash) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Reset + focus when opened.
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      // focus after the enter animation kicks in
      const t = setTimeout(() => inputRef.current?.focus(), 40);
      return () => clearTimeout(t);
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => {
      const hay = `${c.label} ${c.hint || ""} ${(c.keywords || []).join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query, commands]);

  // Keep active index in range as the list shrinks/grows.
  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(0, filtered.length - 1)));
  }, [filtered.length]);

  const run = (cmd) => {
    setOpen(false);
    // let the overlay close before scrolling/acting
    setTimeout(() => cmd?.perform(), 60);
  };

  const onListKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[active]) run(filtered[active]);
    }
  };

  // Scroll the active row into view.
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[15vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-gray-200 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-white/10 /95"
            onKeyDown={onListKey}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-gray-100 px-4 dark:border-white/10">
              <Search size={18} className="text-gray-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Jump to a section or run a command…"
                className="w-full bg-transparent py-4 text-gray-900 placeholder-gray-400 focus:outline-none dark:text-white"
              />
              <kbd className="hidden rounded border border-gray-200 px-1.5 py-0.5 text-[10px] font-medium text-gray-500 sm:inline dark:border-white/10 dark:text-gray-400">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-[var(--text-muted)]">
                  No results for “{query}”.
                </p>
              ) : (
                filtered.map((cmd, i) => {
                  const Icon = cmd.icon;
                  const isActive = i === active;
                  return (
                    <button
                      key={cmd.id}
                      data-idx={i}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => run(cmd)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                        isActive
                          ? "chip"
                          : "text-[var(--text)]"
                      }`}
                    >
                      {Icon && (
                        <Icon
                          size={18}
                          className={
                            isActive
                              ? "text-[var(--accent)]"
                              : "text-gray-400"
                          }
                        />
                      )}
                      <span className="flex-1 text-sm font-medium">
                        {cmd.label}
                      </span>
                      {cmd.hint && (
                        <span className="text-xs text-gray-400">{cmd.hint}</span>
                      )}
                      {isActive && (
                        <CornerDownLeft size={14} className="text-gray-400" />
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer hint bar */}
            <div className="flex items-center gap-4 border-t border-gray-100 px-4 py-2.5 text-[11px] text-gray-400 dark:border-white/10">
              <span className="flex items-center gap-1">
                <ArrowUp size={12} />
                <ArrowDown size={12} /> navigate
              </span>
              <span className="flex items-center gap-1">
                <CornerDownLeft size={12} /> select
              </span>
              <span className="ml-auto flex items-center gap-1">
                <Command size={12} /> K to toggle
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
