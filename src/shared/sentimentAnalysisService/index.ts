import { HttpRequest } from "@/shared/httpRequestService";
import { BadRequestError } from "@/shared/errors";
import { ISentimentAnalysisService, ISentimentApiResponse } from "./interfaces";
import { SentimentAnalysisError } from "./error";
import { AxiosError } from "axios";

export class SentimentAnalysisService implements ISentimentAnalysisService {
  private readonly apiUrl: string;
  private readonly httpRequest: HttpRequest;

  constructor(httpRequest: HttpRequest, apiUrl: string) {
    this.httpRequest = httpRequest;
    this.apiUrl = apiUrl;
  }

  public async analyzeText(
    content: string,
  ): Promise<"pos" | "neg" | "neutral"> {
    try {
      if (content.length > 80000) {
        throw new BadRequestError(
          "The text exceeds the 80.000 character limit.",
        );
      }

      const response = await this.httpRequest.post<ISentimentApiResponse>(
        this.apiUrl,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          data: new URLSearchParams({ text: content }).toString(),
        },
      );

      return response.data.label;
    } catch (error: unknown) {
      HttpRequest.handleError(error as Error | AxiosError, {
        CustomError: SentimentAnalysisError,
        className: this.constructor.name,
        functionName: this.analyzeText.name,
      });
    }
  }
}
