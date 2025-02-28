import { IUserService } from "@/modules/User/interfaces";
import { IFollow, IFollowRepository, IFollowService } from "./interfaces";
import { BadRequestError, ConflictError, NotFoundError } from "@/shared/errors";
import { FollowErrorCode } from "./error";

export class FollowService implements IFollowService {
  constructor(
    private followRepository: IFollowRepository,
    private userService: IUserService,
  ) {}

  async follow(followerId: number, followedId: number): Promise<IFollow> {
    const { isFollowing } = await this.validateFollowAction(
      followerId,
      followedId,
    );

    if (isFollowing) {
      throw new ConflictError(
        "You already follow this user",
        FollowErrorCode.ALREADY_FOLLOW_USER,
      );
    }

    return this.followRepository.follow(followerId, followedId);
  }

  async isFollowing(followerId: number, followedId: number): Promise<boolean> {
    const isFollowing = await this.followRepository.isFollowing(
      followerId,
      followedId,
    );

    return !!isFollowing;
  }

  async unfollow(followerId: number, followedId: number): Promise<void> {
    const { isFollowing } = await this.validateFollowAction(
      followerId,
      followedId,
    );

    if (!isFollowing) {
      throw new ConflictError(
        "You do not follow this user",
        FollowErrorCode.YOU_NOT_FOLLOW_USER,
      );
    }

    this.followRepository.unfollow(followerId, followedId);
  }

  async validateFollowAction(
    followerId: number,
    followedId: number,
  ): Promise<{ isFollowing: boolean }> {
    if (followerId === followedId) {
      throw new BadRequestError(
        "You cannot follow or unfollow yourself.",
        FollowErrorCode.YOU_CANNOT_UNFOLLOW_OR_FOLLOW_YOURSELF,
      );
    }

    const follower = await this.userService.getById(followerId);
    if (!follower) {
      throw new NotFoundError(
        "Follower not found",
        FollowErrorCode.FOLLOWER_NOT_FOUND,
      );
    }

    const followed = await this.userService.getById(followedId);

    if (!followed) {
      throw new NotFoundError(
        "Followed not found",
        FollowErrorCode.FOLLOWED_NOT_FOUND,
      );
    }

    const isFollowing = await this.isFollowing(followerId, followedId);

    return { isFollowing };
  }
}
