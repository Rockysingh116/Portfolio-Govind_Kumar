import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * A soft accent glow that trails the cursor across the whole page, plus a
 * small precise ring right at the pointer. Adds an "alive / interactive"
 * feel to the dark canvas. Fixed + pointer-events-none so it never blocks
 * clicks. Auto-disabled on touch devices and for reduced-motion users.
 */
const CursorGlow = () => {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  // The big glow lags slightly (spring); the ring tracks tightly.
  const glowX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 });
  const glowY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 });

  useEffect(() => {
    // Only enable for fine pointers (mouse/trackpad).
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Big soft aurora glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[5] h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: glowX,
          y: glowY,
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent) 22%, transparent), transparent 60%)",
        }}
      />
      {/* Tight tracking ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[6] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 mix-blend-difference"
        style={{ x, y }}
      />
    </>
  );
};

export default CursorGlow;
