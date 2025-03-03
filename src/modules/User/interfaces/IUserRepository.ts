import { IPostsAndReposts, IUser, IUserWithCount } from ".";

export interface IUserRepository {
  getById(id: number): Promise<IUser | null>;
  countLimitedPostsAndRepostsTodayByUser(
    userId: number,
  ): Promise<IPostsAndReposts[]>;
  getUserProfile(userId: number): Promise<IUserWithCount | null>;
}
