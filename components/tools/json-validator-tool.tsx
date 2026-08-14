"use client";

import { useState, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { validateJSON } from "@/lib/tool-utils/json-utils";
import { CheckCircle, XCircle } from "lucide-react";

export function JSONValidatorTool() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ valid: boolean; message?: string; line?: number; column?: number } | null>(null);

  const handleValidate = useCallback(() => {
    const res = validateJSON(input);
    if (res.success) {
      if (res.data.valid) {
        setResult({ valid: true });
      } else {
        setResult({
          valid: false,
          message: res.data.message,
          line: res.data.line,
          column: res.data.column,
        });
      }
    }
  }, [input]);

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Paste JSON to validate..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        aria-label="JSON input"
        className="font-mono text-sm"
      />
      <Button onClick={handleValidate}>Validate JSON</Button>

      {result && (
        <Alert variant={result.valid ? "success" : "destructive"} aria-live="polite">
          {result.valid ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2 inline" />
              <AlertTitle>Valid JSON</AlertTitle>
              <AlertDescription>Your JSON is syntactically correct.</AlertDescription>
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4 mr-2 inline" />
              <AlertTitle>Invalid JSON</AlertTitle>
              <AlertDescription>
                {result.message}
                {result.line && (
                  <span className="block mt-1">
                    Line: {result.line}
                    {result.column ? `, Column: ${result.column}` : ''}
                  </span>
                )}
              </AlertDescription>
            </>
          )}
        </Alert>
      )}
    </div>
  );
}
