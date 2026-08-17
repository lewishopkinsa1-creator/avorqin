"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/shared/copy-button";
import { generateUuids } from "@/lib/tool-utils/uuid-utils";
import { RefreshCw, Trash2 } from "lucide-react";

const quantityOptions = [1, 5, 10, 25, 50];

export function UUIDGeneratorTool() {
  const [quantity, setQuantity] = useState(1);
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    const uuids = generateUuids(quantity);
    setOutput(uuids.join("\n"));
  };

  const handleClear = () => {
    setOutput("");
  };

  return (
    <div className="space-y-5">
      <div className="max-w-xs">
        <Select
          label="Number of UUIDs"
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
          aria-label="Number of UUIDs to generate"
        >
          {quantityOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={handleGenerate}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate {quantity === 1 ? "UUID" : "UUIDs"}
        </Button>

        <Button
          variant="outline"
          onClick={handleClear}
          disabled={!output}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear
        </Button>
      </div>

      {output ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium">
              Generated {quantity === 1 ? "UUID" : "UUIDs"}
            </span>

            <CopyButton text={output} />
          </div>

          <Textarea
            value={output}
            readOnly
            rows={Math.min(Math.max(quantity, 4), 12)}
            className="font-mono text-sm bg-muted"
            aria-label="Generated UUID output"
          />
        </div>
      ) : (
        <div className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
          Choose a quantity and generate secure UUID v4 identifiers.
        </div>
      )}
    </div>
  );
}
