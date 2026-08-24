"use client";

import { useState } from "react";
import {
  calculateDistance,
  calculateFraction,
  calculateGcd,
  calculateLcm,
  calculateMidpoint,
  calculatePythagorean,
  calculateSlope,
  calculateStandardDeviation,
  calculateStatistics,
  evaluateScientificExpression,
  generateRandomNumbers,
  parseNumberList,
  solveQuadratic,
  type FractionOperation,
  type FractionResult,
  type PythagoreanResult,
  type QuadraticResult,
  type StandardDeviationResult,
  type StatisticsResult,
} from "@/lib/tool-utils/math-utils";

type MathToolKind =
  | "scientific-calculator"
  | "fraction-calculator"
  | "standard-deviation-calculator"
  | "mean-median-mode-calculator"
  | "gcd-calculator"
  | "lcm-calculator"
  | "quadratic-formula-calculator"
  | "slope-calculator"
  | "midpoint-calculator"
  | "distance-formula-calculator"
  | "pythagorean-theorem-calculator"
  | "random-number-generator";

type MathToolProps = {
  kind: MathToolKind;
};

const inputClass =
  "w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground";

const textareaClass =
  "min-h-28 w-full resize-y rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground";

const buttonClass =
  "rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90";

const secondaryButtonClass =
  "rounded-lg border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted";

function NumberField({
  label,
  value,
  onChange,
  placeholder,
  step = "any",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  step?: number | "any";
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium">{label}</span>
      <input
        type="number"
        value={value}
        step={step}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
    </label>
  );
}

function parseValue(value: string, label: string): number {
  if (value.trim() === "") {
    throw new Error(`Enter ${label}.`);
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw new Error(`${label} must be a valid number.`);
  }

  return parsed;
}

function formatNumber(value: number, digits = 10): string {
  if (!Number.isFinite(value)) {
    return String(value);
  }

  if (Number.isInteger(value)) {
    return new Intl.NumberFormat("en-US").format(value);
  }

  return Number(value.toFixed(digits)).toLocaleString("en-US", {
    maximumFractionDigits: digits,
  });
}

function ResultCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-background p-4">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-1 break-words text-xl font-semibold">
        {value}
      </div>
    </div>
  );
}

function CoordinateFields({
  a,
  b,
  c,
  d,
  setA,
  setB,
  setC,
  setD,
}: {
  a: string;
  b: string;
  c: string;
  d: string;
  setA: (value: string) => void;
  setB: (value: string) => void;
  setC: (value: string) => void;
  setD: (value: string) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <NumberField label="x₁" value={a} onChange={setA} />
      <NumberField label="y₁" value={b} onChange={setB} />
      <NumberField label="x₂" value={c} onChange={setC} />
      <NumberField label="y₂" value={d} onChange={setD} />
    </div>
  );
}

