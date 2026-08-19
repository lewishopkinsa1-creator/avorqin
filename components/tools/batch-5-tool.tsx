"use client";

import { useEffect, useState } from "react";
import {
  minifyJson,
  minifyCss,
  minifyHtml,
  compactJs,
  nowTs,
  tsToDate,
  diffDates,
  age,
  pctOf,
  pctPart,
  pctChange,
  ratio,
  resolution,
  remToPx,
  pxToRem,
  emToPx,
  bytes,
  transfer,
  decodeSlug,
  httpLookup,
  mimeLookup,
  uaParse,
  uuidCheck,
  subnet,
  randomMac,
} from "@/lib/tool-utils/batch-5-utils";

export function Batch5Tool({ kind }: { kind: string }) {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [out, setOut] = useState("");
  const [err, setErr] = useState("");
  const [now, setNow] = useState(nowTs());

  useEffect(() => {
    if (kind !== "unix-timestamp-generator") {
      return;
    }

    const id = setInterval(() => setNow(nowTs()), 1000);

    return () => clearInterval(id);
  }, [kind]);

  const box =
    "w-full rounded-lg border bg-background p-3 text-foreground placeholder:text-muted-foreground";
  const outputBox =
    "w-full rounded-lg border bg-muted/30 p-3 text-foreground";
  const btn =
    "rounded-lg bg-foreground px-4 py-2 font-medium text-background transition-opacity hover:opacity-90";

  const show = (value: unknown) =>
    setOut(
      typeof value === "string"
        ? value
        : JSON.stringify(value, null, 2)
    );

  const safe = (fn: () => unknown) => {
    try {
      show(fn());
      setErr("");
    } catch (e) {
      setErr(
        e instanceof Error
          ? e.message
          : "Unable to process input."
      );
      setOut("");
    }
  };

  if (kind === "unix-timestamp-generator") {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border bg-muted/20 p-5">
          <div className="text-sm text-muted-foreground">
            Seconds
          </div>

          <code className="mt-2 block text-xl text-foreground">
            {now.seconds}
          </code>
        </div>

        <div className="rounded-xl border bg-muted/20 p-5">
          <div className="text-sm text-muted-foreground">
            Milliseconds
          </div>

          <code className="mt-2 block text-xl text-foreground">
            {now.milliseconds}
          </code>
        </div>
      </div>
    );
  }

  if (kind === "qr-code-generator") {
    const value = a || "https://avorqin.com";
    const src = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(
      value
    )}`;

    return (
      <div className="space-y-4">
        <input
          value={a}
          onChange={(e) => setA(e.target.value)}
          placeholder="Text or URL"
          className={box}
        />

        <div className="flex justify-center rounded-xl border bg-white p-6">
          <img
            src={src}
            alt="Generated QR code"
            className="h-64 w-64"
          />
        </div>

        <p className="text-sm text-muted-foreground">
          QR rendering uses a remote image endpoint in this
          initial version.
        </p>
      </div>
    );
  }

  if (kind === "user-agent-parser") {
    const value =
      a ||
      (typeof navigator !== "undefined"
        ? navigator.userAgent
        : "Mozilla/5.0");

    const result = uaParse(value);

    return (
      <div className="space-y-4">
        <textarea
          value={value}
          onChange={(e) => setA(e.target.value)}
          rows={6}
          className={`${box} font-mono text-sm`}
        />

        <pre className="overflow-x-auto rounded-lg border bg-muted/30 p-4 text-foreground">
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    );
  }

  if (kind === "mac-address-generator") {
    return (
      <div className="space-y-4">
        <button
          onClick={() => show(randomMac())}
          className={btn}
        >
          Generate MAC Address
        </button>

        <input
          value={out}
          readOnly
          className={`${outputBox} font-mono`}
        />
      </div>
    );
  }

  const defaults: Record<string, [string, string]> = {
    "json-minifier": [
      '{"site":"Avorqin","tools":75}',
      "",
    ],
    "css-minifier": ["body { margin: 0; }", ""],
    "html-minifier": [
      "<div> <strong>Avorqin</strong> </div>",
      "",
    ],
    "javascript-minifier": [
      "// Example\nconst site = 'Avorqin';",
      "",
    ],
    "unix-timestamp-to-date": [
      String(Math.floor(Date.now() / 1000)),
      "seconds",
    ],
    "date-difference-calculator": [
      "2026-01-01",
      "2026-08-18",
    ],
    "age-calculator": [
      "1990-01-01",
      new Date().toISOString().slice(0, 10),
    ],
    "percentage-calculator": ["20", "150"],
    "percentage-change-calculator": ["100", "125"],
    "aspect-ratio-calculator": ["1920", "1080"],
    "screen-resolution-calculator": ["3840", "2160"],
    "rem-to-px-converter": ["1", "16"],
    "px-to-rem-converter": ["16", "16"],
    "em-to-px-converter": ["1", "16"],
    "bytes-converter": ["1", "GB"],
    "data-transfer-time-calculator": ["1", "100"],
    "url-slug-decoder": [
      "simple-tools-done-right",
      "",
    ],
    "http-status-code-lookup": ["404", ""],
    "mime-type-lookup": [".json", ""],
    "ip-subnet-calculator": [
      "192.168.1.10/24",
      "",
    ],
    "uuid-validator": [
      "550e8400-e29b-41d4-a716-446655440000",
      "",
    ],
  };

  const [da, db] = defaults[kind] || ["", ""];
  const av = a || da;
  const bv = b || db;

  const run = () =>
    safe(() => {
      switch (kind) {
        case "json-minifier":
          return minifyJson(av);

        case "css-minifier":
          return minifyCss(av);

        case "html-minifier":
          return minifyHtml(av);

        case "javascript-minifier":
          return compactJs(av);

        case "unix-timestamp-to-date":
          return tsToDate(
            Number(av),
            bv === "milliseconds"
              ? "milliseconds"
              : "seconds"
          );

        case "date-difference-calculator":
          return diffDates(av, bv);

        case "age-calculator":
          return age(av, bv);

        case "percentage-calculator":
          return {
            percentOfValue: pctOf(
              Number(av),
              Number(bv)
            ),
            partAsPercent: pctPart(
              Number(av),
              Number(bv)
            ),
          };

        case "percentage-change-calculator":
          return (
            pctChange(Number(av), Number(bv)) + "%"
          );

        case "aspect-ratio-calculator":
          return ratio(Number(av), Number(bv));

        case "screen-resolution-calculator":
          return resolution(
            Number(av),
            Number(bv)
          );

        case "rem-to-px-converter":
          return (
            remToPx(Number(av), Number(bv)) + " px"
          );

        case "px-to-rem-converter":
          return (
            pxToRem(Number(av), Number(bv)) + " rem"
          );

        case "em-to-px-converter":
          return (
            emToPx(Number(av), Number(bv)) + " px"
          );

        case "bytes-converter":
          return (
            bytes(
              Number(av),
              bv || "GB",
              "MB"
            ) + " MB"
          );

        case "data-transfer-time-calculator":
          return transfer(
            Number(av),
            "GB",
            Number(bv),
            "Mbps"
          );

        case "url-slug-decoder":
          return decodeSlug(av);

        case "http-status-code-lookup":
          return `${av} ${
            httpLookup(Number(av)) || "Unknown"
          }`;

        case "mime-type-lookup":
          return mimeLookup(av);

        case "ip-subnet-calculator":
          return subnet(av);

        case "uuid-validator":
          return uuidCheck(av);

        default:
          return "";
      }
    });

  return (
    <div className="space-y-4">
      <textarea
        value={a}
        onChange={(e) => setA(e.target.value)}
        placeholder={da}
        rows={kind.includes("minifier") ? 8 : 3}
        className={`${box} font-mono text-sm`}
      />

      {[
        "unix-timestamp-to-date",
        "date-difference-calculator",
        "age-calculator",
        "percentage-calculator",
        "percentage-change-calculator",
        "aspect-ratio-calculator",
        "screen-resolution-calculator",
        "rem-to-px-converter",
        "px-to-rem-converter",
        "em-to-px-converter",
        "bytes-converter",
        "data-transfer-time-calculator",
      ].includes(kind) && (
        <input
          value={b}
          onChange={(e) => setB(e.target.value)}
          placeholder={db}
          className={box}
        />
      )}

      <button onClick={run} className={btn}>
        Run Tool
      </button>

      {err && (
        <p className="text-sm text-destructive">
          {err}
        </p>
      )}

      <textarea
        value={out}
        readOnly
        rows={8}
        className={`${outputBox} font-mono text-sm`}
      />
    </div>
  );
}