import React, { useState } from "react";
import { Loader2, Upload, X, Plus, Save } from "lucide-react";
import { uploadImage } from "./api.js";
import { useToast } from "../components/Toast.jsx";

/** A single field renderer driven by the schema field definition. */
function Field({ field, value, onChange, folder }) {
  const toast = useToast();
  const [uploading, setUploading] = useState(false);

  const base =
    "w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-[var(--text)] outline-none transition-colors focus:border-[var(--accent)]";

  switch (field.type) {
    case "textarea":
      return (
        <textarea
          rows={4}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} resize-y`}
        />
      );

    case "boolean":
      return (
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4 w-4 accent-[var(--accent)]"
          />
          <span className="text-sm text-[var(--text-muted)]">
            {value ? "Yes" : "No"}
          </span>
        </label>
      );

    case "select":
      return (
        <select
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        >
          {field.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt === "" ? "— none —" : opt}
            </option>
          ))}
        </select>
      );

    case "list": {
      const arr = Array.isArray(value) ? value : [];
      return (
        <div className="space-y-2">
          {arr.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={item}
                onChange={(e) => {
                  const next = [...arr];
                  next[i] = e.target.value;
                  onChange(next);
                }}
                className={base}
              />
              <button
                type="button"
                onClick={() => onChange(arr.filter((_, j) => j !== i))}
                className="btn-secondary shrink-0 px-2.5"
                aria-label="Remove"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onChange([...arr, ""])}
            className="btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-sm"
          >
            <Plus size={15} /> Add item
          </button>
        </div>
      );
    }

    case "image":
      return (
        <div className="space-y-2">
          {value && (
            <div className="relative inline-block">
              <img
                src={value}
                alt=""
                className="h-28 w-auto rounded-lg border border-[var(--border)] object-cover"
              />
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow"
                aria-label="Remove image"
              >
                <X size={14} />
              </button>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <label className="btn-secondary inline-flex cursor-pointer items-center gap-1.5 px-3 py-1.5 text-sm">
              {uploading ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Upload size={15} />
              )}
              {uploading ? "Uploading…" : "Upload image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setUploading(true);
                  try {
                    const url = await uploadImage(file, folder);
                    onChange(url);
                    toast.success("Image uploaded");
                  } catch (err) {
                    toast.error(`Upload failed: ${err.message}`);
                  } finally {
                    setUploading(false);
                    e.target.value = "";
                  }
                }}
              />
            </label>
          </div>
          <input
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="…or paste an image URL"
            className={base}
          />
        </div>
      );

    case "url":
    case "text":
    default:
      return (
        <input
          type={field.type === "url" ? "url" : "text"}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        />
      );
  }
}

/**
 * Renders a full add/edit form for one item from a section schema.
 * Controlled by `value` (app-shaped object) + `onChange`.
 */
export default function ItemForm({ section, value, onChange, onSubmit, onCancel, saving }) {
  const set = (name, v) => onChange({ ...value, [name]: v });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-5"
    >
      {section.fields.map((field) => (
        <div key={field.name}>
          <label className="mb-1.5 block text-sm font-medium text-[var(--text)]">
            {field.label}
            {field.required && <span className="text-red-500"> *</span>}
          </label>
          <Field
            field={field}
            value={value[field.name]}
            onChange={(v) => set(field.name, v)}
            folder={section.key}
          />
        </div>
      ))}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="btn-primary inline-flex items-center gap-2 px-4 py-2 disabled:opacity-60"
        >
          {saving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          {saving ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary px-4 py-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
