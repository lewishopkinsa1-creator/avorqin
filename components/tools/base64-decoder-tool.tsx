"use client";

import { useState, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CopyButton } from "@/components/shared/copy-button";
import { decodeBase64 } from "@/lib/tool-utils/base64-utils";

export function Base64DecoderTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleDecode = useCallback(() => {
    setError("");

    const result = decodeBase64(input);

    if (result.success) {
      setOutput(result.data);
      return;
    }

    const resultError = (result as { error?: unknown }).error;

    setError(
      typeof resultError === "string"
        ? resultError
        : "Unable to decode Base64."
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
        placeholder="Paste Base64 string to decode..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        aria-label="Base64 input"
        className="font-mono text-sm break-all"
      />

      <div className="flex flex-wrap gap-2">
        <Button onClick={handleDecode}>Decode Base64</Button>

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
            className="font-mono text-sm bg-muted"
            aria-label="Decoded output"
            rows={8}
          />
        </div>
      )}
    </div>
  );
}