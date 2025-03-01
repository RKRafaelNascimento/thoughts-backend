import { IRepost } from ".";

export interface IRepostService {
  create(
    repost: Omit<IRepost, "id" | "createdAt" | "sentiment">,
  ): Promise<IRepost>;
  checkAlreadyRepost(userId: number, originalPostId: number): Promise<boolean>;
}
