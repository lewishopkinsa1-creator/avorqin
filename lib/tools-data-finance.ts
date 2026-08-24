import { ToolConfig } from "@/types";

const financeFaq = [
  {
    question: "Are these financial calculations performed in my browser?",
    answer:
      "Yes. Avorqin performs these calculations locally in your browser and does not need to send the values you enter to an external calculation service.",
  },
  {
    question: "Are the results financial advice?",
    answer:
      "No. These tools provide estimates based on standard mathematical formulas and the values you enter. They are for informational use and are not financial, tax, lending, investment, or legal advice.",
  },
  {
    question: "Do I need an account to use these calculators?",
    answer:
      "No. Avorqin finance and business calculators can be used without creating an account.",
  },
];

function financeTool(
  config: Omit<ToolConfig, "category" | "faq"> & {
    faq?: ToolConfig["faq"];
  }
): ToolConfig {
  return {
    ...config,
    category: "Finance & Business",
    faq: config.faq ?? financeFaq,
  };
}

export const financeTools: ToolConfig[] = [
  financeTool({
    id: "mortgage-calculator",
    name: "Mortgage Calculator",
    slug: "mortgage-calculator",
    description:
      "Estimate monthly mortgage payments, principal and interest, property tax, insurance, HOA fees, and total interest.",
    longDescription:
      "Estimate the monthly cost of a home loan using the purchase price, down payment, annual interest rate, and mortgage term. You can also include annual property tax, homeowners insurance, and monthly HOA fees to create a broader estimated monthly housing payment. The calculator also reports the loan amount and estimated total interest paid over the loan term.",
    keywords: [
      "mortgage calculator",
      "home loan calculator",
      "monthly mortgage payment",
      "mortgage payment calculator",
      "house payment calculator",
      "mortgage interest calculator",
    ],
    icon: "House",
    howToUse: [
      "Enter the home price and down payment.",
      "Enter the annual interest rate and mortgage term in years.",
      "Optionally add annual property tax, annual insurance, and monthly HOA fees.",
      "Click 'Calculate' to see the estimated monthly payment and loan totals.",
    ],
    faq: [
      {
        question: "What does the estimated monthly mortgage payment include?",
        answer:
          "The calculator can include principal and interest plus the property tax, insurance, and HOA values you enter. It does not automatically add every possible housing expense, fee, or lender charge.",
      },
      {
        question: "Does the mortgage calculator include PMI?",
        answer:
          "No. Private mortgage insurance is not automatically calculated in this version, so add it separately when evaluating a real loan scenario.",
      },
      {
        question: "Are closing costs included?",
        answer:
          "No. Closing costs, lender fees, escrow adjustments, points, and other transaction expenses are not included.",
      },
    ],
  }),

  financeTool({
    id: "loan-calculator",
    name: "Loan Calculator",
    slug: "loan-calculator",
    description:
      "Calculate estimated monthly loan payments, total repayment, and total interest from amount, rate, and term.",
    longDescription:
      "Estimate a fixed-payment loan using the loan amount, annual interest rate, and repayment term. The calculator reports the monthly payment, total amount repaid, and total interest over the selected term using a standard amortizing-loan formula.",
    keywords: [
      "loan calculator",
      "monthly loan payment calculator",
      "interest loan calculator",
      "personal loan calculator",
      "loan repayment calculator",
      "amortized loan calculator",
    ],
    icon: "Landmark",
    howToUse: [
      "Enter the loan amount.",
      "Enter the annual interest rate.",
      "Enter the loan term in years.",
      "Click 'Calculate' to view the monthly payment, total repayment, and total interest.",
    ],
  }),

  financeTool({
    id: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
    description:
      "Estimate compound growth from a starting balance, interest rate, time, compounding frequency, and monthly contributions.",
    longDescription:
      "Estimate how a starting balance may grow with compound interest over time. Enter the principal, annual rate, number of years, compounding frequency, and optional monthly contribution to compare the estimated ending balance, total contributions, and interest earned.",
    keywords: [
      "compound interest calculator",
      "compound growth calculator",
      "investment growth calculator",
      "savings interest calculator",
      "compound interest with contributions",
      "future value calculator",
    ],
    icon: "TrendingUp",
    howToUse: [
      "Enter the starting principal.",
      "Enter the annual interest rate and number of years.",
      "Set the number of compounding periods per year.",
      "Optionally add a monthly contribution, then calculate the estimated future value.",
    ],
    faq: [
      {
        question: "What does compounding frequency mean?",
        answer:
          "Compounding frequency is how often interest is applied to the starting principal in the calculator, such as monthly, quarterly, or annually.",
      },
      {
        question: "How are monthly contributions handled?",
        answer:
          "Monthly contributions are accumulated using a monthly rate so the calculator can estimate their future value alongside the starting balance.",
      },
      {
        question: "Does the result guarantee an investment return?",
        answer:
          "No. The result is a mathematical projection based on a constant rate and does not predict actual market or account performance.",
      },
    ],
  }),

  financeTool({
    id: "simple-interest-calculator",
    name: "Simple Interest Calculator",
    slug: "simple-interest-calculator",
    description:
      "Calculate simple interest and total amount from principal, annual rate, and time.",
    longDescription:
      "Calculate simple interest using the standard principal × rate × time formula. Enter the principal amount, annual interest rate, and number of years to see the interest amount and total value after adding the calculated interest.",
    keywords: [
      "simple interest calculator",
      "simple interest formula",
      "interest calculator",
      "calculate simple interest",
      "principal rate time calculator",
    ],
    icon: "Percent",
    howToUse: [
      "Enter the principal amount.",
      "Enter the annual interest rate.",
      "Enter the time in years.",
      "Click 'Calculate' to view the interest and total amount.",
    ],
  }),

  financeTool({
    id: "roi-calculator",
    name: "ROI Calculator",
    slug: "roi-calculator",
    description:
      "Calculate return on investment from an initial cost and final value.",
    longDescription:
      "Calculate return on investment by comparing an initial cost with the final value. The tool reports the net return and ROI percentage, making it useful for basic business, marketing, project, and investment comparisons.",
    keywords: [
      "ROI calculator",
      "return on investment calculator",
      "investment return calculator",
      "calculate ROI",
      "ROI percentage calculator",
      "business ROI calculator",
    ],
    icon: "ChartColumn",
    howToUse: [
      "Enter the initial cost or investment.",
      "Enter the final value.",
      "Click 'Calculate'.",
      "Review the net return and ROI percentage.",
    ],
  }),

  financeTool({
    id: "profit-margin-calculator",
    name: "Profit Margin Calculator",
    slug: "profit-margin-calculator",
    description:
      "Calculate profit and profit margin percentage from revenue and cost.",
    longDescription:
      "Calculate profit margin from total revenue and total cost. The calculator subtracts cost from revenue to determine profit, then expresses that profit as a percentage of revenue for quick pricing and business analysis.",
    keywords: [
      "profit margin calculator",
      "margin calculator",
      "profit percentage calculator",
      "business margin calculator",
      "calculate profit margin",
      "gross margin calculator",
    ],
    icon: "BadgeDollarSign",
    howToUse: [
      "Enter total revenue.",
      "Enter total cost.",
      "Click 'Calculate'.",
      "Review the profit amount and profit margin percentage.",
    ],
    faq: [
      {
        question: "How is profit margin calculated?",
        answer:
          "The calculator subtracts cost from revenue to get profit, then divides profit by revenue and multiplies by 100.",
      },
      {
        question: "Is profit margin the same as markup?",
        answer:
          "No. Margin is based on revenue or selling price, while markup is based on cost.",
      },
      {
        question: "Can the margin be negative?",
        answer:
          "Yes. If cost is greater than revenue, the calculated profit and margin will be negative.",
      },
    ],
  }),

  financeTool({
    id: "markup-calculator",
    name: "Markup Calculator",
    slug: "markup-calculator",
    description:
      "Calculate profit and markup percentage from cost and selling price.",
    longDescription:
      "Calculate markup by comparing the selling price with the original cost. The result shows the profit amount and the markup percentage relative to cost, which is useful for pricing products, services, and resale items.",
    keywords: [
      "markup calculator",
      "price markup calculator",
      "markup percentage calculator",
      "cost to selling price calculator",
      "calculate markup",
      "retail markup calculator",
    ],
    icon: "Tags",
    howToUse: [
      "Enter the original cost.",
      "Enter the selling price.",
      "Click 'Calculate'.",
      "Review the profit and markup percentage.",
    ],
    faq: [
      {
        question: "How is markup calculated?",
        answer:
          "Markup is calculated as selling price minus cost, divided by cost, then multiplied by 100.",
      },
      {
        question: "Is markup the same as profit margin?",
        answer:
          "No. Markup measures profit relative to cost, while margin measures profit relative to revenue or selling price.",
      },
      {
        question: "Can markup be negative?",
        answer:
          "Yes. A selling price below cost produces a negative markup.",
      },
    ],
  }),

  financeTool({
    id: "break-even-calculator",
    name: "Break-Even Calculator",
    slug: "break-even-calculator",
    description:
      "Calculate break-even units and revenue from fixed costs, unit price, and variable cost per unit.",
    longDescription:
      "Estimate the number of units that must be sold to cover fixed and variable costs. Enter fixed costs, selling price per unit, and variable cost per unit to calculate contribution margin, break-even units, and break-even revenue.",
    keywords: [
      "break even calculator",
      "break-even calculator",
      "break even point calculator",
      "business break even calculator",
      "break even units",
      "break even revenue",
    ],
    icon: "Scale",
    howToUse: [
      "Enter total fixed costs.",
      "Enter the selling price per unit.",
      "Enter the variable cost per unit.",
      "Calculate the contribution margin, break-even units, and estimated break-even revenue.",
    ],
  }),

  financeTool({
    id: "gross-profit-calculator",
    name: "Gross Profit Calculator",
    slug: "gross-profit-calculator",
    description:
      "Calculate gross profit and gross margin percentage from revenue and cost of goods sold.",
    longDescription:
      "Calculate gross profit by subtracting cost of goods sold from revenue. The tool also calculates gross margin as a percentage of revenue, making it useful for quick business, retail, and product profitability checks.",
    keywords: [
      "gross profit calculator",
      "gross margin calculator",
      "gross profit margin calculator",
      "COGS calculator",
      "revenue profit calculator",
      "calculate gross profit",
    ],
    icon: "CircleDollarSign",
    howToUse: [
      "Enter total revenue.",
      "Enter cost of goods sold.",
      "Click 'Calculate'.",
      "Review gross profit and gross margin percentage.",
    ],
  }),

  financeTool({
    id: "commission-calculator",
    name: "Commission Calculator",
    slug: "commission-calculator",
    description:
      "Calculate sales commission and total pay from sales amount, commission rate, and optional base pay.",
    longDescription:
      "Estimate commission earnings from a sales amount and commission percentage. Optionally include base pay to calculate combined total pay for a simple commission-plus-base compensation scenario.",
    keywords: [
      "commission calculator",
      "sales commission calculator",
      "commission percentage calculator",
      "commission pay calculator",
      "sales pay calculator",
      "calculate commission",
    ],
    icon: "HandCoins",
    howToUse: [
      "Enter the sales amount.",
      "Enter the commission rate.",
      "Optionally enter base pay.",
      "Click 'Calculate' to view commission and total pay.",
    ],
  }),

  financeTool({
    id: "cagr-calculator",
    name: "CAGR Calculator",
    slug: "cagr-calculator",
    description:
      "Calculate compound annual growth rate from beginning value, ending value, and number of years.",
    longDescription:
      "Calculate compound annual growth rate, or CAGR, to express the constant annual growth rate that would connect a beginning value to an ending value over a specified number of years.",
    keywords: [
      "CAGR calculator",
      "compound annual growth rate calculator",
      "annual growth rate calculator",
      "investment CAGR calculator",
      "business growth calculator",
      "calculate CAGR",
    ],
    icon: "ChartNoAxesCombined",
    howToUse: [
      "Enter the beginning value.",
      "Enter the ending value.",
      "Enter the number of years.",
      "Click 'Calculate' to see the CAGR percentage.",
    ],
    faq: [
      {
        question: "What does CAGR mean?",
        answer:
          "CAGR stands for compound annual growth rate. It represents the constant annual rate that would compound a beginning value into an ending value over the selected time.",
      },
      {
        question: "Does CAGR show year-by-year volatility?",
        answer:
          "No. CAGR smooths the change into one annualized rate and does not show the path or volatility between the beginning and ending values.",
      },
      {
        question: "Can CAGR predict future performance?",
        answer:
          "No. It describes the rate implied by the values entered and does not predict future results.",
      },
    ],
  }),

  financeTool({
    id: "hourly-to-salary-calculator",
    name: "Hourly to Salary Calculator",
    slug: "hourly-to-salary-calculator",
    description:
      "Convert an hourly pay rate to estimated weekly, monthly, and annual gross pay.",
    longDescription:
      "Convert an hourly rate into estimated weekly, monthly, and annual gross pay. You can adjust hours worked per week and weeks worked per year to match different schedules.",
    keywords: [
      "hourly to salary calculator",
      "hourly wage to salary",
      "hourly pay calculator",
      "annual salary from hourly rate",
      "hourly rate to yearly salary",
    ],
    icon: "Clock",
    howToUse: [
      "Enter the hourly pay rate.",
      "Enter hours worked per week or use 40.",
      "Enter weeks worked per year or use 52.",
      "Calculate the estimated weekly, monthly, and annual gross pay.",
    ],
  }),

  financeTool({
    id: "salary-to-hourly-calculator",
    name: "Salary to Hourly Calculator",
    slug: "salary-to-hourly-calculator",
    description:
      "Convert an annual salary to an estimated hourly rate, weekly pay, and monthly pay.",
    longDescription:
      "Convert annual gross salary into an estimated hourly rate using your expected hours per week and weeks per year. The calculator also displays approximate weekly and monthly gross pay.",
    keywords: [
      "salary to hourly calculator",
      "salary to hourly rate",
      "annual salary to hourly",
      "hourly wage from salary",
      "salary conversion calculator",
    ],
    icon: "Calculator",
    howToUse: [
      "Enter the annual salary.",
      "Enter hours worked per week or use 40.",
      "Enter weeks worked per year or use 52.",
      "Calculate the estimated hourly, weekly, and monthly gross pay.",
    ],
  }),

  financeTool({
    id: "savings-goal-calculator",
    name: "Savings Goal Calculator",
    slug: "savings-goal-calculator",
    description:
      "Estimate the monthly contribution needed to reach a savings goal within a chosen time.",
    longDescription:
      "Estimate how much you may need to contribute each month to reach a target savings balance. Enter the goal, current savings, annual interest rate, and time horizon to calculate the estimated monthly contribution, total contributions, and interest contribution.",
    keywords: [
      "savings goal calculator",
      "monthly savings calculator",
      "how much to save per month",
      "savings target calculator",
      "goal savings calculator",
      "savings plan calculator",
    ],
    icon: "PiggyBank",
    howToUse: [
      "Enter the target savings amount.",
      "Enter any initial savings.",
      "Enter an estimated annual interest rate, or use 0.",
      "Enter the number of years and calculate the estimated monthly contribution.",
    ],
    faq: [
      {
        question: "What happens if I enter a 0% interest rate?",
        answer:
          "The calculator divides the remaining savings goal across the selected number of months without assuming investment or account growth.",
      },
      {
        question: "Does the calculator guarantee I will reach the goal?",
        answer:
          "No. The result assumes the values entered remain consistent. Actual interest rates, returns, deposits, fees, taxes, and timing can change the outcome.",
      },
      {
        question: "What if my current savings could reach the target without more deposits?",
        answer:
          "If the entered starting savings and rate are sufficient to reach the target over the chosen period, the estimated required monthly contribution is shown as zero.",
      },
    ],
  }),
];