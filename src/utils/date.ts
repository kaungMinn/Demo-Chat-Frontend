import { parse } from "date-fns";
import { format, toZonedTime } from "date-fns-tz";
import moment from "moment";

function toReadableDate(date?: string) {
  if (!date) {
    return "Date not found";
  }
  // // 1. Define the inputs
  const dateString = date; // e.g., "2024/11/05 10:30 AM"
  const parseFormat = "yyyy/MM/dd h:mm a"; // Note: date-fns uses 'a' for AM/PM
  const targetTimeZone = "Asia/Yangon";
  const outputFormat = "yyyy/MM/dd h:mm a";

  // 2. Parse the input string as UTC
  // The start date 'new Date(0)' is a required placeholder for `parse`
  const utcDate = parse(dateString, parseFormat, new Date(0));

  // 3. Convert the UTC date object to the target timezone
  const zonedDate = toZonedTime(utcDate, targetTimeZone);

  // 4. Format the result in the target timezone
  const formattedTime = format(
    zonedDate,
    outputFormat,
    { timeZone: targetTimeZone }, // Pass the timeZone option to format
  );

  return formattedTime;
}

function hydrateDate(date: string) {
  return date
    ? moment(date).format(
        "YYYY-MM-DD hh:mm:ss a",
      )
    : "------";
}

function isoToCustom(date: string | Date) {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  // 'yyyy-MM-dd HH:mm' uses local time by default
  return format(dateObj, "yyyy-MM-dd HH:mm:ss");
}

export const DateUtils = { toReadableDate, hydrateDate, isoToCustom };
