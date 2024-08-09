import { format, getTime, formatDistanceToNow, parse } from "date-fns";
import { Timestamp } from "firebase/firestore";

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || "dd MMM yyyy";

  return date ? format(new Date(date.toDate()), fm) : "";
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || "dd MMM yyyy p";

  return date ? format(new Date(date), fm) : "";
}

export function fTimestamp(date) {
  console.log(date.toDate());
  return date ? getTime(new Date(date.toDate())) : "";
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : "";
}

export const convertToTimestamp = (dateString) => {
  // Parse the date string to a Date object
  const parsedDate = parse(dateString, "dd MMM yyyy", new Date());

  // Convert to Firestore Timestamp
  const timestamp = Timestamp.fromDate(parsedDate);

  return timestamp;
};

export const convertFromTimestamp = (dateString) => {
  const exampleTimestamp = Timestamp.fromDate(new Date("2024-08-12"));

  return timestamp;
};
