"use client";

import { useState } from "react";
import {
  adjustDate,
  calculateBusinessDays,
  calculateTimeDuration,
  calculateWorkHours,
  commonTimeZones,
  convertTimeZone,
  formatDateOnly,
  type BusinessDaysResult,
  type HoursResult,
  type TimeDurationResult,
  type TimeZoneConversionResult,
} from "@/lib/tool-utils/date-time-utils";

type DateTimeToolKind =
  | "business-days-calculator"
  | "hours-calculator"
  | "date-add-subtract-calculator"
  | "timezone-converter"
  | "time-duration-calculator";

type DateTimeToolProps = {
  kind: DateTimeToolKind;
};

const inputClass =
  "w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground";

const buttonClass =
  "rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90";

const secondaryButtonClass =
  "rounded-lg border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted";

function Field({
  label,
  type = "text",
  value,
  onChange,
  min,
  step,
  suffix,
}: {
  label: string;
  type?: "text" | "number" | "date" | "time" | "datetime-local";
  value: string;
  onChange: (value: string) => void;
  min?: number;
  step?: number | string;
  suffix?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium">{label}</span>

      <div className="relative">
        <input
          type={type}
          value={value}
          min={min}
          step={step}
          onChange={(event) => onChange(event.target.value)}
          className={`${inputClass} ${suffix ? "pr-16" : ""}`}
        />

        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

function parseNumber(
  value: string,
  label: string,
  fallback?: number
): number {
  if (value.trim() === "") {
    if (fallback !== undefined) {
      return fallback;
    }

    throw new Error(`Enter ${label}.`);
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw new Error(`${label} must be a valid number.`);
  }

  return parsed;
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
      <div className="mt-1 text-xl font-semibold">{value}</div>
    </div>
  );
}

function formatNumber(value: number, maximumFractionDigits = 2): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
  }).format(value);
}

