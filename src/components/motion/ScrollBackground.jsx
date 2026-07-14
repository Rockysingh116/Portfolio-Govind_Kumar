import React from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * A fixed, full-page animated backdrop whose gradient orbs drift as you
 * scroll. Sits behind all content (-z-10) and is purely decorative.
 *
 * Perf: only `transform` (x/y) is animated — GPU-composited, no layout
 * reflow or repaint per frame. No filter/hue-rotate (those force full
 * repaints). Disabled entirely when the user prefers reduced motion.
 */
const ScrollBackground = () => {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 24,
    restDelta: 0.001,
  });

  // Drift distances in px, applied via translate (transform only).
  const y1 = useTransform(p, [0, 1], [-40, 260]);
  const x1 = useTransform(p, [0, 1], [-40, 160]);
  const y2 = useTransform(p, [0, 1], [120, -140]);
  const x2 = useTransform(p, [0, 1], [60, -120]);

  if (reduce) {
    // Static, calm backdrop for reduced-motion users.
    return (
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-20 top-10 h-[34rem] w-[34rem] rounded-full bg-indigo-400/20 blur-[110px] dark:bg-indigo-600/15" />
        <div className="absolute -right-20 bottom-10 h-[32rem] w-[32rem] rounded-full bg-purple-400/20 blur-[110px] dark:bg-purple-600/15" />
      </div>
    );
  }

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -left-20 top-0 h-[34rem] w-[34rem] rounded-full bg-indigo-400/25 blur-[110px] will-change-transform dark:bg-indigo-600/20"
        style={{ x: x1, y: y1 }}
      />
      <motion.div
        className="absolute -right-20 top-1/3 h-[32rem] w-[32rem] rounded-full bg-purple-400/25 blur-[110px] will-change-transform dark:bg-purple-600/20"
        style={{ x: x2, y: y2 }}
      />
    </div>
  );
};

export default ScrollBackground;
