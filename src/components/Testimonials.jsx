import React from "react";
import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import SectionHeading from "./SectionHeading.jsx";
import Carousel from "./Carousel.jsx";
import BrandLogo from "./BrandLogo.jsx";
import { testimonials } from "../data/portfolio.js";

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const TestimonialCard = ({ t }) => (
  <motion.blockquote
    className="card group relative flex h-full flex-col rounded-2xl p-7"
    whileHover={{ y: -4 }}
  >
    <Quote
      className="mb-4 text-[var(--accent)]"
      size={26}
      strokeWidth={2.5}
    />

    {/* Star rating */}
    <div className="mb-3 flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={15}
          className="fill-amber-400 text-amber-400"
        />
      ))}
    </div>

    <p className="flex-1 leading-relaxed text-[var(--text)]">“{t.quote}”</p>

    <footer className="hairline mt-6 flex items-center gap-3 pt-5">
      {t.domain ? (
        <BrandLogo name={t.name} domain={t.domain} size={44} rounded="rounded-full" />
      ) : (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-sm font-semibold text-[var(--accent)]">
          {initials(t.name)}
        </div>
      )}
      <div>
        <p className="font-semibold text-[var(--text)]">{t.name}</p>
        <p className="text-sm text-[var(--text-muted)]">{t.title}</p>
      </div>
    </footer>
  </motion.blockquote>
);

const Testimonials = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  if (!testimonials?.length) return null;

  return (
    <section id="testimonials" className="relative surface py-24">
      <div className="container mx-auto px-4">
        <SectionHeading
          inView={inView}
          subtitle="Don't just take my word for it — here's what teammates and mentors say."
        >
          Testimonials
        </SectionHeading>

        <div ref={ref} className="mx-auto max-w-5xl">
          <Carousel
            items={testimonials}
            getKey={(t, i) => `${t.name}-${i}`}
            perView={{ base: 1, md: 2, lg: 2 }}
            autoPlay
            interval={6000}
            ariaLabel="Testimonials carousel"
            renderItem={(t) => <TestimonialCard t={t} />}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
