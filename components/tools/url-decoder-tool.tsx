"use client";

import { useState, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CopyButton } from "@/components/shared/copy-button";
import { decodeURL } from "@/lib/tool-utils/url-utils";
import { Select } from "@/components/ui/select";

export function URLDecoderTool() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'full' | 'component'>('component');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleDecode = useCallback(() => {
    setError('');
    const result = decodeURL(input, mode === 'component');
    if (result.success) {
      setOutput(result.data);
    } else {
      setError(result.error);
      setOutput('');
    }
  }, [input, mode]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Select
          label="Decoding mode"
          value={mode}
          onChange={(e) => setMode(e.target.value as 'full' | 'component')}
          className="sm:w-48"
        >
          <option value="component">Component (decodeURIComponent)</option>
          <option value="full">Full URL (decodeURI)</option>
        </Select>
      </div>
      <Textarea
        placeholder="Paste percent-encoded text or URL..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        aria-label="Encoded input"
        className="font-mono text-sm break-all"
      />
      <Button onClick={handleDecode}>Decode</Button>

      {error && (
        <Alert variant="destructive" aria-live="polite">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Decoded Output</span>
            <CopyButton text={output} />
          </div>
          <Textarea
            value={output}
            readOnly
            className="font-mono text-sm bg-muted"
            aria-label="Decoded output"
            rows={6}
          />
        </div>
      )}
    </div>
  );
}
