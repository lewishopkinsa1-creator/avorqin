"use client";

import { useState, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select } from "@/components/ui/select";
import { CopyButton } from "@/components/shared/copy-button";
import { decodeURL } from "@/lib/tool-utils/url-utils";

export function URLDecoderTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"component" | "full">("component");

  const handleDecode = useCallback(() => {
    setError("");

    const decodeAsComponent = mode === "component";
    const result = decodeURL(input, decodeAsComponent);

    if (result.success) {
      setOutput(result.data);
      return;
    }

    const resultError = (result as { error?: unknown }).error;

    setError(
      typeof resultError === "string"
        ? resultError
        : "Unable to decode URL."
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
        placeholder="Paste an encoded URL or URL component here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        aria-label="Encoded URL input"
        className="font-mono text-sm break-all"
        rows={8}
      />

      <div className="space-y-2">
        <label htmlFor="decode-mode" className="text-sm font-medium">
          Decode mode
        </label>

        <Select
          id="decode-mode"
          value={mode}
          onChange={(e) =>
            setMode(e.target.value as "component" | "full")
          }
          aria-label="URL decode mode"
        >
          <option value="component">URL Component</option>
          <option value="full">Full URL</option>
        </Select>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={handleDecode}>Decode URL</Button>

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
            <span className="text-sm font-medium">Decoded Output</span>
            <CopyButton text={output} />
          </div>

          <Textarea
            value={output}
            readOnly
            className="font-mono text-sm bg-muted break-all"
            aria-label="Decoded URL output"
            rows={8}
          />
        </div>
      )}
    </div>
  );
}