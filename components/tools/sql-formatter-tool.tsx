"use client";

import { useState } from "react";
import { formatSql, minifySql } from "@/lib/tool-utils/sql-utils";

const SAMPLE_SQL =
  "select u.id,u.name,o.total from users u left join orders o on o.user_id=u.id where u.active=true and o.total>100 order by o.total desc;";

export function SQLFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indentSize, setIndentSize] = useState<2 | 4>(2);
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    setOutput(formatSql(input, indentSize));
    setCopied(false);
  };

  const handleMinify = () => {
    setOutput(minifySql(input));
    setCopied(false);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!output) return;

    await navigator.clipboard.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="sql-input" className="text-sm font-medium">
              SQL Input
            </label>
            <button
              type="button"
              onClick={() => setInput(SAMPLE_SQL)}
              className="text-sm font-medium text-slate-600 hover:text-slate-950"
            >
              Load example
            </button>
          </div>

          <textarea
            id="sql-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Paste SQL here..."
            rows={16}
            spellCheck={false}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-mono text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="sql-output" className="text-sm font-medium">
              Formatted SQL
            </label>

            <button
              type="button"
              onClick={handleCopy}
              disabled={!output}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          <textarea
            id="sql-output"
            value={output}
            readOnly
            placeholder="Formatted SQL will appear here..."
            rows={16}
            spellCheck={false}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 font-mono text-sm outline-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="space-y-1">
          <label htmlFor="sql-indent" className="block text-sm font-medium">
            Indentation
          </label>
          <select
            id="sql-indent"
            value={indentSize}
            onChange={(event) =>
              setIndentSize(Number(event.target.value) === 4 ? 4 : 2)
            }
            className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleFormat}
          className="rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Format SQL
        </button>

        <button
          type="button"
          onClick={handleMinify}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
        >
          Minify
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
        >
          Clear
        </button>
      </div>

      <p className="text-sm text-slate-500">
        SQL formatting happens locally in your browser. This formatter is
        intended for common SQL syntax and does not execute or validate queries
        against a database.
      </p>
    </div>
  );
}
