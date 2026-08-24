import { ToolConfig } from "@/types";

const mathFaq = [
  {
    question: "Are these math calculations performed in my browser?",
    answer:
      "Yes. Avorqin performs these calculations locally in your browser and does not need to send the values you enter to an external calculation service.",
  },
  {
    question: "Do I need an account to use these calculators?",
    answer:
      "No. Avorqin math tools can be used without creating an account.",
  },
  {
    question: "Can I use decimal and negative values?",
    answer:
      "Most tools accept decimal and negative values where they are mathematically valid. Tools such as GCD, LCM, and fraction numerators and denominators require whole numbers.",
  },
];

function mathTool(
  config: Omit<ToolConfig, "category" | "faq"> & {
    faq?: ToolConfig["faq"];
  }
): ToolConfig {
  return {
    ...config,
    category: "Math",
    faq: config.faq ?? mathFaq,
  };
}

export const mathTools: ToolConfig[] = [
  mathTool({
    id: "scientific-calculator",
    name: "Scientific Calculator",
    slug: "scientific-calculator",
    description:
      "Evaluate scientific math expressions with powers, roots, logarithms, trigonometric functions, constants, and parentheses.",
    longDescription:
      "Use a browser-based scientific calculator to evaluate mathematical expressions with standard arithmetic, exponents, roots, logarithms, trigonometric functions, constants such as pi and e, and nested parentheses. The expression parser runs locally and does not use JavaScript eval.",
    keywords: [
      "scientific calculator",
      "online scientific calculator",
      "math expression calculator",
      "trigonometry calculator",
      "log calculator",
      "square root calculator",
      "exponent calculator",
    ],
    icon: "Calculator",
    howToUse: [
      "Enter a mathematical expression such as sqrt(144) + sin(pi / 2).",
      "Use operators such as +, -, *, /, %, and ^.",
      "Use supported functions such as sin, cos, tan, sqrt, log, ln, abs, min, max, and pow.",
      "Click 'Calculate' to evaluate the expression.",
    ],
    faq: [
      {
        question: "What functions does the Scientific Calculator support?",
        answer:
          "It supports sin, cos, tan, asin, acos, atan, sqrt, abs, ln, log, exp, floor, ceil, round, min, max, and pow, along with pi and e.",
      },
      {
        question: "Does the calculator use eval?",
        answer:
          "No. Avorqin uses a built-in expression parser rather than JavaScript eval.",
      },
      {
        question: "Are trigonometric functions in degrees or radians?",
        answer:
          "The trigonometric functions use radians, matching JavaScript's standard Math functions.",
      },
    ],
  }),

  mathTool({
    id: "fraction-calculator",
    name: "Fraction Calculator",
    slug: "fraction-calculator",
    description:
      "Add, subtract, multiply, or divide two fractions and get simplified, mixed-number, and decimal results.",
    longDescription:
      "Calculate arithmetic with two fractions and automatically simplify the result. Choose addition, subtraction, multiplication, or division and view the simplified fraction, mixed-number form, and decimal equivalent.",
    keywords: [
      "fraction calculator",
      "add fractions calculator",
      "subtract fractions calculator",
      "multiply fractions calculator",
      "divide fractions calculator",
      "simplify fractions",
      "mixed number calculator",
    ],
    icon: "Calculator",
    howToUse: [
      "Enter the numerator and denominator for the first fraction.",
      "Enter the numerator and denominator for the second fraction.",
      "Choose add, subtract, multiply, or divide.",
      "Click 'Calculate' to see the simplified fraction, mixed number, and decimal result.",
    ],
    faq: [
      {
        question: "Does the Fraction Calculator simplify results?",
        answer:
          "Yes. Results are reduced to lowest terms automatically.",
      },
      {
        question: "Can a denominator be zero?",
        answer:
          "No. A fraction denominator cannot be zero.",
      },
      {
        question: "Does it show mixed numbers?",
        answer:
          "Yes. Improper fractions are also displayed in mixed-number form.",
      },
    ],
  }),

  mathTool({
    id: "standard-deviation-calculator",
    name: "Standard Deviation Calculator",
    slug: "standard-deviation-calculator",
    description:
      "Calculate population or sample standard deviation, variance, mean, and count from a list of numbers.",
    longDescription:
      "Calculate standard deviation for a numeric data set. Choose population or sample standard deviation and view the standard deviation, variance, mean, and number of values entered.",
    keywords: [
      "standard deviation calculator",
      "sample standard deviation calculator",
      "population standard deviation calculator",
      "variance calculator",
      "statistics calculator",
      "standard deviation formula",
    ],
    icon: "Calculator",
    howToUse: [
      "Enter numbers separated by commas, spaces, semicolons, or line breaks.",
      "Choose population or sample standard deviation.",
      "Click 'Calculate'.",
      "Review the standard deviation, variance, mean, and count.",
    ],
    faq: [
      {
        question: "What is the difference between population and sample standard deviation?",
        answer:
          "Population standard deviation divides by the number of values, while sample standard deviation uses one less than the number of values.",
      },
      {
        question: "Can I paste a list of numbers?",
        answer:
          "Yes. Values can be separated by commas, spaces, semicolons, or line breaks.",
      },
      {
        question: "Does the calculator also show variance?",
        answer:
          "Yes. The result includes variance, mean, count, and standard deviation.",
      },
    ],
  }),

  mathTool({
    id: "mean-median-mode-calculator",
    name: "Mean Median Mode Calculator",
    slug: "mean-median-mode-calculator",
    description:
      "Calculate mean, median, mode, range, minimum, maximum, and count for a list of numbers.",
    longDescription:
      "Analyze a numeric data set with common descriptive statistics. Enter a list of numbers to calculate the mean, median, mode or modes, range, minimum, maximum, and count.",
    keywords: [
      "mean median mode calculator",
      "average calculator",
      "median calculator",
      "mode calculator",
      "range calculator",
      "statistics calculator",
      "mean calculator",
    ],
    icon: "Calculator",
    howToUse: [
      "Enter the numbers in the data set.",
      "Separate values with commas, spaces, semicolons, or line breaks.",
      "Click 'Calculate'.",
      "Review the mean, median, mode, range, minimum, maximum, and count.",
    ],
    faq: [
      {
        question: "What happens if there is no mode?",
        answer:
          "If no value occurs more often than the others, the calculator reports that there is no mode.",
      },
      {
        question: "Can a data set have more than one mode?",
        answer:
          "Yes. If multiple values share the highest frequency, all of those values are displayed as modes.",
      },
      {
        question: "What is the range?",
        answer:
          "The range is the maximum value minus the minimum value.",
      },
    ],
  }),

  mathTool({
    id: "gcd-calculator",
    name: "GCD Calculator",
    slug: "gcd-calculator",
    description:
      "Find the greatest common divisor of two or more whole numbers.",
    longDescription:
      "Calculate the greatest common divisor, also called the greatest common factor, for two or more integers. Enter a list of whole numbers and the calculator finds the largest integer that divides all of them without a remainder.",
    keywords: [
      "GCD calculator",
      "greatest common divisor calculator",
      "greatest common factor calculator",
      "GCF calculator",
      "common divisor calculator",
      "find GCD",
    ],
    icon: "Calculator",
    howToUse: [
      "Enter at least two whole numbers.",
      "Separate the numbers with commas, spaces, semicolons, or line breaks.",
      "Click 'Calculate'.",
      "Review the greatest common divisor.",
    ],
  }),

  mathTool({
    id: "lcm-calculator",
    name: "LCM Calculator",
    slug: "lcm-calculator",
    description:
      "Find the least common multiple of two or more whole numbers.",
    longDescription:
      "Calculate the least common multiple for two or more integers. Enter a list of whole numbers and the calculator finds the smallest non-negative multiple shared by all values.",
    keywords: [
      "LCM calculator",
      "least common multiple calculator",
      "common multiple calculator",
      "find LCM",
      "least common denominator helper",
    ],
    icon: "Calculator",
    howToUse: [
      "Enter at least two whole numbers.",
      "Separate the values with commas, spaces, semicolons, or line breaks.",
      "Click 'Calculate'.",
      "Review the least common multiple.",
    ],
  }),

  mathTool({
    id: "quadratic-formula-calculator",
    name: "Quadratic Formula Calculator",
    slug: "quadratic-formula-calculator",
    description:
      "Solve quadratic equations and calculate roots, discriminant, and vertex from coefficients a, b, and c.",
    longDescription:
      "Solve equations in the form ax² + bx + c = 0 using the quadratic formula. Enter coefficients a, b, and c to calculate real or complex roots, the discriminant, and the parabola's vertex coordinates.",
    keywords: [
      "quadratic formula calculator",
      "quadratic equation solver",
      "solve quadratic equation",
      "quadratic roots calculator",
      "discriminant calculator",
      "parabola vertex calculator",
    ],
    icon: "Calculator",
    howToUse: [
      "Enter coefficient a.",
      "Enter coefficient b.",
      "Enter coefficient c.",
      "Click 'Calculate' to see the roots, discriminant, and vertex.",
    ],
    faq: [
      {
        question: "Can coefficient a be zero?",
        answer:
          "No. If a is zero, the equation is not quadratic.",
      },
      {
        question: "Does the calculator support complex roots?",
        answer:
          "Yes. When the discriminant is negative, the two roots are displayed using i.",
      },
      {
        question: "What is the discriminant?",
        answer:
          "The discriminant is b² - 4ac. Its sign determines whether a quadratic has two real roots, one repeated real root, or two complex roots.",
      },
    ],
  }),

  mathTool({
    id: "slope-calculator",
    name: "Slope Calculator",
    slug: "slope-calculator",
    description:
      "Calculate the slope between two coordinate points using x₁, y₁, x₂, and y₂.",
    longDescription:
      "Calculate the slope of the line passing through two coordinate points. Enter x₁, y₁, x₂, and y₂ and the tool applies the slope formula (y₂ - y₁) / (x₂ - x₁). Vertical lines are reported as having undefined slope.",
    keywords: [
      "slope calculator",
      "slope formula calculator",
      "find slope between two points",
      "coordinate slope calculator",
      "rise over run calculator",
    ],
    icon: "Calculator",
    howToUse: [
      "Enter x₁ and y₁ for the first point.",
      "Enter x₂ and y₂ for the second point.",
      "Click 'Calculate'.",
      "Review the slope or an undefined result for a vertical line.",
    ],
  }),

  mathTool({
    id: "midpoint-calculator",
    name: "Midpoint Calculator",
    slug: "midpoint-calculator",
    description:
      "Calculate the midpoint between two points on a coordinate plane.",
    longDescription:
      "Find the midpoint of a line segment from two coordinate points. Enter x₁, y₁, x₂, and y₂ to calculate the midpoint coordinates using the averages of the x-values and y-values.",
    keywords: [
      "midpoint calculator",
      "midpoint formula calculator",
      "find midpoint between two points",
      "coordinate midpoint calculator",
      "line segment midpoint",
    ],
    icon: "Calculator",
    howToUse: [
      "Enter x₁ and y₁ for the first point.",
      "Enter x₂ and y₂ for the second point.",
      "Click 'Calculate'.",
      "Review the midpoint x and y coordinates.",
    ],
  }),

  mathTool({
    id: "distance-formula-calculator",
    name: "Distance Formula Calculator",
    slug: "distance-formula-calculator",
    description:
      "Calculate the straight-line distance between two coordinate points.",
    longDescription:
      "Calculate the Euclidean distance between two points on a coordinate plane. Enter x₁, y₁, x₂, and y₂ and the calculator applies the distance formula based on the Pythagorean theorem.",
    keywords: [
      "distance formula calculator",
      "distance between two points calculator",
      "coordinate distance calculator",
      "euclidean distance calculator",
      "distance formula",
    ],
    icon: "Calculator",
    howToUse: [
      "Enter x₁ and y₁ for the first point.",
      "Enter x₂ and y₂ for the second point.",
      "Click 'Calculate'.",
      "Review the straight-line distance between the points.",
    ],
  }),

  mathTool({
    id: "pythagorean-theorem-calculator",
    name: "Pythagorean Theorem Calculator",
    slug: "pythagorean-theorem-calculator",
    description:
      "Calculate the hypotenuse of a right triangle from the lengths of the other two sides.",
    longDescription:
      "Use the Pythagorean theorem to calculate the hypotenuse of a right triangle. Enter the lengths of sides a and b and the calculator computes c using c = √(a² + b²).",
    keywords: [
      "pythagorean theorem calculator",
      "hypotenuse calculator",
      "right triangle calculator",
      "a squared plus b squared",
      "triangle side calculator",
    ],
    icon: "Calculator",
    howToUse: [
      "Enter the length of side a.",
      "Enter the length of side b.",
      "Click 'Calculate'.",
      "Review the calculated hypotenuse c.",
    ],
  }),

  mathTool({
    id: "random-number-generator",
    name: "Random Number Generator",
    slug: "random-number-generator",
    description:
      "Generate one or more random numbers within a custom range using whole-number or decimal output.",
    longDescription:
      "Generate random numbers between a minimum and maximum value. Choose how many values to generate, whether to limit results to whole numbers, and the number of decimal places for decimal output. The generator supports up to 1,000 values per run.",
    keywords: [
      "random number generator",
      "random integer generator",
      "random decimal generator",
      "number generator",
      "generate random numbers",
      "random number picker",
    ],
    icon: "Calculator",
    howToUse: [
      "Enter the minimum and maximum values.",
      "Enter how many random numbers to generate.",
      "Choose whether to generate whole numbers only.",
      "For decimal output, select the number of decimal places and click 'Generate'.",
    ],
    faq: [
      {
        question: "How many numbers can I generate at once?",
        answer:
          "You can generate up to 1,000 numbers in one run.",
      },
      {
        question: "Can it generate decimal values?",
        answer:
          "Yes. Turn off whole-number-only mode and choose the number of decimal places.",
      },
      {
        question: "Is this suitable for cryptographic or security use?",
        answer:
          "No. This tool uses JavaScript's Math.random() and is intended for general-purpose random values, not cryptographic or security-sensitive uses.",
      },
    ],
  }),
];