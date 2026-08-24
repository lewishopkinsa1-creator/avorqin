export type FractionOperation = "add" | "subtract" | "multiply" | "divide";

export type FractionResult = {
  numerator: number;
  denominator: number;
  decimal: number;
  mixedNumber: string;
  display: string;
};

export type StatisticsResult = {
  count: number;
  mean: number;
  median: number;
  modes: number[];
  minimum: number;
  maximum: number;
  range: number;
};

export type StandardDeviationResult = {
  count: number;
  mean: number;
  variance: number;
  standardDeviation: number;
  type: "population" | "sample";
};

export type QuadraticResult = {
  discriminant: number;
  rootType: "two-real" | "one-real" | "complex";
  root1: string;
  root2: string;
  vertexX: number;
  vertexY: number;
};

export type PointResult = {
  x: number;
  y: number;
};

export type PythagoreanResult = {
  sideA: number;
  sideB: number;
  hypotenuse: number;
};

export type RandomNumberOptions = {
  min: number;
  max: number;
  count?: number;
  integersOnly?: boolean;
  decimalPlaces?: number;
};

function finite(value: number, label: string): number {
  if (!Number.isFinite(value)) {
    throw new Error(`${label} must be a valid number.`);
  }

  return value;
}

function integer(value: number, label: string): number {
  finite(value, label);

  if (!Number.isInteger(value)) {
    throw new Error(`${label} must be a whole number.`);
  }

  return value;
}

function positiveInteger(value: number, label: string): number {
  integer(value, label);

  if (value <= 0) {
    throw new Error(`${label} must be greater than 0.`);
  }

  return value;
}

function gcdPair(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);

  while (y !== 0) {
    const remainder = x % y;
    x = y;
    y = remainder;
  }

  return x;
}

function formatNumber(value: number): string {
  if (Number.isInteger(value)) {
    return String(value);
  }

  return Number(value.toFixed(12)).toString();
}

function fractionToMixedNumber(
  numerator: number,
  denominator: number
): string {
  if (denominator === 0) {
    throw new Error("Denominator cannot be 0.");
  }

  const sign = numerator < 0 ? "-" : "";
  const absoluteNumerator = Math.abs(numerator);
  const whole = Math.floor(absoluteNumerator / denominator);
  const remainder = absoluteNumerator % denominator;

  if (remainder === 0) {
    return `${sign}${whole}`;
  }

  if (whole === 0) {
    return `${sign}${remainder}/${denominator}`;
  }

  return `${sign}${whole} ${remainder}/${denominator}`;
}

export function calculateFraction(
  numeratorA: number,
  denominatorA: number,
  numeratorB: number,
  denominatorB: number,
  operation: FractionOperation
): FractionResult {
  integer(numeratorA, "First numerator");
  integer(denominatorA, "First denominator");
  integer(numeratorB, "Second numerator");
  integer(denominatorB, "Second denominator");

  if (denominatorA === 0 || denominatorB === 0) {
    throw new Error("A fraction denominator cannot be 0.");
  }

  let numerator: number;
  let denominator: number;

  switch (operation) {
    case "add":
      numerator =
        numeratorA * denominatorB +
        numeratorB * denominatorA;
      denominator = denominatorA * denominatorB;
      break;

    case "subtract":
      numerator =
        numeratorA * denominatorB -
        numeratorB * denominatorA;
      denominator = denominatorA * denominatorB;
      break;

    case "multiply":
      numerator = numeratorA * numeratorB;
      denominator = denominatorA * denominatorB;
      break;

    case "divide":
      if (numeratorB === 0) {
        throw new Error("Cannot divide by a fraction equal to 0.");
      }

      numerator = numeratorA * denominatorB;
      denominator = denominatorA * numeratorB;
      break;

    default:
      throw new Error("Select a valid fraction operation.");
  }

  if (denominator < 0) {
    numerator *= -1;
    denominator *= -1;
  }

  const divisor = gcdPair(numerator, denominator) || 1;
  numerator /= divisor;
  denominator /= divisor;

  return {
    numerator,
    denominator,
    decimal: numerator / denominator,
    mixedNumber: fractionToMixedNumber(numerator, denominator),
    display:
      denominator === 1
        ? String(numerator)
        : `${numerator}/${denominator}`,
  };
}

