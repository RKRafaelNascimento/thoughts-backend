import { IValidationError } from "@/shared/validator/interfaces";

export interface IErrorResponse {
  description: string;
  statusCode: number;
  statusCodeAsString: string;
  code: string;
  validationErrors?: IValidationError[];
}

export interface ISucessResponse<T> {
  statusCode?: number;
  data?: T;
}
