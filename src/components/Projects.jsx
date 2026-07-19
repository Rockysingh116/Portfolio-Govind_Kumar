import React, { useMemo, useState } from "react";
import { ExternalLink, Github, Lock, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

import SectionHeading from "./SectionHeading.jsx";
import ProjectModal from "./ProjectModal.jsx";
import { projects as staticProjects } from "../data/portfolio.js";
import { useContent } from "../hooks/useContent.js";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Build the filter list: All + categories present + a few common techs.
function buildFilters(items) {
  const cats = [...new Set(items.map((p) => p.category).filter(Boolean))];
  const techCounts = {};
  items.forEach((p) =>
    (p.technologies || []).forEach((t) => {
      techCounts[t] = (techCounts[t] || 0) + 1;
    })
  );
  const topTechs = Object.entries(techCounts)
    .filter(([, n]) => n >= 2) // only techs that appear in 2+ projects
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([t]) => t);

  return ["All", ...cats, ...topTechs];
}

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const { data: projects } = useContent("projects", staticProjects);

  const filters = useMemo(() => buildFilters(projects), [projects]);

  const visible = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter(
      (p) => p.category === filter || (p.technologies || []).includes(filter)
    );
  }, [filter, projects]);

  return (
    <section
      id="projects"
      className="relative surface py-24"
    >
      <div className="container mx-auto px-4">
        <SectionHeading
          inView={inView}
          subtitle="Real products, real impact — from enterprise SaaS to AI-powered tools. Filter by type or tech, and click any card for the full story."
        >
          Things I&apos;ve Built
        </SectionHeading>

        {/* Filter chips */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {filters.map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-[var(--text-muted)] hover:text-[var(--accent)]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="projectFilter"
                    className="absolute inset-0 rounded-full bg-[var(--accent)]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{f}</span>
              </button>
            );
          })}
        </div>

        <motion.div
          ref={ref}
          layout
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.article
                key={project.id || project.title}
                layout
                onClick={() => setSelected(project)}
                className="card group relative flex cursor-pointer flex-col overflow-hidden rounded-xl shadow-md transition-all "
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
              >
                {/* accent top line revealed on hover */}
                <span className="absolute inset-x-0 top-0 z-10 h-0.5 origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-300 group-hover:scale-x-100" />
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Scrim so the image blends into the card body */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Top-left: category or Enterprise badge */}
                  {project.company ? (
                    <span className="absolute left-3 top-3 rounded-full bg-gray-900/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      Enterprise
                    </span>
                  ) : (
                    project.category && (
                      <span className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-[var(--accent)] backdrop-blur-sm dark:bg-black/60 dark:text-[var(--accent)]">
                        {project.category}
                      </span>
                    )
                  )}

                  {/* Bottom overlay: lead tech chips on the image */}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-black/45 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View-details overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[var(--text)] shadow-lg">
                      <Maximize2 size={16} /> View details
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-1 text-xl font-semibold text-[var(--text)]">
                    {project.title}
                  </h3>
                  {project.company && (
                    <p className="mb-2 text-sm font-medium text-[var(--accent)]">
                      {project.company}
                    </p>
                  )}
                  <p className="mb-4 line-clamp-3 flex-1 text-[var(--text-muted)]">
                    {project.description}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="chip px-2.5 py-1 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.liveLink || project.githubLink ? (
                    <div className="flex space-x-4">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center text-sm font-medium text-[var(--accent)] hover:text-[var(--accent)] dark:text-[var(--accent)]"
                        >
                          <ExternalLink size={16} className="mr-1" /> Live Demo
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                        >
                          <Github size={16} className="mr-1" /> Code
                        </a>
                      )}
                    </div>
                  ) : (
                    <span className="flex items-center text-sm font-medium text-gray-400 dark:text-gray-500">
                      <Lock size={14} className="mr-1" /> Proprietary / NDA
                    </span>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default Projects;
