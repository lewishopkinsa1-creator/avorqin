"use client";

import { useState } from "react";
import {
  calculateContrast,
  cmykToRgb,
  describeColor,
  generateGradientCss,
  generatePalette,
  generateShadesAndTints,
  hexToHsl,
  hslToHex,
  hslToRgb,
  normalizeHex,
  rgbToCmyk,
  rgbToHex,
  rgbToHsl,
  type ContrastResult,
  type PaletteColor,
} from "@/lib/tool-utils/color-utils";

type ColorToolKind =
  | "color-picker"
  | "color-converter"
  | "hex-to-hsl"
  | "hsl-to-hex"
  | "rgb-to-hsl"
  | "hsl-to-rgb"
  | "rgb-to-cmyk"
  | "cmyk-to-rgb"
  | "color-contrast-checker"
  | "color-palette-generator"
  | "gradient-generator"
  | "shades-and-tints-generator";

type ColorToolProps = {
  kind: ColorToolKind;
};

type PaletteType =
  | "complementary"
  | "analogous"
  | "triadic"
  | "split-complementary"
  | "tetradic"
  | "monochromatic";

type ShadesAndTintsResult = {
  shades: PaletteColor[];
  base: PaletteColor;
  tints: PaletteColor[];
};

const inputClass =
  "w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground";

const buttonClass =
  "rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90";

const secondaryButtonClass =
  "rounded-lg border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted";

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
  max,
  step,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number";
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium">{label}</span>

      <input
        type={type}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
    </label>
  );
}

function ColorSwatch({
  color,
  label,
}: {
  color: string;
  label?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <div
        className="h-24 w-full"
        style={{ backgroundColor: color }}
      />
      <div className="p-3">
        <div className="font-mono text-sm">{label ?? color}</div>
      </div>
    </div>
  );
}

