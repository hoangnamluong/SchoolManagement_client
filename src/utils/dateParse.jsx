import { isValid, format } from "date-fns";
import { enGB } from "date-fns/locale";

function dateParsedShortDate(date) {
  if (!date) return;

  const parsedDate = Date.parse(date);

  if (!isValid(parsedDate)) return "Invalid";

  const formattedDate = format(parsedDate, "dd-MMM-yyyy");

  return formattedDate;
}

function dateParsedLongDateTime(date) {
  if (!date) return;

  const parsedDate = Date.parse(date);

  if (!isValid(parsedDate)) return "Invalid";

  const formattedDate = format(parsedDate, "EEEE, do-MMMM-yyyy, hh:mm:ss aa");

  return formattedDate;
}

export { dateParsedShortDate, dateParsedLongDateTime };
