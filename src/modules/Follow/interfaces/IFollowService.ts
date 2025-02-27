import { IFollow } from ".";

export interface IFollowService {
  follow(followerId: number, followedId: number): Promise<IFollow>;
  isFollowing(followerId: number, followedId: number): Promise<boolean>;
}
