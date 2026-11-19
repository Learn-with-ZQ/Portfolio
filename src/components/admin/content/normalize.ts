import type { Field } from "./sections";

/** Pure helpers behind the content editor; no React, so they can be tested on their own. */

export type Obj = Record<string, unknown>;


/** Turns the form's working values into what the API expects. */
export function normalizeFields(fields: Field[], value: Obj): Obj {
  const out: Obj = { ...value };
  for (const field of fields) {
    const v = out[field.key];
    switch (field.kind) {
      case "text":
      case "textarea":
      case "select": {
        const text = typeof v === "string" ? v.trim() : "";
        if (field.optional && !text) delete out[field.key];
        else out[field.key] = text;
        break;
      }
      case "lines":
        out[field.key] = (Array.isArray(v) ? v : []).map((s) => String(s).trim()).filter(Boolean);
        break;
      case "number": {
        const n = v === "" || v === null || v === undefined ? NaN : Number(v);
        if (Number.isNaN(n)) {
          if (field.optional) delete out[field.key];
          else out[field.key] = 0;
        } else out[field.key] = n;
        break;
      }
      case "boolean":
        if (field.optional && !v) delete out[field.key];
        else out[field.key] = Boolean(v);
        break;
      case "month":
      case "date":
        out[field.key] = v === null ? null : typeof v === "string" ? v.trim() : "";
        break;
      case "group":
        if (v && typeof v === "object") out[field.key] = normalizeFields(field.fields, v as Obj);
        else delete out[field.key];
        break;
      case "list":
        out[field.key] = (Array.isArray(v) ? v : []).map((item) => normalizeFields(field.fields, item as Obj));
        break;
    }
  }
  return out;
}

/** Required fields left empty, as readable paths ("Projects 3 › Name"). */
export function findMissing(fields: Field[], value: Obj, path: string, out: string[]) {
  for (const field of fields) {
    const v = value[field.key];
    const here = `${path}${field.label}`;
    if (
      (field.kind === "text" || field.kind === "textarea" || field.kind === "select") &&
      !field.optional &&
      !(field.kind === "text" && field.blank)
    ) {
      if (typeof v !== "string" || !v.trim()) out.push(here);
    } else if (field.kind === "month") {
      if (v !== null && !/^\d{4}-\d{2}$/.test(String(v ?? "")))
        out.push(`${here} (YYYY-MM${field.current ? `, or tick "${field.current}"` : ""})`);
    } else if (field.kind === "date") {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(String(v ?? ""))) out.push(`${here} (YYYY-MM-DD)`);
    } else if (field.kind === "group" && v && typeof v === "object") {
      findMissing(field.fields, v as Obj, `${here} › `, out);
    } else if (field.kind === "list" && Array.isArray(v)) {
      v.forEach((item, i) => findMissing(field.fields, item as Obj, `${here} ${i + 1} › `, out));
    }
  }
}

export function emptyFor(fields: Field[]): Obj {
  const out: Obj = {};
  for (const f of fields) {
    if (f.kind === "lines" || f.kind === "list") out[f.key] = [];
    else if (f.kind === "boolean") out[f.key] = false;
    else if (f.kind !== "group") out[f.key] = "";
  }
  return out;
}

