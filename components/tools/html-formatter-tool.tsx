"use client";

import { useState, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CopyButton } from "@/components/shared/copy-button";
import { formatHTML } from "@/lib/tool-utils/html-utils";
import { Download } from "lucide-react";

export function HTMLFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleFormat = useCallback(() => {
    setError("");

    const result = formatHTML(input);

    if (result.success) {
      setOutput(result.data);
      return;
    }

    const resultError = (result as { error?: unknown }).error;

    setError(
      typeof resultError === "string"
        ? resultError
        : "Unable to format HTML."
    );

    setOutput("");
  }, [input]);

  const handleDownload = useCallback(() => {
    if (!output) return;

    const blob = new Blob([output], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "formatted.html";
    a.click();

    URL.revokeObjectURL(url);
  }, [output]);

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Paste your HTML here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        aria-label="HTML input"
        className="font-mono text-sm"
        rows={12}
      />

      <div className="flex flex-wrap gap-2">
        <Button onClick={handleFormat}>Format HTML</Button>

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
            <span className="text-sm font-medium">Formatted HTML</span>

            <div className="flex flex-wrap gap-2">
              <CopyButton text={output} />

              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>

          <Textarea
            value={output}
            readOnly
            className="font-mono text-sm bg-muted"
            aria-label="Formatted HTML output"
            rows={12}
          />
        </div>
      )}
    </div>
  );
}