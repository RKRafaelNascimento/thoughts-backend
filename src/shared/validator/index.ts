import { ValidationError, Schema } from "joi";
import { IValidationError, IValidatorService } from "./interfaces";

export class ValidatorService implements IValidatorService {
  private static instance: IValidatorService;

  public static getInstance(): ValidatorService {
    if (!ValidatorService.instance) {
      ValidatorService.instance = new ValidatorService();
    }
    return ValidatorService.instance;
  }

  validate<T>(
    schema: Schema<T>,
    data: T,
  ): { error?: ValidationError; value: T } {
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
    return { error, value };
  }
  formatErrorMessage(error: ValidationError): IValidationError[] {
    return error.details.map((detail) => ({
      fieldName: detail.context?.label || "",
      message: detail.message,
    }));
  }
}
