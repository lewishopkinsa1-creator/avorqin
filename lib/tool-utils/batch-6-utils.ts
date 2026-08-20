type UnitMap = Record<string, number>;

function ensureFinite(value: number, label = "Value") {
  if (!Number.isFinite(value)) {
    throw new Error(`${label} must be a valid number.`);
  }
}

function ensurePositive(value: number, label = "Value") {
  ensureFinite(value, label);

  if (value <= 0) {
    throw new Error(`${label} must be greater than zero.`);
  }
}

function roundResult(value: number, decimals = 8) {
  if (!Number.isFinite(value)) {
    throw new Error("Unable to calculate result.");
  }

  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

function gcd(a: number, b: number) {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));

  while (b !== 0) {
    [a, b] = [b, a % b];
  }

  return a || 1;
}

function convertLinear(
  value: number,
  from: string,
  to: string,
  units: UnitMap
) {
  ensureFinite(value);

  const fromFactor = units[from];
  const toFactor = units[to];

  if (!fromFactor || !toFactor) {
    throw new Error("Unsupported unit.");
  }

  return roundResult((value * fromFactor) / toFactor);
}

export function calculateAverage(input: string) {
  const values = input
    .split(/[\s,;]+/)
    .map((value) => value.trim())
    .filter(Boolean)
    .map(Number);

  if (values.length === 0) {
    throw new Error("Enter at least one number.");
  }

  if (values.some((value) => !Number.isFinite(value))) {
    throw new Error("All values must be valid numbers.");
  }

  const sum = values.reduce((total, value) => total + value, 0);

  return {
    count: values.length,
    sum: roundResult(sum),
    average: roundResult(sum / values.length),
    minimum: Math.min(...values),
    maximum: Math.max(...values),
  };
}

export function calculateRatio(a: number, b: number) {
  ensurePositive(a, "First value");
  ensurePositive(b, "Second value");

  const divisor = gcd(a, b);

  return {
    ratio: `${Math.round(a / divisor)}:${Math.round(b / divisor)}`,
    decimal: roundResult(a / b),
  };
}

export function fractionToPercentage(
  numerator: number,
  denominator: number
) {
  ensureFinite(numerator, "Numerator");
  ensureFinite(denominator, "Denominator");

  if (denominator === 0) {
    throw new Error("Denominator cannot be zero.");
  }

  return roundResult((numerator / denominator) * 100);
}

export function percentageToFraction(percentage: number) {
  ensureFinite(percentage, "Percentage");

  const value = percentage / 100;

  const decimalText = String(value);

  const decimalPlaces = decimalText.includes(".")
    ? decimalText.split(".")[1].length
    : 0;

  const denominator = 10 ** Math.min(decimalPlaces, 8);
  const numerator = Math.round(value * denominator);

  const divisor = gcd(numerator, denominator);

  return {
    numerator: numerator / divisor,
    denominator: denominator / divisor,
    fraction: `${numerator / divisor}/${denominator / divisor}`,
  };
}

export function decimalToPercentage(decimal: number) {
  ensureFinite(decimal, "Decimal");

  return roundResult(decimal * 100);
}

export function percentageToDecimal(percentage: number) {
  ensureFinite(percentage, "Percentage");

  return roundResult(percentage / 100);
}

export function calculateDiscount(
  originalPrice: number,
  discountPercent: number
) {
  ensureFinite(originalPrice, "Original price");
  ensureFinite(discountPercent, "Discount");

  if (originalPrice < 0) {
    throw new Error("Original price cannot be negative.");
  }

  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error("Discount must be between 0 and 100.");
  }

  const discountAmount =
    originalPrice * (discountPercent / 100);

  const finalPrice = originalPrice - discountAmount;

  return {
    originalPrice: roundResult(originalPrice, 2),
    discountPercent: roundResult(discountPercent, 2),
    discountAmount: roundResult(discountAmount, 2),
    finalPrice: roundResult(finalPrice, 2),
  };
}

