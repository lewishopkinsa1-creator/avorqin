export type BusinessDaysResult = {
  calendarDays: number;
  businessDays: number;
  weekendDays: number;
};

export type HoursResult = {
  grossMinutes: number;
  breakMinutes: number;
  netMinutes: number;
  decimalHours: number;
  hours: number;
  minutes: number;
};

export type DateAdjustment = {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
};

export type TimeDurationResult = {
  totalMilliseconds: number;
  totalSeconds: number;
  totalMinutes: number;
  totalHours: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export type TimeZoneConversionResult = {
  instant: Date;
  sourceTimeZone: string;
  targetTimeZone: string;
  sourceFormatted: string;
  targetFormatted: string;
};

function assertValidDate(date: Date, label: string): Date {
  if (Number.isNaN(date.getTime())) {
    throw new Error(`${label} must be a valid date and time.`);
  }

  return date;
}

function parseDateOnly(value: string, label: string): Date {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`Enter a valid ${label}.`);
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    throw new Error(`Enter a valid ${label}.`);
  }

  return date;
}

function parseClockTime(value: string, label: string): number {
  const match = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(value.trim());

  if (!match) {
    throw new Error(`${label} must use HH:MM or HH:MM:SS.`);
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  const seconds = Number(match[3] ?? 0);

  if (
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59 ||
    seconds < 0 ||
    seconds > 59
  ) {
    throw new Error(`${label} contains an invalid time.`);
  }

  return hours * 60 + minutes + seconds / 60;
}

function daysBetween(start: Date, end: Date): number {
  const startUtc = Date.UTC(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );
  const endUtc = Date.UTC(
    end.getFullYear(),
    end.getMonth(),
    end.getDate()
  );

  return Math.round((endUtc - startUtc) / 86_400_000);
}

export function calculateBusinessDays(
  startValue: string,
  endValue: string,
  includeEndDate = true
): BusinessDaysResult {
  const start = parseDateOnly(startValue, "start date");
  const end = parseDateOnly(endValue, "end date");

  if (end < start) {
    throw new Error("End date must be on or after the start date.");
  }

  const difference = daysBetween(start, end);
  const calendarDays = difference + (includeEndDate ? 1 : 0);

  let businessDays = 0;
  let weekendDays = 0;

  for (let offset = 0; offset < calendarDays; offset += 1) {
    const current = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate() + offset
    );

    const day = current.getDay();

    if (day === 0 || day === 6) {
      weekendDays += 1;
    } else {
      businessDays += 1;
    }
  }

  return {
    calendarDays,
    businessDays,
    weekendDays,
  };
}

export function calculateWorkHours(
  startTime: string,
  endTime: string,
  breakMinutes = 0
): HoursResult {
  const start = parseClockTime(startTime, "Start time");
  let end = parseClockTime(endTime, "End time");

  if (!Number.isFinite(breakMinutes) || breakMinutes < 0) {
    throw new Error("Break minutes cannot be negative.");
  }

  if (end < start) {
    end += 24 * 60;
  }

  const grossMinutes = end - start;

  if (breakMinutes > grossMinutes) {
    throw new Error("Break time cannot be longer than the total time worked.");
  }

  const netMinutes = grossMinutes - breakMinutes;
  const wholeMinutes = Math.round(netMinutes);

  return {
    grossMinutes,
    breakMinutes,
    netMinutes,
    decimalHours: netMinutes / 60,
    hours: Math.floor(wholeMinutes / 60),
    minutes: wholeMinutes % 60,
  };
}

export function adjustDate(
  dateValue: string,
  adjustment: DateAdjustment,
  operation: "add" | "subtract" = "add"
): Date {
  const date = parseDateOnly(dateValue, "date");
  const sign = operation === "add" ? 1 : -1;

  const years = adjustment.years ?? 0;
  const months = adjustment.months ?? 0;
  const weeks = adjustment.weeks ?? 0;
  const days = adjustment.days ?? 0;

  for (const [value, label] of [
    [years, "Years"],
    [months, "Months"],
    [weeks, "Weeks"],
    [days, "Days"],
  ] as const) {
    if (!Number.isFinite(value) || !Number.isInteger(value)) {
      throw new Error(`${label} must be a whole number.`);
    }
  }

  const originalDay = date.getDate();

  if (years !== 0 || months !== 0) {
    date.setDate(1);
    date.setFullYear(date.getFullYear() + sign * years);
    date.setMonth(date.getMonth() + sign * months);

    const lastDayOfTargetMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    date.setDate(Math.min(originalDay, lastDayOfTargetMonth));
  }

  date.setDate(
    date.getDate() + sign * (weeks * 7 + days)
  );

  return date;
}

