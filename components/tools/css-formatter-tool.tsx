"use client";

import { useState, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CopyButton } from "@/components/shared/copy-button";
import { formatCSS } from "@/lib/tool-utils/css-utils";
import { Download } from "lucide-react";

export function CSSFormatterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleFormat = useCallback(() => {
    setError('');
    const result = formatCSS(input);
    if (result.success) {
      setOutput(result.data);
    } else {
      setError(result.error);
      setOutput('');
    }
  }, [input]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([output], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.css';
    a.click();
    URL.revokeObjectURL(url);
  }, [output]);

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Paste your CSS here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        aria-label="CSS input"
        className="font-mono text-sm"
      />
      <Button onClick={handleFormat}>Format CSS</Button>

      {error && (
        <Alert variant="destructive" aria-live="polite">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Formatted CSS</span>
            <div className="flex gap-2">
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
            aria-label="Formatted CSS output"
            rows={12}
          />
        </div>
      )}
    </div>
  );
}
