"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
type JustifyContent =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly";
type AlignItems = "stretch" | "flex-start" | "center" | "flex-end" | "baseline";
type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";
type AlignContent =
  | "stretch"
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly";

type FlexboxState = {
  direction: FlexDirection;
  justify: JustifyContent;
  align: AlignItems;
  wrap: FlexWrap;
  alignContent: AlignContent;
  gap: number;
  items: number;
};

const DEFAULTS: FlexboxState = {
  direction: "row",
  justify: "flex-start",
  align: "stretch",
  wrap: "nowrap",
  alignContent: "stretch",
  gap: 16,
  items: 5,
};

const inputClass =
  "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary";
const buttonClass =
  "rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90";
const secondaryButtonClass =
  "rounded-lg border bg-background px-4 py-2 text-sm font-medium transition hover:bg-muted";

function clampNumber(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function FlexboxGeneratorTool() {
  const [settings, setSettings] = useState<FlexboxState>(DEFAULTS);
  const [copied, setCopied] = useState(false);

  const css = useMemo(
    () => `.flex-container {
  display: flex;
  flex-direction: ${settings.direction};
  justify-content: ${settings.justify};
  align-items: ${settings.align};
  flex-wrap: ${settings.wrap};
  align-content: ${settings.alignContent};
  gap: ${settings.gap}px;
}`,
    [settings]
  );

  const previewStyle: CSSProperties = {
    display: "flex",
    flexDirection: settings.direction,
    justifyContent: settings.justify,
    alignItems: settings.align,
    flexWrap: settings.wrap,
    alignContent: settings.alignContent,
    gap: `${settings.gap}px`,
  };

  const setPreset = (preset: "center" | "navbar" | "cards" | "column") => {
    if (preset === "center") {
      setSettings({
        direction: "row",
        justify: "center",
        align: "center",
        wrap: "nowrap",
        alignContent: "stretch",
        gap: 16,
        items: 3,
      });
    } else if (preset === "navbar") {
      setSettings({
        direction: "row",
        justify: "space-between",
        align: "center",
        wrap: "nowrap",
        alignContent: "stretch",
        gap: 16,
        items: 4,
      });
    } else if (preset === "cards") {
      setSettings({
        direction: "row",
        justify: "flex-start",
        align: "stretch",
        wrap: "wrap",
        alignContent: "flex-start",
        gap: 16,
        items: 8,
      });
    } else {
      setSettings({
        direction: "column",
        justify: "flex-start",
        align: "stretch",
        wrap: "nowrap",
        alignContent: "stretch",
        gap: 12,
        items: 4,
      });
    }
    setCopied(false);
  };

  const copyCss = async () => {
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-3 text-sm font-medium">Quick presets</div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setPreset("center")} className={secondaryButtonClass}>
            Centered
          </button>
          <button type="button" onClick={() => setPreset("navbar")} className={secondaryButtonClass}>
            Navbar
          </button>
          <button type="button" onClick={() => setPreset("cards")} className={secondaryButtonClass}>
            Wrapping cards
          </button>
          <button type="button" onClick={() => setPreset("column")} className={secondaryButtonClass}>
            Column stack
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="space-y-2">
          <span className="text-sm font-medium">Flex direction</span>
          <select
            value={settings.direction}
            onChange={(event) =>
              setSettings((current) => ({
                ...current,
                direction: event.target.value as FlexDirection,
              }))
            }
            className={inputClass}
          >
            <option value="row">Row</option>
            <option value="row-reverse">Row reverse</option>
            <option value="column">Column</option>
            <option value="column-reverse">Column reverse</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium">Justify content</span>
          <select
            value={settings.justify}
            onChange={(event) =>
              setSettings((current) => ({
                ...current,
                justify: event.target.value as JustifyContent,
              }))
            }
            className={inputClass}
          >
            <option value="flex-start">Start</option>
            <option value="center">Center</option>
            <option value="flex-end">End</option>
            <option value="space-between">Space between</option>
            <option value="space-around">Space around</option>
            <option value="space-evenly">Space evenly</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium">Align items</span>
          <select
            value={settings.align}
            onChange={(event) =>
              setSettings((current) => ({
                ...current,
                align: event.target.value as AlignItems,
              }))
            }
            className={inputClass}
          >
            <option value="stretch">Stretch</option>
            <option value="flex-start">Start</option>
            <option value="center">Center</option>
            <option value="flex-end">End</option>
            <option value="baseline">Baseline</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium">Flex wrap</span>
          <select
            value={settings.wrap}
            onChange={(event) =>
              setSettings((current) => ({
                ...current,
                wrap: event.target.value as FlexWrap,
              }))
            }
            className={inputClass}
          >
            <option value="nowrap">No wrap</option>
            <option value="wrap">Wrap</option>
            <option value="wrap-reverse">Wrap reverse</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium">Align content</span>
          <select
            value={settings.alignContent}
            onChange={(event) =>
              setSettings((current) => ({
                ...current,
                alignContent: event.target.value as AlignContent,
              }))
            }
            className={inputClass}
          >
            <option value="stretch">Stretch</option>
            <option value="flex-start">Start</option>
            <option value="center">Center</option>
            <option value="flex-end">End</option>
            <option value="space-between">Space between</option>
            <option value="space-around">Space around</option>
            <option value="space-evenly">Space evenly</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium">Gap (px)</span>
          <input
            type="number"
            min="0"
            max="64"
            step="1"
            value={settings.gap}
            onChange={(event) =>
              setSettings((current) => ({
                ...current,
                gap: clampNumber(Number(event.target.value), 0, 64),
              }))
            }
            className={inputClass}
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium">Preview items</span>
          <input
            type="number"
            min="1"
            max="12"
            step="1"
            value={settings.items}
            onChange={(event) =>
              setSettings((current) => ({
                ...current,
                items: Math.round(clampNumber(Number(event.target.value), 1, 12)),
              }))
            }
            className={inputClass}
          />
        </label>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium">Live preview</span>
          <span className="text-xs text-muted-foreground">Updates instantly</span>
        </div>
        <div
          className="min-h-64 overflow-auto rounded-xl border bg-muted/30 p-4"
          style={previewStyle}
          aria-label="CSS Flexbox live preview"
        >
          {Array.from({ length: settings.items }, (_, index) => (
            <div
              key={index}
              className="flex min-h-14 min-w-20 basis-24 items-center justify-center rounded-lg border bg-background px-4 py-3 text-sm font-semibold shadow-sm"
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm font-medium">Generated CSS</span>
          <div className="flex gap-2">
            <button type="button" onClick={() => setSettings(DEFAULTS)} className={secondaryButtonClass}>
              Reset
            </button>
            <button type="button" onClick={copyCss} className={buttonClass}>
              {copied ? "Copied" : "Copy CSS"}
            </button>
          </div>
        </div>
        <textarea
          readOnly
          value={css}
          className="min-h-52 w-full rounded-lg border bg-background px-3 py-3 font-mono text-sm outline-none"
          aria-label="Generated Flexbox CSS"
        />
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">
        The preview and CSS generation run entirely in your browser. Nothing you enter is uploaded.
      </p>
    </div>
  );
}
