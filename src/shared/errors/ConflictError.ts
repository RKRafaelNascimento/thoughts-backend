import { IValidationError } from "../validator/interfaces";
import { HttpError } from "./HttpError";

export class ConflictError extends HttpError {
  constructor(
    description = "Conflict",
    code = "GENERIC_ERROR",
    validationErrors?: IValidationError[],
  ) {
    super(description, "CONFLICT", code, validationErrors);
  }
}
