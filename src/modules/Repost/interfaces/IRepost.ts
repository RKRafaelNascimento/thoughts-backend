export interface IRepost {
  id: number;
  userId: number;
  originalPostId: number;
  content?: string | null;
  sentiment?: "pos" | "neg" | "neutral" | null;
  createdAt: Date;
}
