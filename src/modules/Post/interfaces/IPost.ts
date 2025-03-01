export interface IPost {
  id: number;
  userId: number;
  content: string;
  sentiment: "pos" | "neg" | "neutral";
  createdAt: Date;
}
