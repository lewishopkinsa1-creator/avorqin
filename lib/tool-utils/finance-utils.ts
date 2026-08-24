export type MoneyResult = Record<string, number>;

function finite(value: number, label: string): number {
  if (!Number.isFinite(value)) throw new Error(`${label} must be a valid number.`);
  return value;
}

function nonNegative(value: number, label: string): number {
  finite(value, label);
  if (value < 0) throw new Error(`${label} cannot be negative.`);
  return value;
}

function positive(value: number, label: string): number {
  finite(value, label);
  if (value <= 0) throw new Error(`${label} must be greater than 0.`);
  return value;
}

function loanPayment(principal: number, annualRatePercent: number, months: number): number {
  positive(principal, "Principal");
  positive(months, "Loan term");
  nonNegative(annualRatePercent, "Annual interest rate");

  const rate = annualRatePercent / 100 / 12;
  if (rate === 0) return principal / months;

  return (
    (principal * rate * (1 + rate) ** months) /
    ((1 + rate) ** months - 1)
  );
}

export function calculateLoan(
  principal: number,
  annualRatePercent: number,
  termYears: number
): MoneyResult {
  positive(principal, "Loan amount");
  nonNegative(annualRatePercent, "Annual interest rate");
  positive(termYears, "Loan term");

  const months = termYears * 12;
  const monthlyPayment = loanPayment(principal, annualRatePercent, months);
  const totalPayment = monthlyPayment * months;

  return {
    principal,
    monthlyPayment,
    totalPayment,
    totalInterest: totalPayment - principal,
  };
}

export function calculateMortgage(input: {
  homePrice: number;
  downPayment: number;
  annualRatePercent: number;
  termYears: number;
  annualPropertyTax?: number;
  annualInsurance?: number;
  monthlyHoa?: number;
}): MoneyResult {
  const {
    homePrice,
    downPayment,
    annualRatePercent,
    termYears,
    annualPropertyTax = 0,
    annualInsurance = 0,
    monthlyHoa = 0,
  } = input;

  positive(homePrice, "Home price");
  nonNegative(downPayment, "Down payment");
  nonNegative(annualRatePercent, "Annual interest rate");
  positive(termYears, "Mortgage term");
  nonNegative(annualPropertyTax, "Annual property tax");
  nonNegative(annualInsurance, "Annual insurance");
  nonNegative(monthlyHoa, "Monthly HOA");

  if (downPayment >= homePrice) {
    throw new Error("Down payment must be less than the home price.");
  }

  const loanAmount = homePrice - downPayment;
  const months = termYears * 12;
  const monthlyPrincipalAndInterest = loanPayment(
    loanAmount,
    annualRatePercent,
    months
  );
  const totalPayment = monthlyPrincipalAndInterest * months;
  const monthlyPropertyTax = annualPropertyTax / 12;
  const monthlyInsurance = annualInsurance / 12;

  return {
    homePrice,
    downPayment,
    loanAmount,
    monthlyPrincipalAndInterest,
    monthlyPropertyTax,
    monthlyInsurance,
    monthlyHoa,
    estimatedMonthlyPayment:
      monthlyPrincipalAndInterest +
      monthlyPropertyTax +
      monthlyInsurance +
      monthlyHoa,
    totalPayment,
    totalInterest: totalPayment - loanAmount,
  };
}

export function calculateCompoundInterest(input: {
  principal: number;
  annualRatePercent: number;
  years: number;
  compoundsPerYear?: number;
  monthlyContribution?: number;
}): MoneyResult {
  const {
    principal,
    annualRatePercent,
    years,
    compoundsPerYear = 12,
    monthlyContribution = 0,
  } = input;

  nonNegative(principal, "Starting principal");
  nonNegative(annualRatePercent, "Annual interest rate");
  positive(years, "Time");
  positive(compoundsPerYear, "Compounding frequency");
  nonNegative(monthlyContribution, "Monthly contribution");

  if (!Number.isInteger(compoundsPerYear)) {
    throw new Error("Compounding frequency must be a whole number.");
  }

  const periods = years * compoundsPerYear;
  const periodicRate = annualRatePercent / 100 / compoundsPerYear;
  const principalFutureValue =
    periodicRate === 0
      ? principal
      : principal * (1 + periodicRate) ** periods;

  const months = Math.max(1, Math.round(years * 12));
  const monthlyRate = annualRatePercent / 100 / 12;
  const contributionFutureValue =
    monthlyContribution === 0
      ? 0
      : monthlyRate === 0
        ? monthlyContribution * months
        : monthlyContribution *
          (((1 + monthlyRate) ** months - 1) / monthlyRate);

  const finalBalance = principalFutureValue + contributionFutureValue;
  const totalContributions = principal + monthlyContribution * months;

  return {
    principal,
    finalBalance,
    totalContributions,
    totalInterest: finalBalance - totalContributions,
  };
}

export function calculateSimpleInterest(
  principal: number,
  annualRatePercent: number,
  years: number
): MoneyResult {
  nonNegative(principal, "Principal");
  nonNegative(annualRatePercent, "Annual interest rate");
  nonNegative(years, "Time");

  const interest = principal * (annualRatePercent / 100) * years;

  return {
    principal,
    interest,
    totalAmount: principal + interest,
  };
}

export function calculateRoi(
  initialCost: number,
  finalValue: number
): MoneyResult {
  positive(initialCost, "Initial cost");
  finite(finalValue, "Final value");

  const netReturn = finalValue - initialCost;

  return {
    initialCost,
    finalValue,
    netReturn,
    roiPercent: (netReturn / initialCost) * 100,
  };
}