function PaletteGrid({
  colors,
}: {
  colors: PaletteColor[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {colors.map((color, index) => (
        <div
          key={`${color.hex}-${index}`}
          className="overflow-hidden rounded-xl border bg-background"
        >
          <div
            className="h-20"
            style={{ backgroundColor: color.hex }}
          />

          <div className="space-y-1 p-3 text-sm">
            <div className="font-mono font-medium">{color.hex}</div>
            <div className="text-muted-foreground">
              RGB {color.rgb.r}, {color.rgb.g}, {color.rgb.b}
            </div>
            <div className="text-muted-foreground">
              HSL {color.hsl.h}°, {color.hsl.s}%, {color.hsl.l}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function colorInputValue(
  value: string,
  fallback: string
): string {
  try {
    return normalizeHex(value);
  } catch {
    return fallback;
  }
}

function parseNumber(value: string, label: string): number {
  if (value.trim() === "") {
    throw new Error(`Enter ${label}.`);
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw new Error(`${label} must be a valid number.`);
  }

  return parsed;
}

export function ColorTool({ kind }: ColorToolProps) {
  const [hex, setHex] = useState("#3366FF");

  const [r, setR] = useState("51");
  const [g, setG] = useState("102");
  const [b, setB] = useState("255");

  const [h, setH] = useState("225");
  const [s, setS] = useState("100");
  const [l, setL] = useState("60");

  const [cyan, setCyan] = useState("80");
  const [magenta, setMagenta] = useState("60");
  const [yellow, setYellow] = useState("0");
  const [black, setBlack] = useState("0");

  const [foreground, setForeground] = useState("#111111");
  const [background, setBackground] = useState("#FFFFFF");

  const [paletteType, setPaletteType] =
    useState<PaletteType>("complementary");

  const [gradientFirst, setGradientFirst] =
    useState("#3366FF");
  const [gradientSecond, setGradientSecond] =
    useState("#8B5CF6");
  const [gradientAngle, setGradientAngle] = useState("90");

  const [steps, setSteps] = useState("5");

  const [output, setOutput] = useState("");
  const [previewColor, setPreviewColor] = useState("");
  const [contrast, setContrast] =
    useState<ContrastResult | null>(null);
  const [palette, setPalette] =
    useState<PaletteColor[]>([]);
  const [shadesAndTints, setShadesAndTints] =
    useState<ShadesAndTintsResult | null>(null);
  const [gradient, setGradient] = useState("");
  const [error, setError] = useState("");

  const clearResults = () => {
    setOutput("");
    setPreviewColor("");
    setContrast(null);
    setPalette([]);
    setShadesAndTints(null);
    setGradient("");
    setError("");
  };

  const copyOutput = async () => {
    if (!output) {
      return;
    }

    await navigator.clipboard.writeText(output);
  };

  const copyText = async (value: string) => {
    if (!value) {
      return;
    }

    await navigator.clipboard.writeText(value);
  };

  const run = () => {
    clearResults();

    try {
      switch (kind) {
        case "color-picker": {
          const color = describeColor(hex);

          setHex(color.hex);
          setPreviewColor(color.hex);
          setOutput(
            [
              `HEX: ${color.hex}`,
              `RGB: rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
              `HSL: hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`,
              `CMYK: ${color.cmyk.c}%, ${color.cmyk.m}%, ${color.cmyk.y}%, ${color.cmyk.k}%`,
            ].join("\n")
          );
          break;
        }

        case "color-converter": {
          const color = describeColor(hex);

          setHex(color.hex);
          setPreviewColor(color.hex);
          setOutput(
            [
              `HEX: ${color.hex}`,
              `RGB: rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
              `HSL: hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`,
              `CMYK: cmyk(${color.cmyk.c}%, ${color.cmyk.m}%, ${color.cmyk.y}%, ${color.cmyk.k}%)`,
            ].join("\n")
          );
          break;
        }

        case "hex-to-hsl": {
          const normalized = normalizeHex(hex);
          const result = hexToHsl(normalized);

          setHex(normalized);
          setPreviewColor(normalized);
          setOutput(
            `hsl(${result.h}, ${result.s}%, ${result.l}%)`
          );
          break;
        }

        case "hsl-to-hex": {
          const result = hslToHex(
            parseNumber(h, "hue"),
            parseNumber(s, "saturation"),
            parseNumber(l, "lightness")
          );

          setPreviewColor(result);
          setOutput(result);
          break;
        }

        case "rgb-to-hsl": {
          const red = parseNumber(r, "red");
          const green = parseNumber(g, "green");
          const blue = parseNumber(b, "blue");

          const result = rgbToHsl(red, green, blue);
          const preview = rgbToHex(
            Math.round(red),
            Math.round(green),
            Math.round(blue)
          );

          setPreviewColor(preview);
          setOutput(
            `hsl(${result.h}, ${result.s}%, ${result.l}%)`
          );
          break;
        }

        case "hsl-to-rgb": {
          const result = hslToRgb(
            parseNumber(h, "hue"),
            parseNumber(s, "saturation"),
            parseNumber(l, "lightness")
          );

          const preview = rgbToHex(
            result.r,
            result.g,
            result.b
          );

          setPreviewColor(preview);
          setOutput(
            `rgb(${result.r}, ${result.g}, ${result.b})`
          );
          break;
        }

        case "rgb-to-cmyk": {
          const red = parseNumber(r, "red");
          const green = parseNumber(g, "green");
          const blue = parseNumber(b, "blue");

          const result = rgbToCmyk(red, green, blue);
          const preview = rgbToHex(
            Math.round(red),
            Math.round(green),
            Math.round(blue)
          );

          setPreviewColor(preview);
          setOutput(
            `cmyk(${result.c}%, ${result.m}%, ${result.y}%, ${result.k}%)`
          );
          break;
        }

        case "cmyk-to-rgb": {
          const result = cmykToRgb(
            parseNumber(cyan, "cyan"),
            parseNumber(magenta, "magenta"),
            parseNumber(yellow, "yellow"),
            parseNumber(black, "black")
          );

          const preview = rgbToHex(
            result.r,
            result.g,
            result.b
          );

          setPreviewColor(preview);
          setOutput(
            `rgb(${result.r}, ${result.g}, ${result.b})`
          );
          break;
        }

        case "color-contrast-checker": {
          const result = calculateContrast(
            foreground,
            background
          );

          setForeground(result.foreground);
          setBackground(result.background);
          setContrast(result);
          setOutput(`${result.ratio}:1`);
          break;
        }

        case "color-palette-generator": {
          const normalized = normalizeHex(hex);
          const result = generatePalette(
            normalized,
            paletteType
          );

          setHex(normalized);
          setPalette(result);
          setOutput(
            result.map((color) => color.hex).join("\n")
          );
          break;
        }

        case "gradient-generator": {
          const css = generateGradientCss(
            gradientFirst,
            gradientSecond,
            parseNumber(gradientAngle, "gradient angle")
          );

          setGradient(css);
          setOutput(`background: ${css};`);
          break;
        }

        case "shades-and-tints-generator": {
          const normalized = normalizeHex(hex);
          const result = generateShadesAndTints(
            normalized,
            parseNumber(steps, "number of steps")
          );

          setHex(normalized);
          setShadesAndTints(result);

          setOutput(
            [
              "Shades:",
              ...result.shades.map((color) => color.hex),
              "",
              `Base: ${result.base.hex}`,
              "",
              "Tints:",
              ...result.tints.map((color) => color.hex),
            ].join("\n")
          );
          break;
        }

        default:
          throw new Error(
            "This color tool is not configured."
          );
      }
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Unable to process the color."
      );
    }
  };

  const showHexInput =
    kind === "color-picker" ||
    kind === "color-converter" ||
    kind === "hex-to-hsl" ||
    kind === "color-palette-generator" ||
    kind === "shades-and-tints-generator";

  const showRgbInputs =
    kind === "rgb-to-hsl" ||
    kind === "rgb-to-cmyk";

  const showHslInputs =
    kind === "hsl-to-hex" ||
    kind === "hsl-to-rgb";

  return (
    <div className="space-y-5">
      {showHexInput && (
        <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
          <label className="block space-y-2">
            <span className="text-sm font-medium">
              Color
            </span>

            <input
              type="color"
              value={colorInputValue(hex, "#3366FF")}
              onChange={(event) =>
                setHex(event.target.value.toUpperCase())
              }
              className="h-11 w-full cursor-pointer rounded-lg border bg-background p-1"
              aria-label="Choose a color"
            />
          </label>

          <Field
            label="HEX color"
            value={hex}
            onChange={setHex}
            placeholder="#3366FF"
          />
        </div>
      )}

      {showRgbInputs && (
        <div className="grid gap-4 sm:grid-cols-3">
          <Field
            label="Red"
            value={r}
            onChange={setR}
            type="number"
            min={0}
            max={255}
            step={1}
            placeholder="51"
          />

          <Field
            label="Green"
            value={g}
            onChange={setG}
            type="number"
            min={0}
            max={255}
            step={1}
            placeholder="102"
          />

          <Field
            label="Blue"
            value={b}
            onChange={setB}
            type="number"
            min={0}
            max={255}
            step={1}
            placeholder="255"
          />
        </div>
      )}

      {showHslInputs && (
        <div className="grid gap-4 sm:grid-cols-3">
          <Field
            label="Hue"
            value={h}
            onChange={setH}
            type="number"
            step={1}
            placeholder="225"
          />

          <Field
            label="Saturation (%)"
            value={s}
            onChange={setS}
            type="number"
            min={0}
            max={100}
            step={0.1}
            placeholder="100"
          />

          <Field
            label="Lightness (%)"
            value={l}
            onChange={setL}
            type="number"
            min={0}
            max={100}
            step={0.1}
            placeholder="60"
          />
        </div>
      )}

      {kind === "cmyk-to-rgb" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field
            label="Cyan (%)"
            value={cyan}
            onChange={setCyan}
            type="number"
            min={0}
            max={100}
            step={0.1}
          />

          <Field
            label="Magenta (%)"
            value={magenta}
            onChange={setMagenta}
            type="number"
            min={0}
            max={100}
            step={0.1}
          />

          <Field
            label="Yellow (%)"
            value={yellow}
            onChange={setYellow}
            type="number"
            min={0}
            max={100}
            step={0.1}
          />

          <Field
            label="Black (%)"
            value={black}
            onChange={setBlack}
            type="number"
            min={0}
            max={100}
            step={0.1}
          />
        </div>
      )}

      {kind === "color-contrast-checker" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-3">
            <div className="grid grid-cols-[72px_1fr] gap-3">
              <input
                type="color"
                value={colorInputValue(foreground, "#111111")}
                onChange={(event) =>
                  setForeground(
                    event.target.value.toUpperCase()
                  )
                }
                className="h-11 w-full cursor-pointer rounded-lg border bg-background p-1"
                aria-label="Choose foreground color"
              />

              <Field
                label="Foreground"
                value={foreground}
                onChange={setForeground}
                placeholder="#111111"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-[72px_1fr] gap-3">
              <input
                type="color"
                value={colorInputValue(background, "#FFFFFF")}
                onChange={(event) =>
                  setBackground(
                    event.target.value.toUpperCase()
                  )
                }
                className="h-11 w-full cursor-pointer rounded-lg border bg-background p-1"
                aria-label="Choose background color"
              />

              <Field
                label="Background"
                value={background}
                onChange={setBackground}
                placeholder="#FFFFFF"
              />
            </div>
          </div>
        </div>
      )}

      {kind === "color-palette-generator" && (
        <label className="block space-y-2">
          <span className="text-sm font-medium">
            Palette type
          </span>

          <select
            value={paletteType}
            onChange={(event) =>
              setPaletteType(
                event.target.value as PaletteType
              )
            }
            className={inputClass}
          >
            <option value="complementary">
              Complementary
            </option>
            <option value="analogous">
              Analogous
            </option>
            <option value="triadic">
              Triadic
            </option>
            <option value="split-complementary">
              Split complementary
            </option>
            <option value="tetradic">
              Tetradic
            </option>
            <option value="monochromatic">
              Monochromatic
            </option>
          </select>
        </label>
      )}

      {kind === "gradient-generator" && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid grid-cols-[72px_1fr] gap-3">
              <input
                type="color"
                value={colorInputValue(gradientFirst, "#3366FF")}
                onChange={(event) =>
                  setGradientFirst(
                    event.target.value.toUpperCase()
                  )
                }
                className="h-11 w-full cursor-pointer rounded-lg border bg-background p-1"
                aria-label="Choose first gradient color"
              />

              <Field
                label="First color"
                value={gradientFirst}
                onChange={setGradientFirst}
                placeholder="#3366FF"
              />
            </div>

            <div className="grid grid-cols-[72px_1fr] gap-3">
              <input
                type="color"
                value={colorInputValue(gradientSecond, "#8B5CF6")}
                onChange={(event) =>
                  setGradientSecond(
                    event.target.value.toUpperCase()
                  )
                }
                className="h-11 w-full cursor-pointer rounded-lg border bg-background p-1"
                aria-label="Choose second gradient color"
              />

              <Field
                label="Second color"
                value={gradientSecond}
                onChange={setGradientSecond}
                placeholder="#8B5CF6"
              />
            </div>
          </div>

          <Field
            label="Angle (degrees)"
            value={gradientAngle}
            onChange={setGradientAngle}
            type="number"
            step={1}
            placeholder="90"
          />
        </>
      )}

      {kind === "shades-and-tints-generator" && (
        <Field
          label="Steps"
          value={steps}
          onChange={setSteps}
          type="number"
          min={2}
          max={10}
          step={1}
          placeholder="5"
        />
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={run}
          className={buttonClass}
        >
          Run Tool
        </button>

        {(output ||
          previewColor ||
          contrast ||
          palette.length > 0 ||
          shadesAndTints ||
          gradient ||
          error) && (
          <button
            type="button"
            onClick={clearResults}
            className={secondaryButtonClass}
          >
            Clear result
          </button>
        )}
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
        >
          {error}
        </div>
      )}

      {contrast && (
        <div className="space-y-4">
          <div
            className="rounded-xl border p-6 text-center text-lg font-semibold"
            style={{
              color: contrast.foreground,
              backgroundColor: contrast.background,
            }}
          >
            Sample text — {contrast.ratio}:1
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Normal AA", contrast.normalAA],
              ["Normal AAA", contrast.normalAAA],
              ["Large AA", contrast.largeAA],
              ["Large AAA", contrast.largeAAA],
            ].map(([label, passed]) => (
              <div
                key={String(label)}
                className="rounded-xl border bg-background p-4"
              >
                <div className="text-sm font-medium">
                  {String(label)}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {Boolean(passed) ? "Pass" : "Fail"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {palette.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold">
            Generated palette
          </h3>

          <PaletteGrid colors={palette} />
        </div>
      )}

      {gradient && (
        <div className="space-y-3">
          <div
            className="h-48 rounded-xl border"
            style={{ background: gradient }}
          />

          <button
            type="button"
            onClick={() =>
              copyText(`background: ${gradient};`)
            }
            className={secondaryButtonClass}
          >
            Copy CSS
          </button>
        </div>
      )}

      {shadesAndTints && (
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-semibold">Shades</h3>
            <PaletteGrid colors={shadesAndTints.shades} />
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Base color</h3>
            <PaletteGrid colors={[shadesAndTints.base]} />
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Tints</h3>
            <PaletteGrid colors={shadesAndTints.tints} />
          </div>
        </div>
      )}

      {previewColor && (
        <ColorSwatch
          color={previewColor}
          label={previewColor}
        />
      )}

      {output && (
        <div className="space-y-3">
          <h3 className="font-semibold">Result</h3>

          <textarea
            value={output}
            readOnly
            rows={Math.min(
              14,
              Math.max(3, output.split("\n").length + 1)
            )}
            className="w-full rounded-lg border bg-muted/30 p-3 font-mono text-sm text-foreground"
          />

          <button
            type="button"
            onClick={copyOutput}
            className={secondaryButtonClass}
          >
            Copy result
          </button>
        </div>
      )}
    </div>
  );
}