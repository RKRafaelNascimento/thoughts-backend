import { Schema, ValidationError } from "joi";
import { IValidationError } from ".";

export interface IValidatorService {
  validate<T>(
    schema: Schema<T>,
    data: T,
  ): { error?: ValidationError; value: T };
  formatErrorMessage(error: ValidationError): IValidationError[];
}
