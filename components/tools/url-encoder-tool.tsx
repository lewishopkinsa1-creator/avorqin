"use client";

import { useState, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CopyButton } from "@/components/shared/copy-button";
import { encodeURL } from "@/lib/tool-utils/url-utils";
import { Select } from "@/components/ui/select";

export function URLEncoderTool() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'full' | 'component'>('component');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleEncode = useCallback(() => {
    setError('');
    const result = encodeURL(input, mode === 'component');
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
          label="Encoding mode"
          value={mode}
          onChange={(e) => setMode(e.target.value as 'full' | 'component')}
          className="sm:w-48"
        >
          <option value="component">Component (encodeURIComponent)</option>
          <option value="full">Full URL (encodeURI)</option>
        </Select>
      </div>
      <Textarea
        placeholder="Enter text or URL to encode..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        aria-label="URL input"
        className="font-mono text-sm"
      />
      <Button onClick={handleEncode}>Encode</Button>

      {error && (
        <Alert variant="destructive" aria-live="polite">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Encoded Output</span>
            <CopyButton text={output} />
          </div>
          <Textarea
            value={output}
            readOnly
            className="font-mono text-sm bg-muted break-all"
            aria-label="Encoded output"
            rows={6}
          />
        </div>
      )}
    </div>
  );
}