export function parseNumberList(input: string): number[] {
  const values = input
    .split(/[\s,;]+/)
    .map((value) => value.trim())
    .filter(Boolean)
    .map(Number);

  if (values.length === 0) {
    throw new Error("Enter at least one number.");
  }

  if (values.some((value) => !Number.isFinite(value))) {
    throw new Error(
      "Enter only valid numbers separated by commas, spaces, or line breaks."
    );
  }

  return values;
}

export function calculateStatistics(
  values: number[]
): StatisticsResult {
  if (values.length === 0) {
    throw new Error("Enter at least one number.");
  }

  values.forEach((value) => finite(value, "Value"));

  const sorted = [...values].sort((a, b) => a - b);
  const count = sorted.length;
  const mean =
    sorted.reduce((sum, value) => sum + value, 0) / count;

  const middle = Math.floor(count / 2);
  const median =
    count % 2 === 0
      ? (sorted[middle - 1] + sorted[middle]) / 2
      : sorted[middle];

  const frequencies = new Map<number, number>();

  for (const value of sorted) {
    frequencies.set(value, (frequencies.get(value) ?? 0) + 1);
  }

  const highestFrequency = Math.max(...frequencies.values());
  const modes =
    highestFrequency <= 1
      ? []
      : [...frequencies.entries()]
          .filter(([, frequency]) => frequency === highestFrequency)
          .map(([value]) => value);

  return {
    count,
    mean,
    median,
    modes,
    minimum: sorted[0],
    maximum: sorted[count - 1],
    range: sorted[count - 1] - sorted[0],
  };
}

export function calculateStandardDeviation(
  values: number[],
  type: "population" | "sample" = "population"
): StandardDeviationResult {
  if (values.length === 0) {
    throw new Error("Enter at least one number.");
  }

  if (type === "sample" && values.length < 2) {
    throw new Error(
      "Sample standard deviation requires at least two numbers."
    );
  }

  values.forEach((value) => finite(value, "Value"));

  const mean =
    values.reduce((sum, value) => sum + value, 0) /
    values.length;

  const squaredDifferences = values.map(
    (value) => (value - mean) ** 2
  );

  const divisor =
    type === "sample" ? values.length - 1 : values.length;

  const variance =
    squaredDifferences.reduce((sum, value) => sum + value, 0) /
    divisor;

  return {
    count: values.length,
    mean,
    variance,
    standardDeviation: Math.sqrt(variance),
    type,
  };
}

export function calculateGcd(values: number[]): number {
  if (values.length < 2) {
    throw new Error("Enter at least two whole numbers.");
  }

  const integers = values.map((value, index) =>
    integer(value, `Value ${index + 1}`)
  );

  return integers.reduce((result, value) =>
    gcdPair(result, value)
  );
}

export function calculateLcm(values: number[]): number {
  if (values.length < 2) {
    throw new Error("Enter at least two whole numbers.");
  }

  const integers = values.map((value, index) =>
    integer(value, `Value ${index + 1}`)
  );

  return integers.reduce((result, value) => {
    if (result === 0 || value === 0) {
      return 0;
    }

    return Math.abs((result / gcdPair(result, value)) * value);
  });
}

