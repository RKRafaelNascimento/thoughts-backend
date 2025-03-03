import { startOfDay, endOfDay, format } from "date-fns";

export class DateHelper {
  static getStartOfDay(date: Date): Date {
    return startOfDay(date);
  }

  static getEndOfDay(date: Date): Date {
    return endOfDay(date);
  }

  static format(date: Date): string {
    return format(date, "dd/MM/yyyy");
  }
}
