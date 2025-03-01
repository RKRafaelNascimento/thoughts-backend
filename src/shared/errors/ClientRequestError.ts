import { InternalServerError } from ".";

export class ClientRequestError extends InternalServerError {
  constructor(message: string, className: string, method: string) {
    const internalMessage = `Unexpected error when trying to communicate to ${className} method: ${method}`;
    super(`${internalMessage}: ${message}`);
  }
}
