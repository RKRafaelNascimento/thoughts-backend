import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosError,
} from "axios";
import { ClientRequestError } from "@/shared/errors";
import { Logger } from "@/shared/logger";
import { ILogger } from "../logger/interfaces";

/**
 * Enum for HTTP methods.
 */
export enum Methods {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

/**
 * Interface for HTTP request options, extending Axios configuration.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IRequestOptions
  extends Omit<AxiosRequestConfig, "method" | "url"> {}

export class HttpRequest {
  private readonly request: AxiosInstance;

  /**
   * @constructor
   * @param {ILogger} logger The logger that will be used on the request instance.
   * @param {AxiosInstance} request The Axios instance that will be used for HTTP requests.
   */
  constructor(
    private readonly logger: ILogger = Logger.getInstance(),
    requestInstance?: AxiosInstance,
  ) {
    this.request = requestInstance ?? axios.create();
  }

  /**
   * Method to make a GET request.
   */
  public async get<T>(
    url: string | URL,
    options: IRequestOptions,
  ): Promise<AxiosResponse<T>> {
    this.loggerInfo(url, options);
    return this.request.get<T>(url.toString(), options);
  }

  /**
   * Method to make a POST request.
   */
  public async post<T>(
    url: string | URL,
    options: IRequestOptions,
  ): Promise<AxiosResponse<T>> {
    this.loggerInfo(url, options);
    return this.request.post<T>(url.toString(), options.data, options);
  }

  /**
   * Method to make a PATCH request.
   */
  public async patch<T>(
    url: string | URL,
    options: IRequestOptions,
  ): Promise<AxiosResponse<T>> {
    this.loggerInfo(url, options);
    return this.request.patch<T>(url.toString(), options.data, options);
  }

  /**
   * Method to make a PUT request.
   */
  public async put<T>(
    url: string | URL,
    options: IRequestOptions,
  ): Promise<AxiosResponse<T>> {
    this.loggerInfo(url, options);
    return this.request.put<T>(url.toString(), options.data, options);
  }

  /**
   * Generic request method.
   */
  public async req<T>(
    options: IRequestOptions & { url: string; method: Methods },
  ): Promise<AxiosResponse<T>> {
    this.loggerInfo(options.url, options);
    return this.request.request<T>(options);
  }

  /**
   * Method to check if an error is a request error or a generic exception.
   */
  public static isRequestError(error: unknown): error is AxiosError {
    return axios.isAxiosError(error);
  }

  /**
   * Method to handle request errors and classify them accordingly.
   */
  public static handleError<T = unknown>(
    thrownError: Error | AxiosError,
    {
      CustomError,
      className,
      functionName,
    }: {
      CustomError: new (...args: unknown[]) => T;
      className: string;
      functionName: string;
    },
  ): never {
    if (HttpRequest.isRequestError(thrownError) && thrownError.response) {
      const { data, status } = thrownError.response;
      const msg = `${data} code: ${status} method: ${functionName}`;
      throw new CustomError(msg);
    }

    throw new ClientRequestError(thrownError.message, className, functionName);
  }

  /**
   * Logs request information.
   */
  private loggerInfo(url: string | URL, options: IRequestOptions): void {
    this.logger.info({
      msg: "Request",
      url: String(url),
      options: JSON.stringify(options),
    });
  }
}
