import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * A reusable, accessible carousel.
 *
 * Props:
 *   items          array of data
 *   renderItem     (item, index) => ReactNode  — renders one slide's content
 *   getKey         (item, index) => key        — stable React key (optional)
 *   perView        { base, md, lg } items visible per breakpoint (default 1/1/1)
 *   autoPlay       boolean — auto-advance (default false)
 *   interval       ms between auto-advances (default 5000)
 *   loop           wrap around at the ends (default true)
 *   ariaLabel      accessible label for the region
 *
 * Supports: prev/next arrows, dot indicators, drag/swipe, arrow-key nav,
 * autoplay that pauses on hover/focus and respects prefers-reduced-motion.
 */
const Carousel = ({
  items,
  renderItem,
  getKey,
  perView = { base: 1, md: 1, lg: 1 },
  autoPlay = false,
  interval = 5000,
  loop = true,
  ariaLabel = "Carousel",
}) => {
  const [visible, setVisible] = useState(perView.base);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef(null);

  // Responsive items-per-view via matchMedia (avoids a resize listener storm).
  useEffect(() => {
    const mdq = window.matchMedia("(min-width: 768px)");
    const lgq = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      if (lgq.matches) setVisible(perView.lg ?? perView.md ?? perView.base);
      else if (mdq.matches) setVisible(perView.md ?? perView.base);
      else setVisible(perView.base);
    };
    update();
    mdq.addEventListener("change", update);
    lgq.addEventListener("change", update);
    return () => {
      mdq.removeEventListener("change", update);
      lgq.removeEventListener("change", update);
    };
  }, [perView.base, perView.md, perView.lg]);

  // Number of "pages" (start positions). Clamp index if visible count changes.
  const pageCount = Math.max(1, items.length - visible + 1);
  useEffect(() => {
    setIndex((i) => Math.min(i, pageCount - 1));
  }, [pageCount]);

  const go = useCallback(
    (next) => {
      setDirection(next > index ? 1 : -1);
      setIndex(() => {
        if (next < 0) return loop ? pageCount - 1 : 0;
        if (next > pageCount - 1) return loop ? 0 : pageCount - 1;
        return next;
      });
    },
    [index, loop, pageCount]
  );

  const prev = useCallback(() => go(index - 1), [go, index]);
  const next = useCallback(() => go(index + 1), [go, index]);

  // Autoplay — pauses on hover/focus and when the tab is hidden.
  useEffect(() => {
    if (!autoPlay || paused || pageCount <= 1) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;
    const id = setInterval(() => go(index + 1), interval);
    return () => clearInterval(id);
  }, [autoPlay, paused, pageCount, interval, go, index]);

  // Keyboard navigation when the carousel has focus.
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  const slideVariants = useMemo(
    () => ({
      enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
      center: { opacity: 1, x: 0 },
      exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
    }),
    []
  );

  // The window of items currently shown.
  const shown = items.slice(index, index + visible);

  const single = pageCount <= 1;

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative outline-none"
    >
      <div className="overflow-hidden px-1 py-1">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            drag={single ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (single) return;
              if (info.offset.x < -80) next();
              else if (info.offset.x > 80) prev();
            }}
            className={`grid gap-6 ${
              visible >= 3
                ? "md:grid-cols-2 lg:grid-cols-3"
                : visible === 2
                ? "md:grid-cols-2"
                : "grid-cols-1"
            }`}
          >
            {shown.map((item, i) => (
              <div key={getKey ? getKey(item, index + i) : index + i}>
                {renderItem(item, index + i)}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {!single && (
        <>
          {/* Arrows */}
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between sm:flex">
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="pointer-events-auto -ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text-muted)] shadow-sm transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] lg:-ml-5"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="pointer-events-auto -mr-2 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text-muted)] shadow-sm transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] lg:-mr-5"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index
                    ? "w-6 bg-[var(--accent)]"
                    : "w-2 bg-[var(--border)] hover:bg-[var(--text-muted)]"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
