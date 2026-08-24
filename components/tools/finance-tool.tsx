"use client";

import { useState } from "react";
import {
  calculateBreakEven,
  calculateCagr,
  calculateCommission,
  calculateCompoundInterest,
  calculateGrossProfit,
  calculateLoan,
  calculateMarkup,
  calculateMortgage,
  calculateProfitMargin,
  calculateRoi,
  calculateSavingsGoal,
  calculateSimpleInterest,
  hourlyToSalary,
  salaryToHourly,
  type MoneyResult,
} from "@/lib/tool-utils/finance-utils";

type FinanceToolKind =
  | "mortgage-calculator"
  | "loan-calculator"
  | "compound-interest-calculator"
  | "simple-interest-calculator"
  | "roi-calculator"
  | "profit-margin-calculator"
  | "markup-calculator"
  | "break-even-calculator"
  | "gross-profit-calculator"
  | "commission-calculator"
  | "cagr-calculator"
  | "hourly-to-salary-calculator"
  | "salary-to-hourly-calculator"
  | "savings-goal-calculator";

type FinanceToolProps = {
  kind: FinanceToolKind;
};

type ResultField = {
  label: string;
  key: string;
  format: "currency" | "percent" | "number" | "months";
};

const inputClass =
  "w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground";

const buttonClass =
  "rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90";

const secondaryButtonClass =
  "rounded-lg border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

function Field({
  label,
  value,
  onChange,
  prefix,
  suffix,
  min,
  step = "any",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  step?: number | "any";
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium">{label}</span>

      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            {prefix}
          </span>
        )}

        <input
          type="number"
          value={value}
          min={min}
          step={step}
          onChange={(event) => onChange(event.target.value)}
          className={`${inputClass} ${
            prefix ? "pl-7" : ""
          } ${suffix ? "pr-12" : ""}`}
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

function formatValue(
  value: number,
  format: ResultField["format"]
): string {
  switch (format) {
    case "currency":
      return currencyFormatter.format(value);

    case "percent":
      return `${numberFormatter.format(value)}%`;

    case "months":
      return `${numberFormatter.format(value)} months`;

    case "number":
    default:
      return numberFormatter.format(value);
  }
}

