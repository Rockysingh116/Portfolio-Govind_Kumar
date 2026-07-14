import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Github,
  Lock,
  Target,
  Lightbulb,
  TrendingUp,
  CheckCircle2,
  Building2,
} from "lucide-react";

/**
 * Full-screen project case-study modal. Opens when a project card is clicked.
 * Renders whatever case-study fields exist (problem/approach/outcomes/highlights)
 * and gracefully falls back to the plain description when they're absent.
 */
const ProjectModal = ({ project, onClose }) => {
  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[75] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} details`}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-white/10 "
          >
            {/* Header image */}
            <div className="relative h-52 shrink-0 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-4 left-5 right-5">
                <h3 className="text-2xl font-bold text-white drop-shadow">
                  {project.title}
                </h3>
                {project.company && (
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-200">
                    <Building2 size={14} /> {project.company}
                  </p>
                )}
              </div>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              {/* Tech */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="chip px-3 py-1 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Case study, or fallback description */}
              {project.problem || project.approach || project.outcomes ? (
                <div className="space-y-5">
                  {project.problem && (
                    <Block
                      Icon={Target}
                      title="The Problem"
                      body={project.problem}
                    />
                  )}
                  {project.approach && (
                    <Block
                      Icon={Lightbulb}
                      title="My Approach"
                      body={project.approach}
                    />
                  )}
                  {project.outcomes && (
                    <Block
                      Icon={TrendingUp}
                      title="The Outcome"
                      body={project.outcomes}
                    />
                  )}
                </div>
              ) : (
                <p className="text-[var(--text-muted)]">
                  {project.description}
                </p>
              )}

              {/* Highlights */}
              {project.highlights?.length > 0 && (
                <div>
                  <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                    Highlights
                  </h4>
                  <ul className="space-y-2">
                    {project.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <CheckCircle2
                          size={16}
                          className="mt-0.5 shrink-0 text-green-500"
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Footer actions */}
            <div className="flex shrink-0 items-center gap-3 border-t border-gray-100 p-5 dark:border-white/10">
              {project.liveLink ? (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg btn-primary py-2.5 text-sm"
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
              ) : null}
              {project.githubLink ? (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 dark:border-white/10 dark:text-gray-200"
                >
                  <Github size={16} /> View Code
                </a>
              ) : null}
              {!project.liveLink && !project.githubLink && (
                <span className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-100 py-2.5 text-sm font-medium text-gray-500  dark:text-gray-400">
                  <Lock size={14} /> Proprietary / under NDA
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Block = ({ Icon, title, body }) => (
  <div>
    <h4 className="mb-1.5 flex items-center gap-2 font-semibold text-[var(--text)]">
      <Icon size={18} className="text-[var(--accent)]" />
      {title}
    </h4>
    <p className="pl-7 text-[var(--text-muted)]">{body}</p>
  </div>
);

export default ProjectModal;
