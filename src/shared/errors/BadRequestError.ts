import { IValidationError } from "../validator/interfaces";
import { HttpError } from "./HttpError";

export class BadRequestError extends HttpError {
  constructor(
    description = "Missing or invalid param",
    code = "GENERIC_ERROR",
    validationErrors?: IValidationError[],
  ) {
    super(description, "BAD_REQUEST", code, validationErrors);
  }
}
