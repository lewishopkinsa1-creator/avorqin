"use client";

import { useState } from "react";
import { CopyButton } from "@/components/shared/copy-button";
import { jsonToCsv } from "@/lib/tool-utils/json-to-csv-utils";

type DelimiterOption = "," | ";" | "\t";

const sampleJson = `[
  {
    "name": "Avorqin",
    "status": "live",
    "tools": 12
  },
  {
    "name": "Example",
    "status": "testing",
    "tools": 5
  }
]`;

export function JSONToCSVTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [delimiter, setDelimiter] = useState<DelimiterOption>(",");
  const [includeHeader, setIncludeHeader] = useState(true);

  const handleConvert = () => {
    setError("");

    if (!input.trim()) {
      setOutput("");
      setError("Paste JSON data to convert.");
      return;
    }

    try {
      setOutput(jsonToCsv(input, delimiter, includeHeader));
    } catch (err) {
      setOutput("");
      setError(
        err instanceof Error ? err.message : "Unable to convert JSON to CSV."
      );
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const handleLoadExample = () => {
    setInput(sampleJson);
    setOutput("");
    setError("");
  };

  const delimiterLabel =
    delimiter === "," ? "Comma" : delimiter === ";" ? "Semicolon" : "Tab";

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="json-csv-input" className="text-sm font-medium">
          JSON input
        </label>
        <textarea
          id="json-csv-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder='Paste a JSON array such as [{"name":"Avorqin","tools":12}]'
          rows={12}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-mono text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="csv-delimiter" className="text-sm font-medium">
            CSV delimiter
          </label>
          <select
            id="csv-delimiter"
            value={delimiter}
            onChange={(event) =>
              setDelimiter(event.target.value as DelimiterOption)
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          >
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value={"\t"}>Tab</option>
          </select>
        </div>

        <div className="flex items-end">
          <label className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm">
            <input
              type="checkbox"
              checked={includeHeader}
              onChange={(event) => setIncludeHeader(event.target.checked)}
              className="h-4 w-4"
            />
            Include header row
          </label>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleConvert}
          className="rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Convert to CSV
        </button>
        <button
          type="button"
          onClick={handleLoadExample}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
        >
          Load example
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
        >
          Clear
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="font-semibold">CSV output</div>
              <div className="text-sm text-slate-500">
                Delimiter: {delimiterLabel}
              </div>
            </div>
            <CopyButton text={output} />
          </div>

          <textarea
            value={output}
            readOnly
            rows={12}
            spellCheck={false}
            className="w-full rounded-lg border bg-slate-50 px-4 py-3 font-mono text-sm"
            aria-label="CSV output"
          />
        </div>
      )}
    </div>
  );
}