export function solveQuadratic(
  a: number,
  b: number,
  c: number
): QuadraticResult {
  finite(a, "a");
  finite(b, "b");
  finite(c, "c");

  if (a === 0) {
    throw new Error("Coefficient a cannot be 0 for a quadratic equation.");
  }

  const discriminant = b ** 2 - 4 * a * c;
  const vertexX = -b / (2 * a);
  const vertexY = a * vertexX ** 2 + b * vertexX + c;

  if (discriminant > 0) {
    const squareRoot = Math.sqrt(discriminant);

    return {
      discriminant,
      rootType: "two-real",
      root1: formatNumber((-b + squareRoot) / (2 * a)),
      root2: formatNumber((-b - squareRoot) / (2 * a)),
      vertexX,
      vertexY,
    };
  }

  if (discriminant === 0) {
    const root = -b / (2 * a);

    return {
      discriminant,
      rootType: "one-real",
      root1: formatNumber(root),
      root2: formatNumber(root),
      vertexX,
      vertexY,
    };
  }

  const real = -b / (2 * a);
  const imaginary = Math.sqrt(-discriminant) / Math.abs(2 * a);
  const signAdjustedImaginary = a < 0 ? -imaginary : imaginary;
  const realText = formatNumber(real);
  const imaginaryText = formatNumber(Math.abs(signAdjustedImaginary));

  return {
    discriminant,
    rootType: "complex",
    root1: `${realText} + ${imaginaryText}i`,
    root2: `${realText} - ${imaginaryText}i`,
    vertexX,
    vertexY,
  };
}

export function calculateSlope(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number | null {
  [x1, y1, x2, y2].forEach((value) => finite(value, "Coordinate"));

  const deltaX = x2 - x1;
  const deltaY = y2 - y1;

  if (deltaX === 0) {
    return null;
  }

  return deltaY / deltaX;
}

export function calculateMidpoint(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): PointResult {
  [x1, y1, x2, y2].forEach((value) => finite(value, "Coordinate"));

  return {
    x: (x1 + x2) / 2,
    y: (y1 + y2) / 2,
  };
}

export function calculateDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  [x1, y1, x2, y2].forEach((value) => finite(value, "Coordinate"));

  return Math.hypot(x2 - x1, y2 - y1);
}

export function calculatePythagorean(
  sideA: number,
  sideB: number
): PythagoreanResult {
  finite(sideA, "Side a");
  finite(sideB, "Side b");

  if (sideA <= 0 || sideB <= 0) {
    throw new Error("Triangle side lengths must be greater than 0.");
  }

  return {
    sideA,
    sideB,
    hypotenuse: Math.hypot(sideA, sideB),
  };
}

export function generateRandomNumbers(
  options: RandomNumberOptions
): number[] {
  const {
    min,
    max,
    count = 1,
    integersOnly = true,
    decimalPlaces = 2,
  } = options;

  finite(min, "Minimum");
  finite(max, "Maximum");
  positiveInteger(count, "Count");
  integer(decimalPlaces, "Decimal places");

  if (max < min) {
    throw new Error("Maximum must be greater than or equal to minimum.");
  }

  if (count > 1000) {
    throw new Error("Generate at most 1,000 numbers at a time.");
  }

  if (decimalPlaces < 0 || decimalPlaces > 12) {
    throw new Error("Decimal places must be between 0 and 12.");
  }

  const results: number[] = [];

  for (let index = 0; index < count; index += 1) {
    if (integersOnly) {
      const lower = Math.ceil(min);
      const upper = Math.floor(max);

      if (upper < lower) {
        throw new Error(
          "The selected range does not contain a whole number."
        );
      }

      results.push(
        Math.floor(Math.random() * (upper - lower + 1)) + lower
      );
    } else {
      const raw = min + Math.random() * (max - min);
      results.push(Number(raw.toFixed(decimalPlaces)));
    }
  }

  return results;
}

/* ---------------- Scientific expression evaluator ---------------- */

type Token =
  | { type: "number"; value: number }
  | { type: "operator"; value: string }
  | { type: "function"; value: string }
  | { type: "leftParen" }
  | { type: "rightParen" }
  | { type: "comma" };

const supportedFunctions: Record<
  string,
  { args: number; run: (...values: number[]) => number }