export function MathTool({ kind }: MathToolProps) {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [d, setD] = useState("");
  const [listInput, setListInput] = useState("");
  const [expression, setExpression] = useState("");

  const [fractionOperation, setFractionOperation] =
    useState<FractionOperation>("add");
  const [deviationType, setDeviationType] =
    useState<"population" | "sample">("population");
  const [integersOnly, setIntegersOnly] = useState(true);

  const [scientificResult, setScientificResult] =
    useState<number | null>(null);
  const [fractionResult, setFractionResult] =
    useState<FractionResult | null>(null);
  const [statisticsResult, setStatisticsResult] =
    useState<StatisticsResult | null>(null);
  const [deviationResult, setDeviationResult] =
    useState<StandardDeviationResult | null>(null);
  const [singleNumberResult, setSingleNumberResult] =
    useState<number | null>(null);
  const [quadraticResult, setQuadraticResult] =
    useState<QuadraticResult | null>(null);
  const [pointResult, setPointResult] =
    useState<{ x: number; y: number } | null>(null);
  const [pythagoreanResult, setPythagoreanResult] =
    useState<PythagoreanResult | null>(null);
  const [randomResults, setRandomResults] =
    useState<number[] | null>(null);

  const [error, setError] = useState("");

  const clearResults = () => {
    setScientificResult(null);
    setFractionResult(null);
    setStatisticsResult(null);
    setDeviationResult(null);
    setSingleNumberResult(null);
    setQuadraticResult(null);
    setPointResult(null);
    setPythagoreanResult(null);
    setRandomResults(null);
    setError("");
  };

  const clearAll = () => {
    setA("");
    setB("");
    setC("");
    setD("");
    setListInput("");
    setExpression("");
    setFractionOperation("add");
    setDeviationType("population");
    setIntegersOnly(true);
    clearResults();
  };

  const run = () => {
    clearResults();

    try {
      switch (kind) {
        case "scientific-calculator":
          setScientificResult(
            evaluateScientificExpression(expression)
          );
          break;

        case "fraction-calculator":
          setFractionResult(
            calculateFraction(
              parseValue(a, "first numerator"),
              parseValue(b, "first denominator"),
              parseValue(c, "second numerator"),
              parseValue(d, "second denominator"),
              fractionOperation
            )
          );
          break;

        case "standard-deviation-calculator":
          setDeviationResult(
            calculateStandardDeviation(
              parseNumberList(listInput),
              deviationType
            )
          );
          break;

        case "mean-median-mode-calculator":
          setStatisticsResult(
            calculateStatistics(parseNumberList(listInput))
          );
          break;

        case "gcd-calculator":
          setSingleNumberResult(
            calculateGcd(parseNumberList(listInput))
          );
          break;

        case "lcm-calculator":
          setSingleNumberResult(
            calculateLcm(parseNumberList(listInput))
          );
          break;

        case "quadratic-formula-calculator":
          setQuadraticResult(
            solveQuadratic(
              parseValue(a, "coefficient a"),
              parseValue(b, "coefficient b"),
              parseValue(c, "coefficient c")
            )
          );
          break;

        case "slope-calculator":
          setSingleNumberResult(
            calculateSlope(
              parseValue(a, "x₁"),
              parseValue(b, "y₁"),
              parseValue(c, "x₂"),
              parseValue(d, "y₂")
            ) ?? Number.NaN
          );
          break;

        case "midpoint-calculator":
          setPointResult(
            calculateMidpoint(
              parseValue(a, "x₁"),
              parseValue(b, "y₁"),
              parseValue(c, "x₂"),
              parseValue(d, "y₂")
            )
          );
          break;

        case "distance-formula-calculator":
          setSingleNumberResult(
            calculateDistance(
              parseValue(a, "x₁"),
              parseValue(b, "y₁"),
              parseValue(c, "x₂"),
              parseValue(d, "y₂")
            )
          );
          break;

        case "pythagorean-theorem-calculator":
          setPythagoreanResult(
            calculatePythagorean(
              parseValue(a, "side a"),
              parseValue(b, "side b")
            )
          );
          break;

        case "random-number-generator":
          setRandomResults(
            generateRandomNumbers({
              min: parseValue(a, "minimum"),
              max: parseValue(b, "maximum"),
              count: parseValue(c || "1", "count"),
              integersOnly,
              decimalPlaces: parseValue(
                d || "2",
                "decimal places"
              ),
            })
          );
          break;

        default:
          throw new Error("This math tool is not configured.");
      }
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Unable to calculate the result."
      );
    }
  };

  const hasAnyInput = Boolean(
    a || b || c || d || listInput || expression
  );

  const hasResult = Boolean(
    scientificResult !== null ||
      fractionResult ||
      statisticsResult ||
      deviationResult ||
      singleNumberResult !== null ||
      quadraticResult ||
      pointResult ||
      pythagoreanResult ||
      randomResults ||
      error
  );

  const actionLabel =
    kind === "random-number-generator"
      ? "Generate"
      : kind === "scientific-calculator"
        ? "Calculate"
        : "Calculate";

  return (
    <div className="space-y-5">
      {kind === "scientific-calculator" && (
        <>
          <label className="block space-y-2">
            <span className="text-sm font-medium">Expression</span>
            <input
              type="text"
              value={expression}
              onChange={(event) => setExpression(event.target.value)}
              placeholder="Example: sqrt(144) + sin(pi / 2)"
              className={inputClass}
            />
          </label>

          <div className="rounded-lg border bg-muted/30 p-3 text-xs leading-relaxed text-muted-foreground">
            Supported operators: +, −, *, /, %, ^. Constants:
            <code className="mx-1">pi</code> and
            <code className="mx-1">e</code>. Functions include sin,
            cos, tan, asin, acos, atan, sqrt, abs, ln, log, exp,
            floor, ceil, round, min, max, and pow.
          </div>
        </>
      )}

      {kind === "fraction-calculator" && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3 rounded-xl border p-4">
              <div className="text-sm font-medium">First fraction</div>
              <div className="grid grid-cols-2 gap-3">
                <NumberField
                  label="Numerator"
                  value={a}
                  onChange={setA}
                  step={1}
                />
                <NumberField
                  label="Denominator"
                  value={b}
                  onChange={setB}
                  step={1}
                />
              </div>
            </div>

            <div className="space-y-3 rounded-xl border p-4">
              <div className="text-sm font-medium">Second fraction</div>
              <div className="grid grid-cols-2 gap-3">
                <NumberField
                  label="Numerator"
                  value={c}
                  onChange={setC}
                  step={1}
                />
                <NumberField
                  label="Denominator"
                  value={d}
                  onChange={setD}
                  step={1}
                />
              </div>
            </div>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-medium">Operation</span>
            <select
              value={fractionOperation}
              onChange={(event) =>
                setFractionOperation(
                  event.target.value as FractionOperation
                )
              }
              className={inputClass}
            >
              <option value="add">Add (+)</option>
              <option value="subtract">Subtract (−)</option>
              <option value="multiply">Multiply (×)</option>
              <option value="divide">Divide (÷)</option>
            </select>
          </label>
        </>
      )}

      {(kind === "standard-deviation-calculator" ||
        kind === "mean-median-mode-calculator" ||
        kind === "gcd-calculator" ||
        kind === "lcm-calculator") && (
        <>
          <label className="block space-y-2">
            <span className="text-sm font-medium">Numbers</span>
            <textarea
              value={listInput}
              onChange={(event) => setListInput(event.target.value)}
              placeholder={
                kind === "gcd-calculator" || kind === "lcm-calculator"
                  ? "Example: 12, 18, 30"
                  : "Example: 4, 8, 15, 16, 23, 42"
              }
              className={textareaClass}
            />
          </label>

          <p className="text-xs text-muted-foreground">
            Separate values with commas, spaces, semicolons, or line
            breaks.
          </p>

          {kind === "standard-deviation-calculator" && (
            <label className="block space-y-2">
              <span className="text-sm font-medium">
                Standard deviation type
              </span>
              <select
                value={deviationType}
                onChange={(event) =>
                  setDeviationType(
                    event.target.value as "population" | "sample"
                  )
                }
                className={inputClass}
              >
                <option value="population">
                  Population standard deviation
                </option>
                <option value="sample">
                  Sample standard deviation
                </option>
              </select>
            </label>
          )}
        </>
      )}

      {kind === "quadratic-formula-calculator" && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <NumberField
              label="a"
              value={a}
              onChange={setA}
            />
            <NumberField
              label="b"
              value={b}
              onChange={setB}
            />
            <NumberField
              label="c"
              value={c}
              onChange={setC}
            />
          </div>

          <div className="rounded-lg border bg-muted/30 p-3 text-sm text-muted-foreground">
            Equation: ax² + bx + c = 0
          </div>
        </>
      )}

      {(kind === "slope-calculator" ||
        kind === "midpoint-calculator" ||
        kind === "distance-formula-calculator") && (
        <CoordinateFields
          a={a}
          b={b}
          c={c}
          d={d}
          setA={setA}
          setB={setB}
          setC={setC}
          setD={setD}
        />
      )}

      {kind === "pythagorean-theorem-calculator" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            label="Side a"
            value={a}
            onChange={setA}
          />
          <NumberField
            label="Side b"
            value={b}
            onChange={setB}
          />
        </div>
      )}

      {kind === "random-number-generator" && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <NumberField
              label="Minimum"
              value={a}
              onChange={setA}
            />
            <NumberField
              label="Maximum"
              value={b}
              onChange={setB}
            />
            <NumberField
              label="Count"
              value={c}
              onChange={setC}
              step={1}
              placeholder="1"
            />
            {!integersOnly && (
              <NumberField
                label="Decimal places"
                value={d}
                onChange={setD}
                step={1}
                placeholder="2"
              />
            )}
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={integersOnly}
              onChange={(event) =>
                setIntegersOnly(event.target.checked)
              }
              className="h-4 w-4 rounded border"
            />
            Generate whole numbers only
          </label>
        </>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={run}
          className={buttonClass}
        >
          {actionLabel}
        </button>

        {hasResult && (
          <button
            type="button"
            onClick={clearResults}
            className={secondaryButtonClass}
          >
            Clear result
          </button>
        )}

        {hasAnyInput && (
          <button
            type="button"
            onClick={clearAll}
            className={secondaryButtonClass}
          >
            Reset
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

      {scientificResult !== null && (
        <ResultCard
          label="Result"
          value={formatNumber(scientificResult, 12)}
        />
      )}

      {fractionResult && (
        <div className="grid gap-3 sm:grid-cols-3">
          <ResultCard
            label="Simplified fraction"
            value={fractionResult.display}
          />
          <ResultCard
            label="Mixed number"
            value={fractionResult.mixedNumber}
          />
          <ResultCard
            label="Decimal"
            value={formatNumber(fractionResult.decimal, 12)}
          />
        </div>
      )}

      {deviationResult && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <ResultCard
            label="Standard deviation"
            value={formatNumber(
              deviationResult.standardDeviation,
              10
            )}
          />
          <ResultCard
            label="Variance"
            value={formatNumber(deviationResult.variance, 10)}
          />
          <ResultCard
            label="Mean"
            value={formatNumber(deviationResult.mean, 10)}
          />
          <ResultCard
            label="Count"
            value={formatNumber(deviationResult.count, 0)}
          />
        </div>
      )}

      {statisticsResult && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <ResultCard
            label="Mean"
            value={formatNumber(statisticsResult.mean, 10)}
          />
          <ResultCard
            label="Median"
            value={formatNumber(statisticsResult.median, 10)}
          />
          <ResultCard
            label="Mode"
            value={
              statisticsResult.modes.length > 0
                ? statisticsResult.modes
                    .map((value) => formatNumber(value, 10))
                    .join(", ")
                : "No mode"
            }
          />
          <ResultCard
            label="Range"
            value={formatNumber(statisticsResult.range, 10)}
          />
          <ResultCard
            label="Minimum"
            value={formatNumber(statisticsResult.minimum, 10)}
          />
          <ResultCard
            label="Maximum"
            value={formatNumber(statisticsResult.maximum, 10)}
          />
          <ResultCard
            label="Count"
            value={formatNumber(statisticsResult.count, 0)}
          />
        </div>
      )}

      {singleNumberResult !== null &&
        kind === "slope-calculator" && (
          <ResultCard
            label="Slope"
            value={
              Number.isNaN(singleNumberResult)
                ? "Undefined (vertical line)"
                : formatNumber(singleNumberResult, 12)
            }
          />
        )}

      {singleNumberResult !== null &&
        kind === "gcd-calculator" && (
          <ResultCard
            label="Greatest common divisor"
            value={formatNumber(singleNumberResult, 0)}
          />
        )}

      {singleNumberResult !== null &&
        kind === "lcm-calculator" && (
          <ResultCard
            label="Least common multiple"
            value={formatNumber(singleNumberResult, 0)}
          />
        )}

      {singleNumberResult !== null &&
        kind === "distance-formula-calculator" && (
          <ResultCard
            label="Distance"
            value={formatNumber(singleNumberResult, 12)}
          />
        )}

      {quadraticResult && (
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <ResultCard
              label="Root 1"
              value={quadraticResult.root1}
            />
            <ResultCard
              label="Root 2"
              value={quadraticResult.root2}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <ResultCard
              label="Discriminant"
              value={formatNumber(
                quadraticResult.discriminant,
                10
              )}
            />
            <ResultCard
              label="Vertex x"
              value={formatNumber(quadraticResult.vertexX, 10)}
            />
            <ResultCard
              label="Vertex y"
              value={formatNumber(quadraticResult.vertexY, 10)}
            />
          </div>
        </div>
      )}

      {pointResult && (
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard
            label="Midpoint x"
            value={formatNumber(pointResult.x, 12)}
          />
          <ResultCard
            label="Midpoint y"
            value={formatNumber(pointResult.y, 12)}
          />
        </div>
      )}

      {pythagoreanResult && (
        <div className="grid gap-3 sm:grid-cols-3">
          <ResultCard
            label="Side a"
            value={formatNumber(pythagoreanResult.sideA, 10)}
          />
          <ResultCard
            label="Side b"
            value={formatNumber(pythagoreanResult.sideB, 10)}
          />
          <ResultCard
            label="Hypotenuse c"
            value={formatNumber(
              pythagoreanResult.hypotenuse,
              12
            )}
          />
        </div>
      )}

      {randomResults && (
        <div className="space-y-3">
          <div className="text-sm font-medium">
            Generated number{randomResults.length === 1 ? "" : "s"}
          </div>

          <div className="max-h-80 overflow-auto rounded-xl border bg-background p-4">
            <div className="break-words font-mono text-sm leading-7">
              {randomResults
                .map((value) => formatNumber(value, 12))
                .join(", ")}
            </div>
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground">
            This generator uses JavaScript&apos;s Math.random() and is
            intended for general-purpose random values, not
            cryptographic or security-sensitive uses.
          </p>
        </div>
      )}
    </div>
  );
}