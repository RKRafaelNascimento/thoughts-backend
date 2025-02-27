import { IFollow } from ".";

export interface IFollowRepository {
  follow(followerId: number, followedId: number): Promise<IFollow>;
  isFollowing(followerId: number, followedId: number): Promise<IFollow | null>;
}
