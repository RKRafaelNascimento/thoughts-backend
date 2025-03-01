import { IUser, IUserService, IUserRepository } from "./interfaces";

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async getById(id: number): Promise<IUser | null> {
    return this.userRepository.getById(id);
  }

  async countLimitedPostsAndRepostsTodayByUser(
    userId: number,
  ): Promise<number> {
    const [postsAndReposts] =
      await this.userRepository.countLimitedPostsAndRepostsTodayByUser(userId);

    const postCount = postsAndReposts?.Post.length ?? 0;
    const repostCount = postsAndReposts?.Repost.length ?? 0;

    return postCount + repostCount;
  }
}
