import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * A card that tilts in 3D toward the cursor and shows a spotlight glow
 * that follows the mouse. Pure Framer Motion + CSS — no deps.
 *
 * <TiltCard className="rounded-2xl border ...">…</TiltCard>
 */
const TiltCard = ({
  children,
  className = "",
  max = 8, // max tilt in degrees
  glow = true,
  ...rest
}) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const px = useMotionValue(0.5); // pointer x (0..1)
  const py = useMotionValue(0.5);

  const rotX = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 200,
    damping: 18,
  });
  const rotY = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 200,
    damping: 18,
  });

  // Spotlight background following the pointer.
  const glowBg = useTransform(
    [px, py],
    ([x, y]) =>
      `radial-gradient(240px circle at ${x * 100}% ${y * 100}%, rgba(129,140,248,0.22), transparent 70%)`
  );

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 900 }}
      whileHover={{ scale: 1.02 }}
      className={`relative [transform-style:preserve-3d] ${className}`}
      {...rest}
    >
      {glow && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glowBg, opacity: hovered ? 1 : 0 }}
        />
      )}
      <div className="relative [transform:translateZ(30px)]">{children}</div>
    </motion.div>
  );
};

export default TiltCard;
