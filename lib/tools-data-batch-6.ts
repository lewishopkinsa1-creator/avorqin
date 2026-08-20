import { ToolConfig } from "@/types";

export const batch6Tools: ToolConfig[] = [
  {
    id: "average-calculator",
    name: "Average Calculator",
    slug: "average-calculator",
    description:
      "Calculate the average, sum, minimum, maximum, and count for a list of numbers.",
    longDescription:
      "Calculate the arithmetic mean of a list of numbers and review useful summary values including the sum, minimum, maximum, and total number of values. Enter numbers separated by commas, spaces, semicolons, or line breaks. All calculations run locally in your browser.",
    keywords: [
      "average calculator",
      "mean calculator",
      "calculate average",
      "arithmetic mean calculator",
      "online average calculator",
    ],
    category: "Developer",
    icon: "Percent",
    howToUse: [
      "Enter two or more numbers separated by commas, spaces, semicolons, or line breaks.",
      "Click 'Calculate Average'.",
      "Review the average, sum, minimum, maximum, and count.",
      "Copy the result when needed.",
    ],
    faq: [
      {
        question: "What kind of average does this calculate?",
        answer:
          "This tool calculates the arithmetic mean by adding all values and dividing by the number of values.",
      },
      {
        question: "Can I enter numbers on separate lines?",
        answer:
          "Yes. You can separate values with commas, spaces, semicolons, or line breaks.",
      },
      {
        question: "Are my numbers sent to a server?",
        answer:
          "No. The calculation runs locally in your browser.",
      },
    ],
  },

  {
    id: "ratio-calculator",
    name: "Ratio Calculator",
    slug: "ratio-calculator",
    description:
      "Simplify two numbers into a ratio and view their decimal relationship.",
    longDescription:
      "Simplify two positive values into their lowest whole-number ratio and view the corresponding decimal relationship. Use the Ratio Calculator for proportions, recipes, measurements, design, mathematics, and everyday comparisons.",
    keywords: [
      "ratio calculator",
      "simplify ratio",
      "ratio simplifier",
      "calculate ratio",
      "online ratio calculator",
    ],
    category: "Developer",
    icon: "Ratio",
    howToUse: [
      "Enter the first value.",
      "Enter the second value.",
      "Click 'Calculate Ratio'.",
      "Review the simplified ratio and decimal result.",
    ],
    faq: [
      {
        question: "Does this simplify the ratio?",
        answer:
          "Yes. Whole-number values are reduced to their simplest ratio.",
      },
      {
        question: "Is this the same as the Aspect Ratio Calculator?",
        answer:
          "No. The Aspect Ratio Calculator focuses on width and height dimensions. This calculator handles general numerical ratios.",
      },
      {
        question: "Does the calculation run locally?",
        answer:
          "Yes. The calculation runs directly in your browser.",
      },
    ],
  },

  {
    id: "fraction-to-percentage-calculator",
    name: "Fraction to Percentage Calculator",
    slug: "fraction-to-percentage-calculator",
    description:
      "Convert a numerator and denominator into a percentage instantly.",
    longDescription:
      "Convert fractions into percentages by dividing the numerator by the denominator and multiplying the result by 100. Use the calculator for math, education, finance, statistics, and everyday percentage conversions.",
    keywords: [
      "fraction to percentage",
      "fraction to percent calculator",
      "convert fraction to percentage",
      "fraction percentage calculator",
      "fraction percent converter",
    ],
    category: "Developer",
    icon: "Percent",
    howToUse: [
      "Enter the numerator.",
      "Enter the denominator.",
      "Click 'Convert to Percentage'.",
      "Review the percentage result.",
    ],
    faq: [
      {
        question: "How is a fraction converted to a percentage?",
        answer:
          "The numerator is divided by the denominator and the result is multiplied by 100.",
      },
      {
        question: "Can the denominator be zero?",
        answer:
          "No. Division by zero is undefined, so the calculator will display an error.",
      },
      {
        question: "Is my fraction uploaded?",
        answer:
          "No. The calculation runs locally in your browser.",
      },
    ],
  },

  {
    id: "percentage-to-fraction-calculator",
    name: "Percentage to Fraction Calculator",
    slug: "percentage-to-fraction-calculator",
    description:
      "Convert percentages into simplified fractions directly in your browser.",
    longDescription:
      "Convert percentage values into simplified fractions for mathematics, finance, education, recipes, measurements, and everyday calculations. Decimal percentage values are also supported.",
    keywords: [
      "percentage to fraction",
      "percent to fraction calculator",
      "convert percentage to fraction",
      "percentage fraction converter",
      "percent as fraction",
    ],
    category: "Developer",
    icon: "Percent",
    howToUse: [
      "Enter the percentage value.",
      "Click 'Convert to Fraction'.",
      "Review the simplified numerator and denominator.",
      "Copy the result when needed.",
    ],
    faq: [
      {
        question: "How do you convert a percentage to a fraction?",
        answer:
          "The percentage is divided by 100 and the resulting fraction is simplified.",
      },
      {
        question: "Can I use decimal percentages?",
        answer:
          "Yes. Decimal percentage values are supported.",
      },
      {
        question: "Does conversion happen locally?",
        answer:
          "Yes. No external calculation service is required.",
      },
    ],
  },

  {
    id: "decimal-to-percentage-calculator",
    name: "Decimal to Percentage Calculator",
    slug: "decimal-to-percentage-calculator",
    description:
      "Convert decimal values into percentages instantly.",
    longDescription:
      "Convert decimals such as 0.25, 0.5, or 1.2 into percentages by multiplying the value by 100. This calculator is useful for mathematics, finance, statistics, spreadsheets, and everyday conversions.",
    keywords: [
      "decimal to percentage",
      "decimal to percent calculator",
      "convert decimal to percentage",
      "decimal percentage converter",
      "decimal to percent",
    ],
    category: "Developer",
    icon: "Percent",
    howToUse: [
      "Enter a decimal value.",
      "Click 'Convert to Percentage'.",
      "Review the percentage result.",
      "Copy the result when needed.",
    ],
    faq: [
      {
        question: "How do I convert a decimal to a percentage?",
        answer:
          "Multiply the decimal by 100. For example, 0.25 becomes 25%.",
      },
      {
        question: "Can the decimal be greater than 1?",
        answer:
          "Yes. For example, 1.5 converts to 150%.",
      },
      {
        question: "Does this run locally?",
        answer:
          "Yes. The conversion runs in your browser.",
      },
    ],
  },

  {
    id: "percentage-to-decimal-calculator",
    name: "Percentage to Decimal Calculator",
    slug: "percentage-to-decimal-calculator",
    description:
      "Convert percentages into decimal values instantly.",
    longDescription:
      "Convert percentage values into decimals by dividing by 100. Use the calculator for mathematics, finance, statistics, spreadsheets, programming, and everyday percentage conversions.",
    keywords: [
      "percentage to decimal",
      "percent to decimal calculator",
      "convert percentage to decimal",
      "percentage decimal converter",
      "percent to decimal",
    ],
    category: "Developer",
    icon: "Percent",
    howToUse: [
      "Enter the percentage.",
      "Click 'Convert to Decimal'.",
      "Review the decimal result.",
      "Copy the result when needed.",
    ],
    faq: [
      {
        question: "How do I convert a percentage to a decimal?",
        answer:
          "Divide the percentage by 100. For example, 25% becomes 0.25.",
      },
      {
        question: "Can I enter percentages above 100?",
        answer:
          "Yes. For example, 150% becomes 1.5.",
      },
      {
        question: "Does Avorqin store the value?",
        answer:
          "No. The conversion runs locally in your browser.",
      },
    ],
  },

  {
    id: "discount-calculator",
    name: "Discount Calculator",
    slug: "discount-calculator",
    description:
      "Calculate a discount amount and final sale price from a percentage off.",
    longDescription:
      "Calculate how much money a discount saves and determine the final sale price. Enter an original price and discount percentage to instantly see the discount amount and price after the discount.",
    keywords: [
      "discount calculator",
      "sale price calculator",
      "percent off calculator",
      "discount percentage calculator",
      "price after discount",
    ],
    category: "Developer",
    icon: "Percent",
    howToUse: [
      "Enter the original price.",
      "Enter the discount percentage.",
      "Click 'Calculate Discount'.",
      "Review the discount amount and final price.",
    ],
    faq: [
      {
        question: "How is the discount calculated?",
        answer:
          "The original price is multiplied by the discount percentage divided by 100.",
      },
      {
        question: "Can I calculate a 100% discount?",
        answer:
          "Yes. A 100% discount produces a final price of zero.",
      },
      {
        question: "Does this process payments?",
        answer:
          "No. This is only a calculator and does not process financial transactions.",
      },
    ],
  },

  {
    id: "sales-tax-calculator",
    name: "Sales Tax Calculator",
    slug: "sales-tax-calculator",
    description:
      "Calculate sales tax and the final total from a subtotal and tax rate.",
    longDescription:
      "Estimate sales tax by entering a purchase subtotal and the applicable tax percentage. Avorqin calculates the tax amount and final total locally in your browser. You provide the tax rate, so the tool does not rely on an external tax-rate database.",
    keywords: [
      "sales tax calculator",
      "tax calculator",
      "calculate sales tax",
      "sales tax total calculator",
      "purchase tax calculator",
    ],
    category: "Developer",
    icon: "Percent",
    howToUse: [
      "Enter the purchase subtotal.",
      "Enter the sales tax rate.",
      "Click 'Calculate Sales Tax'.",
      "Review the tax amount and total.",
    ],
    faq: [
      {
        question: "Does this look up my local sales tax rate?",
        answer:
          "No. Enter the tax rate that applies to your location or transaction.",
      },
      {
        question: "Why do I enter the tax rate manually?",
        answer:
          "Sales tax rates vary by jurisdiction and can change, so this calculator lets you provide the applicable rate.",
      },
      {
        question: "Does the calculator run locally?",
        answer:
          "Yes. The calculation runs in your browser.",
      },
    ],
  },

  {
    id: "tip-calculator",
    name: "Tip Calculator",
    slug: "tip-calculator",
    description:
      "Calculate a tip, total bill, and per-person amount when splitting a check.",
    longDescription:
      "Calculate gratuity from a bill amount and tip percentage, then optionally divide the final total evenly across multiple people. Use the Tip Calculator for restaurants, delivery, personal services, and group dining.",
    keywords: [
      "tip calculator",
      "gratuity calculator",
      "restaurant tip calculator",
      "split bill calculator",
      "tip percentage calculator",
    ],
    category: "Developer",
    icon: "Percent",
    howToUse: [
      "Enter the bill amount.",
      "Enter the tip percentage.",
      "Enter the number of people sharing the bill.",
      "Click 'Calculate Tip' and review the results.",
    ],
    faq: [
      {
        question: "Can I split the total between multiple people?",
        answer:
          "Yes. Enter the number of people and the calculator will show an equal per-person amount.",
      },
      {
        question: "Does the total include the original bill?",
        answer:
          "Yes. The total includes both the bill amount and the calculated tip.",
      },
      {
        question: "Does Avorqin store the bill amount?",
        answer:
          "No. The calculation runs locally in your browser.",
      },
    ],
  },

  {
    id: "length-converter",
    name: "Length Converter",
    slug: "length-converter",
    description:
      "Convert length and distance between common metric and imperial units.",
    longDescription:
      "Convert millimeters, centimeters, meters, kilometers, inches, feet, yards, and miles directly in your browser. Use the Length Converter for everyday measurements, construction, engineering, travel, education, and design.",
    keywords: [
      "length converter",
      "distance converter",
      "meters to feet",
      "feet to meters",
      "length unit converter",
    ],
    category: "Developer",
    icon: "Ruler",
    howToUse: [
      "Enter a length or distance value.",
      "Select the source unit.",
      "Select the target unit.",
      "Click 'Convert'.",
    ],
    faq: [
      {
        question: "Which length units are supported?",
        answer:
          "Millimeters, centimeters, meters, kilometers, inches, feet, yards, and miles are supported.",
      },
      {
        question: "Can I convert metric to imperial units?",
        answer:
          "Yes. You can convert freely between all supported metric and imperial units.",
      },
      {
        question: "Does this converter require an API?",
        answer:
          "No. The conversion runs locally in your browser.",
      },
    ],
  },

  {
    id: "weight-converter",
    name: "Weight Converter",
    slug: "weight-converter",
    description:
      "Convert weight and mass between common metric and imperial units.",
    longDescription:
      "Convert milligrams, grams, kilograms, ounces, pounds, stone, US tons, and metric tonnes directly in your browser. The converter is useful for everyday measurements, shipping, fitness, engineering, cooking, and education.",
    keywords: [
      "weight converter",
      "mass converter",
      "kg to lb",
      "pounds to kilograms",
      "weight unit converter",
    ],
    category: "Developer",
    icon: "Ruler",
    howToUse: [
      "Enter a weight or mass value.",
      "Choose the source unit.",
      "Choose the target unit.",
      "Click 'Convert'.",
    ],
    faq: [
      {
        question: "Does this include kilograms and pounds?",
        answer:
          "Yes. Kilograms and pounds are included along with several other common units.",
      },
      {
        question: "Are US tons and metric tonnes different?",
        answer:
          "Yes. The converter treats US short tons and metric tonnes as separate units.",
      },
      {
        question: "Is processing local?",
        answer:
          "Yes. Conversion runs directly in your browser.",
      },
    ],
  },

  {
    id: "temperature-converter",
    name: "Temperature Converter",
    slug: "temperature-converter",
    description:
      "Convert temperatures between Celsius, Fahrenheit, and Kelvin.",
    longDescription:
      "Convert temperature values between Celsius, Fahrenheit, and Kelvin for weather references, cooking, science, engineering, education, and everyday use.",
    keywords: [
      "temperature converter",
      "celsius to fahrenheit",
      "fahrenheit to celsius",
      "kelvin converter",
      "temperature conversion",
    ],
    category: "Developer",
    icon: "Gauge",
    howToUse: [
      "Enter the temperature.",
      "Choose the source temperature scale.",
      "Choose the target temperature scale.",
      "Click 'Convert'.",
    ],
    faq: [
      {
        question: "Which temperature scales are supported?",
        answer:
          "Celsius, Fahrenheit, and Kelvin are supported.",
      },
      {
        question: "Can I convert Fahrenheit directly to Kelvin?",
        answer:
          "Yes. Every supported temperature scale can be converted to another.",
      },
      {
        question: "Does this use weather data?",
        answer:
          "No. It only converts the temperature value you enter.",
      },
    ],
  },

  {
    id: "area-converter",
    name: "Area Converter",
    slug: "area-converter",
    description:
      "Convert area between metric, imperial, acre, hectare, and square-mile units.",
    longDescription:
      "Convert square millimeters, square centimeters, square meters, square kilometers, square inches, square feet, square yards, acres, hectares, and square miles directly in your browser.",
    keywords: [
      "area converter",
      "square feet to square meters",
      "acres to hectares",
      "area unit converter",
      "square meter converter",
    ],
    category: "Developer",
    icon: "Ruler",
    howToUse: [
      "Enter an area value.",
      "Choose the source unit.",
      "Choose the target unit.",
      "Click 'Convert'.",
    ],
    faq: [
      {
        question: "Does this support acres and hectares?",
        answer:
          "Yes. Acres and hectares are both supported.",
      },
      {
        question: "Can I convert square feet to square meters?",
        answer:
          "Yes. Select square feet as the source unit and square meters as the target.",
      },
      {
        question: "Is the conversion browser-based?",
        answer:
          "Yes. It runs locally in your browser.",
      },
    ],
  },

  {
    id: "volume-converter",
    name: "Volume Converter",
    slug: "volume-converter",
    description:
      "Convert liters, milliliters, US liquid measurements, and cubic volume units.",
    longDescription:
      "Convert between milliliters, liters, cubic meters, US teaspoons, tablespoons, cups, fluid ounces, pints, quarts, gallons, cubic inches, and cubic feet directly in your browser.",
    keywords: [
      "volume converter",
      "liters to gallons",
      "gallons to liters",
      "cup converter",
      "volume unit converter",
    ],
    category: "Developer",
    icon: "Database",
    howToUse: [
      "Enter a volume value.",
      "Select the source unit.",
      "Select the target unit.",
      "Click 'Convert'.",
    ],
    faq: [
      {
        question: "Are cups and gallons US measurements?",
        answer:
          "Yes. The current cup, fluid-ounce, pint, quart, gallon, teaspoon, and tablespoon units use US customary measurements.",
      },
      {
        question: "Can I convert liters to cubic feet?",
        answer:
          "Yes. Select liters as the source and cubic feet as the target.",
      },
      {
        question: "Does this require an external service?",
        answer:
          "No. All supported conversions run locally.",
      },
    ],
  },

  {
    id: "speed-converter",
    name: "Speed Converter",
    slug: "speed-converter",
    description:
      "Convert speed between mph, km/h, m/s, ft/s, and knots.",
    longDescription:
      "Convert common speed units including miles per hour, kilometers per hour, meters per second, feet per second, and knots. All calculations run directly in your browser.",
    keywords: [
      "speed converter",
      "mph to kmh",
      "kmh to mph",
      "knots converter",
      "speed unit converter",
    ],
    category: "Developer",
    icon: "Gauge",
    howToUse: [
      "Enter a speed value.",
      "Choose the source unit.",
      "Choose the target unit.",
      "Click 'Convert'.",
    ],
    faq: [
      {
        question: "Can I convert mph to km/h?",
        answer:
          "Yes. Miles per hour and kilometers per hour are both supported.",
      },
      {
        question: "Are knots supported?",
        answer:
          "Yes. Knots are included as a supported speed unit.",
      },
      {
        question: "Does the conversion run locally?",
        answer:
          "Yes. No external API is required.",
      },
    ],
  },

  {
    id: "time-converter",
    name: "Time Converter",
    slug: "time-converter",
    description:
      "Convert durations between milliseconds, seconds, minutes, hours, days, and weeks.",
    longDescription:
      "Convert time durations between milliseconds, seconds, minutes, hours, days, and weeks. This tool converts quantities of time and is separate from timezone or clock-time conversion.",
    keywords: [
      "time converter",
      "hours to minutes",
      "seconds to hours",
      "duration converter",
      "time unit converter",
    ],
    category: "Developer",
    icon: "Clock3",
    howToUse: [
      "Enter a duration.",
      "Choose the source time unit.",
      "Choose the target unit.",
      "Click 'Convert'.",
    ],
    faq: [
      {
        question: "Is this a timezone converter?",
        answer:
          "No. This tool converts durations such as hours, minutes, and seconds.",
      },
      {
        question: "Can I convert milliseconds to days?",
        answer:
          "Yes. Any supported duration unit can be converted to another.",
      },
      {
        question: "Does this run locally?",
        answer:
          "Yes. The conversion runs in your browser.",
      },
    ],
  },

  {
    id: "pressure-converter",
    name: "Pressure Converter",
    slug: "pressure-converter",
    description:
      "Convert pressure between Pa, kPa, MPa, bar, PSI, atmospheres, torr, and more.",
    longDescription:
      "Convert common pressure measurements including pascals, kilopascals, megapascals, bar, millibar, PSI, standard atmospheres, and torr.",
    keywords: [
      "pressure converter",
      "bar to psi",
      "psi to bar",
      "kpa to psi",
      "pressure unit converter",
    ],
    category: "Developer",
    icon: "Gauge",
    howToUse: [
      "Enter a pressure value.",
      "Select the source unit.",
      "Select the target unit.",
      "Click 'Convert'.",
    ],
    faq: [
      {
        question: "Can I convert bar to PSI?",
        answer:
          "Yes. Both bar and PSI are supported.",
      },
      {
        question: "Are atmospheres supported?",
        answer:
          "Yes. Standard atmospheres are included.",
      },
      {
        question: "Does this use an API?",
        answer:
          "No. The conversion is calculated locally.",
      },
    ],
  },

  {
    id: "energy-converter",
    name: "Energy Converter",
    slug: "energy-converter",
    description:
      "Convert energy between joules, calories, watt-hours, kilowatt-hours, BTU, and more.",
    longDescription:
      "Convert common energy measurements including joules, kilojoules, megajoules, calories, kilocalories, watt-hours, kilowatt-hours, and BTU directly in your browser.",
    keywords: [
      "energy converter",
      "kwh to joules",
      "joules to calories",
      "btu converter",
      "energy unit converter",
    ],
    category: "Developer",
    icon: "Gauge",
    howToUse: [
      "Enter an energy value.",
      "Choose the source unit.",
      "Choose the target unit.",
      "Click 'Convert'.",
    ],
    faq: [
      {
        question: "Does this support kilowatt-hours?",
        answer:
          "Yes. Watt-hours and kilowatt-hours are supported.",
      },
      {
        question: "Are calories and kilocalories separate?",
        answer:
          "Yes. The converter treats calories and kilocalories as different units.",
      },
      {
        question: "Does conversion happen locally?",
        answer:
          "Yes. It runs directly in your browser.",
      },
    ],
  },

  {
    id: "power-converter",
    name: "Power Converter",
    slug: "power-converter",
    description:
      "Convert power between watts, kilowatts, megawatts, horsepower, and BTU per hour.",
    longDescription:
      "Convert power measurements between watts, kilowatts, megawatts, mechanical horsepower, and BTU per hour for engineering, electrical, automotive, and everyday calculations.",
    keywords: [
      "power converter",
      "kw to hp",
      "horsepower to watts",
      "watts to horsepower",
      "power unit converter",
    ],
    category: "Developer",
    icon: "Gauge",
    howToUse: [
      "Enter a power value.",
      "Choose the source unit.",
      "Choose the target unit.",
      "Click 'Convert'.",
    ],
    faq: [
      {
        question: "Can I convert kilowatts to horsepower?",
        answer:
          "Yes. Kilowatts and mechanical horsepower are both supported.",
      },
      {
        question: "Is BTU per hour supported?",
        answer:
          "Yes. BTU per hour is included as a power unit.",
      },
      {
        question: "Does this require an external service?",
        answer:
          "No. Conversion happens locally.",
      },
    ],
  },

  {
    id: "frequency-converter",
    name: "Frequency Converter",
    slug: "frequency-converter",
    description:
      "Convert frequency between Hz, kHz, MHz, GHz, and RPM.",
    longDescription:
      "Convert frequency measurements between hertz, kilohertz, megahertz, gigahertz, and revolutions per minute for electronics, computing, engineering, audio, and mechanical applications.",
    keywords: [
      "frequency converter",
      "hz to khz",
      "mhz to ghz",
      "rpm to hz",
      "frequency unit converter",
    ],
    category: "Developer",
    icon: "Gauge",
    howToUse: [
      "Enter a frequency value.",
      "Choose the source unit.",
      "Choose the target unit.",
      "Click 'Convert'.",
    ],
    faq: [
      {
        question: "Can RPM be converted to hertz?",
        answer:
          "Yes. Sixty revolutions per minute corresponds to one hertz.",
      },
      {
        question: "Does this support GHz?",
        answer:
          "Yes. Hertz through gigahertz are supported.",
      },
      {
        question: "Does conversion happen locally?",
        answer:
          "Yes. No API is needed.",
      },
    ],
  },

  {
    id: "angle-converter",
    name: "Angle Converter",
    slug: "angle-converter",
    description:
      "Convert angles between degrees, radians, gradians, and turns.",
    longDescription:
      "Convert angular measurements between degrees, radians, gradians, and full turns for mathematics, engineering, programming, design, geometry, and technical calculations.",
    keywords: [
      "angle converter",
      "degrees to radians",
      "radians to degrees",
      "angle unit converter",
      "degrees radians calculator",
    ],
    category: "Developer",
    icon: "Ratio",
    howToUse: [
      "Enter an angle value.",
      "Choose the source unit.",
      "Choose the target unit.",
      "Click 'Convert'.",
    ],
    faq: [
      {
        question: "Can I convert 180 degrees to radians?",
        answer:
          "Yes. 180 degrees converts to approximately 3.14159265 radians.",
      },
      {
        question: "What is one full turn?",
        answer:
          "One full turn equals 360 degrees or 2π radians.",
      },
      {
        question: "Is the converter client-side?",
        answer:
          "Yes. The calculation runs in your browser.",
      },
    ],
  },

  {
    id: "data-rate-converter",
    name: "Data Rate Converter",
    slug: "data-rate-converter",
    description:
      "Convert network and data rates between bit-based and byte-based units.",
    longDescription:
      "Convert data transfer rates between bits per second, kilobits, megabits, gigabits, bytes, kilobytes, megabytes, and gigabytes per second. This is useful for comparing internet speeds, download rates, storage throughput, and network specifications.",
    keywords: [
      "data rate converter",
      "mbps to mb/s",
      "megabits to megabytes per second",
      "network speed converter",
      "data speed converter",
    ],
    category: "Developer",
    icon: "Gauge",
    howToUse: [
      "Enter a data rate.",
      "Choose the source unit.",
      "Choose the target unit.",
      "Click 'Convert'.",
    ],
    faq: [
      {
        question: "What is the difference between Mbps and MB/s?",
        answer:
          "Mbps means megabits per second, while MB/s means megabytes per second. One byte contains eight bits.",
      },
      {
        question: "Is this the same as the Data Transfer Time Calculator?",
        answer:
          "No. This converts rate units, while the Data Transfer Time Calculator estimates how long a file transfer will take.",
      },
      {
        question: "Does this run a speed test?",
        answer:
          "No. It converts the numerical data rate you enter.",
      },
    ],
  },

  {
    id: "fuel-economy-converter",
    name: "Fuel Economy Converter",
    slug: "fuel-economy-converter",
    description:
      "Convert fuel economy between US MPG, UK MPG, L/100 km, and km/L.",
    longDescription:
      "Convert vehicle fuel economy between miles per gallon in US and imperial measurements, liters per 100 kilometers, and kilometers per liter. The converter runs entirely in your browser.",
    keywords: [
      "fuel economy converter",
      "mpg to l100km",
      "l100km to mpg",
      "mpg converter",
      "fuel mileage converter",
    ],
    category: "Developer",
    icon: "Gauge",
    howToUse: [
      "Enter the fuel economy value.",
      "Choose the source unit.",
      "Choose the target unit.",
      "Click 'Convert'.",
    ],
    faq: [
      {
        question: "Are US MPG and UK MPG different?",
        answer:
          "Yes. US and imperial gallons have different volumes, so the converter treats them separately.",
      },
      {
        question: "Why does L/100 km move opposite to MPG?",
        answer:
          "Lower L/100 km means less fuel is consumed, while higher MPG means more distance is traveled per gallon.",
      },
      {
        question: "Does this use vehicle-specific data?",
        answer:
          "No. It only converts the fuel economy value you enter.",
      },
    ],
  },

  {
    id: "ascii-to-text-converter",
    name: "ASCII to Text Converter",
    slug: "ascii-to-text-converter",
    description:
      "Convert standard ASCII decimal character codes into readable text.",
    longDescription:
      "Convert decimal ASCII codes from 0 through 127 into their corresponding text characters directly in your browser. Use the converter for programming, debugging, education, data inspection, and character-code reference.",
    keywords: [
      "ascii to text",
      "ascii to text converter",
      "ascii decoder",
      "ascii code to text",
      "decimal ascii converter",
    ],
    category: "Developer",
    icon: "Binary",
    howToUse: [
      "Enter ASCII decimal codes separated by spaces, commas, semicolons, or line breaks.",
      "Click 'Convert to Text'.",
      "Review the decoded text.",
      "Copy the result when needed.",
    ],
    faq: [
      {
        question: "Which ASCII codes are supported?",
        answer:
          "The tool supports standard ASCII decimal codes from 0 through 127.",
      },
      {
        question: "Can I enter multiple ASCII codes?",
        answer:
          "Yes. Separate multiple codes with spaces, commas, semicolons, or line breaks.",
      },
      {
        question: "Does decoding happen locally?",
        answer:
          "Yes. The conversion runs in your browser.",
      },
    ],
  },

  {
    id: "text-to-ascii-converter",
    name: "Text to ASCII Converter",
    slug: "text-to-ascii-converter",
    description:
      "Convert standard ASCII text characters into decimal ASCII character codes.",
    longDescription:
      "Convert standard ASCII text into decimal character codes for programming, education, debugging, and data inspection. This tool supports the standard ASCII range from 0 through 127 and runs locally in your browser.",
    keywords: [
      "text to ascii",
      "text to ascii converter",
      "ascii encoder",
      "text to ascii code",
      "ascii code generator",
    ],
    category: "Developer",
    icon: "Binary",
    howToUse: [
      "Enter standard ASCII text.",
      "Click 'Convert to ASCII'.",
      "Review the decimal character codes.",
      "Copy the result when needed.",
    ],
    faq: [
      {
        question: "Does this support Unicode characters?",
        answer:
          "No. This tool is intentionally limited to standard ASCII characters with codes from 0 through 127.",
      },
      {
        question: "How are multiple characters displayed?",
        answer:
          "Each character is converted to its decimal ASCII code, with codes separated by spaces.",
      },
      {
        question: "Is my text uploaded?",
        answer:
          "No. Conversion happens locally in your browser.",
      },
    ],
  },
];