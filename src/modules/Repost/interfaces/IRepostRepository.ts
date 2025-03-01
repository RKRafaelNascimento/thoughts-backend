import { IRepost } from ".";

export interface IRepostRepository {
  create(repost: Omit<IRepost, "id" | "createdAt">): Promise<IRepost>;
  getRepostByOriginalAndUserId(
    userId: number,
    originalPostId: number,
  ): Promise<IRepost | null>;
}
