import React, { useState, lazy, Suspense } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  ArrowUp,
  FileText,
  Command as CommandIcon,
  Home,
  User,
  Wrench,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Newspaper,
  Send,
  Copy,
  Moon,
  Sun,
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

import Hero from "./components/Hero.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import Logo from "./components/Logo.jsx";
import Preloader from "./components/Preloader.jsx";
import SectionFallback from "./components/SectionFallback.jsx";
import CommandPalette from "./components/CommandPalette.jsx";
import { ToastProvider, useToast } from "./components/Toast.jsx";

// Below-the-fold sections are code-split so the initial bundle stays lean.
const About = lazy(() => import("./components/About.jsx"));
const Skills = lazy(() => import("./components/Skills.jsx"));
const Projects = lazy(() => import("./components/Projects.jsx"));
const Experience = lazy(() => import("./components/Experience.jsx"));
const Qualifications = lazy(() => import("./components/Qualifications.jsx"));
const Certifications = lazy(() => import("./components/Certifications.jsx"));
const GitHubActivity = lazy(() => import("./components/GitHubActivity.jsx"));
const Articles = lazy(() => import("./components/Articles.jsx"));
const Testimonials = lazy(() => import("./components/Testimonials.jsx"));
const Contact = lazy(() => import("./components/Contact.jsx"));

import { useTheme } from "./hooks/useTheme.js";
import { useActiveSection } from "./hooks/useActiveSection.js";
import { personal } from "./data/portfolio.js";

const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Journey" },
  { id: "qualifications", label: "Education" },
  { id: "github", label: "GitHub" },
  { id: "articles", label: "Articles" },
  { id: "contact", label: "Contact" },
];

// Icons used by the command palette, keyed by section id.
const SECTION_ICONS = {
  hero: Home,
  about: User,
  skills: Wrench,
  projects: FolderGit2,
  experience: Briefcase,
  qualifications: GraduationCap,
  github: Github,
  articles: Newspaper,
  contact: Send,
};

function AppInner() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const toast = useToast();

  const activeSection = useActiveSection(navLinks.map((l) => l.id));

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  React.useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      toast.success("Email copied to clipboard");
    } catch {
      toast.error("Couldn't copy — please copy it manually.");
    }
  };

  // Commands for the ⌘K palette: navigation + quick actions.
  const commands = [
    { id: "top", label: "Go to top", icon: Home, keywords: ["home", "hero"], perform: () => scrollTo("hero") },
    ...navLinks.map((l) => ({
      id: `nav-${l.id}`,
      label: `Go to ${l.label}`,
      icon: SECTION_ICONS[l.id] || Home,
      keywords: [l.id, l.label],
      perform: () => scrollTo(l.id),
    })),
    {
      id: "resume",
      label: "Open resume",
      hint: "PDF",
      icon: FileText,
      keywords: ["cv", "download"],
      perform: () => window.open(personal.resumeUrl, "_blank", "noopener"),
    },
    {
      id: "copy-email",
      label: "Copy email address",
      icon: Copy,
      keywords: ["contact", "mail"],
      perform: copyEmail,
    },
    {
      id: "theme",
      label: theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
      icon: theme === "dark" ? Sun : Moon,
      keywords: ["theme", "dark", "light", "appearance"],
      perform: toggleTheme,
    },
    {
      id: "github",
      label: "Open GitHub profile",
      icon: Github,
      keywords: ["code", "repos"],
      perform: () => window.open(personal.socials.github, "_blank", "noopener"),
    },
    {
      id: "linkedin",
      label: "Open LinkedIn profile",
      icon: Linkedin,
      keywords: ["social", "connect"],
      perform: () => window.open(personal.socials.linkedin, "_blank", "noopener"),
    },
  ];

  return (
    <div className="relative min-h-screen surface">
      {/* Branded loading screen */}
      <Preloader />

      {/* ⌘K command palette */}
      <CommandPalette commands={commands} />

      {/* Slim scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left bg-[var(--accent)]"
      />

      {/* Navigation */}
      <nav className="fixed z-50 w-full border-b border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => scrollTo("hero")}
              aria-label={`${personal.brand} — home`}
            >
              <Logo />
            </button>

            {/* Desktop links */}
            <div className="hidden items-center space-x-6 md:flex">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`relative text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text)]"
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[var(--accent)]"
                    />
                  )}
                </button>
              ))}

              {/* ⌘K hint button */}
              <button
                onClick={() =>
                  window.dispatchEvent(
                    new KeyboardEvent("keydown", { key: "k", metaKey: true })
                  )
                }
                aria-label="Open command palette"
                className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-2.5 py-1.5 text-xs font-medium text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                title="Command palette (Ctrl/⌘ + K)"
              >
                <CommandIcon size={13} /> K
              </button>

              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-1.5 px-4 py-2 text-sm"
              >
                <FileText size={16} /> Resume
              </a>
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>

            {/* Mobile controls */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() =>
                  window.dispatchEvent(
                    new KeyboardEvent("keydown", { key: "k", metaKey: true })
                  )
                }
                aria-label="Open command palette"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
              >
                <CommandIcon size={18} />
              </button>
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Toggle menu"
                className="text-[var(--text)]"
              >
                {menuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-[var(--border)] bg-[var(--bg)] md:hidden"
            >
              <div className="container mx-auto flex flex-col px-4 py-4">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`py-3 text-left text-base font-medium transition-colors ${
                      activeSection === link.id
                        ? "text-[var(--accent)]"
                        : "text-[var(--text)]"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
                <a
                  href={personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-2 flex items-center justify-center gap-2 px-4 py-3"
                >
                  <FileText size={18} /> Download Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main>
        <Hero />
        {[
          About,
          Skills,
          Projects,
          Experience,
          Qualifications,
          Certifications,
          GitHubActivity,
          Articles,
          Testimonials,
          Contact,
        ].map((Section, i) => (
          <Suspense key={i} fallback={<SectionFallback />}>
            <Section />
          </Suspense>
        ))}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] surface-subtle py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex flex-col items-center gap-2 md:items-start">
              <Logo size={32} />
              <p className="text-sm text-[var(--text-muted)]">
                &copy; {new Date().getFullYear()} {personal.name}. All rights
                reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
              >
                <Github size={22} />
              </a>
              <a
                href={personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
              >
                <Linkedin size={22} />
              </a>
              <a
                href={`mailto:${personal.email}`}
                aria-label="Email"
                className="text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
              >
                <Mail size={22} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="btn-primary fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full shadow-lg"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppInner />
    </ToastProvider>
  );
}

export default App;
