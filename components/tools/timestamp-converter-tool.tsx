"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CopyButton } from "@/components/shared/copy-button";
import { Select } from "@/components/ui/select";
import {
  timestampToDate,
  dateToTimestamp,
  getCurrentTimestamp,
} from "@/lib/tool-utils/timestamp-utils";
import { Clock, ArrowRightLeft } from "lucide-react";

export function TimestampConverterTool() {
  const [input, setInput] = useState("");
  const [unit, setUnit] = useState<"seconds" | "milliseconds">("seconds");
  const [direction, setDirection] = useState<
    "ts-to-date" | "date-to-ts"
  >("ts-to-date");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [liveTs, setLiveTs] = useState(getCurrentTimestamp("seconds"));

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTs(getCurrentTimestamp("seconds"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleConvert = useCallback(() => {
    setError("");

    if (direction === "ts-to-date") {
      const ts = parseInt(input, 10);

      if (isNaN(ts)) {
        setError("Please enter a valid number.");
        setOutput("");
        return;
      }

      const result = timestampToDate(ts, unit);

      if (result.success) {
        setOutput(result.data);
        return;
      }

      const resultError = (result as { error?: unknown }).error;

      setError(
        typeof resultError === "string"
          ? resultError
          : "Unable to convert timestamp."
      );

      setOutput("");
      return;
    }

    const result = dateToTimestamp(input, unit);

    if (result.success) {
      setOutput(String(result.data));
      return;
    }

    const resultError = (result as { error?: unknown }).error;

    setError(
      typeof resultError === "string"
        ? resultError
        : "Unable to convert date."
    );

    setOutput("");
  }, [input, unit, direction]);

  const handleUseCurrent = useCallback(() => {
    setDirection("ts-to-date");
    setUnit("seconds");
    setInput(String(getCurrentTimestamp("seconds")));
  }, []);

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted rounded-md px-3 py-2">
        <Clock className="h-4 w-4" />
        <span>
          Current Unix timestamp: <strong>{liveTs}</strong> seconds
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Select
          label="Direction"
          value={direction}
          onChange={(e) =>
            setDirection(
              e.target.value as "ts-to-date" | "date-to-ts"
            )
          }
          className="sm:w-56"
        >
          <option value="ts-to-date">Timestamp → Date</option>
          <option value="date-to-ts">Date → Timestamp</option>
        </Select>

        <Select
          label="Unit"
          value={unit}
          onChange={(e) =>
            setUnit(e.target.value as "seconds" | "milliseconds")
          }
          className="sm:w-48"
        >
          <option value="seconds">Seconds</option>
          <option value="milliseconds">Milliseconds</option>
        </Select>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder={
            direction === "ts-to-date"
              ? "Enter timestamp..."
              : "Enter date (e.g. 2024-01-15T10:30:00Z)..."
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label={
            direction === "ts-to-date"
              ? "Timestamp input"
              : "Date input"
          }
          className="font-mono text-sm flex-1"
        />

        <Button
          variant="outline"
          onClick={handleUseCurrent}
          title="Use current timestamp"
        >
          <Clock className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={handleConvert}>
          <ArrowRightLeft className="h-4 w-4 mr-2" />
          Convert
        </Button>

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
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Result</span>
            <CopyButton text={output} />
          </div>

          <div className="rounded-md border bg-muted px-3 py-2 font-mono text-sm">
            {output}
          </div>
        </div>
      )}
    </div>
  );
}