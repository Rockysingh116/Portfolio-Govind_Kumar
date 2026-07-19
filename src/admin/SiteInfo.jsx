import React, { useEffect, useState } from "react";
import { Loader2, Save, Code2 } from "lucide-react";
import { getSite, saveSite } from "./api.js";
import { useToast } from "../components/Toast.jsx";

const input =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-[var(--text)] outline-none transition-colors focus:border-[var(--accent)]";

/**
 * Editor for the single site_content JSON blob: the one-off text like
 * name, tagline, bio, email, socials. Common fields get friendly inputs;
 * a raw-JSON mode covers everything else (stats, skills, section images).
 */
export default function SiteInfo() {
  const toast = useToast();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [raw, setRaw] = useState(false);
  const [rawText, setRawText] = useState("");
  const [rawError, setRawError] = useState("");

  useEffect(() => {
    getSite()
      .then((d) => {
        setData(d || {});
        setRawText(JSON.stringify(d || {}, null, 2));
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const personal = data?.personal || {};
  const about = data?.about || {};

  const setPersonal = (k, v) =>
    setData((d) => ({ ...d, personal: { ...d.personal, [k]: v } }));
  const setSocial = (k, v) =>
    setData((d) => ({
      ...d,
      personal: {
        ...d.personal,
        socials: { ...(d.personal?.socials || {}), [k]: v },
      },
    }));
  const setAbout = (k, v) =>
    setData((d) => ({ ...d, about: { ...d.about, [k]: v } }));

  const save = async () => {
    setSaving(true);
    try {
      let toSave = data;
      if (raw) {
        toSave = JSON.parse(rawText); // may throw
      }
      await saveSite(toSave);
      setData(toSave);
      setRawText(JSON.stringify(toSave, null, 2));
      toast.success("Site info saved");
    } catch (err) {
      if (raw && err instanceof SyntaxError) {
        setRawError("Invalid JSON: " + err.message);
        toast.error("Fix the JSON before saving");
      } else {
        toast.error(`Save failed: ${err.message}`);
      }
    } finally {
      setSaving(false);
    }
  };

  const toggleRaw = () => {
    if (!raw) {
      setRawText(JSON.stringify(data, null, 2));
      setRawError("");
    } else {
      // leaving raw -> try to parse back into structured state
      try {
        setData(JSON.parse(rawText));
        setRawError("");
      } catch (err) {
        setRawError("Invalid JSON: " + err.message);
        return; // stay in raw mode
      }
    }
    setRaw((r) => !r);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 size={26} className="animate-spin text-[var(--accent)]" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[var(--text)]">Site info</h2>
          <p className="text-sm text-[var(--text-muted)]">
            Name, tagline, bio and social links
          </p>
        </div>
        <button
          onClick={toggleRaw}
          className="btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-sm"
        >
          <Code2 size={15} /> {raw ? "Simple editor" : "Raw JSON"}
        </button>
      </div>

      <div className="card space-y-5 rounded-2xl p-6">
        {raw ? (
          <div>
            <textarea
              rows={22}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              spellCheck={false}
              className={`${input} font-mono text-xs`}
            />
            {rawError && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {rawError}
              </p>
            )}
            <p className="mt-2 text-xs text-[var(--text-muted)]">
              Everything is here — including stats, skills, and section images.
              Edit carefully; keep it valid JSON.
            </p>
          </div>
        ) : (
          <>
            <Group title="Identity">
              <F label="Name">
                <input
                  className={input}
                  value={personal.name || ""}
                  onChange={(e) => setPersonal("name", e.target.value)}
                />
              </F>
              <F label="Brand">
                <input
                  className={input}
                  value={personal.brand || ""}
                  onChange={(e) => setPersonal("brand", e.target.value)}
                />
              </F>
              <F label="Headline">
                <input
                  className={input}
                  value={personal.headline || ""}
                  onChange={(e) => setPersonal("headline", e.target.value)}
                />
              </F>
              <F label="Status pill">
                <input
                  className={input}
                  value={personal.statusPill || ""}
                  onChange={(e) => setPersonal("statusPill", e.target.value)}
                />
              </F>
              <F label="Tagline">
                <textarea
                  rows={3}
                  className={`${input} resize-y`}
                  value={personal.tagline || ""}
                  onChange={(e) => setPersonal("tagline", e.target.value)}
                />
              </F>
            </Group>

            <Group title="Contact">
              <F label="Email">
                <input
                  className={input}
                  value={personal.email || ""}
                  onChange={(e) => setPersonal("email", e.target.value)}
                />
              </F>
              <F label="Phone">
                <input
                  className={input}
                  value={personal.phone || ""}
                  onChange={(e) => setPersonal("phone", e.target.value)}
                />
              </F>
              <F label="Location">
                <input
                  className={input}
                  value={personal.location || ""}
                  onChange={(e) => setPersonal("location", e.target.value)}
                />
              </F>
              <F label="Resume URL">
                <input
                  className={input}
                  value={personal.resumeUrl || ""}
                  onChange={(e) => setPersonal("resumeUrl", e.target.value)}
                />
              </F>
            </Group>

            <Group title="Socials">
              <F label="GitHub">
                <input
                  className={input}
                  value={personal.socials?.github || ""}
                  onChange={(e) => setSocial("github", e.target.value)}
                />
              </F>
              <F label="LinkedIn">
                <input
                  className={input}
                  value={personal.socials?.linkedin || ""}
                  onChange={(e) => setSocial("linkedin", e.target.value)}
                />
              </F>
              <F label="GitHub username">
                <input
                  className={input}
                  value={personal.githubUsername || ""}
                  onChange={(e) =>
                    setPersonal("githubUsername", e.target.value)
                  }
                />
              </F>
            </Group>

            <Group title="About">
              <F label="Badge role">
                <input
                  className={input}
                  value={about.badgeRole || ""}
                  onChange={(e) => setAbout("badgeRole", e.target.value)}
                />
              </F>
              <F label="Available for work">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[var(--accent)]"
                    checked={!!about.available}
                    onChange={(e) => setAbout("available", e.target.checked)}
                  />
                  <span className="text-sm text-[var(--text-muted)]">
                    {about.available ? "Yes" : "No"}
                  </span>
                </label>
              </F>
              <p className="text-xs text-[var(--text-muted)]">
                To edit bio paragraphs, expertise, quick facts and traits, use{" "}
                <button
                  type="button"
                  onClick={toggleRaw}
                  className="text-[var(--accent)] underline"
                >
                  Raw JSON
                </button>
                .
              </p>
            </Group>
          </>
        )}

        <div className="hairline pt-5">
          <button
            onClick={save}
            disabled={saving}
            className="btn-primary inline-flex items-center gap-2 px-4 py-2 disabled:opacity-60"
          >
            {saving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            {saving ? "Saving…" : "Save site info"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Group({ title, children }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
        {title}
      </h3>
      {children}
    </div>
  );
}

function F({ label, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-[var(--text)]">
        {label}
      </label>
      {children}
    </div>
  );
}
