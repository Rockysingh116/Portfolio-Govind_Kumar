import React, { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  ArrowUp,
  ArrowDown,
  ImageOff,
} from "lucide-react";
import { SECTION_BY_KEY, blankItem } from "./schema.js";
import { listItems, createItem, updateItem, deleteItem, reorderItems } from "./api.js";
import ItemForm from "./ItemForm.jsx";
import { useToast } from "../components/Toast.jsx";

/**
 * A CRUD screen for one content type. Shows the list of items with
 * Add / Edit / Delete / reorder, and an inline form for add/edit.
 */
export default function Section({ sectionKey }) {
  const section = SECTION_BY_KEY[sectionKey];
  const toast = useToast();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null); // { mode, draft }
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      setItems(await listItems(sectionKey));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    setEditing(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionKey]);

  const startAdd = () =>
    setEditing({ mode: "add", draft: blankItem(section) });
  const startEdit = (item) =>
    setEditing({ mode: "edit", draft: { ...item }, id: item.id });

  const save = async () => {
    setSaving(true);
    try {
      if (editing.mode === "add") {
        await createItem(sectionKey, editing.draft, items.length);
        toast.success(`${section.label.replace(/s$/, "")} added`);
      } else {
        await updateItem(sectionKey, editing.id, editing.draft);
        toast.success("Changes saved");
      }
      setEditing(null);
      await load();
    } catch (err) {
      toast.error(`Save failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (item) => {
    const title = item[section.titleField] || "this item";
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
    setBusyId(item.id);
    try {
      await deleteItem(sectionKey, item.id);
      toast.success("Deleted");
      await load();
    } catch (err) {
      toast.error(`Delete failed: ${err.message}`);
    } finally {
      setBusyId(null);
    }
  };

  const move = async (index, dir) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next); // optimistic
    try {
      await reorderItems(
        sectionKey,
        next.map((i) => i.id)
      );
    } catch (err) {
      toast.error(`Reorder failed: ${err.message}`);
      load(); // revert to server truth
    }
  };

  // --- Add / Edit form view ---
  if (editing) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            {editing.mode === "add" ? "Add" : "Edit"}{" "}
            {section.label.replace(/s$/, "").toLowerCase()}
          </h2>
        </div>
        <div className="card rounded-2xl p-6">
          <ItemForm
            section={section}
            value={editing.draft}
            onChange={(draft) => setEditing((e) => ({ ...e, draft }))}
            onSubmit={save}
            onCancel={() => setEditing(null)}
            saving={saving}
          />
        </div>
      </div>
    );
  }

  // --- List view ---
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[var(--text)]">
            {section.label}
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
            {items.length} item{items.length === 1 ? "" : "s"}
          </p>
        </div>
        <button
          onClick={startAdd}
          className="btn-primary inline-flex items-center gap-1.5 px-4 py-2"
        >
          <Plus size={16} /> Add
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 size={26} className="animate-spin text-[var(--accent)]" />
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </div>
      ) : items.length === 0 ? (
        <div className="card rounded-2xl p-10 text-center text-[var(--text-muted)]">
          Nothing here yet. Click <strong>Add</strong> to create your first{" "}
          {section.label.replace(/s$/, "").toLowerCase()}.
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((item, index) => {
            const img = section.imageField ? item[section.imageField] : null;
            return (
              <li
                key={item.id}
                className="card flex items-center gap-4 rounded-xl p-4"
              >
                {section.imageField &&
                  (img ? (
                    <img
                      src={img}
                      alt=""
                      className="h-12 w-12 shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-subtle)] text-[var(--text-muted)]">
                      <ImageOff size={18} />
                    </div>
                  ))}

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-[var(--text)]">
                    {item[section.titleField] || "(untitled)"}
                  </p>
                  {section.subtitleField && item[section.subtitleField] && (
                    <p className="truncate text-sm text-[var(--text-muted)]">
                      {item[section.subtitleField]}
                    </p>
                  )}
                </div>

                {/* reorder */}
                <div className="flex flex-col">
                  <button
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    className="text-[var(--text-muted)] transition-colors hover:text-[var(--accent)] disabled:opacity-30"
                    aria-label="Move up"
                  >
                    <ArrowUp size={16} />
                  </button>
                  <button
                    onClick={() => move(index, 1)}
                    disabled={index === items.length - 1}
                    className="text-[var(--text-muted)] transition-colors hover:text-[var(--accent)] disabled:opacity-30"
                    aria-label="Move down"
                  >
                    <ArrowDown size={16} />
                  </button>
                </div>

                <button
                  onClick={() => startEdit(item)}
                  className="btn-secondary px-2.5 py-2"
                  aria-label="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => remove(item)}
                  disabled={busyId === item.id}
                  className="rounded-lg border border-[var(--border)] px-2.5 py-2 text-red-500 transition-colors hover:border-red-400 hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-500/10"
                  aria-label="Delete"
                >
                  {busyId === item.id ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
