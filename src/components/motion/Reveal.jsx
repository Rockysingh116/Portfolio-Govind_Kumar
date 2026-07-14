import React from "react";
import { motion } from "framer-motion";

/**
 * Scroll-reveal wrapper powered by Framer Motion's `whileInView`.
 * Unlike triggerOnce animations, this re-plays every time the element
 * scrolls back into view — so the page stays alive as you move around.
 *
 * <Reveal><Card/></Reveal>
 * <Reveal direction="left" delay={0.1}>…</Reveal>
 */
const offsets = {
  up: { x: 0, y: 48 },
  down: { x: 0, y: -48 },
  left: { x: 60, y: 0 },
  right: { x: -60, y: 0 },
  none: { x: 0, y: 0 },
};

const Reveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  amount = 0.25,
  once = false,
  className,
  as = "div",
  ...rest
}) => {
  const off = offsets[direction] ?? offsets.up;
  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x: off.x, y: off.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
