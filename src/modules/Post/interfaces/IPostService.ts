import { IPost } from "./IPost";

export interface IPostService {
  create(post: Omit<IPost, "id" | "createdAt" | "sentiment">): Promise<IPost>;
}
