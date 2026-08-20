"use client";

import { useState } from "react";
import {
  calculateAverage,
  calculateRatio,
  fractionToPercentage,
  percentageToFraction,
  decimalToPercentage,
  percentageToDecimal,
  calculateDiscount,
  calculateSalesTax,
  calculateTip,
  convertLength,
  convertWeight,
  convertTemperature,
  convertArea,
  convertVolume,
  convertSpeed,
  convertTime,
  convertPressure,
  convertEnergy,
  convertPower,
  convertFrequency,
  convertAngle,
  convertDataRate,
  convertFuelEconomy,
  asciiToText,
  textToAscii,
} from "@/lib/tool-utils/batch-6-utils";

type UnitOption = {
  value: string;
  label: string;
};

type ConverterConfig = {
  defaultValue: string;
  defaultFrom: string;
  defaultTo: string;
  units: UnitOption[];
  convert: (
    value: number,
    from: string,
    to: string
  ) => number;
};

const converterConfigs: Record<string, ConverterConfig> = {
  "length-converter": {
    defaultValue: "1",
    defaultFrom: "m",
    defaultTo: "ft",
    units: [
      { value: "mm", label: "Millimeters (mm)" },
      { value: "cm", label: "Centimeters (cm)" },
      { value: "m", label: "Meters (m)" },
      { value: "km", label: "Kilometers (km)" },
      { value: "in", label: "Inches (in)" },
      { value: "ft", label: "Feet (ft)" },
      { value: "yd", label: "Yards (yd)" },
      { value: "mi", label: "Miles (mi)" },
    ],
    convert: convertLength,
  },

  "weight-converter": {
    defaultValue: "1",
    defaultFrom: "kg",
    defaultTo: "lb",
    units: [
      { value: "mg", label: "Milligrams (mg)" },
      { value: "g", label: "Grams (g)" },
      { value: "kg", label: "Kilograms (kg)" },
      { value: "oz", label: "Ounces (oz)" },
      { value: "lb", label: "Pounds (lb)" },
      { value: "st", label: "Stone (st)" },
      { value: "ton_us", label: "US Tons" },
      { value: "tonne", label: "Metric Tonnes" },
    ],
    convert: convertWeight,
  },

  "temperature-converter": {
    defaultValue: "32",
    defaultFrom: "f",
    defaultTo: "c",
    units: [
      { value: "c", label: "Celsius (°C)" },
      { value: "f", label: "Fahrenheit (°F)" },
      { value: "k", label: "Kelvin (K)" },
    ],
    convert: convertTemperature,
  },

  "area-converter": {
    defaultValue: "100",
    defaultFrom: "ft2",
    defaultTo: "m2",
    units: [
      { value: "mm2", label: "Square Millimeters (mm²)" },
      { value: "cm2", label: "Square Centimeters (cm²)" },
      { value: "m2", label: "Square Meters (m²)" },
      { value: "km2", label: "Square Kilometers (km²)" },
      { value: "in2", label: "Square Inches (in²)" },
      { value: "ft2", label: "Square Feet (ft²)" },
      { value: "yd2", label: "Square Yards (yd²)" },
      { value: "acre", label: "Acres" },
      { value: "hectare", label: "Hectares" },
      { value: "mi2", label: "Square Miles (mi²)" },
    ],
    convert: convertArea,
  },

  "volume-converter": {
    defaultValue: "1",
    defaultFrom: "gallon_us",
    defaultTo: "l",
    units: [
      { value: "ml", label: "Milliliters (mL)" },
      { value: "l", label: "Liters (L)" },
      { value: "m3", label: "Cubic Meters (m³)" },
      { value: "tsp_us", label: "US Teaspoons" },
      { value: "tbsp_us", label: "US Tablespoons" },
      { value: "cup_us", label: "US Cups" },
      { value: "floz_us", label: "US Fluid Ounces" },
      { value: "pint_us", label: "US Pints" },
      { value: "quart_us", label: "US Quarts" },
      { value: "gallon_us", label: "US Gallons" },
      { value: "in3", label: "Cubic Inches (in³)" },
      { value: "ft3", label: "Cubic Feet (ft³)" },
    ],
    convert: convertVolume,
  },

  "speed-converter": {
    defaultValue: "60",
    defaultFrom: "mph",
    defaultTo: "kph",
    units: [
      { value: "mps", label: "Meters/Second (m/s)" },
      { value: "kph", label: "Kilometers/Hour (km/h)" },
      { value: "mph", label: "Miles/Hour (mph)" },
      { value: "fps", label: "Feet/Second (ft/s)" },
      { value: "knot", label: "Knots" },
    ],
    convert: convertSpeed,
  },

  "time-converter": {
    defaultValue: "1",
    defaultFrom: "hr",
    defaultTo: "min",
    units: [
      { value: "ms", label: "Milliseconds" },
      { value: "sec", label: "Seconds" },
      { value: "min", label: "Minutes" },
      { value: "hr", label: "Hours" },
      { value: "day", label: "Days" },
      { value: "week", label: "Weeks" },
    ],
    convert: convertTime,
  },

  "pressure-converter": {
    defaultValue: "1",
    defaultFrom: "bar",
    defaultTo: "psi",
    units: [
      { value: "pa", label: "Pascals (Pa)" },
      { value: "kpa", label: "Kilopascals (kPa)" },
      { value: "mpa", label: "Megapascals (MPa)" },
      { value: "bar", label: "Bar" },
      { value: "mbar", label: "Millibar" },
      { value: "psi", label: "PSI" },
      { value: "atm", label: "Atmospheres (atm)" },
      { value: "torr", label: "Torr" },
    ],
    convert: convertPressure,
  },

  "energy-converter": {
    defaultValue: "1",
    defaultFrom: "kwh",
    defaultTo: "mj",
    units: [
      { value: "j", label: "Joules (J)" },
      { value: "kj", label: "Kilojoules (kJ)" },
      { value: "mj", label: "Megajoules (MJ)" },
      { value: "cal", label: "Calories (cal)" },
      { value: "kcal", label: "Kilocalories (kcal)" },
      { value: "wh", label: "Watt-hours (Wh)" },
      { value: "kwh", label: "Kilowatt-hours (kWh)" },
      { value: "btu", label: "BTU" },
    ],
    convert: convertEnergy,
  },

  "power-converter": {
    defaultValue: "1",
    defaultFrom: "kw",
    defaultTo: "hp",
    units: [
      { value: "w", label: "Watts (W)" },
      { value: "kw", label: "Kilowatts (kW)" },
      { value: "mw", label: "Megawatts (MW)" },
      { value: "hp", label: "Horsepower (hp)" },
      { value: "btu_hr", label: "BTU/hour" },
    ],
    convert: convertPower,
  },

  "frequency-converter": {
    defaultValue: "1",
    defaultFrom: "ghz",
    defaultTo: "mhz",
    units: [
      { value: "hz", label: "Hertz (Hz)" },
      { value: "khz", label: "Kilohertz (kHz)" },
      { value: "mhz", label: "Megahertz (MHz)" },
      { value: "ghz", label: "Gigahertz (GHz)" },
      { value: "rpm", label: "Revolutions/Minute (RPM)" },
    ],
    convert: convertFrequency,
  },

  "angle-converter": {
    defaultValue: "180",
    defaultFrom: "deg",
    defaultTo: "rad",
    units: [
      { value: "deg", label: "Degrees (°)" },
      { value: "rad", label: "Radians" },
      { value: "grad", label: "Gradians" },
      { value: "turn", label: "Turns" },
    ],
    convert: convertAngle,
  },

  "data-rate-converter": {
    defaultValue: "100",
    defaultFrom: "mbps",
    defaultTo: "MBps",
    units: [
      { value: "bps", label: "Bits/second (bps)" },
      { value: "kbps", label: "Kilobits/second (kbps)" },
      { value: "mbps", label: "Megabits/second (Mbps)" },
      { value: "gbps", label: "Gigabits/second (Gbps)" },
      { value: "Bps", label: "Bytes/second (B/s)" },
      { value: "KBps", label: "Kilobytes/second (KB/s)" },
      { value: "MBps", label: "Megabytes/second (MB/s)" },
      { value: "GBps", label: "Gigabytes/second (GB/s)" },
    ],
    convert: convertDataRate,
  },

  "fuel-economy-converter": {
    defaultValue: "30",
    defaultFrom: "mpg_us",
    defaultTo: "l100km",
    units: [
      { value: "mpg_us", label: "Miles/Gallon (US)" },
      { value: "mpg_uk", label: "Miles/Gallon (UK)" },
      { value: "l100km", label: "Liters/100 km" },
      { value: "km_l", label: "Kilometers/Liter" },
    ],
    convert: convertFuelEconomy,
  },
};

