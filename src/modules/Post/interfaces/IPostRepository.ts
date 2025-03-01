import { IPost } from "./IPost";

export interface IPostRepository {
  create(post: Omit<IPost, "id" | "createdAt">): Promise<IPost>;
  getById(id: number): Promise<IPost | null>;
}
