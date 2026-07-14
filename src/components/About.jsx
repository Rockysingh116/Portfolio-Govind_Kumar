import React from "react";
import {
  MonitorSmartphone,
  Server,
  BrainCircuit,
  Rocket,
  Briefcase,
  MapPin,
  Layers,
  GraduationCap,
  Download,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import SectionHeading from "./SectionHeading.jsx";
import { about, personal } from "../data/portfolio.js";

const iconMap = {
  MonitorSmartphone,
  Server,
  BrainCircuit,
  Rocket,
  Briefcase,
  MapPin,
  Layers,
  GraduationCap,
};

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="relative surface py-24">
      <div className="container mx-auto px-4">
        <SectionHeading subtitle="The human behind the code — my story, my craft, and what drives me.">
          About
        </SectionHeading>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 gap-12 lg:grid-cols-[340px_1fr] lg:gap-16"
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* ---------- Left: photo + info ---------- */}
          <motion.div variants={item} className="space-y-6">
            <div className="relative overflow-hidden rounded-2xl border border-[var(--border)]">
              <img
                src={about.image}
                alt={`${personal.name} — ${about.badgeRole}`}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              {about.available && (
                <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-[var(--bg)]/90 px-3 py-1 text-xs font-medium text-[var(--text)] backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Available for work
                </div>
              )}
            </div>

            {/* Quick facts */}
            <div className="card rounded-2xl p-5">
              <div className="space-y-4">
                {about.quickFacts.map((fact) => {
                  const Icon = iconMap[fact.icon] ?? Layers;
                  return (
                    <div key={fact.label} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                        <Icon size={16} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs text-[var(--text-muted)]">
                          {fact.label}
                        </p>
                        <p className="truncate text-sm font-medium text-[var(--text)]">
                          {fact.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="hairline mt-5 flex items-center gap-1 pt-4">
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
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
                  >
                    <Icon size={18} />
                  </a>
                ))}
                <a
                  href={personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-sm"
                >
                  <Download size={15} /> CV
                </a>
              </div>
            </div>
          </motion.div>

          {/* ---------- Right: story ---------- */}
          <div>
            <motion.p
              variants={item}
              className="mb-6 border-l-2 border-[var(--accent)] pl-4 text-xl font-medium leading-snug text-[var(--text)]"
            >
              Great software is about people first, and code second.
            </motion.p>

            {about.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                className="mb-4 leading-relaxed text-[var(--text-muted)]"
                variants={item}
              >
                {para}
              </motion.p>
            ))}

            <motion.div className="mt-8 flex flex-wrap gap-2" variants={container}>
              {about.traits.map((trait) => (
                <motion.span
                  key={trait}
                  className="cursor-default rounded-full border border-[var(--border)] px-3.5 py-1.5 text-sm text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  variants={item}
                >
                  {trait}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ---------- Expertise ---------- */}
        <div className="mt-24">
          <h3 className="mb-10 text-xl font-semibold tracking-tight text-[var(--text)]">
            What I bring to the table
          </h3>
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {about.expertise.map((exp) => {
              const Icon = iconMap[exp.icon] ?? MonitorSmartphone;
              return (
                <motion.div
                  key={exp.title}
                  variants={item}
                  className="card h-full rounded-2xl p-6"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Icon size={22} />
                  </div>
                  <h4 className="mb-2 font-semibold text-[var(--text)]">
                    {exp.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                    {exp.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
