export interface ISentimentAnalysisService {
  analyzeText(content: string): Promise<"pos" | "neg" | "neutral">;
}