function parseDateTimeLocal(value: string): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
} {
  const match =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(
      value.trim()
    );

  if (!match) {
    throw new Error("Enter a valid date and time.");
  }

  const parts = {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
    hour: Number(match[4]),
    minute: Number(match[5]),
    second: Number(match[6] ?? 0),
  };

  const testDate = new Date(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  );

  if (
    testDate.getFullYear() !== parts.year ||
    testDate.getMonth() !== parts.month - 1 ||
    testDate.getDate() !== parts.day ||
    testDate.getHours() !== parts.hour ||
    testDate.getMinutes() !== parts.minute ||
    testDate.getSeconds() !== parts.second
  ) {
    throw new Error("Enter a valid date and time.");
  }

  return parts;
}

function getZonedParts(date: Date, timeZone: string) {
  let formatter: Intl.DateTimeFormat;

  try {
    formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    });
  } catch {
    throw new Error("Select a valid time zone.");
  }

  const values: Record<string, number> = {};

  for (const part of formatter.formatToParts(date)) {
    if (part.type !== "literal") {
      const numeric = Number(part.value);

      if (Number.isFinite(numeric)) {
        values[part.type] = numeric;
      }
    }
  }

  return {
    year: values.year,
    month: values.month,
    day: values.day,
    hour: values.hour,
    minute: values.minute,
    second: values.second,
  };
}

function zonedDateTimeToUtc(
  value: string,
  timeZone: string
): Date {
  const desired = parseDateTimeLocal(value);

  let utcMs = Date.UTC(
    desired.year,
    desired.month - 1,
    desired.day,
    desired.hour,
    desired.minute,
    desired.second
  );

  /*
   * Iterate because the UTC offset for an IANA zone depends on the instant,
   * especially around daylight-saving transitions.
   */
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const candidate = new Date(utcMs);
    const actual = getZonedParts(candidate, timeZone);

    const desiredAsUtc = Date.UTC(
      desired.year,
      desired.month - 1,
      desired.day,
      desired.hour,
      desired.minute,
      desired.second
    );

    const actualAsUtc = Date.UTC(
      actual.year,
      actual.month - 1,
      actual.day,
      actual.hour,
      actual.minute,
      actual.second
    );

    const difference = desiredAsUtc - actualAsUtc;

    if (difference === 0) {
      return candidate;
    }

    utcMs += difference;
  }

  const finalDate = new Date(utcMs);
  const finalParts = getZonedParts(finalDate, timeZone);

  const matches =
    finalParts.year === desired.year &&
    finalParts.month === desired.month &&
    finalParts.day === desired.day &&
    finalParts.hour === desired.hour &&
    finalParts.minute === desired.minute &&
    finalParts.second === desired.second;

  if (!matches) {
    throw new Error(
      "That local time may not exist because of a daylight-saving time change. Try another time."
    );
  }

  return finalDate;
}

function formatInTimeZone(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

export function convertTimeZone(
  dateTimeValue: string,
  sourceTimeZone: string,
  targetTimeZone: string
): TimeZoneConversionResult {
  if (!sourceTimeZone || !targetTimeZone) {
    throw new Error("Select both a source and target time zone.");
  }

  const instant = zonedDateTimeToUtc(
    dateTimeValue,
    sourceTimeZone
  );

  return {
    instant,
    sourceTimeZone,
    targetTimeZone,
    sourceFormatted: formatInTimeZone(instant, sourceTimeZone),
    targetFormatted: formatInTimeZone(instant, targetTimeZone),
  };
}

export function calculateTimeDuration(
  startValue: string,
  endValue: string
): TimeDurationResult {
  const start = assertValidDate(
    new Date(startValue),
    "Start date and time"
  );
  const end = assertValidDate(
    new Date(endValue),
    "End date and time"
  );

  if (end < start) {
    throw new Error(
      "End date and time must be after the start date and time."
    );
  }

  const totalMilliseconds = end.getTime() - start.getTime();
  const totalSeconds = totalMilliseconds / 1000;
  const totalMinutes = totalSeconds / 60;
  const totalHours = totalMinutes / 60;

  let remainingSeconds = Math.floor(totalSeconds);

  const days = Math.floor(remainingSeconds / 86_400);
  remainingSeconds %= 86_400;

  const hours = Math.floor(remainingSeconds / 3_600);
  remainingSeconds %= 3_600;

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  return {
    totalMilliseconds,
    totalSeconds,
    totalMinutes,
    totalHours,
    days,
    hours,
    minutes,
    seconds,
  };
}

export function formatDateOnly(date: Date): string {
  assertValidDate(date, "Date");

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);
}

export const commonTimeZones = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Phoenix",
  "America/Anchorage",
  "Pacific/Honolulu",
  "America/Toronto",
  "America/Vancouver",
  "America/Mexico_City",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Madrid",
  "Europe/Rome",
  "Europe/Amsterdam",
  "Europe/Athens",
  "Europe/Moscow",
  "Africa/Cairo",
  "Africa/Johannesburg",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Bangkok",
  "Asia/Singapore",
  "Asia/Hong_Kong",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "Asia/Seoul",
  "Australia/Perth",
  "Australia/Adelaide",
  "Australia/Sydney",
  "Pacific/Auckland",
] as const;