> = {
  sin: { args: 1, run: Math.sin },
  cos: { args: 1, run: Math.cos },
  tan: { args: 1, run: Math.tan },
  asin: { args: 1, run: Math.asin },
  acos: { args: 1, run: Math.acos },
  atan: { args: 1, run: Math.atan },
  sqrt: { args: 1, run: Math.sqrt },
  abs: { args: 1, run: Math.abs },
  ln: { args: 1, run: Math.log },
  log: { args: 1, run: Math.log10 },
  exp: { args: 1, run: Math.exp },
  floor: { args: 1, run: Math.floor },
  ceil: { args: 1, run: Math.ceil },
  round: { args: 1, run: Math.round },
  min: { args: 2, run: Math.min },
  max: { args: 2, run: Math.max },
  pow: { args: 2, run: Math.pow },
};

const operatorInfo: Record<
  string,
  {
    precedence: number;
    associativity: "left" | "right";
    args: number;
    run: (...values: number[]) => number;
  }
> = {
  "+": {
    precedence: 1,
    associativity: "left",
    args: 2,
    run: (a, b) => a + b,
  },
  "-": {
    precedence: 1,
    associativity: "left",
    args: 2,
    run: (a, b) => a - b,
  },
  "*": {
    precedence: 2,
    associativity: "left",
    args: 2,
    run: (a, b) => a * b,
  },
  "/": {
    precedence: 2,
    associativity: "left",
    args: 2,
    run: (a, b) => {
      if (b === 0) {
        throw new Error("Cannot divide by 0.");
      }

      return a / b;
    },
  },
  "%": {
    precedence: 2,
    associativity: "left",
    args: 2,
    run: (a, b) => {
      if (b === 0) {
        throw new Error("Cannot divide by 0.");
      }

      return a % b;
    },
  },
  "^": {
    precedence: 3,
    associativity: "right",
    args: 2,
    run: (a, b) => a ** b,
  },
  "u-": {
    precedence: 4,
    associativity: "right",
    args: 1,
    run: (a) => -a,
  },
  "u+": {
    precedence: 4,
    associativity: "right",
    args: 1,
    run: (a) => a,
  },
};

function tokenizeExpression(expression: string): Token[] {
  const source = expression.trim();

  if (!source) {
    throw new Error("Enter a calculation.");
  }

  const tokens: Token[] = [];
  let index = 0;

  while (index < source.length) {
    const character = source[index];

    if (/\s/.test(character)) {
      index += 1;
      continue;
    }

    if (/\d|\./.test(character)) {
      const match = source
        .slice(index)
        .match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/i);

      if (!match) {
        throw new Error("Invalid number in expression.");
      }

      const value = Number(match[0]);

      if (!Number.isFinite(value)) {
        throw new Error("A number in the expression is too large.");
      }

      tokens.push({ type: "number", value });
      index += match[0].length;
      continue;
    }

    if (/[a-z]/i.test(character)) {
      const match = source.slice(index).match(/^[a-z]+/i);

      if (!match) {
        throw new Error("Invalid function name.");
      }

      const name = match[0].toLowerCase();

      if (name === "pi") {
        tokens.push({ type: "number", value: Math.PI });
      } else if (name === "e") {
        tokens.push({ type: "number", value: Math.E });
      } else if (supportedFunctions[name]) {
        tokens.push({ type: "function", value: name });
      } else {
        throw new Error(`Unsupported function or constant: ${name}`);
      }

      index += match[0].length;
      continue;
    }

    if ("+-*/%^".includes(character)) {
      tokens.push({ type: "operator", value: character });
      index += 1;
      continue;
    }

    if (character === "(") {
      tokens.push({ type: "leftParen" });
      index += 1;
      continue;
    }

    if (character === ")") {
      tokens.push({ type: "rightParen" });
      index += 1;
      continue;
    }

    if (character === ",") {
      tokens.push({ type: "comma" });
      index += 1;
      continue;
    }

    throw new Error(`Unsupported character: ${character}`);
  }

  return tokens;
}

