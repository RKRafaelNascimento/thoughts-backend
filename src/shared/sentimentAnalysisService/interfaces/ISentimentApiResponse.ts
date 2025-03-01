export interface ISentimentApiResponse {
  label: "pos" | "neg" | "neutral";
  probability: {
    pos: number;
    neg: number;
    neutral: number;
  };
}