export function Batch6Tool({ kind }: { kind: string }) {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [out, setOut] = useState("");
  const [err, setErr] = useState("");

  const box =
    "w-full rounded-lg border bg-background p-3 text-foreground placeholder:text-muted-foreground";

  const outputBox =
    "w-full rounded-lg border bg-muted/30 p-3 text-foreground";

  const btn =
    "rounded-lg bg-foreground px-4 py-2 font-medium text-background transition-opacity hover:opacity-90";

  const label =
    "mb-2 block text-sm font-medium text-foreground";

  const show = (value: unknown) => {
    setOut(
      typeof value === "string"
        ? value
        : JSON.stringify(value, null, 2)
    );
  };

  const safe = (fn: () => unknown) => {
    try {
      show(fn());
      setErr("");
    } catch (error) {
      setErr(
        error instanceof Error
          ? error.message
          : "Unable to process input."
      );
      setOut("");
    }
  };

  const converter = converterConfigs[kind];

  if (converter) {
    const activeFrom =
      fromUnit || converter.defaultFrom;

    const activeTo =
      toUnit || converter.defaultTo;

    const value =
      a === ""
        ? Number(converter.defaultValue)
        : Number(a);

    const runConverter = () =>
      safe(() => {
        const result = converter.convert(
          value,
          activeFrom,
          activeTo
        );

        const fromLabel =
          converter.units.find(
            (unit) => unit.value === activeFrom
          )?.label || activeFrom;

        const toLabel =
          converter.units.find(
            (unit) => unit.value === activeTo
          )?.label || activeTo;

        return {
          input: value,
          from: fromLabel,
          result,
          to: toLabel,
        };
      });

    return (
      <div className="space-y-5">
        <div>
          <label className={label}>Value</label>
          <input
            type="number"
            step="any"
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder={converter.defaultValue}
            className={box}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>From</label>
            <select
              value={activeFrom}
              onChange={(e) =>
                setFromUnit(e.target.value)
              }
              className={box}
            >
              {converter.units.map((unit) => (
                <option
                  key={unit.value}
                  value={unit.value}
                >
                  {unit.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={label}>To</label>
            <select
              value={activeTo}
              onChange={(e) =>
                setToUnit(e.target.value)
              }
              className={box}
            >
              {converter.units.map((unit) => (
                <option
                  key={unit.value}
                  value={unit.value}
                >
                  {unit.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={runConverter}
          className={btn}
        >
          Convert
        </button>

        {err && (
          <p className="text-sm text-destructive">
            {err}
          </p>
        )}

        <textarea
          value={out}
          readOnly
          rows={7}
          className={`${outputBox} font-mono text-sm`}
        />
      </div>
    );
  }

  if (kind === "average-calculator") {
    const run = () =>
      safe(() =>
        calculateAverage(
          a || "10, 20, 30, 40, 50"
        )
      );

    return (
      <div className="space-y-4">
        <div>
          <label className={label}>
            Numbers
          </label>

          <textarea
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="10, 20, 30, 40, 50"
            rows={5}
            className={`${box} font-mono text-sm`}
          />

          <p className="mt-2 text-sm text-muted-foreground">
            Separate numbers with commas, spaces,
            semicolons, or line breaks.
          </p>
        </div>

        <button onClick={run} className={btn}>
          Calculate Average
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

  if (kind === "ratio-calculator") {
    const run = () =>
      safe(() =>
        calculateRatio(
          Number(a || "1920"),
          Number(b || "1080")
        )
      );

    return (
      <TwoNumberTool
        firstLabel="First Value"
        secondLabel="Second Value"
        firstValue={a}
        secondValue={b}
        setFirstValue={setA}
        setSecondValue={setB}
        firstPlaceholder="1920"
        secondPlaceholder="1080"
        buttonText="Calculate Ratio"
        onRun={run}
        output={out}
        error={err}
      />
    );
  }

  if (kind === "fraction-to-percentage-calculator") {
    const run = () =>
      safe(
        () =>
          `${fractionToPercentage(
            Number(a || "1"),
            Number(b || "4")
          )}%`
      );

    return (
      <TwoNumberTool
        firstLabel="Numerator"
        secondLabel="Denominator"
        firstValue={a}
        secondValue={b}
        setFirstValue={setA}
        setSecondValue={setB}
        firstPlaceholder="1"
        secondPlaceholder="4"
        buttonText="Convert to Percentage"
        onRun={run}
        output={out}
        error={err}
      />
    );
  }

  if (kind === "percentage-to-fraction-calculator") {
    const run = () =>
      safe(() =>
        percentageToFraction(
          Number(a || "25")
        )
      );

    return (
      <OneNumberTool
        labelText="Percentage"
        value={a}
        setValue={setA}
        placeholder="25"
        buttonText="Convert to Fraction"
        onRun={run}
        output={out}
        error={err}
        suffix="%"
      />
    );
  }

  if (kind === "decimal-to-percentage-calculator") {
    const run = () =>
      safe(
        () =>
          `${decimalToPercentage(
            Number(a || "0.25")
          )}%`
      );

    return (
      <OneNumberTool
        labelText="Decimal"
        value={a}
        setValue={setA}
        placeholder="0.25"
        buttonText="Convert to Percentage"
        onRun={run}
        output={out}
        error={err}
      />
    );
  }

  if (kind === "percentage-to-decimal-calculator") {
    const run = () =>
      safe(() =>
        percentageToDecimal(
          Number(a || "25")
        )
      );

    return (
      <OneNumberTool
        labelText="Percentage"
        value={a}
        setValue={setA}
        placeholder="25"
        buttonText="Convert to Decimal"
        onRun={run}
        output={out}
        error={err}
        suffix="%"
      />
    );
  }

  if (kind === "discount-calculator") {
    const run = () =>
      safe(() =>
        calculateDiscount(
          Number(a || "100"),
          Number(b || "20")
        )
      );

    return (
      <TwoNumberTool
        firstLabel="Original Price"
        secondLabel="Discount Percentage"
        firstValue={a}
        secondValue={b}
        setFirstValue={setA}
        setSecondValue={setB}
        firstPlaceholder="100"
        secondPlaceholder="20"
        buttonText="Calculate Discount"
        onRun={run}
        output={out}
        error={err}
        firstPrefix="$"
        secondSuffix="%"
      />
    );
  }

  if (kind === "sales-tax-calculator") {
    const run = () =>
      safe(() =>
        calculateSalesTax(
          Number(a || "100"),
          Number(b || "8.25")
        )
      );

    return (
      <TwoNumberTool
        firstLabel="Subtotal"
        secondLabel="Sales Tax Rate"
        firstValue={a}
        secondValue={b}
        setFirstValue={setA}
        setSecondValue={setB}
        firstPlaceholder="100"
        secondPlaceholder="8.25"
        buttonText="Calculate Sales Tax"
        onRun={run}
        output={out}
        error={err}
        firstPrefix="$"
        secondSuffix="%"
      />
    );
  }

  if (kind === "tip-calculator") {
    const run = () =>
      safe(() =>
        calculateTip(
          Number(a || "50"),
          Number(b || "20"),
          Number(c || "1")
        )
      );

    return (
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className={label}>
              Bill Amount
            </label>

            <div className="flex items-center rounded-lg border bg-background">
              <span className="px-3 text-muted-foreground">
                $
              </span>

              <input
                type="number"
                step="any"
                value={a}
                onChange={(e) =>
                  setA(e.target.value)
                }
                placeholder="50"
                className="min-w-0 flex-1 bg-transparent p-3 text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div>
            <label className={label}>
              Tip Percentage
            </label>

            <div className="flex items-center rounded-lg border bg-background">
              <input
                type="number"
                step="any"
                value={b}
                onChange={(e) =>
                  setB(e.target.value)
                }
                placeholder="20"
                className="min-w-0 flex-1 bg-transparent p-3 text-foreground outline-none placeholder:text-muted-foreground"
              />

              <span className="px-3 text-muted-foreground">
                %
              </span>
            </div>
          </div>

          <div>
            <label className={label}>
              Number of People
            </label>

            <input
              type="number"
              min="1"
              step="1"
              value={c}
              onChange={(e) =>
                setC(e.target.value)
              }
              placeholder="1"
              className={box}
            />
          </div>
        </div>

        <button onClick={run} className={btn}>
          Calculate Tip
        </button>

        {err && (
          <p className="text-sm text-destructive">
            {err}
          </p>
        )}

        <textarea
          value={out}
          readOnly
          rows={9}
          className={`${outputBox} font-mono text-sm`}
        />
      </div>
    );
  }

  if (kind === "ascii-to-text-converter") {
    const run = () =>
      safe(() =>
        asciiToText(
          a || "65 118 111 114 113 105 110"
        )
      );

    return (
      <TextTool
        labelText="ASCII Codes"
        value={a}
        setValue={setA}
        placeholder="65 118 111 114 113 105 110"
        helperText="Enter standard ASCII codes separated by spaces, commas, semicolons, or line breaks."
        buttonText="Convert to Text"
        onRun={run}
        output={out}
        error={err}
      />
    );
  }

  if (kind === "text-to-ascii-converter") {
    const run = () =>
      safe(() =>
        textToAscii(a || "Avorqin")
      );

    return (
      <TextTool
        labelText="Text"
        value={a}
        setValue={setA}
        placeholder="Avorqin"
        helperText="Standard ASCII characters use codes 0 through 127."
        buttonText="Convert to ASCII"
        onRun={run}
        output={out}
        error={err}
      />
    );
  }

  return (
    <div className="rounded-xl border bg-muted/20 p-5">
      <p className="text-sm text-muted-foreground">
        This tool is not configured yet.
      </p>
    </div>
  );
}

function OneNumberTool({
  labelText,
  value,
  setValue,
  placeholder,
  buttonText,
  onRun,
  output,
  error,
  prefix,
  suffix,
}: {
  labelText: string;
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  buttonText: string;
  onRun: () => void;
  output: string;
  error: string;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          {labelText}
        </label>

        <div className="flex items-center rounded-lg border bg-background">
          {prefix && (
            <span className="px-3 text-muted-foreground">
              {prefix}
            </span>
          )}

          <input
            type="number"
            step="any"
            value={value}
            onChange={(e) =>
              setValue(e.target.value)
            }
            placeholder={placeholder}
            className="min-w-0 flex-1 bg-transparent p-3 text-foreground outline-none placeholder:text-muted-foreground"
          />

          {suffix && (
            <span className="px-3 text-muted-foreground">
              {suffix}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={onRun}
        className="rounded-lg bg-foreground px-4 py-2 font-medium text-background transition-opacity hover:opacity-90"
      >
        {buttonText}
      </button>

      {error && (
        <p className="text-sm text-destructive">
          {error}
        </p>
      )}

      <textarea
        value={output}
        readOnly
        rows={7}
        className="w-full rounded-lg border bg-muted/30 p-3 font-mono text-sm text-foreground"
      />
    </div>
  );
}

function TwoNumberTool({
  firstLabel,
  secondLabel,
  firstValue,
  secondValue,
  setFirstValue,
  setSecondValue,
  firstPlaceholder,
  secondPlaceholder,
  buttonText,
  onRun,
  output,
  error,
  firstPrefix,
  firstSuffix,
  secondPrefix,
  secondSuffix,
}: {
  firstLabel: string;
  secondLabel: string;
  firstValue: string;
  secondValue: string;
  setFirstValue: (value: string) => void;
  setSecondValue: (value: string) => void;
  firstPlaceholder: string;
  secondPlaceholder: string;
  buttonText: string;
  onRun: () => void;
  output: string;
  error: string;
  firstPrefix?: string;
  firstSuffix?: string;
  secondPrefix?: string;
  secondSuffix?: string;
}) {
  const renderInput = (
    labelText: string,
    value: string,
    setValue: (value: string) => void,
    placeholder: string,
    prefix?: string,
    suffix?: string
  ) => (
    <div>
      <label className="mb-2 block text-sm font-medium text-foreground">
        {labelText}
      </label>

      <div className="flex items-center rounded-lg border bg-background">
        {prefix && (
          <span className="px-3 text-muted-foreground">
            {prefix}
          </span>
        )}

        <input
          type="number"
          step="any"
          value={value}
          onChange={(e) =>
            setValue(e.target.value)
          }
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent p-3 text-foreground outline-none placeholder:text-muted-foreground"
        />

        {suffix && (
          <span className="px-3 text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {renderInput(
          firstLabel,
          firstValue,
          setFirstValue,
          firstPlaceholder,
          firstPrefix,
          firstSuffix
        )}

        {renderInput(
          secondLabel,
          secondValue,
          setSecondValue,
          secondPlaceholder,
          secondPrefix,
          secondSuffix
        )}
      </div>

      <button
        onClick={onRun}
        className="rounded-lg bg-foreground px-4 py-2 font-medium text-background transition-opacity hover:opacity-90"
      >
        {buttonText}
      </button>

      {error && (
        <p className="text-sm text-destructive">
          {error}
        </p>
      )}

      <textarea
        value={output}
        readOnly
        rows={8}
        className="w-full rounded-lg border bg-muted/30 p-3 font-mono text-sm text-foreground"
      />
    </div>
  );
}

function TextTool({
  labelText,
  value,
  setValue,
  placeholder,
  helperText,
  buttonText,
  onRun,
  output,
  error,
}: {
  labelText: string;
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  helperText: string;
  buttonText: string;
  onRun: () => void;
  output: string;
  error: string;
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          {labelText}
        </label>

        <textarea
          value={value}
          onChange={(e) =>
            setValue(e.target.value)
          }
          placeholder={placeholder}
          rows={5}
          className="w-full rounded-lg border bg-background p-3 font-mono text-sm text-foreground placeholder:text-muted-foreground"
        />

        <p className="mt-2 text-sm text-muted-foreground">
          {helperText}
        </p>
      </div>

      <button
        onClick={onRun}
        className="rounded-lg bg-foreground px-4 py-2 font-medium text-background transition-opacity hover:opacity-90"
      >
        {buttonText}
      </button>

      {error && (
        <p className="text-sm text-destructive">
          {error}
        </p>
      )}

      <textarea
        value={output}
        readOnly
        rows={7}
        className="w-full rounded-lg border bg-muted/30 p-3 font-mono text-sm text-foreground"
      />
    </div>
  );
}