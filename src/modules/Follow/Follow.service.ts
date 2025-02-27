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
    if (followerId === followedId) {
      throw new BadRequestError(
        "You cannot follow yourself",
        FollowErrorCode.YOU_CANNOT_FOLLOW_YOURSELF,
      );
    }

    const follower = await this.userService.getById(followerId);

    if (!follower) {
      throw new NotFoundError(
        "Follower not found",
        FollowErrorCode.YOU_CANNOT_FOLLOW_YOURSELF,
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
}
