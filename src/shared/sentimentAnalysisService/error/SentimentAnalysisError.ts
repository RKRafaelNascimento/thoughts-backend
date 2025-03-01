export class SentimentAnalysisError extends Error {
  constructor(message: unknown) {
    const internalMessage =
      "Unexpected error returned by the sentimentAnalysisService: ";
    super(`${internalMessage}:${message}`);
  }
}
