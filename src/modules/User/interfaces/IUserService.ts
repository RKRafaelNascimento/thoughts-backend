import { IUser } from ".";

export interface IUserService {
  getById(id: number): Promise<IUser | null>;
  countLimitedPostsAndRepostsTodayByUser(userId: number): Promise<number>;
}
