import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * A branded loading screen shown briefly on first paint, then fades out.
 * Draws the same "GK" monogram as the favicon/logo so branding is consistent.
 */
const Preloader = () => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Hide once the window has loaded (or after a max wait).
    const finish = () => setTimeout(() => setDone(true), 600);
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish);
    const safety = setTimeout(() => setDone(true), 2500);
    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(safety);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-gray-950"
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          <motion.svg
            width="88"
            height="88"
            viewBox="0 0 512 512"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <defs>
              <linearGradient id="preGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#4f46e5" />
                <stop offset="1" stopColor="#9333ea" />
              </linearGradient>
            </defs>
            <motion.rect
              x="16"
              y="16"
              width="480"
              height="480"
              rx="112"
              fill="url(#preGrad)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            />
            <motion.g
              fill="none"
              stroke="#ffffff"
              strokeWidth="34"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            >
              <motion.path d="M236 186 A80 80 0 1 0 236 326 L236 262 L190 262" />
              <motion.path d="M300 160 L300 352" />
              <motion.path d="M382 160 L302 256 L382 352" />
            </motion.g>
          </motion.svg>

          <motion.div
            className="mt-6 h-1 w-40 overflow-hidden rounded-full bg-gray-200 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="h-full rounded-full bg-[var(--accent)]"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.p
            className="mt-4 text-sm font-medium tracking-wide text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Crafting something great…
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
