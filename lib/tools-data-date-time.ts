import { ToolConfig } from "@/types";

const dateTimeFaq = [
  {
    question: "Are these date and time calculations performed in my browser?",
    answer:
      "Yes. Avorqin performs these calculations locally in your browser and does not need to send the values you enter to an external calculation service.",
  },
  {
    question: "Do these tools automatically account for public holidays?",
    answer:
      "No. The business days calculator excludes Saturdays and Sundays but does not automatically remove public or company holidays.",
  },
  {
    question: "Do I need an account to use these tools?",
    answer:
      "No. Avorqin date and time tools can be used without creating an account.",
  },
];

function dateTimeTool(
  config: Omit<ToolConfig, "category" | "faq"> & {
    faq?: ToolConfig["faq"];
  }
): ToolConfig {
  return {
    ...config,
    category: "Date & Time",
    faq: config.faq ?? dateTimeFaq,
  };
}

export const dateTimeTools: ToolConfig[] = [
  dateTimeTool({
    id: "business-days-calculator",
    name: "Business Days Calculator",
    slug: "business-days-calculator",
    description:
      "Count business days between two dates while excluding Saturdays and Sundays.",
    longDescription:
      "Calculate the number of business days between two calendar dates. The calculator excludes Saturdays and Sundays, reports the number of weekend days in the range, and lets you choose whether the end date should be included in the count.",
    keywords: [
      "business days calculator",
      "working days calculator",
      "work days between dates",
      "weekday calculator",
      "business day counter",
      "days excluding weekends",
    ],
    icon: "BriefcaseBusiness",
    howToUse: [
      "Choose a start date.",
      "Choose an end date.",
      "Select whether the end date should be included.",
      "Click 'Calculate' to see business days, weekend days, and calendar days counted.",
    ],
    faq: [
      {
        question: "What days are treated as business days?",
        answer:
          "Monday through Friday are treated as business days. Saturdays and Sundays are excluded.",
      },
      {
        question: "Are public holidays excluded?",
        answer:
          "No. Public, federal, bank, regional, and company holidays are not automatically excluded.",
      },
      {
        question: "Can I include the end date?",
        answer:
          "Yes. Use the checkbox to choose whether the ending date is included in the calculation.",
      },
    ],
  }),

  dateTimeTool({
    id: "hours-calculator",
    name: "Hours Calculator",
    slug: "hours-calculator",
    description:
      "Calculate hours and minutes between two times with an optional break deduction.",
    longDescription:
      "Calculate elapsed work time between a start time and end time. The calculator can deduct a break in minutes and reports the result as hours and minutes, decimal hours, and total net minutes. If the end time is earlier than the start time, it is treated as occurring on the following day.",
    keywords: [
      "hours calculator",
      "work hours calculator",
      "time card calculator",
      "hours between times",
      "decimal hours calculator",
      "shift hours calculator",
    ],
    icon: "Clock3",
    howToUse: [
      "Enter the start time.",
      "Enter the end time.",
      "Optionally enter a break duration in minutes.",
      "Click 'Calculate' to see the net duration in hours, minutes, and decimal hours.",
    ],
    faq: [
      {
        question: "Can the calculator handle an overnight shift?",
        answer:
          "Yes. If the end time is earlier than the start time, the calculator treats the end time as occurring the next day.",
      },
      {
        question: "How is break time handled?",
        answer:
          "The break duration you enter in minutes is subtracted from the total elapsed time.",
      },
      {
        question: "What are decimal hours?",
        answer:
          "Decimal hours express minutes as a fraction of an hour. For example, 30 minutes equals 0.5 hours.",
      },
    ],
  }),

  dateTimeTool({
    id: "date-add-subtract-calculator",
    name: "Date Add/Subtract Calculator",
    slug: "date-add-subtract-calculator",
    description:
      "Add or subtract years, months, weeks, and days from a date.",
    longDescription:
      "Add or subtract calendar time from a starting date. Enter any combination of years, months, weeks, and days to calculate the resulting date. Month and year adjustments preserve the original day where possible and use the final valid day when the target month is shorter.",
    keywords: [
      "date add subtract calculator",
      "add days to date",
      "subtract days from date",
      "date calculator",
      "add months to date",
      "subtract months from date",
      "future date calculator",
    ],
    icon: "CalendarDays",
    howToUse: [
      "Choose the starting date.",
      "Select whether to add or subtract time.",
      "Enter any combination of years, months, weeks, and days.",
      "Click 'Calculate' to see the resulting date.",
    ],
    faq: [
      {
        question: "What happens when adding a month to a date near the end of the month?",
        answer:
          "If the target month has fewer days, the calculator uses the last valid day of that target month.",
      },
      {
        question: "Can I add years and days at the same time?",
        answer:
          "Yes. You can combine years, months, weeks, and days in one calculation.",
      },
      {
        question: "Can I subtract dates with this tool?",
        answer:
          "This tool subtracts a specified amount of calendar time from one starting date. For the duration between two dates and times, use the Time Duration Calculator.",
      },
    ],
  }),

  dateTimeTool({
    id: "timezone-converter",
    name: "Timezone Converter",
    slug: "timezone-converter",
    description:
      "Convert a date and time between common IANA time zones with daylight-saving-aware offsets.",
    longDescription:
      "Convert a local date and time from one time zone to another using browser-native IANA time-zone data. The converter supports common zones across North America, Europe, Asia, Africa, Australia, and the Pacific and applies the offset that corresponds to the selected date, including applicable daylight-saving changes.",
    keywords: [
      "timezone converter",
      "time zone converter",
      "convert time zones",
      "EST to PST converter",
      "UTC time converter",
      "world time converter",
      "date time zone converter",
    ],
    icon: "Globe2",
    howToUse: [
      "Enter the local date and time you want to convert.",
      "Choose the source time zone.",
      "Choose the target time zone.",
      "Click 'Calculate' to see the source and converted local times.",
    ],
    faq: [
      {
        question: "Does the timezone converter account for daylight saving time?",
        answer:
          "Yes. It uses the browser's IANA time-zone data and applies the offset associated with the selected date and zone.",
      },
      {
        question: "Why can some local times be invalid?",
        answer:
          "During a daylight-saving clock change, some local clock times may not exist. The tool reports an error when it detects a nonexistent local time.",
      },
      {
        question: "Does this require an online time API?",
        answer:
          "No. The conversion uses time-zone support built into the browser.",
      },
    ],
  }),

  dateTimeTool({
    id: "time-duration-calculator",
    name: "Time Duration Calculator",
    slug: "time-duration-calculator",
    description:
      "Calculate the exact duration between two dates and times in days, hours, minutes, and seconds.",
    longDescription:
      "Calculate elapsed time between a starting date and time and an ending date and time. The tool shows a combined duration in days, hours, minutes, and seconds as well as total hours, total minutes, and total seconds.",
    keywords: [
      "time duration calculator",
      "time difference calculator",
      "hours between dates",
      "duration between times",
      "elapsed time calculator",
      "date time difference calculator",
    ],
    icon: "Timer",
    howToUse: [
      "Enter the starting date and time.",
      "Enter the ending date and time.",
      "Click 'Calculate'.",
      "Review the duration in days, hours, minutes, seconds, and total-unit formats.",
    ],
    faq: [
      {
        question: "What does the Time Duration Calculator measure?",
        answer:
          "It measures the elapsed time from the starting date and time to the ending date and time.",
      },
      {
        question: "Can the result span multiple days?",
        answer:
          "Yes. The result can include any number of whole days plus remaining hours, minutes, and seconds.",
      },
      {
        question: "Can the end time be earlier than the start time?",
        answer:
          "The ending date and time must occur after the starting date and time. Otherwise the calculator returns an error.",
      },
    ],
  }),
];