export function calculateSalesTax(
  subtotal: number,
  taxPercent: number
) {
  ensureFinite(subtotal, "Subtotal");
  ensureFinite(taxPercent, "Tax rate");

  if (subtotal < 0) {
    throw new Error("Subtotal cannot be negative.");
  }

  if (taxPercent < 0) {
    throw new Error("Tax rate cannot be negative.");
  }

  const taxAmount = subtotal * (taxPercent / 100);

  return {
    subtotal: roundResult(subtotal, 2),
    taxPercent: roundResult(taxPercent, 3),
    taxAmount: roundResult(taxAmount, 2),
    total: roundResult(subtotal + taxAmount, 2),
  };
}

export function calculateTip(
  billAmount: number,
  tipPercent: number,
  people = 1
) {
  ensureFinite(billAmount, "Bill amount");
  ensureFinite(tipPercent, "Tip percentage");
  ensurePositive(people, "Number of people");

  if (billAmount < 0) {
    throw new Error("Bill amount cannot be negative.");
  }

  if (tipPercent < 0) {
    throw new Error("Tip percentage cannot be negative.");
  }

  const tipAmount = billAmount * (tipPercent / 100);
  const total = billAmount + tipAmount;

  return {
    billAmount: roundResult(billAmount, 2),
    tipPercent: roundResult(tipPercent, 2),
    tipAmount: roundResult(tipAmount, 2),
    total: roundResult(total, 2),
    people: Math.round(people),
    perPerson: roundResult(total / people, 2),
  };
}

const LENGTH_UNITS: UnitMap = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
};

export function convertLength(
  value: number,
  from: string,
  to: string
) {
  return convertLinear(value, from, to, LENGTH_UNITS);
}

const WEIGHT_UNITS: UnitMap = {
  mg: 0.001,
  g: 1,
  kg: 1000,
  oz: 28.349523125,
  lb: 453.59237,
  st: 6350.29318,
  ton_us: 907184.74,
  tonne: 1_000_000,
};

export function convertWeight(
  value: number,
  from: string,
  to: string
) {
  return convertLinear(value, from, to, WEIGHT_UNITS);
}

export function convertTemperature(
  value: number,
  from: string,
  to: string
) {
  ensureFinite(value);

  let celsius: number;

  switch (from) {
    case "c":
      celsius = value;
      break;

    case "f":
      celsius = ((value - 32) * 5) / 9;
      break;

    case "k":
      celsius = value - 273.15;
      break;

    default:
      throw new Error("Unsupported temperature unit.");
  }

  switch (to) {
    case "c":
      return roundResult(celsius);

    case "f":
      return roundResult((celsius * 9) / 5 + 32);

    case "k":
      return roundResult(celsius + 273.15);

    default:
      throw new Error("Unsupported temperature unit.");
  }
}

const AREA_UNITS: UnitMap = {
  mm2: 0.000001,
  cm2: 0.0001,
  m2: 1,
  km2: 1_000_000,
  in2: 0.00064516,
  ft2: 0.09290304,
  yd2: 0.83612736,
  acre: 4046.8564224,
  hectare: 10_000,
  mi2: 2_589_988.110336,
};

export function convertArea(
  value: number,
  from: string,
  to: string
) {
  return convertLinear(value, from, to, AREA_UNITS);
}

const VOLUME_UNITS: UnitMap = {
  ml: 0.001,
  l: 1,
  m3: 1000,
  tsp_us: 0.00492892159375,
  tbsp_us: 0.01478676478125,
  cup_us: 0.2365882365,
  floz_us: 0.0295735295625,
  pint_us: 0.473176473,
  quart_us: 0.946352946,
  gallon_us: 3.785411784,
  in3: 0.016387064,
  ft3: 28.316846592,
};

export function convertVolume(
  value: number,
  from: string,
  to: string
) {
  return convertLinear(value, from, to, VOLUME_UNITS);
}

const SPEED_UNITS: UnitMap = {
  mps: 1,
  kph: 0.2777777777777778,
  mph: 0.44704,
  fps: 0.3048,
  knot: 0.5144444444444445,
};

export function convertSpeed(
  value: number,
  from: string,
  to: string
) {
  return convertLinear(value, from, to, SPEED_UNITS);
}

const TIME_UNITS: UnitMap = {
  ms: 0.001,
  sec: 1,
  min: 60,
  hr: 3600,
  day: 86400,
  week: 604800,
};

export function convertTime(
  value: number,
  from: string,
  to: string
) {
  return convertLinear(value, from, to, TIME_UNITS);
}

