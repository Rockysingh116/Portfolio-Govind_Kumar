// Node ESM loader hook so the migration script can import
// src/data/portfolio.js, which itself imports .webp assets via Vite.
// We resolve those asset imports to a tiny module that exports the
// file's basename as a marker string (e.g. "asset:Ecommerce.webp").
// The migration script recognises these markers and uploads the real
// local file to Supabase Storage, then stores the resulting public URL.

import { fileURLToPath, pathToFileURL } from "node:url";
import { existsSync } from "node:fs";
import path from "node:path";

const ASSET_EXT = /\.(webp|png|jpe?g|gif|svg|avif)$/i;
// Extensions Vite resolves implicitly but Node does not.
const TRY_EXT = [".jsx", ".js", ".mjs", "/index.jsx", "/index.js"];

export async function resolve(specifier, context, nextResolve) {
  if (ASSET_EXT.test(specifier)) {
    // Resolve relative to the importing module so we can get the real path.
    const parentUrl = context.parentURL || pathToFileURL(process.cwd() + "/").href;
    const abs = new URL(specifier, parentUrl);
    return {
      url: abs.href + "?asset-marker",
      shortCircuit: true,
      format: "module",
    };
  }

  // Handle extensionless relative imports (e.g. "../assets/index") the way
  // Vite does, by probing for .jsx/.js. Node otherwise can't resolve them.
  if (
    (specifier.startsWith("./") || specifier.startsWith("../")) &&
    !path.extname(specifier) &&
    context.parentURL
  ) {
    const base = new URL(specifier, context.parentURL);
    const basePath = fileURLToPath(base);
    for (const ext of TRY_EXT) {
      if (existsSync(basePath + ext)) {
        return {
          url: pathToFileURL(basePath + ext).href,
          shortCircuit: true,
          format: "module",
        };
      }
    }
  }

  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (url.endsWith("?asset-marker")) {
    const cleanUrl = url.replace("?asset-marker", "");
    const filePath = fileURLToPath(cleanUrl);
    const base = path.basename(filePath);
    const source =
      `export default ${JSON.stringify("asset:" + base)};\n` +
      `export const __assetPath = ${JSON.stringify(filePath)};\n`;
    return { format: "module", source, shortCircuit: true };
  }
  return nextLoad(url, context);
}
