import React from "react";
import {
  LayoutDashboard,
  Palette,
  Workflow,
  Server,
  Database,
  Code2,
  BrainCircuit,
  Boxes,
  FlaskConical,
  Cloud,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import SectionHeading from "./SectionHeading.jsx";
import TechLogo from "./TechLogo.jsx";
import TechMarquee from "./TechMarquee.jsx";
import TiltCard from "./motion/TiltCard.jsx";
import RevealGroup, { RevealItem } from "./motion/RevealGroup.jsx";
import { skillCategories } from "../data/portfolio.js";
import { featuredTech, resolveTech } from "../data/techStack.js";

// Modern lucide icons for each category (no more emojis).
const catIcon = {
  LayoutDashboard,
  Palette,
  Workflow,
  Server,
  Database,
  Code2,
  BrainCircuit,
  Boxes,
  FlaskConical,
  Cloud,
  ShieldCheck,
};

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Show the 12 headline technologies as a big interactive logo grid.
  const headline = featuredTech.slice(0, 12);

  return (
    <section
      id="skills"
      className="relative surface-subtle py-24"
    >
      {/* subtle grid backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />

      <div className="container relative mx-auto px-4" ref={ref}>
        <SectionHeading
          inView={inView}
          subtitle="A battle-tested toolkit spanning frontend, backend, data, and AI — the arsenal I reach for to ship real products."
        >
          My Tech Arsenal
        </SectionHeading>

        {/* ---------- Headline logo grid ---------- */}
        <RevealGroup
          className="mx-auto mb-16 grid max-w-4xl grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6"
          stagger={0.05}
          amount={0.3}
        >
          {headline.map((name) => (
            <RevealItem key={name} className="flex justify-center">
              <motion.div whileHover={{ scale: 1.15, y: -6, rotate: -3 }}>
                <TechLogo name={name} size={40} showLabel />
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* ---------- Category cards with per-skill logos ---------- */}
        <RevealGroup
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
          amount={0.1}
        >
          {skillCategories.map((category) => {
            const Icon = catIcon[category.icon] ?? LayoutDashboard;
            return (
              <RevealItem key={category.title}>
                <TiltCard className="gradient-border h-full card rounded-2xl p-6 transition-colors dark:border-white/10 ">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Icon size={22} />
                    </span>
                    <h3 className="text-lg font-semibold text-[var(--text)]">
                      {category.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => {
                      const entry = resolveTech(skill);
                      return (
                        <motion.span
                          key={skill}
                          className="flex items-center gap-1.5 rounded-full border border-[var(--border)] py-1 pl-1.5 pr-3 text-sm text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.96 }}
                        >
                          {entry ? (
                            <span
                              className={`flex h-5 w-5 items-center justify-center rounded-full p-0.5 ${
                                entry.dark ? "bg-gray-200" : ""
                              }`}
                              style={
                                entry.dark
                                  ? {}
                                  : { backgroundColor: `${entry.color}20` }
                              }
                            >
                              <img
                                src={entry.logo}
                                alt=""
                                className="h-full w-full object-contain"
                                loading="lazy"
                              />
                            </span>
                          ) : (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[10px] font-bold text-[var(--accent)]">
                              {skill.charAt(0)}
                            </span>
                          )}
                          {skill}
                        </motion.span>
                      );
                    })}
                  </div>
                </TiltCard>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* ---------- Infinite marquee ---------- */}
        <div className="mt-16">
          <p className="mb-6 text-center text-sm font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">
            Tools I work with every day
          </p>
          <TechMarquee />
        </div>
      </div>
    </section>
  );
};

export default Skills;
