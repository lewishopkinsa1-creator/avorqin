"use client";

import { useState, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select } from "@/components/ui/select";
import { CopyButton } from "@/components/shared/copy-button";
import { csvToJSON } from "@/lib/tool-utils/csv-utils";

export function CSVToJSONTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [hasHeader, setHasHeader] = useState(true);

  const handleConvert = useCallback(() => {
    setError("");

    const result = csvToJSON(input, delimiter, hasHeader);

    if (result.success) {
      setOutput(JSON.stringify(result.data, null, 2));
      return;
    }

    const resultError = (result as { error?: unknown }).error;

    setError(
      typeof resultError === "string"
        ? resultError
        : "Unable to convert CSV to JSON."
    );

    setOutput("");
  }, [input, delimiter, hasHeader]);

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Paste CSV data here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        aria-label="CSV input"
        className="font-mono text-sm"
        rows={10}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="delimiter" className="text-sm font-medium">
            Delimiter
          </label>

          <Select
            id="delimiter"
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            aria-label="CSV delimiter"
          >
            <option value=",">Comma</option>
            <option value={"\t"}>Tab</option>
            <option value=";">Semicolon</option>
          </Select>
        </div>

        <div className="flex items-end">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={hasHeader}
              onChange={(e) => setHasHeader(e.target.checked)}
              className="h-4 w-4"
            />
            First row contains headers
          </label>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={handleConvert}>Convert to JSON</Button>

        <Button variant="outline" onClick={handleClear}>
          Clear
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" aria-live="polite">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium">JSON Output</span>
            <CopyButton text={output} />
          </div>

          <Textarea
            value={output}
            readOnly
            className="font-mono text-sm bg-muted"
            aria-label="JSON output"
            rows={12}
          />
        </div>
      )}
    </div>
  );
}