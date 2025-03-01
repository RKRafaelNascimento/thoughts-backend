import { startOfDay, endOfDay } from "date-fns";

export class DateHelper {
  static getStartOfDay(date: Date): Date {
    return startOfDay(date);
  }

  static getEndOfDay(date: Date): Date {
    return endOfDay(date);
  }
}
