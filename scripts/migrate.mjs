// ============================================================
//  ONE-TIME MIGRATION: portfolio.js  ->  Supabase
//
//  Reads your existing static content from src/data/portfolio.js
//  and inserts it into the Supabase tables. Local image assets
//  (.webp in src/assets) are uploaded to Supabase Storage and
//  replaced with their public URLs.
//
//  PREREQUISITES
//    1. You've run supabase/schema.sql in the SQL Editor.
//    2. Your .env has:
//         VITE_SUPABASE_URL=...
//         SUPABASE_SERVICE_ROLE_KEY=...   (Settings -> API -> service_role)
//       The service_role key bypasses RLS so the script can insert.
//
//  RUN
//    npm run migrate
//
//  SAFETY
//    Re-running clears each table first (--fresh is the default) so you
//    don't get duplicates. Pass `--append` to keep existing rows.
// ============================================================

import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Load .env manually (no dependency on dotenv).
await loadEnv();

import {
  projectToRow,
  experienceToRow,
  articleToRow,
  testimonialToRow,
  certificationToRow,
  educationToRow,
} from "../src/lib/mappers.js";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = "portfolio-images";
const APPEND = process.argv.includes("--append");

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error(
    "\n✗ Missing env. Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.\n" +
      "  (service_role key is under Supabase Settings -> API.)\n"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = path.resolve(__dirname, "../src/assets");
const CONTENT_TYPES = {
  webp: "image/webp",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  svg: "image/svg+xml",
  avif: "image/avif",
};

// Cache uploads so the same asset isn't uploaded twice.
const uploadCache = new Map();

async function uploadAsset(marker) {
  // marker looks like "asset:Ecommerce.webp"
  const base = marker.slice("asset:".length);
  if (uploadCache.has(base)) return uploadCache.get(base);

  const filePath = path.join(ASSETS_DIR, base);
  let bytes;
  try {
    bytes = await readFile(filePath);
  } catch {
    console.warn(`  ! asset not found, leaving as-is: ${base}`);
    uploadCache.set(base, null);
    return null;
  }
  const ext = base.split(".").pop().toLowerCase();
  const key = `migrated/${base}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(key, bytes, {
      contentType: CONTENT_TYPES[ext] || "application/octet-stream",
      upsert: true,
    });
  if (error) {
    console.warn(`  ! upload failed for ${base}: ${error.message}`);
    uploadCache.set(base, null);
    return null;
  }
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(key);
  console.log(`  ↑ uploaded ${base}`);
  uploadCache.set(base, data.publicUrl);
  return data.publicUrl;
}

// Replace any "asset:*" image markers in a row with uploaded public URLs.
async function resolveImages(row) {
  for (const field of ["image_url"]) {
    const v = row[field];
    if (typeof v === "string" && v.startsWith("asset:")) {
      row[field] = (await uploadAsset(v)) ?? null;
    }
  }
  return row;
}

async function seedTable(name, rows) {
  if (!APPEND) {
    // Clear existing rows (id is never null, so this matches all).
    const { error: delErr } = await supabase
      .from(name)
      .delete()
      .not("id", "is", null);
    if (delErr) throw new Error(`clear ${name}: ${delErr.message}`);
  }
  const resolved = [];
  for (const r of rows) resolved.push(await resolveImages({ ...r }));

  const { error } = await supabase.from(name).insert(resolved);
  if (error) throw new Error(`insert ${name}: ${error.message}`);
  console.log(`✓ ${name}: ${rows.length} rows`);
}

async function run() {
  console.log("\nMigrating portfolio.js -> Supabase\n");

  // Import the static content. Asset (.webp) imports resolve to markers
  // via scripts/asset-loader.mjs (registered on the command line).
  const data = await import("../src/data/portfolio.js");

  const {
    projects = [],
    experience = [],
    articles = [],
    testimonials = [],
    certifications = [],
    education = [],
    personal = {},
    about = {},
    stats = [],
    skillCategories = [],
    languages = [],
    sectionImages = {},
    repoDescriptions = {},
  } = data;

  await seedTable("projects", projects.map((p, i) => projectToRow(p, i)));
  await seedTable("experience", experience.map((e, i) => experienceToRow(e, i)));
  await seedTable("articles", articles.map((a, i) => articleToRow(a, i)));
  await seedTable(
    "testimonials",
    testimonials.map((t, i) => testimonialToRow(t, i))
  );
  await seedTable(
    "certifications",
    certifications.map((c, i) => certificationToRow(c, i))
  );
  await seedTable("education", education.map((e, i) => educationToRow(e, i)));

  // site_content: one JSON blob of all the one-off text.
  const siteData = {
    personal,
    about,
    stats,
    skillCategories,
    languages,
    sectionImages,
    repoDescriptions,
  };
  const { error: scErr } = await supabase
    .from("site_content")
    .upsert({ id: "main", data: siteData });
  if (scErr) throw new Error(`site_content: ${scErr.message}`);
  console.log("✓ site_content: 1 row");

  console.log("\n✅ Migration complete. Check the Supabase Table Editor.\n");
}

run().catch((err) => {
  console.error("\n✗ Migration failed:", err.message, "\n");
  process.exit(1);
});

// ---- minimal .env loader (KEY=VALUE lines) ----
async function loadEnv() {
  try {
    const envPath = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "../.env"
    );
    const text = await readFile(envPath, "utf8");
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = val;
    }
  } catch {
    // no .env; rely on real environment variables
  }
}
