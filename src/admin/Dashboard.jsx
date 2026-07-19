import React, { useState } from "react";
import {
  FolderGit2,
  Briefcase,
  Newspaper,
  Quote,
  Award,
  GraduationCap,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";
import { SECTIONS } from "./schema.js";
import { useAuth } from "./AuthContext.jsx";
import { useTheme } from "../hooks/useTheme.js";
import Section from "./Section.jsx";
import SiteInfo from "./SiteInfo.jsx";

const ICONS = {
  FolderGit2,
  Briefcase,
  Newspaper,
  Quote,
  Award,
  GraduationCap,
};

const NAV = [
  ...SECTIONS.map((s) => ({ key: s.key, label: s.label, icon: s.icon })),
  { key: "site", label: "Site info", icon: "Settings" },
];

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [active, setActive] = useState(SECTIONS[0].key);
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavList = () => (
    <nav className="space-y-1">
      {NAV.map((item) => {
        const Icon = item.key === "site" ? Settings : ICONS[item.icon];
        const isActive = active === item.key;
        return (
          <button
            key={item.key}
            onClick={() => {
              setActive(item.key);
              setMobileOpen(false);
            }}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                : "text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text)]"
            }`}
          >
            <Icon size={17} /> {item.label}
          </button>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen surface">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="text-[var(--text)] md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <span className="font-semibold text-[var(--text)]">
              Portfolio Admin
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-[var(--text-muted)] sm:inline">
              {user?.email}
            </span>
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-sm"
            >
              <ExternalLink size={15} /> View site
            </a>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--text-muted)] transition-colors hover:border-red-400 hover:text-red-500"
            >
              <LogOut size={15} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl gap-6 px-4 py-6">
        {/* Desktop sidebar */}
        <aside className="hidden w-56 shrink-0 md:block">
          <div className="sticky top-20">
            <NavList />
          </div>
        </aside>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-30 md:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-64 border-r border-[var(--border)] bg-[var(--bg)] p-4 pt-20">
              <NavList />
            </div>
          </div>
        )}

        {/* Content */}
        <main className="min-w-0 flex-1">
          {active === "site" ? (
            <SiteInfo />
          ) : (
            <Section key={active} sectionKey={active} />
          )}
        </main>
      </div>
    </div>
  );
}
