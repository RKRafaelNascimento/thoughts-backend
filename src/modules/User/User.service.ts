import { DateHelper } from "@/shared/dateHelper";
import {
  IUser,
  IUserService,
  IUserRepository,
  IUserProfile,
} from "./interfaces";

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

  async getUserProfile(userId: number): Promise<IUserProfile | null> {
    const user = await this.userRepository.getUserProfile(userId);

    return user
      ? {
          id: user.id,
          username: user.username,
          joinedAt: DateHelper.format(user.createdAt),
          followersCount: user._count.followers,
          followingCount: user._count.following,
          totalPosts: (user._count.Post ?? 0) + (user._count.Repost ?? 0),
        }
      : null;
  }
}
