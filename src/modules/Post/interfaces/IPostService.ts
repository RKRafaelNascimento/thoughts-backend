import { IPost } from "./IPost";
import { IPostAndReposts } from "./IPostAndReposts";

export interface IPostService {
  create(post: Omit<IPost, "id" | "createdAt" | "sentiment">): Promise<IPost>;
  getById(id: number): Promise<IPost | null>;
  getFeed(
    skip: number,
    take: number,
    userId?: number,
    isFollowing?: boolean,
  ): Promise<IPostAndReposts[]>;
  getPostsByUserId(
    skip: number,
    take: number,
    userId: number,
  ): Promise<IPostAndReposts[]>;
}
