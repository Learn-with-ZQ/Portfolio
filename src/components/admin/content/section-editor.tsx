"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { ArrowDown, ArrowUp, CheckCircle2, Loader2, Plus, Save, Trash2, TriangleAlert } from "lucide-react";
import { saveSection } from "@/app/admin/actions";
import { cn } from "@/lib/utils";
import { findSection, type Field } from "./sections";
import { emptyFor, findMissing, normalizeFields, type Obj } from "./normalize";

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

// ---------- inputs ----------

function Label({ id, field }: { id: string; field: Field }) {
  const optional = "optional" in field && field.optional && field.kind !== "group";
  return (
    <label htmlFor={id} className="field-label">
      {field.label}
      {optional ? <span className="font-normal text-ink-muted"> (optional)</span> : null}
    </label>
  );
}

function Hint({ text }: { text?: string }) {
  return text ? <p className="mt-1 text-xs text-ink-muted">{text}</p> : null;
}

function FieldInput({
  field,
  value,
  onChange,
  id,
}: {
  field: Field;
  value: unknown;
  onChange: (next: unknown) => void;
  id: string;
}) {
  switch (field.kind) {
    case "text":
      return (
        <div className={cn(field.wide && "sm:col-span-2")}>
          <Label id={id} field={field} />
          <input id={id} className="field" value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />
          <Hint text={field.hint} />
        </div>
      );
    case "textarea":
      return (
        <div className="sm:col-span-2">
          <Label id={id} field={field} />
          <textarea
            id={id}
            rows={field.rows ?? 3}
            className="field resize-y"
            value={String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
          />
          <Hint text={field.hint} />
        </div>
      );
    case "lines":
      return (
        <div className="sm:col-span-2">
          <Label id={id} field={field} />
          <textarea
            id={id}
            rows={field.rows ?? 4}
            className="field resize-y"
            value={(Array.isArray(value) ? value : []).join("\n")}
            onChange={(e) => onChange(e.target.value.split("\n"))}
          />
          <Hint text={field.hint} />
        </div>
      );
    case "number":
      return (
        <div>
          <Label id={id} field={field} />
          <input
            id={id}
            type="number"
            className="field"
            value={value === undefined || value === null ? "" : String(value)}
            onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
          />
          <Hint text={field.hint} />
        </div>
      );
    case "boolean":
      return (
        <div className="flex items-start gap-2.5 self-end pb-2">
          <input
            id={id}
            type="checkbox"
            className="mt-0.5 h-4 w-4 accent-[var(--primary)]"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
          />
          <label htmlFor={id} className="text-sm text-ink">
            {field.label}
            <Hint text={field.hint} />
          </label>
        </div>
      );
    case "select":
      return (
        <div>
          <Label id={id} field={field} />
          <select id={id} className="field" value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}>
            {field.optional ? <option value="">None</option> : null}
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <Hint text={field.hint} />
        </div>
      );
    case "month":
    case "date": {
      const isCurrent = field.kind === "month" && field.current && value === null;
      return (
        <div>
          <Label id={id} field={field} />
          {isCurrent ? (
            <p id={id} className="field flex items-center text-ink-muted">
              Present
            </p>
          ) : (
            <input
              id={id}
              type={field.kind}
              className="field"
              value={String(value ?? "")}
              onChange={(e) => onChange(e.target.value)}
            />
          )}
          {field.kind === "month" && field.current ? (
            <label className="mt-1.5 flex items-center gap-2 text-xs text-ink-muted">
              <input
                type="checkbox"
                className="h-3.5 w-3.5 accent-[var(--primary)]"
                checked={value === null}
                onChange={(e) => onChange(e.target.checked ? null : "")}
              />
              {field.current}
            </label>
          ) : null}
        </div>
      );
    }
    case "group": {
      const present = value !== undefined && value !== null;
      return (
        <fieldset className="rounded-lg border border-rule p-4 sm:col-span-2">
          <legend className="px-1 text-sm font-medium text-ink">{field.label}</legend>
          {field.optional ? (
            <label className="mb-3 flex items-center gap-2 text-sm text-ink">
              <input
                type="checkbox"
                className="h-4 w-4 accent-[var(--primary)]"
                checked={present}
                onChange={(e) => onChange(e.target.checked ? emptyFor(field.fields) : undefined)}
              />
              {field.optional}
            </label>
          ) : null}
          {present ? (
            <FieldsGrid fields={field.fields} value={value as Obj} onChange={onChange} idPrefix={id} />
          ) : null}
        </fieldset>
      );
    }
    case "list":
      return (
        <div className="sm:col-span-2">
          <p className="field-label">{field.label}</p>
          <ListEditor
            items={(Array.isArray(value) ? value : []) as Obj[]}
            fields={field.fields}
            itemTitle={field.itemTitle}
            newItem={field.newItem}
            itemName={field.label.toLowerCase().replace(/s$/, "")}
            onChange={onChange}
            idPrefix={id}
            nested
          />
        </div>
      );
  }
}

function FieldsGrid({
  fields,
  value,
  onChange,
  idPrefix,
}: {
  fields: Field[];
  value: Obj;
  onChange: (next: Obj) => void;
  idPrefix: string;
}) {
  return (
    <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
      {fields.map((field) => (
        <FieldInput
          key={field.key}
          id={`${idPrefix}-${field.key}`}
          field={field}
          value={value[field.key]}
          onChange={(next) => onChange({ ...value, [field.key]: next })}
        />
      ))}
    </div>
  );
}

