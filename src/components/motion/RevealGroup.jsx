import React from "react";
import { motion } from "framer-motion";
import { groupVariants, itemVariants } from "./variants.js";

/**
 * Staggered scroll-reveal container. Wrap a grid/list in <RevealGroup>
 * and render each child as <RevealItem> to have them cascade in.
 * Re-plays whenever it re-enters the viewport (once=false by default).
 */
export const RevealGroup = ({
  children,
  className,
  stagger = 0.1,
  delayChildren = 0,
  amount = 0.2,
  once = false,
  as = "div",
  ...rest
}) => {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      variants={groupVariants(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

export const RevealItem = ({ children, className, as = "div", ...rest }) => {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag className={className} variants={itemVariants} {...rest}>
      {children}
    </MotionTag>
  );
};

export default RevealGroup;
