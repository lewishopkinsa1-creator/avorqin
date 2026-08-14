"use client";

import { useState, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CopyButton } from "@/components/shared/copy-button";
import { formatJSON } from "@/lib/tool-utils/json-utils";

export function JSONFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleFormat = useCallback(() => {
    setError("");

    const result = formatJSON(input);

    if (result.success) {
      setOutput(result.data);
      return;
    }

    const resultError = (result as { error?: unknown }).error;

    setError(
      typeof resultError === "string"
        ? resultError
        : "Unable to format JSON."
    );

    setOutput("");
  }, [input]);

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder='Paste JSON here, for example: {"name":"Avorqin"}'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        aria-label="JSON input"
        className="font-mono text-sm"
        rows={12}
      />

      <div className="flex flex-wrap gap-2">
        <Button onClick={handleFormat}>Format JSON</Button>

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
            <span className="text-sm font-medium">Formatted JSON</span>
            <CopyButton text={output} />
          </div>

          <Textarea
            value={output}
            readOnly
            className="font-mono text-sm bg-muted"
            aria-label="Formatted JSON output"
            rows={12}
          />
        </div>
      )}
    </div>
  );
}