const PRESSURE_UNITS: UnitMap = {
  pa: 1,
  kpa: 1000,
  mpa: 1_000_000,
  bar: 100_000,
  mbar: 100,
  psi: 6894.757293168,
  atm: 101325,
  torr: 133.3223684211,
};

export function convertPressure(
  value: number,
  from: string,
  to: string
) {
  return convertLinear(value, from, to, PRESSURE_UNITS);
}

const ENERGY_UNITS: UnitMap = {
  j: 1,
  kj: 1000,
  mj: 1_000_000,
  cal: 4.184,
  kcal: 4184,
  wh: 3600,
  kwh: 3_600_000,
  btu: 1055.05585262,
};

export function convertEnergy(
  value: number,
  from: string,
  to: string
) {
  return convertLinear(value, from, to, ENERGY_UNITS);
}

const POWER_UNITS: UnitMap = {
  w: 1,
  kw: 1000,
  mw: 1_000_000,
  hp: 745.6998715822702,
  btu_hr: 0.2930710701722222,
};

export function convertPower(
  value: number,
  from: string,
  to: string
) {
  return convertLinear(value, from, to, POWER_UNITS);
}

const FREQUENCY_UNITS: UnitMap = {
  hz: 1,
  khz: 1000,
  mhz: 1_000_000,
  ghz: 1_000_000_000,
  rpm: 1 / 60,
};

export function convertFrequency(
  value: number,
  from: string,
  to: string
) {
  return convertLinear(value, from, to, FREQUENCY_UNITS);
}

const ANGLE_UNITS: UnitMap = {
  deg: Math.PI / 180,
  rad: 1,
  grad: Math.PI / 200,
  turn: Math.PI * 2,
};

export function convertAngle(
  value: number,
  from: string,
  to: string
) {
  return convertLinear(value, from, to, ANGLE_UNITS);
}

const DATA_RATE_UNITS: UnitMap = {
  bps: 1,
  kbps: 1000,
  mbps: 1_000_000,
  gbps: 1_000_000_000,
  Bps: 8,
  KBps: 8000,
  MBps: 8_000_000,
  GBps: 8_000_000_000,
};

export function convertDataRate(
  value: number,
  from: string,
  to: string
) {
  return convertLinear(value, from, to, DATA_RATE_UNITS);
}

export function convertFuelEconomy(
  value: number,
  from: string,
  to: string
) {
  ensurePositive(value);

  if (from === to) {
    return roundResult(value);
  }

  let litersPer100Km: number;

  switch (from) {
    case "l100km":
      litersPer100Km = value;
      break;

    case "mpg_us":
      litersPer100Km = 235.214583 / value;
      break;

    case "mpg_uk":
      litersPer100Km = 282.480936 / value;
      break;

    case "km_l":
      litersPer100Km = 100 / value;
      break;

    default:
      throw new Error("Unsupported fuel economy unit.");
  }

  switch (to) {
    case "l100km":
      return roundResult(litersPer100Km);

    case "mpg_us":
      return roundResult(235.214583 / litersPer100Km);

    case "mpg_uk":
      return roundResult(282.480936 / litersPer100Km);

    case "km_l":
      return roundResult(100 / litersPer100Km);

    default:
      throw new Error("Unsupported fuel economy unit.");
  }
}

export function asciiToText(input: string) {
  const values = input
    .trim()
    .split(/[\s,;]+/)
    .filter(Boolean)
    .map(Number);

  if (values.length === 0) {
    throw new Error("Enter one or more ASCII codes.");
  }

  if (
    values.some(
      (value) =>
        !Number.isInteger(value) ||
        value < 0 ||
        value > 127
    )
  ) {
    throw new Error(
      "ASCII codes must be whole numbers between 0 and 127."
    );
  }

  return values
    .map((value) => String.fromCharCode(value))
    .join("");
}

export function textToAscii(input: string) {
  if (!input.length) {
    throw new Error("Enter text to convert.");
  }

  const codes: number[] = [];

  for (const character of input) {
    const code = character.charCodeAt(0);

    if (code > 127) {
      throw new Error(
        "This tool supports standard ASCII characters only (codes 0–127)."
      );
    }

    codes.push(code);
  }

  return codes.join(" ");
}