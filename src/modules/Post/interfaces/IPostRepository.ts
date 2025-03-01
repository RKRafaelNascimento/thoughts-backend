import { IPost } from "./IPost";

export interface IPostRepository {
  create(post: Omit<IPost, "id" | "createdAt">): Promise<IPost>;
  countPostsTodayByUser(userId: number): Promise<number>;
}