export function calculateProfitMargin(
  revenue: number,
  cost: number
): MoneyResult {
  positive(revenue, "Revenue");
  nonNegative(cost, "Cost");

  const profit = revenue - cost;

  return {
    revenue,
    cost,
    profit,
    marginPercent: (profit / revenue) * 100,
  };
}

export function calculateMarkup(
  cost: number,
  sellingPrice: number
): MoneyResult {
  positive(cost, "Cost");
  finite(sellingPrice, "Selling price");

  const profit = sellingPrice - cost;

  return {
    cost,
    sellingPrice,
    profit,
    markupPercent: (profit / cost) * 100,
  };
}

export function calculateBreakEven(input: {
  fixedCosts: number;
  pricePerUnit: number;
  variableCostPerUnit: number;
}): MoneyResult {
  const { fixedCosts, pricePerUnit, variableCostPerUnit } = input;

  nonNegative(fixedCosts, "Fixed costs");
  positive(pricePerUnit, "Price per unit");
  nonNegative(variableCostPerUnit, "Variable cost per unit");

  const contributionMarginPerUnit = pricePerUnit - variableCostPerUnit;

  if (contributionMarginPerUnit <= 0) {
    throw new Error("Price per unit must be greater than variable cost per unit.");
  }

  const breakEvenUnits = Math.ceil(fixedCosts / contributionMarginPerUnit);

  return {
    fixedCosts,
    pricePerUnit,
    variableCostPerUnit,
    contributionMarginPerUnit,
    breakEvenUnits,
    breakEvenRevenue: breakEvenUnits * pricePerUnit,
  };
}

export function calculateGrossProfit(
  revenue: number,
  costOfGoodsSold: number
): MoneyResult {
  positive(revenue, "Revenue");
  nonNegative(costOfGoodsSold, "Cost of goods sold");

  const grossProfit = revenue - costOfGoodsSold;

  return {
    revenue,
    costOfGoodsSold,
    grossProfit,
    grossMarginPercent: (grossProfit / revenue) * 100,
  };
}

export function calculateCommission(input: {
  salesAmount: number;
  commissionRatePercent: number;
  basePay?: number;
}): MoneyResult {
  const { salesAmount, commissionRatePercent, basePay = 0 } = input;

  nonNegative(salesAmount, "Sales amount");
  nonNegative(commissionRatePercent, "Commission rate");
  nonNegative(basePay, "Base pay");

  const commission = salesAmount * (commissionRatePercent / 100);

  return {
    salesAmount,
    commissionRatePercent,
    commission,
    basePay,
    totalPay: commission + basePay,
  };
}

export function calculateCagr(
  beginningValue: number,
  endingValue: number,
  years: number
): MoneyResult {
  positive(beginningValue, "Beginning value");
  positive(endingValue, "Ending value");
  positive(years, "Number of years");

  return {
    beginningValue,
    endingValue,
    years,
    cagrPercent:
      ((endingValue / beginningValue) ** (1 / years) - 1) * 100,
  };
}

export function hourlyToSalary(input: {
  hourlyRate: number;
  hoursPerWeek?: number;
  weeksPerYear?: number;
}): MoneyResult {
  const { hourlyRate, hoursPerWeek = 40, weeksPerYear = 52 } = input;

  nonNegative(hourlyRate, "Hourly rate");
  positive(hoursPerWeek, "Hours per week");
  positive(weeksPerYear, "Weeks per year");

  const weeklyPay = hourlyRate * hoursPerWeek;
  const annualPay = weeklyPay * weeksPerYear;

  return {
    hourlyRate,
    hoursPerWeek,
    weeksPerYear,
    weeklyPay,
    monthlyPay: annualPay / 12,
    annualPay,
  };
}

export function salaryToHourly(input: {
  annualSalary: number;
  hoursPerWeek?: number;
  weeksPerYear?: number;
}): MoneyResult {
  const { annualSalary, hoursPerWeek = 40, weeksPerYear = 52 } = input;

  nonNegative(annualSalary, "Annual salary");
  positive(hoursPerWeek, "Hours per week");
  positive(weeksPerYear, "Weeks per year");

  return {
    annualSalary,
    hoursPerWeek,
    weeksPerYear,
    hourlyRate: annualSalary / (hoursPerWeek * weeksPerYear),
    weeklyPay: annualSalary / weeksPerYear,
    monthlyPay: annualSalary / 12,
  };
}

export function calculateSavingsGoal(input: {
  targetAmount: number;
  initialSavings?: number;
  annualRatePercent?: number;
  years: number;
}): MoneyResult {
  const {
    targetAmount,
    initialSavings = 0,
    annualRatePercent = 0,
    years,
  } = input;

  positive(targetAmount, "Savings goal");
  nonNegative(initialSavings, "Initial savings");
  nonNegative(annualRatePercent, "Annual interest rate");
  positive(years, "Time");

  const months = Math.max(1, Math.round(years * 12));
  const rate = annualRatePercent / 100 / 12;
  const initialFutureValue =
    rate === 0
      ? initialSavings
      : initialSavings * (1 + rate) ** months;

  if (initialFutureValue >= targetAmount) {
    return {
      targetAmount,
      initialSavings,
      monthlyContribution: 0,
      months,
      totalContributions: initialSavings,
      estimatedInterestEarned: initialFutureValue - initialSavings,
    };
  }

  const remaining = targetAmount - initialFutureValue;
  const monthlyContribution =
    rate === 0
      ? remaining / months
      : remaining / (((1 + rate) ** months - 1) / rate);

  const totalContributions =
    initialSavings + monthlyContribution * months;

  return {
    targetAmount,
    initialSavings,
    monthlyContribution,
    months,
    totalContributions,
    estimatedInterestEarned: targetAmount - totalContributions,
  };
}