export function DateTimeTool({ kind }: DateTimeToolProps) {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [d, setD] = useState("");
  const [e, setE] = useState("");

  const [includeEndDate, setIncludeEndDate] = useState(true);
  const [operation, setOperation] =
    useState<"add" | "subtract">("add");

  const [sourceTimeZone, setSourceTimeZone] =
    useState("America/New_York");
  const [targetTimeZone, setTargetTimeZone] =
    useState("America/Los_Angeles");

  const [businessResult, setBusinessResult] =
    useState<BusinessDaysResult | null>(null);
  const [hoursResult, setHoursResult] =
    useState<HoursResult | null>(null);
  const [adjustedDate, setAdjustedDate] =
    useState<Date | null>(null);
  const [zoneResult, setZoneResult] =
    useState<TimeZoneConversionResult | null>(null);
  const [durationResult, setDurationResult] =
    useState<TimeDurationResult | null>(null);

  const [error, setError] = useState("");

  const clearResults = () => {
    setBusinessResult(null);
    setHoursResult(null);
    setAdjustedDate(null);
    setZoneResult(null);
    setDurationResult(null);
    setError("");
  };

  const clearAll = () => {
    setA("");
    setB("");
    setC("");
    setD("");
    setE("");
    setIncludeEndDate(true);
    setOperation("add");
    setSourceTimeZone("America/New_York");
    setTargetTimeZone("America/Los_Angeles");
    clearResults();
  };

  const run = () => {
    clearResults();

    try {
      switch (kind) {
        case "business-days-calculator":
          setBusinessResult(
            calculateBusinessDays(a, b, includeEndDate)
          );
          break;

        case "hours-calculator":
          setHoursResult(
            calculateWorkHours(
              a,
              b,
              parseNumber(c, "break minutes", 0)
            )
          );
          break;

        case "date-add-subtract-calculator":
          setAdjustedDate(
            adjustDate(
              a,
              {
                years: parseNumber(b, "years", 0),
                months: parseNumber(c, "months", 0),
                weeks: parseNumber(d, "weeks", 0),
                days: parseNumber(e, "days", 0),
              },
              operation
            )
          );
          break;

        case "timezone-converter":
          setZoneResult(
            convertTimeZone(
              a,
              sourceTimeZone,
              targetTimeZone
            )
          );
          break;

        case "time-duration-calculator":
          setDurationResult(calculateTimeDuration(a, b));
          break;

        default:
          throw new Error(
            "This date and time tool is not configured."
          );
      }
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Unable to calculate the result."
      );
    }
  };

  const hasAnyInput =
    Boolean(a || b || c || d || e) ||
    sourceTimeZone !== "America/New_York" ||
    targetTimeZone !== "America/Los_Angeles";

  const hasResult = Boolean(
    businessResult ||
      hoursResult ||
      adjustedDate ||
      zoneResult ||
      durationResult ||
      error
  );

  return (
    <div className="space-y-5">
      {kind === "business-days-calculator" && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Start date"
              type="date"
              value={a}
              onChange={setA}
            />

            <Field
              label="End date"
              type="date"
              value={b}
              onChange={setB}
            />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={includeEndDate}
              onChange={(event) =>
                setIncludeEndDate(event.target.checked)
              }
              className="h-4 w-4 rounded border"
            />
            Include the end date in the count
          </label>

          <p className="text-xs leading-relaxed text-muted-foreground">
            Saturdays and Sundays are excluded. Public holidays are
            not automatically removed.
          </p>
        </>
      )}

      {kind === "hours-calculator" && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field
              label="Start time"
              type="time"
              value={a}
              onChange={setA}
              step={60}
            />

            <Field
              label="End time"
              type="time"
              value={b}
              onChange={setB}
              step={60}
            />

            <Field
              label="Break"
              type="number"
              value={c}
              onChange={setC}
              min={0}
              step={1}
              suffix="min"
            />
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground">
            If the end time is earlier than the start time, the
            calculator treats the end time as occurring the next day.
          </p>
        </>
      )}

      {kind === "date-add-subtract-calculator" && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Starting date"
              type="date"
              value={a}
              onChange={setA}
            />

            <label className="block space-y-2">
              <span className="text-sm font-medium">Operation</span>
              <select
                value={operation}
                onChange={(event) =>
                  setOperation(
                    event.target.value as "add" | "subtract"
                  )
                }
                className={inputClass}
              >
                <option value="add">Add time</option>
                <option value="subtract">Subtract time</option>
              </select>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Field
              label="Years"
              type="number"
              value={b}
              onChange={setB}
              step={1}
            />

            <Field
              label="Months"
              type="number"
              value={c}
              onChange={setC}
              step={1}
            />

            <Field
              label="Weeks"
              type="number"
              value={d}
              onChange={setD}
              step={1}
            />

            <Field
              label="Days"
              type="number"
              value={e}
              onChange={setE}
              step={1}
            />
          </div>
        </>
      )}

      {kind === "timezone-converter" && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Date and time"
              type="datetime-local"
              value={a}
              onChange={setA}
              step={60}
            />

            <div className="hidden sm:block" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-medium">
                From time zone
              </span>
              <select
                value={sourceTimeZone}
                onChange={(event) =>
                  setSourceTimeZone(event.target.value)
                }
                className={inputClass}
              >
                {commonTimeZones.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone.replaceAll("_", " ")}
                  </option>
                ))}
              </select>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium">
                To time zone
              </span>
              <select
                value={targetTimeZone}
                onChange={(event) =>
                  setTargetTimeZone(event.target.value)
                }
                className={inputClass}
              >
                {commonTimeZones.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone.replaceAll("_", " ")}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground">
            Time-zone conversion uses the browser&apos;s IANA time-zone
            data and accounts for applicable daylight-saving offsets.
          </p>
        </>
      )}

      {kind === "time-duration-calculator" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Start date and time"
            type="datetime-local"
            value={a}
            onChange={setA}
            step={1}
          />

          <Field
            label="End date and time"
            type="datetime-local"
            value={b}
            onChange={setB}
            step={1}
          />
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={run}
          className={buttonClass}
        >
          Calculate
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

      {businessResult && (
        <div className="grid gap-3 sm:grid-cols-3">
          <ResultCard
            label="Business days"
            value={formatNumber(
              businessResult.businessDays,
              0
            )}
          />
          <ResultCard
            label="Weekend days"
            value={formatNumber(
              businessResult.weekendDays,
              0
            )}
          />
          <ResultCard
            label="Calendar days counted"
            value={formatNumber(
              businessResult.calendarDays,
              0
            )}
          />
        </div>
      )}

      {hoursResult && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <ResultCard
            label="Hours & minutes"
            value={`${hoursResult.hours}h ${hoursResult.minutes}m`}
          />
          <ResultCard
            label="Decimal hours"
            value={formatNumber(hoursResult.decimalHours, 2)}
          />
          <ResultCard
            label="Net minutes"
            value={formatNumber(hoursResult.netMinutes, 0)}
          />
          <ResultCard
            label="Break deducted"
            value={`${formatNumber(hoursResult.breakMinutes, 0)} min`}
          />
        </div>
      )}

      {adjustedDate && (
        <div className="rounded-xl border bg-background p-5">
          <div className="text-sm text-muted-foreground">
            Resulting date
          </div>
          <div className="mt-1 text-xl font-semibold">
            {formatDateOnly(adjustedDate)}
          </div>
        </div>
      )}

      {zoneResult && (
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard
            label="Source time"
            value={zoneResult.sourceFormatted}
          />
          <ResultCard
            label="Converted time"
            value={zoneResult.targetFormatted}
          />
        </div>
      )}

      {durationResult && (
        <div className="space-y-4">
          <div className="rounded-xl border bg-background p-5">
            <div className="text-sm text-muted-foreground">
              Duration
            </div>
            <div className="mt-1 text-xl font-semibold">
              {durationResult.days}d {durationResult.hours}h{" "}
              {durationResult.minutes}m {durationResult.seconds}s
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <ResultCard
              label="Total hours"
              value={formatNumber(durationResult.totalHours, 4)}
            />
            <ResultCard
              label="Total minutes"
              value={formatNumber(durationResult.totalMinutes, 2)}
            />
            <ResultCard
              label="Total seconds"
              value={formatNumber(durationResult.totalSeconds, 0)}
            />
          </div>
        </div>
      )}
    </div>
  );
}