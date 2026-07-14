import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Star,
  GitFork,
  Users,
  BookMarked,
  ExternalLink,
  Github,
  AlertCircle,
} from "lucide-react";

import SectionHeading from "./SectionHeading.jsx";
import { useGitHub } from "../hooks/useGitHub.js";
import { personal, repoDescriptions } from "../data/portfolio.js";

// Prefer GitHub's own description; fall back to our polished override,
// then to a neutral default so a card is never blank.
const describeRepo = (repo) =>
  repo.description?.trim() ||
  repoDescriptions[repo.name] ||
  "A project I built — click through to explore the code.";

// Small dot colors for common languages (falls back to indigo).
const LANG_COLOR = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  Shell: "#89e051",
  Vue: "#41b883",
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

const StatPill = ({ Icon, label, value }) => (
  <div className="card flex items-center gap-2 rounded-xl px-4 py-3">
    <Icon size={18} className="text-[var(--accent)] dark:text-[var(--accent)]" />
    <span className="text-lg font-bold text-[var(--text)]">
      {value}
    </span>
    <span className="text-sm text-[var(--text-muted)]">{label}</span>
  </div>
);

const GitHubActivity = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { profile, repos, totalStars, loading, error } = useGitHub(
    personal.githubUsername,
    { topN: 6 }
  );

  return (
    <section
      id="github"
      className="relative surface py-24"
    >
      <div className="container mx-auto px-4">
        <SectionHeading
          inView={inView}
          subtitle="Live from GitHub — my public repositories and open-source activity, straight from the source."
        >
          Building in the Open
        </SectionHeading>

        <div ref={ref} className="mx-auto max-w-5xl">
          {/* Error state — still show a link to the profile */}
          {error && (
            <div className="mx-auto flex max-w-md flex-col items-center gap-3 card rounded-xl p-8 text-center">
              <AlertCircle className="text-amber-500" size={28} />
              <p className="text-[var(--text-muted)]">{error}</p>
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 rounded-lg btn-primary px-4 py-2 text-sm"
              >
                <Github size={16} /> View my GitHub
              </a>
            </div>
          )}

          {/* Loading skeletons */}
          {loading && !error && (
            <>
              <div className="mb-8 flex flex-wrap justify-center gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-14 w-40 animate-pulse rounded-xl bg-[var(--border)]"
                  />
                ))}
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-40 animate-pulse rounded-xl bg-[var(--border)]"
                  />
                ))}
              </div>
            </>
          )}

          {/* Loaded */}
          {!loading && !error && profile && (
            <>
              {/* Profile header with real GitHub avatar */}
              <motion.a
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card mx-auto mb-8 flex max-w-md items-center gap-4 rounded-2xl p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                <img
                  src={profile.avatar}
                  alt={`${profile.name || profile.login} on GitHub`}
                  loading="lazy"
                  className="h-16 w-16 rounded-full ring-2 ring-[var(--border)]"
                />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-[var(--text)]">
                    {profile.name || profile.login}
                  </p>
                  <p className="truncate text-sm text-[var(--accent)]">
                    @{profile.login}
                  </p>
                  {profile.bio && (
                    <p className="mt-0.5 line-clamp-1 text-xs text-[var(--text-muted)]">
                      {profile.bio}
                    </p>
                  )}
                </div>
              </motion.a>

              {/* Stat row */}
              <motion.div
                className="mb-10 flex flex-wrap items-center justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <StatPill
                  Icon={BookMarked}
                  label="repos"
                  value={profile.publicRepos}
                />
                <StatPill Icon={Star} label="stars" value={totalStars} />
                <StatPill
                  Icon={Users}
                  label="followers"
                  value={profile.followers}
                />
              </motion.div>

              {/* Top repos */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {repos.map((repo, i) => (
                  <motion.a
                    key={repo.id}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{ y: -6 }}
                    className="card group flex flex-col rounded-xl p-5"
                  >
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="flex items-center gap-2 font-semibold text-[var(--text)]">
                        <BookMarked
                          size={16}
                          className="shrink-0 text-[var(--accent)]"
                        />
                        <span className="truncate">{repo.name}</span>
                      </h3>
                      <ExternalLink
                        size={15}
                        className="shrink-0 text-[var(--text-muted)] opacity-50 transition-all group-hover:opacity-100 group-hover:text-[var(--accent)]"
                      />
                    </div>

                    <p className="mb-4 line-clamp-3 flex-1 text-sm text-[var(--text-muted)]">
                      {describeRepo(repo)}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                      {repo.language && (
                        <span className="flex items-center gap-1.5">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{
                              backgroundColor:
                                LANG_COLOR[repo.language] || "#2563eb",
                            }}
                          />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star size={13} /> {repo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork size={13} /> {repo.forks}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="mt-10 text-center">
                <a
                  href={personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 btn-secondary px-5 py-2.5 text-sm"
                >
                  <Github size={18} /> See all repositories
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
