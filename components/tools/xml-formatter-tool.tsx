"use client";

import { useState } from "react";
import { CopyButton } from "@/components/shared/copy-button";
import { formatXml, minifyXml } from "@/lib/tool-utils/xml-utils";

const sampleXml = `<?xml version="1.0" encoding="UTF-8"?>
<catalog>
  <tool>
    <name>Avorqin</name>
    <type>Developer Utility</type>
    <status>Live</status>
  </tool>
</catalog>`;

export function XMLFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indentSize, setIndentSize] = useState(2);

  const handleFormat = () => {
    const result = formatXml(input, indentSize);

    if (result.error) {
      setOutput("");
      setError(result.error);
      return;
    }

    setError("");
    setOutput(result.formatted);
  };

  const handleMinify = () => {
    const result = minifyXml(input);

    if (result.error) {
      setOutput("");
      setError(result.error);
      return;
    }

    setError("");
    setOutput(result.formatted);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const handleLoadExample = () => {
    setInput(sampleXml);
    setOutput("");
    setError("");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="xml-input" className="text-sm font-medium">
          XML input
        </label>
        <textarea
          id="xml-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="<root><item>Example</item></root>"
          rows={14}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-mono text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
        />
      </div>

      <div className="max-w-xs space-y-2">
        <label htmlFor="xml-indent" className="text-sm font-medium">
          Indentation
        </label>
        <select
          id="xml-indent"
          value={indentSize}
          onChange={(event) => setIndentSize(Number(event.target.value))}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
        >
          <option value={2}>2 spaces</option>
          <option value={4}>4 spaces</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleFormat}
          className="rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Format XML
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
            <span className="font-semibold">Formatted XML</span>
            <CopyButton text={output} />
          </div>

          <textarea
            value={output}
            readOnly
            rows={14}
            spellCheck={false}
            className="w-full rounded-lg border bg-slate-50 px-4 py-3 font-mono text-sm"
            aria-label="Formatted XML output"
          />
        </div>
      )}
    </div>
  );
}