function toReversePolishNotation(tokens: Token[]): Token[] {
  const output: Token[] = [];
  const stack: Token[] = [];
  let previous: Token | undefined;

  for (const token of tokens) {
    if (token.type === "number") {
      output.push(token);
    } else if (token.type === "function") {
      stack.push(token);
    } else if (token.type === "comma") {
      while (
        stack.length > 0 &&
        stack[stack.length - 1].type !== "leftParen"
      ) {
        output.push(stack.pop()!);
      }

      if (
        stack.length === 0 ||
        stack[stack.length - 1].type !== "leftParen"
      ) {
        throw new Error("Misplaced comma or mismatched parentheses.");
      }
    } else if (token.type === "operator") {
      const isUnary =
        !previous ||
        previous.type === "operator" ||
        previous.type === "leftParen" ||
        previous.type === "comma";

      const operatorToken: Token = {
        type: "operator",
        value:
          isUnary && (token.value === "+" || token.value === "-")
            ? `u${token.value}`
            : token.value,
      };

      const currentInfo = operatorInfo[operatorToken.value];

      if (!currentInfo) {
        throw new Error("Invalid operator sequence.");
      }

      while (stack.length > 0) {
        const top = stack[stack.length - 1];

        if (top.type === "function") {
          output.push(stack.pop()!);
          continue;
        }

        if (top.type !== "operator") {
          break;
        }

        const topInfo = operatorInfo[top.value];

        const shouldPop =
          currentInfo.associativity === "left"
            ? currentInfo.precedence <= topInfo.precedence
            : currentInfo.precedence < topInfo.precedence;

        if (!shouldPop) {
          break;
        }

        output.push(stack.pop()!);
      }

      stack.push(operatorToken);
    } else if (token.type === "leftParen") {
      stack.push(token);
    } else if (token.type === "rightParen") {
      while (
        stack.length > 0 &&
        stack[stack.length - 1].type !== "leftParen"
      ) {
        output.push(stack.pop()!);
      }

      if (stack.length === 0) {
        throw new Error("Mismatched parentheses.");
      }

      stack.pop();

      if (
        stack.length > 0 &&
        stack[stack.length - 1].type === "function"
      ) {
        output.push(stack.pop()!);
      }
    }

    previous = token;
  }

  while (stack.length > 0) {
    const token = stack.pop()!;

    if (token.type === "leftParen" || token.type === "rightParen") {
      throw new Error("Mismatched parentheses.");
    }

    output.push(token);
  }

  return output;
}

function evaluateRpn(tokens: Token[]): number {
  const stack: number[] = [];

  for (const token of tokens) {
    if (token.type === "number") {
      stack.push(token.value);
      continue;
    }

    if (token.type === "operator") {
      const info = operatorInfo[token.value];

      if (stack.length < info.args) {
        throw new Error("Invalid expression.");
      }

      const args = stack.splice(stack.length - info.args, info.args);
      const result = info.run(...args);

      if (!Number.isFinite(result)) {
        throw new Error(
          "The calculation produced an undefined or non-finite result."
        );
      }

      stack.push(result);
      continue;
    }

    if (token.type === "function") {
      const info = supportedFunctions[token.value];

      if (stack.length < info.args) {
        throw new Error(`Function ${token.value} is missing an argument.`);
      }

      const args = stack.splice(stack.length - info.args, info.args);
      const result = info.run(...args);

      if (!Number.isFinite(result)) {
        throw new Error(
          `Function ${token.value} produced an undefined or non-finite result.`
        );
      }

      stack.push(result);
    }
  }

  if (stack.length !== 1) {
    throw new Error("Invalid expression.");
  }

  return stack[0];
}

export function evaluateScientificExpression(
  expression: string
): number {
  const tokens = tokenizeExpression(expression);
  const rpn = toReversePolishNotation(tokens);
  return evaluateRpn(rpn);
}