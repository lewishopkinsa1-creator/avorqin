"use client";

import { useState, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CopyButton } from "@/components/shared/copy-button";
import { Select } from "@/components/ui/select";
import { csvToJSON } from "@/lib/tool-utils/csv-utils";
import { Download } from "lucide-react";

export function CSVToJSONTool() {
  const [input, setInput] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [hasHeader, setHasHeader] = useState(true);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleConvert = useCallback(() => {
    setError('');
    const result = csvToJSON(input, delimiter, hasHeader);
    if (result.success) {
      setOutput(JSON.stringify(result.data, null, 2));
    } else {
      setError(result.error);
      setOutput('');
    }
  }, [input, delimiter, hasHeader]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [output]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Select
          label="Delimiter"
          value={delimiter}
          onChange={(e) => setDelimiter(e.target.value)}
          className="sm:w-40"
        >
          <option value=",">Comma</option>
          <option value={"\t"}>Tab</option>
          <option value=";">Semicolon</option>
        </Select>
        <div className="flex items-center gap-2 h-10">
          <input
            type="checkbox"
            id="header"
            checked={hasHeader}
            onChange={(e) => setHasHeader(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          <label htmlFor="header" className="text-sm font-medium">
            First row is header
          </label>
        </div>
      </div>

      <Textarea
        placeholder="Paste CSV data here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        aria-label="CSV input"
        className="font-mono text-sm"
      />
      <Button onClick={handleConvert}>Convert to JSON</Button>

      {error && (
        <Alert variant="destructive" aria-live="polite">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">JSON Output</span>
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
            aria-label="JSON output"
            rows={12}
          />
        </div>
      )}
    </div>
  );
}
