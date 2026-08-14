"use client";

import { useState, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select } from "@/components/ui/select";
import { CopyButton } from "@/components/shared/copy-button";
import { encodeURL } from "@/lib/tool-utils/url-utils";

export function URLEncoderTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"component" | "full">("component");

  const handleEncode = useCallback(() => {
    setError("");

    const encodeAsComponent = mode === "component";
    const result = encodeURL(input, encodeAsComponent);

    if (result.success) {
      setOutput(result.data);
      return;
    }

    const resultError = (result as { error?: unknown }).error;

    setError(
      typeof resultError === "string"
        ? resultError
        : "Unable to encode URL."
    );

    setOutput("");
  }, [input, mode]);

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Enter a URL or URL component to encode..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        aria-label="URL input"
        className="font-mono text-sm break-all"
        rows={8}
      />

      <div className="space-y-2">
        <label htmlFor="encode-mode" className="text-sm font-medium">
          Encode mode
        </label>

        <Select
          id="encode-mode"
          value={mode}
          onChange={(e) =>
            setMode(e.target.value as "component" | "full")
          }
          aria-label="URL encode mode"
        >
          <option value="component">URL Component</option>
          <option value="full">Full URL</option>
        </Select>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={handleEncode}>Encode URL</Button>

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
            <span className="text-sm font-medium">Encoded Output</span>
            <CopyButton text={output} />
          </div>

          <Textarea
            value={output}
            readOnly
            className="font-mono text-sm bg-muted break-all"
            aria-label="Encoded URL output"
            rows={8}
          />
        </div>
      )}
    </div>
  );
}