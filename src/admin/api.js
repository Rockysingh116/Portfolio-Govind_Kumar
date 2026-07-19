// ============================================================
//  ADMIN DATA ACCESS
//  CRUD helpers used by the admin dashboard. These read/write the
//  *raw* DB rows (snake_case) and use the mappers for translation.
//  All writes require an authenticated session (enforced by RLS).
// ============================================================

import { supabase } from "../lib/supabase.js";
import { TABLES } from "../lib/mappers.js";
import { clearContentCache } from "../lib/content.js";

const BUCKET = "portfolio-images";

/** List all rows for a content type, mapped to app shape. */
export async function listItems(key) {
  const meta = TABLES[key];
  const { data, error } = await supabase
    .from(meta.table)
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data || []).map((r) => ({ ...meta.fromRow(r), id: r.id }));
}

/** Create a new row from an app-shaped object. */
export async function createItem(key, appObj, sortOrder = 0) {
  const meta = TABLES[key];
  const row = meta.toRow(appObj, sortOrder);
  const { data, error } = await supabase
    .from(meta.table)
    .insert(row)
    .select()
    .single();
  if (error) throw error;
  clearContentCache();
  return { ...meta.fromRow(data), id: data.id };
}

/** Update an existing row by id from an app-shaped object. */
export async function updateItem(key, id, appObj) {
  const meta = TABLES[key];
  const row = meta.toRow(appObj, appObj.sort_order ?? 0);
  // Don't overwrite sort_order unless caller set one explicitly.
  if (appObj.sort_order === undefined) delete row.sort_order;
  const { data, error } = await supabase
    .from(meta.table)
    .update(row)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  clearContentCache();
  return { ...meta.fromRow(data), id: data.id };
}

/** Delete a row by id. */
export async function deleteItem(key, id) {
  const meta = TABLES[key];
  const { error } = await supabase.from(meta.table).delete().eq("id", id);
  if (error) throw error;
  clearContentCache();
}

/** Persist a new ordering: array of ids in the desired order. */
export async function reorderItems(key, orderedIds) {
  const meta = TABLES[key];
  // Update each row's sort_order to its index.
  const updates = orderedIds.map((id, i) =>
    supabase.from(meta.table).update({ sort_order: i }).eq("id", id)
  );
  const results = await Promise.all(updates);
  const firstErr = results.find((r) => r.error);
  if (firstErr) throw firstErr.error;
  clearContentCache();
}

/** Read the site_content JSON blob. */
export async function getSite() {
  const { data, error } = await supabase
    .from("site_content")
    .select("data")
    .eq("id", "main")
    .single();
  if (error) throw error;
  return data?.data ?? {};
}

/** Write the site_content JSON blob. */
export async function saveSite(dataObj) {
  const { error } = await supabase
    .from("site_content")
    .upsert({ id: "main", data: dataObj });
  if (error) throw error;
  clearContentCache();
}

/**
 * Upload an image file to Storage and return its public URL.
 * Files are namespaced by content type + timestamp to avoid clashes.
 */
export async function uploadImage(file, folder = "uploads") {
  const ext = (file.name.split(".").pop() || "bin").toLowerCase();
  const safe = file.name
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9-_]+/gi, "-")
    .slice(0, 40);
  const key = `${folder}/${Date.now()}-${safe}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(key, file, {
    contentType: file.type || undefined,
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(key);
  return data.publicUrl;
}
