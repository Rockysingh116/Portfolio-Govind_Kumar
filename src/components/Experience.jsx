import React from "react";
import { MapPin, Code2, BarChart3, Users, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import SectionHeading from "./SectionHeading.jsx";
import BrandLogo from "./BrandLogo.jsx";
import { experience } from "../data/portfolio.js";

// Visual treatment per role type.
const tagStyles = {
  Engineering: {
    Icon: Code2,
    chip: "chip",
  },
  Data: {
    Icon: BarChart3,
    chip: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
  },
  People: {
    Icon: Users,
    chip: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  },
};

const Experience = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="experience"
      className="relative surface-subtle py-24"
    >
      <div className="container mx-auto px-4">
        <SectionHeading
          inView={inView}
          subtitle="From talent acquisition to data analytics to software engineering — every step shaped how I build."
        >
          My Journey
        </SectionHeading>

        <div ref={ref} className="relative mx-auto max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-5 top-2 h-full w-0.5 bg-[var(--border)]" />

          {experience.map((job, index) => {
            const style = tagStyles[job.tag] ?? tagStyles.Engineering;
            const { Icon } = style;
            return (
              <motion.div
                key={`${job.company}-${index}`}
                className="relative mb-8 pl-16"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Node — company logo with a small role-type badge */}
                <motion.div
                  className="absolute left-[-6px] top-0 rounded-xl ring-4 ring-[var(--bg)]"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: index * 0.08 + 0.15, type: "spring" }}
                  style={{ borderRadius: "0.75rem" }}
                >
                  <div className="relative">
                    <BrandLogo name={job.company} domain={job.domain} size={44} />
                    <span
                      className={`absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full text-white shadow-md ${
                        job.tag === "Data"
                          ? "bg-emerald-500"
                          : job.tag === "People"
                          ? "bg-amber-500"
                          : "bg-[var(--accent)]"
                      }`}
                    >
                      <Icon size={12} />
                    </span>
                  </div>
                </motion.div>

                <div className="card rounded-2xl p-6 transition-shadow hover:shadow-lg dark:border-white/10 ">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${style.chip}`}
                    >
                      {job.period}
                    </span>
                    {job.tag && (
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600  dark:text-gray-300">
                        {job.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-[var(--text)]">
                    {job.title}
                  </h3>
                  <p className="font-medium text-[var(--accent)]">
                    {job.company}
                  </p>
                  {job.location && (
                    <p className="mt-1 flex items-center gap-1 text-sm text-[var(--text-muted)]">
                      <MapPin size={14} /> {job.location}
                    </p>
                  )}

                  {job.summary && (
                    <p className="mt-3 italic text-[var(--text-muted)]">
                      {job.summary}
                    </p>
                  )}

                  <ul className="mt-3 space-y-2">
                    {job.achievements.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-2.5 text-sm text-[var(--text-muted)]"
                      >
                        <Check
                          size={16}
                          className="mt-0.5 flex-shrink-0 text-[var(--accent)]"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
