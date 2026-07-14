// Shared Framer Motion variants (kept in a plain module so component
// files only export components — keeps Fast Refresh happy).

export const groupVariants = (stagger = 0.1, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const itemVariants = {
  // Only opacity + transform animate — both GPU-composited, so no per-frame
  // repaint (dropping the blur filter removes the main source of jank).
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};