function ResultGrid({
  result,
  fields,
}: {
  result: MoneyResult;
  fields: ResultField[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {fields.map((field) => {
        const value = result[field.key];

        if (typeof value !== "number") {
          return null;
        }

        return (
          <div
            key={field.key}
            className="rounded-xl border bg-background p-4"
          >
            <div className="text-sm text-muted-foreground">
              {field.label}
            </div>

            <div className="mt-1 text-xl font-semibold">
              {formatValue(value, field.format)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function getResultFields(kind: FinanceToolKind): ResultField[] {
  switch (kind) {
    case "mortgage-calculator":
      return [
        {
          label: "Loan amount",
          key: "loanAmount",
          format: "currency",
        },
        {
          label: "Principal & interest",
          key: "monthlyPrincipalAndInterest",
          format: "currency",
        },
        {
          label: "Property tax / month",
          key: "monthlyPropertyTax",
          format: "currency",
        },
        {
          label: "Insurance / month",
          key: "monthlyInsurance",
          format: "currency",
        },
        {
          label: "HOA / month",
          key: "monthlyHoa",
          format: "currency",
        },
        {
          label: "Estimated monthly payment",
          key: "estimatedMonthlyPayment",
          format: "currency",
        },
        {
          label: "Total principal & interest paid",
          key: "totalPayment",
          format: "currency",
        },
        {
          label: "Total interest",
          key: "totalInterest",
          format: "currency",
        },
      ];

    case "loan-calculator":
      return [
        {
          label: "Monthly payment",
          key: "monthlyPayment",
          format: "currency",
        },
        {
          label: "Total payment",
          key: "totalPayment",
          format: "currency",
        },
        {
          label: "Total interest",
          key: "totalInterest",
          format: "currency",
        },
      ];

    case "compound-interest-calculator":
      return [
        {
          label: "Final balance",
          key: "finalBalance",
          format: "currency",
        },
        {
          label: "Total contributions",
          key: "totalContributions",
          format: "currency",
        },
        {
          label: "Estimated interest earned",
          key: "totalInterest",
          format: "currency",
        },
      ];

    case "simple-interest-calculator":
      return [
        {
          label: "Interest",
          key: "interest",
          format: "currency",
        },
        {
          label: "Total amount",
          key: "totalAmount",
          format: "currency",
        },
      ];

    case "roi-calculator":
      return [
        {
          label: "Net return",
          key: "netReturn",
          format: "currency",
        },
        {
          label: "ROI",
          key: "roiPercent",
          format: "percent",
        },
      ];

    case "profit-margin-calculator":
      return [
        {
          label: "Profit",
          key: "profit",
          format: "currency",
        },
        {
          label: "Profit margin",
          key: "marginPercent",
          format: "percent",
        },
      ];

    case "markup-calculator":
      return [
        {
          label: "Profit",
          key: "profit",
          format: "currency",
        },
        {
          label: "Markup",
          key: "markupPercent",
          format: "percent",
        },
      ];

    case "break-even-calculator":
      return [
        {
          label: "Contribution margin / unit",
          key: "contributionMarginPerUnit",
          format: "currency",
        },
        {
          label: "Break-even units",
          key: "breakEvenUnits",
          format: "number",
        },
        {
          label: "Break-even revenue",
          key: "breakEvenRevenue",
          format: "currency",
        },
      ];

    case "gross-profit-calculator":
      return [
        {
          label: "Gross profit",
          key: "grossProfit",
          format: "currency",
        },
        {
          label: "Gross margin",
          key: "grossMarginPercent",
          format: "percent",
        },
      ];

    case "commission-calculator":
      return [
        {
          label: "Commission",
          key: "commission",
          format: "currency",
        },
        {
          label: "Base pay",
          key: "basePay",
          format: "currency",
        },
        {
          label: "Total pay",
          key: "totalPay",
          format: "currency",
        },
      ];

    case "cagr-calculator":
      return [
        {
          label: "CAGR",
          key: "cagrPercent",
          format: "percent",
        },
      ];

    case "hourly-to-salary-calculator":
      return [
        {
          label: "Weekly pay",
          key: "weeklyPay",
          format: "currency",
        },
        {
          label: "Monthly pay",
          key: "monthlyPay",
          format: "currency",
        },
        {
          label: "Annual pay",
          key: "annualPay",
          format: "currency",
        },
      ];

    case "salary-to-hourly-calculator":
      return [
        {
          label: "Hourly rate",
          key: "hourlyRate",
          format: "currency",
        },
        {
          label: "Weekly pay",
          key: "weeklyPay",
          format: "currency",
        },
        {
          label: "Monthly pay",
          key: "monthlyPay",
          format: "currency",
        },
      ];

    case "savings-goal-calculator":
      return [
        {
          label: "Required monthly contribution",
          key: "monthlyContribution",
          format: "currency",
        },
        {
          label: "Time",
          key: "months",
          format: "months",
        },
        {
          label: "Total contributions",
          key: "totalContributions",
          format: "currency",
        },
        {
          label: "Estimated interest earned",
          key: "estimatedInterestEarned",
          format: "currency",
        },
      ];
  }
}

export function FinanceTool({ kind }: FinanceToolProps) {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [d, setD] = useState("");
  const [e, setE] = useState("");
  const [f, setF] = useState("");
  const [g, setG] = useState("");

  const [result, setResult] =
    useState<MoneyResult | null>(null);
  const [error, setError] = useState("");

  const clearResult = () => {
    setResult(null);
    setError("");
  };

  const clearAll = () => {
    setA("");
    setB("");
    setC("");
    setD("");
    setE("");
    setF("");
    setG("");
    clearResult();
  };

  const run = () => {
    clearResult();

    try {
      switch (kind) {
        case "mortgage-calculator":
          setResult(
            calculateMortgage({
              homePrice: parseValue(a, "home price"),
              downPayment: parseValue(b || "0", "down payment"),
              annualRatePercent: parseValue(c, "interest rate"),
              termYears: parseValue(d, "mortgage term"),
              annualPropertyTax: parseValue(
                e || "0",
                "annual property tax"
              ),
              annualInsurance: parseValue(
                f || "0",
                "annual insurance"
              ),
              monthlyHoa: parseValue(
                g || "0",
                "monthly HOA"
              ),
            })
          );
          break;

        case "loan-calculator":
          setResult(
            calculateLoan(
              parseValue(a, "loan amount"),
              parseValue(b, "interest rate"),
              parseValue(c, "loan term")
            )
          );
          break;

        case "compound-interest-calculator":
          setResult(
            calculateCompoundInterest({
              principal: parseValue(a, "starting principal"),
              annualRatePercent: parseValue(b, "interest rate"),
              years: parseValue(c, "time"),
              compoundsPerYear: parseValue(
                d || "12",
                "compounding frequency"
              ),
              monthlyContribution: parseValue(
                e || "0",
                "monthly contribution"
              ),
            })
          );
          break;

        case "simple-interest-calculator":
          setResult(
            calculateSimpleInterest(
              parseValue(a, "principal"),
              parseValue(b, "interest rate"),
              parseValue(c, "time")
            )
          );
          break;

        case "roi-calculator":
          setResult(
            calculateRoi(
              parseValue(a, "initial cost"),
              parseValue(b, "final value")
            )
          );
          break;

        case "profit-margin-calculator":
          setResult(
            calculateProfitMargin(
              parseValue(a, "revenue"),
              parseValue(b, "cost")
            )
          );
          break;

        case "markup-calculator":
          setResult(
            calculateMarkup(
              parseValue(a, "cost"),
              parseValue(b, "selling price")
            )
          );
          break;

        case "break-even-calculator":
          setResult(
            calculateBreakEven({
              fixedCosts: parseValue(a, "fixed costs"),
              pricePerUnit: parseValue(b, "price per unit"),
              variableCostPerUnit: parseValue(
                c,
                "variable cost per unit"
              ),
            })
          );
          break;

        case "gross-profit-calculator":
          setResult(
            calculateGrossProfit(
              parseValue(a, "revenue"),
              parseValue(b, "cost of goods sold")
            )
          );
          break;

        case "commission-calculator":
          setResult(
            calculateCommission({
              salesAmount: parseValue(a, "sales amount"),
              commissionRatePercent: parseValue(
                b,
                "commission rate"
              ),
              basePay: parseValue(c || "0", "base pay"),
            })
          );
          break;

        case "cagr-calculator":
          setResult(
            calculateCagr(
              parseValue(a, "beginning value"),
              parseValue(b, "ending value"),
              parseValue(c, "number of years")
            )
          );
          break;

        case "hourly-to-salary-calculator":
          setResult(
            hourlyToSalary({
              hourlyRate: parseValue(a, "hourly rate"),
              hoursPerWeek: parseValue(
                b || "40",
                "hours per week"
              ),
              weeksPerYear: parseValue(
                c || "52",
                "weeks per year"
              ),
            })
          );
          break;

        case "salary-to-hourly-calculator":
          setResult(
            salaryToHourly({
              annualSalary: parseValue(a, "annual salary"),
              hoursPerWeek: parseValue(
                b || "40",
                "hours per week"
              ),
              weeksPerYear: parseValue(
                c || "52",
                "weeks per year"
              ),
            })
          );
          break;

        case "savings-goal-calculator":
          setResult(
            calculateSavingsGoal({
              targetAmount: parseValue(a, "savings goal"),
              initialSavings: parseValue(
                b || "0",
                "initial savings"
              ),
              annualRatePercent: parseValue(
                c || "0",
                "interest rate"
              ),
              years: parseValue(d, "time"),
            })
          );
          break;

        default:
          throw new Error(
            "This finance tool is not configured."
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

  return (
    <div className="space-y-5">
      {kind === "mortgage-calculator" && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Home price"
              value={a}
              onChange={setA}
              prefix="$"
              min={0}
            />

            <Field
              label="Down payment"
              value={b}
              onChange={setB}
              prefix="$"
              min={0}
            />

            <Field
              label="Interest rate"
              value={c}
              onChange={setC}
              suffix="%"
              min={0}
            />

            <Field
              label="Mortgage term"
              value={d}
              onChange={setD}
              suffix="years"
              min={0}
            />

            <Field
              label="Annual property tax (optional)"
              value={e}
              onChange={setE}
              prefix="$"
              min={0}
            />

            <Field
              label="Annual insurance (optional)"
              value={f}
              onChange={setF}
              prefix="$"
              min={0}
            />

            <Field
              label="Monthly HOA (optional)"
              value={g}
              onChange={setG}
              prefix="$"
              min={0}
            />
          </div>
        </>
      )}

      {kind === "loan-calculator" && (
        <div className="grid gap-4 sm:grid-cols-3">
          <Field
            label="Loan amount"
            value={a}
            onChange={setA}
            prefix="$"
            min={0}
          />

          <Field
            label="Annual interest rate"
            value={b}
            onChange={setB}
            suffix="%"
            min={0}
          />

          <Field
            label="Loan term"
            value={c}
            onChange={setC}
            suffix="years"
            min={0}
          />
        </div>
      )}

      {kind === "compound-interest-calculator" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Starting principal"
            value={a}
            onChange={setA}
            prefix="$"
            min={0}
          />

          <Field
            label="Annual interest rate"
            value={b}
            onChange={setB}
            suffix="%"
            min={0}
          />

          <Field
            label="Time"
            value={c}
            onChange={setC}
            suffix="years"
            min={0}
          />

          <Field
            label="Compounds per year"
            value={d}
            onChange={setD}
            min={1}
            step={1}
          />

          <Field
            label="Monthly contribution (optional)"
            value={e}
            onChange={setE}
            prefix="$"
            min={0}
          />
        </div>
      )}

      {kind === "simple-interest-calculator" && (
        <div className="grid gap-4 sm:grid-cols-3">
          <Field
            label="Principal"
            value={a}
            onChange={setA}
            prefix="$"
            min={0}
          />

          <Field
            label="Annual interest rate"
            value={b}
            onChange={setB}
            suffix="%"
            min={0}
          />

          <Field
            label="Time"
            value={c}
            onChange={setC}
            suffix="years"
            min={0}
          />
        </div>
      )}

      {kind === "roi-calculator" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Initial cost"
            value={a}
            onChange={setA}
            prefix="$"
          />

          <Field
            label="Final value"
            value={b}
            onChange={setB}
            prefix="$"
          />
        </div>
      )}

      {kind === "profit-margin-calculator" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Revenue"
            value={a}
            onChange={setA}
            prefix="$"
          />

          <Field
            label="Cost"
            value={b}
            onChange={setB}
            prefix="$"
          />
        </div>
      )}

      {kind === "markup-calculator" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Cost"
            value={a}
            onChange={setA}
            prefix="$"
          />

          <Field
            label="Selling price"
            value={b}
            onChange={setB}
            prefix="$"
          />
        </div>
      )}

      {kind === "break-even-calculator" && (
        <div className="grid gap-4 sm:grid-cols-3">
          <Field
            label="Fixed costs"
            value={a}
            onChange={setA}
            prefix="$"
          />

          <Field
            label="Price per unit"
            value={b}
            onChange={setB}
            prefix="$"
          />

          <Field
            label="Variable cost per unit"
            value={c}
            onChange={setC}
            prefix="$"
          />
        </div>
      )}

      {kind === "gross-profit-calculator" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Revenue"
            value={a}
            onChange={setA}
            prefix="$"
          />

          <Field
            label="Cost of goods sold"
            value={b}
            onChange={setB}
            prefix="$"
          />
        </div>
      )}

      {kind === "commission-calculator" && (
        <div className="grid gap-4 sm:grid-cols-3">
          <Field
            label="Sales amount"
            value={a}
            onChange={setA}
            prefix="$"
          />

          <Field
            label="Commission rate"
            value={b}
            onChange={setB}
            suffix="%"
          />

          <Field
            label="Base pay (optional)"
            value={c}
            onChange={setC}
            prefix="$"
          />
        </div>
      )}

      {kind === "cagr-calculator" && (
        <div className="grid gap-4 sm:grid-cols-3">
          <Field
            label="Beginning value"
            value={a}
            onChange={setA}
            prefix="$"
          />

          <Field
            label="Ending value"
            value={b}
            onChange={setB}
            prefix="$"
          />

          <Field
            label="Number of years"
            value={c}
            onChange={setC}
            suffix="years"
          />
        </div>
      )}

      {kind === "hourly-to-salary-calculator" && (
        <div className="grid gap-4 sm:grid-cols-3">
          <Field
            label="Hourly rate"
            value={a}
            onChange={setA}
            prefix="$"
          />

          <Field
            label="Hours per week"
            value={b}
            onChange={setB}
          />

          <Field
            label="Weeks per year"
            value={c}
            onChange={setC}
          />
        </div>
      )}

      {kind === "salary-to-hourly-calculator" && (
        <div className="grid gap-4 sm:grid-cols-3">
          <Field
            label="Annual salary"
            value={a}
            onChange={setA}
            prefix="$"
          />

          <Field
            label="Hours per week"
            value={b}
            onChange={setB}
          />

          <Field
            label="Weeks per year"
            value={c}
            onChange={setC}
          />
        </div>
      )}

      {kind === "savings-goal-calculator" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Savings goal"
            value={a}
            onChange={setA}
            prefix="$"
          />

          <Field
            label="Initial savings"
            value={b}
            onChange={setB}
            prefix="$"
          />

          <Field
            label="Annual interest rate"
            value={c}
            onChange={setC}
            suffix="%"
          />

          <Field
            label="Time"
            value={d}
            onChange={setD}
            suffix="years"
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

        {(result || error) && (
          <button
            type="button"
            onClick={clearResult}
            className={secondaryButtonClass}
          >
            Clear result
          </button>
        )}

        {(a || b || c || d || e || f || g) && (
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

      {result && (
        <div className="space-y-4">
          <h3 className="font-semibold">Results</h3>

          <ResultGrid
            result={result}
            fields={getResultFields(kind)}
          />

          <p className="text-xs leading-relaxed text-muted-foreground">
            Results are estimates based on the values entered and
            standard mathematical formulas. Actual financial,
            lending, tax, insurance, investment, or employment
            outcomes can vary.
          </p>
        </div>
      )}
    </div>
  );
}