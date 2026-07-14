import React from "react";
import { motion } from "framer-motion";

/**
 * Clean, minimal section title: strong tracking-tight heading, a short
 * muted subtitle, and a small accent divider. No gradients or glow.
 */
const SectionHeading = ({ children, subtitle }) => {
  const viewport = { once: true, amount: 0.6 };
  return (
    <div className="mb-14 max-w-2xl">
      <motion.h2
        className="text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.h2>

      <motion.div
        className="mt-3 h-0.5 w-10 rounded-full bg-[var(--accent)]"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={viewport}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ originX: 0 }}
      />

      {subtitle && (
        <motion.p
          className="mt-4 text-base leading-relaxed text-[var(--text-muted)]"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
