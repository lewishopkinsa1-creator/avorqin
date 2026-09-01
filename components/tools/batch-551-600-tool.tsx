"use client";

import { useMemo, useState } from "react";
import {
  BATCH551600_CONFIG,
  runBatch551600,
  type Batch551600Kind,
  type Batch551600ResultItem,
} from "@/lib/tool-utils/batch-551-600-electrical";

const inputClass =
  "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary";
const textareaClass =
  "min-h-28 w-full rounded-lg border bg-background px-3 py-2 font-mono text-sm outline-none transition focus:border-primary";
const buttonClass =
  "rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90";
const secondaryButtonClass =
  "rounded-lg border bg-background px-4 py-2 text-sm font-medium hover:bg-muted";

function ResultGrid({ items }: { items: Batch551600ResultItem[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className="rounded-xl border bg-background p-4"
        >
          <div className="text-sm text-muted-foreground">{item.label}</div>
          <div className="mt-1 break-words text-lg font-semibold">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Batch551600Tool({ kind }: { kind: Batch551600Kind }) {
  const config = BATCH551600_CONFIG[kind];
  const initial = useMemo(
    () =>
      Object.fromEntries(
        config.fields.map((field) => [field.key, field.defaultValue || ""])
      ),
    [config]
  );

  const [values, setValues] = useState<Record<string, string>>(initial);
  const [output, setOutput] = useState("");
  const [summary, setSummary] = useState<Batch551600ResultItem[]>([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const clearResult = () => {
    setOutput("");
    setSummary([]);
    setError("");
    setCopied(false);
  };

  const run = () => {
    setError("");
    setCopied(false);
    try {
      const result = runBatch551600(kind, values);
      setOutput(result.output);
      setSummary(result.summary);
    } catch (err) {
      setOutput("");
      setSummary([]);
      setError(err instanceof Error ? err.message : "Unable to calculate.");
    }
  };

  const reset = () => {
    setValues(initial);
    clearResult();
  };

  const copy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setError("Unable to copy result.");
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {config.fields.map((field) => (
          <label key={field.key} className="block space-y-2">
            <span className="text-sm font-medium">{field.label}</span>
            {field.type === "select" ? (
              <select
                value={values[field.key] || ""}
                onChange={(event) => {
                  setValues((current) => ({ ...current, [field.key]: event.target.value }));
                  clearResult();
                }}
                className={inputClass}
              >
                {(field.options || []).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type === "input" ? "text" : "number"}
                step="any"
                value={values[field.key] || ""}
                onChange={(event) => {
                  setValues((current) => ({ ...current, [field.key]: event.target.value }));
                  clearResult();
                }}
                placeholder={field.placeholder}
                className={inputClass}
              />
            )}
          </label>
        ))}
      </div>

      {config.note && (
        <div className="rounded-lg border bg-muted/30 p-3 text-xs leading-relaxed text-muted-foreground">
          {config.note}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={run} className={buttonClass}>
          {config.button || "Calculate"}
        </button>
        <button type="button" onClick={reset} className={secondaryButtonClass}>
          Reset
        </button>
      </div>

      {error && (
        <div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {summary.length > 0 && <ResultGrid items={summary} />}

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium">Result</span>
            <button type="button" onClick={copy} className={secondaryButtonClass}>
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <textarea readOnly value={output} className={textareaClass} aria-label="Result" />
        </div>
      )}
    </div>
  );
}