function ListEditor({
  items,
  fields,
  itemTitle,
  newItem,
  itemName,
  onChange,
  idPrefix,
  nested = false,
}: {
  items: Obj[];
  fields: Field[];
  itemTitle: string[];
  newItem: Obj;
  itemName: string;
  onChange: (next: Obj[]) => void;
  idPrefix: string;
  nested?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);

  const move = (from: number, to: number) => {
    const next = [...items];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
    if (open === from) setOpen(to);
  };

  const iconButton =
    "inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-muted hover:bg-surface hover:text-ink disabled:opacity-30";

  return (
    <div className={cn("grid gap-2", nested && "rounded-lg border border-rule p-2")}>
      {items.map((item, index) => {
        const title = itemTitle.map((k) => String(item[k] ?? "").trim()).filter(Boolean).join(" · ");
        const isOpen = open === index;
        return (
          <div key={index} className={cn("rounded-lg border", isOpen ? "border-rule-strong" : "border-rule")}>
            <div className="flex items-center gap-1 pr-1.5">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex min-h-11 min-w-0 flex-1 items-center gap-3 px-3.5 text-left"
              >
                <span className="font-mono text-xs tabular-nums text-ink-muted">{index + 1}</span>
                <span className={cn("truncate text-sm", title ? "text-ink" : "text-ink-muted italic")}>
                  {title || `New ${itemName}`}
                </span>
              </button>
              <button type="button" className={iconButton} disabled={index === 0} onClick={() => move(index, index - 1)} aria-label={`Move ${title || itemName} up`}>
                <ArrowUp className="h-4 w-4" />
              </button>
              <button type="button" className={iconButton} disabled={index === items.length - 1} onClick={() => move(index, index + 1)} aria-label={`Move ${title || itemName} down`}>
                <ArrowDown className="h-4 w-4" />
              </button>
              <button
                type="button"
                className={cn(iconButton, "hover:text-error")}
                onClick={() => {
                  onChange(items.filter((_, i) => i !== index));
                  setOpen(null);
                }}
                aria-label={`Remove ${title || itemName}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            {isOpen ? (
              <div className="border-t border-rule p-4">
                <FieldsGrid
                  fields={fields}
                  value={item}
                  idPrefix={`${idPrefix}-${index}`}
                  onChange={(next) => onChange(items.map((it, i) => (i === index ? next : it)))}
                />
              </div>
            ) : null}
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => {
          onChange([...items, clone(newItem)]);
          setOpen(items.length);
        }}
        className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-dashed border-rule-strong text-sm text-ink-muted hover:border-ink hover:text-ink"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        Add {itemName}
      </button>
    </div>
  );
}

// ---------- the editor ----------

export function SectionEditor({ slug, initial }: { slug: string; initial: unknown }) {
  const def = findSection(slug);
  const [data, setData] = useState<unknown>(() => clone(initial));
  const [saved, setSaved] = useState<string>(() => JSON.stringify(initial));
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  const dirty = useMemo(() => JSON.stringify(data) !== saved, [data, saved]);

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  if (!def) return null;
  const shape = def.shape;

  function change(next: unknown) {
    setData(next);
    if (status !== "idle") setStatus("idle");
  }

  function save() {
    let payload: unknown;
    const missing: string[] = [];
    if (shape.type === "strings") {
      payload = (data as string[]).map((s) => s.trim()).filter(Boolean);
    } else if (shape.type === "object") {
      findMissing(shape.fields, data as Obj, "", missing);
      payload = normalizeFields(shape.fields, data as Obj);
    } else {
      (data as Obj[]).forEach((item, i) =>
        findMissing(shape.fields, item, `${def!.title} ${i + 1} › `, missing),
      );
      payload = (data as Obj[]).map((item) => normalizeFields(shape.fields, item));
    }
    if (missing.length) {
      setStatus("error");
      setMessage(`Fill in: ${missing.slice(0, 6).join("; ")}${missing.length > 6 ? ` and ${missing.length - 6} more` : ""}.`);
      return;
    }
    startTransition(async () => {
      const result = await saveSection(slug, payload);
      if (result.error) {
        setStatus("error");
        setMessage(result.error);
        return;
      }
      const fresh = result.data ?? payload;
      setData(clone(fresh));
      setSaved(JSON.stringify(fresh));
      setStatus("saved");
      setMessage("Saved. The live site shows it now.");
    });
  }

  return (
    <div className="max-w-4xl">
      {shape.type === "strings" ? (
        <FieldInput
          id={`${slug}-strings`}
          field={{ kind: "lines", key: "value", label: shape.label, hint: shape.hint, rows: 10 }}
          value={data}
          onChange={change}
        />
      ) : shape.type === "object" ? (
        <FieldsGrid fields={shape.fields} value={data as Obj} onChange={change} idPrefix={slug} />
      ) : (
        <ListEditor
          items={data as Obj[]}
          fields={shape.fields}
          itemTitle={shape.itemTitle}
          newItem={shape.newItem}
          itemName={shape.itemName}
          onChange={change}
          idPrefix={slug}
        />
      )}

      <div className="sticky bottom-0 mt-8 flex flex-wrap items-center gap-4 border-t border-rule bg-ground/95 py-4 backdrop-blur">
        <button
          type="button"
          onClick={save}
          disabled={pending || !dirty}
          className="btn-primary inline-flex h-11 items-center gap-2 rounded-full px-5 text-[0.9375rem] font-medium disabled:opacity-50"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
          Save
        </button>
        {dirty && status === "idle" ? <span className="type-meta text-ink-muted">Unsaved changes</span> : null}
        {status === "saved" && !dirty ? (
          <span role="status" className="type-meta inline-flex items-center gap-1.5 text-live">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            {message}
          </span>
        ) : null}
        {status === "error" ? (
          <span role="alert" className="type-meta inline-flex items-start gap-1.5 text-error">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {message}
          </span>
        ) : null}
      </div>
    </div>
  );
}
