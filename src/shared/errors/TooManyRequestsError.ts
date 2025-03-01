import { HttpError } from "./HttpError";

export class TooManyRequestsError extends HttpError {
  constructor(
    public description = "Too many requests. Please try again later.",
    code = "RATE_LIMIT_EXCEEDED",
  ) {
    super(description, "TOO_MANY_REQUESTS", code);
  }
}
