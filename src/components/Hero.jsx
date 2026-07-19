import React from "react";
import { ArrowRight, FileText, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import TypingText from "./TypingText.jsx";
import { useCountUp } from "../hooks/useCountUp.js";
import {
  personal as staticPersonal,
  stats as staticStats,
} from "../data/portfolio.js";
import { useSiteContent } from "../hooks/useContent.js";

const StatItem = ({ stat, start }) => {
  const value = useCountUp(stat.value, start);
  return (
    <div>
      <p className="text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
        {value}
        {stat.suffix}
      </p>
      <p className="mt-1 text-sm text-[var(--text-muted)]">{stat.label}</p>
    </div>
  );
};

// A calm, single fade-up used throughout the hero.
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Hero = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const { data: site } = useSiteContent();
  const personal = site.personal ?? staticPersonal;
  const stats = site.stats ?? staticStats;

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden surface pt-16"
    >
      {/* One very subtle radial tint — nothing busy. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, color-mix(in srgb, var(--accent) 7%, transparent), transparent 70%)",
        }}
      />

      <div className="container relative mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl">
          {/* Availability line */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1 text-sm text-[var(--text-muted)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            {personal.statusPill}
          </motion.div>

          {/* Name + role */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-4xl font-semibold leading-[1.1] tracking-tight text-[var(--text)] sm:text-5xl md:text-6xl"
          >
            {personal.name}
          </motion.h1>

          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-3 text-2xl font-medium text-[var(--accent)] sm:text-3xl"
          >
            <TypingText words={personal.roles} />
          </motion.div>

          {/* Tagline */}
          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]"
          >
            {personal.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm"
            >
              View my work <ArrowRight size={16} />
            </a>
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2 px-6 py-3 text-sm"
            >
              <FileText size={16} /> Resume
            </a>

            {/* Socials */}
            <div className="ml-1 flex items-center gap-1">
              {[
                { href: personal.socials.github, Icon: Github, label: "GitHub" },
                { href: personal.socials.linkedin, Icon: Linkedin, label: "LinkedIn" },
                { href: `mailto:${personal.email}`, Icon: Mail, label: "Email" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
                >
                  <Icon size={19} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Stats — plain, aligned, no boxes */}
          <motion.div
            ref={ref}
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-16 grid max-w-2xl grid-cols-2 gap-8 border-t border-[var(--border)] pt-8 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <StatItem key={stat.label} stat={stat} start={inView} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
