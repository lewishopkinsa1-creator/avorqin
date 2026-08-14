"use client";

import { useState, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CopyButton } from "@/components/shared/copy-button";
import { encodeBase64 } from "@/lib/tool-utils/base64-utils";

export function Base64EncoderTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleEncode = useCallback(() => {
    setError('');
    const result = encodeBase64(input);
    if (result.success) {
      setOutput(result.data);
    } else {
      setError(result.error);
      setOutput('');
    }
  }, [input]);

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Enter text to encode..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        aria-label="Text input"
        className="font-mono text-sm"
      />
      <Button onClick={handleEncode}>Encode to Base64</Button>

      {error && (
        <Alert variant="destructive" aria-live="polite">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Base64 Output</span>
            <CopyButton text={output} />
          </div>
          <Textarea
            value={output}
            readOnly
            className="font-mono text-sm bg-muted break-all"
            aria-label="Base64 output"
            rows={6}
          />
        </div>
      )}
    </div>
  );
}
