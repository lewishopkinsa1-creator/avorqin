"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/shared/copy-button";
import {
  decodeJwt,
  formatJwtJson,
  formatJwtTimestamp,
  type DecodedJwt,
} from "@/lib/tool-utils/jwt-utils";

type JwtPayload = Record<string, unknown>;

type JwtTimestampItem = {
  claim: "exp" | "iat" | "nbf";
  label: "Expires" | "Issued at" | "Not before";
  raw: string;
  formatted: string;
};

function isRecord(value: unknown): value is JwtPayload {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function JWTDecoderTool() {
  const [input, setInput] = useState("");
  const [decoded, setDecoded] = useState<DecodedJwt | null>(null);
  const [error, setError] = useState("");

  const timestamps = useMemo<JwtTimestampItem[]>(() => {
    if (!decoded) {
      return [];
    }

    const payload = decoded.payload;

    if (!isRecord(payload)) {
      return [];
    }

    const claims: Array<{
      claim: JwtTimestampItem["claim"];
      label: JwtTimestampItem["label"];
    }> = [
      { claim: "exp", label: "Expires" },
      { claim: "iat", label: "Issued at" },
      { claim: "nbf", label: "Not before" },
    ];

    const items: JwtTimestampItem[] = [];

    for (const { claim, label } of claims) {
      const raw = payload[claim];
      const formatted = formatJwtTimestamp(raw);

      if (formatted) {
        items.push({
          claim,
          label,
          raw: String(raw),
          formatted,
        });
      }
    }

    return items;
  }, [decoded]);

  const handleDecode = () => {
    setError("");

    if (!input.trim()) {
      setDecoded(null);
      setError("Paste a JWT to decode.");
      return;
    }

    try {
      setDecoded(decodeJwt(input));
    } catch (err) {
      setDecoded(null);
      setError(err instanceof Error ? err.message : "Unable to decode JWT.");
    }
  };

  const handleClear = () => {
    setInput("");
    setDecoded(null);
    setError("");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Important:</strong> This tool decodes JWT contents only. It does
        not verify the token&apos;s signature or prove that the token is
        authentic.
      </div>

      <div className="space-y-2">
        <label htmlFor="jwt-input" className="text-sm font-medium">
          JSON Web Token
        </label>

        <textarea
          id="jwt-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Paste a JWT here..."
          rows={7}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-mono text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleDecode}
          className="rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Decode JWT
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
        >
          Clear
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {decoded && (
        <div className="space-y-6">
          <section className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-semibold">Header</h3>
              <CopyButton text={formatJwtJson(decoded.header)} />
            </div>

            <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-lg border bg-slate-50 p-4 font-mono text-sm">
              {formatJwtJson(decoded.header)}
            </pre>
          </section>

          <section className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-semibold">Payload</h3>
              <CopyButton text={formatJwtJson(decoded.payload)} />
            </div>

            <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-lg border bg-slate-50 p-4 font-mono text-sm">
              {formatJwtJson(decoded.payload)}
            </pre>
          </section>

          {timestamps.length > 0 && (
            <section className="space-y-3">
              <h3 className="font-semibold">Token timestamps</h3>

              <div className="grid gap-3 md:grid-cols-3">
                {timestamps.map((item) => (
                  <div key={item.claim} className="rounded-lg border p-4">
                    <div className="text-sm font-semibold">
                      {item.label} ({item.claim})
                    </div>

                    <div className="mt-2 break-all text-sm text-slate-600">
                      {item.formatted}
                    </div>

                    <div className="mt-1 text-xs text-slate-500">
                      Unix: {item.raw}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-semibold">Signature section</h3>
              <CopyButton text={decoded.signature} />
            </div>

            <div className="break-all rounded-lg border bg-slate-50 p-4 font-mono text-sm">
              {decoded.signature}
            </div>

            <p className="text-sm text-slate-500">
              The signature is displayed as encoded text only and is not
              verified by this decoder.
            </p>
          </section>
        </div>
      )}
    </div>
  );
}