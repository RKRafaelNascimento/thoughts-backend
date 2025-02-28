import { FollowService } from "@/modules/Follow/Follow.service";
import { IUserService } from "@/modules/User/interfaces";
import { IFollowRepository } from "@/modules/Follow/interfaces";
import { BadRequestError, ConflictError, NotFoundError } from "@/shared/errors";
import { FollowErrorCode } from "@/modules/Follow/error";

let followRepositoryMock: jest.Mocked<IFollowRepository>;
let userServiceMock: jest.Mocked<IUserService>;
let followService: FollowService;

const mockFollower = { id: 1, username: "user1", createdAt: new Date() };
const mockFollowed = { id: 2, username: "user2", createdAt: new Date() };
const mockFollow = {
  id: 1,
  followerId: 1,
  followedId: 2,
  createdAt: new Date(),
};

beforeAll(() => {
  followRepositoryMock = {
    follow: jest.fn(),
    unfollow: jest.fn(),
    isFollowing: jest.fn(),
  };

  userServiceMock = {
    getById: jest.fn(),
  };

  followService = new FollowService(followRepositoryMock, userServiceMock);
});

describe("FollowService", () => {
  describe("Method: follow", () => {
    it("Should throw BadRequestError if user tries to follow themselves", async () => {
      await expect(followService.follow(1, 1)).rejects.toThrowError(
        new BadRequestError(
          "You cannot follow or unfollow yourself.",
          FollowErrorCode.YOU_CANNOT_UNFOLLOW_OR_FOLLOW_YOURSELF,
        ),
      );
    });

    it("Should throw NotFoundError if follower does not exist", async () => {
      userServiceMock.getById.mockResolvedValueOnce(null);

      await expect(followService.follow(1, 2)).rejects.toThrowError(
        new NotFoundError(
          "Follower not found",
          FollowErrorCode.FOLLOWER_NOT_FOUND,
        ),
      );
    });

    it("Should throw NotFoundError if followed user does not exist", async () => {
      userServiceMock.getById.mockResolvedValueOnce(mockFollower);
      userServiceMock.getById.mockResolvedValueOnce(null);

      await expect(followService.follow(1, 2)).rejects.toThrowError(
        new NotFoundError(
          "Followed not found",
          FollowErrorCode.FOLLOWED_NOT_FOUND,
        ),
      );
    });

    it("Should throw ConflictError if user is already following", async () => {
      userServiceMock.getById.mockResolvedValue(mockFollower);
      userServiceMock.getById.mockResolvedValue(mockFollowed);
      followRepositoryMock.isFollowing.mockResolvedValueOnce(mockFollow);

      await expect(followService.follow(1, 2)).rejects.toThrowError(
        new ConflictError(
          "You already follow this user",
          FollowErrorCode.ALREADY_FOLLOW_USER,
        ),
      );
    });

    it("Should successfully follow a user", async () => {
      userServiceMock.getById.mockResolvedValue(mockFollower);
      userServiceMock.getById.mockResolvedValue(mockFollowed);
      followRepositoryMock.isFollowing.mockResolvedValueOnce(null);
      followRepositoryMock.follow.mockResolvedValue(mockFollow);

      const result = await followService.follow(1, 2);

      expect(result).toMatchObject({
        id: 1,
        followerId: 1,
        followedId: 2,
      });

      expect(result.createdAt).toBeInstanceOf(Date);
      expect(followRepositoryMock.follow).toHaveBeenCalledWith(1, 2);
    });
  });

  describe("Method: unfollow", () => {
    it("Should throw BadRequestError if user tries to unfollow themselves", async () => {
      await expect(followService.unfollow(1, 1)).rejects.toThrowError(
        new BadRequestError(
          "You cannot follow or unfollow yourself.",
          FollowErrorCode.YOU_CANNOT_UNFOLLOW_OR_FOLLOW_YOURSELF,
        ),
      );
    });

    it("Should throw NotFoundError if follower does not exist", async () => {
      userServiceMock.getById.mockResolvedValueOnce(null);

      await expect(followService.unfollow(1, 2)).rejects.toThrowError(
        new NotFoundError(
          "Follower not found",
          FollowErrorCode.FOLLOWER_NOT_FOUND,
        ),
      );
    });

    it("Should throw NotFoundError if followed user does not exist", async () => {
      userServiceMock.getById.mockResolvedValueOnce(mockFollower);
      userServiceMock.getById.mockResolvedValueOnce(null);

      await expect(followService.unfollow(1, 2)).rejects.toThrowError(
        new NotFoundError(
          "Followed not found",
          FollowErrorCode.FOLLOWED_NOT_FOUND,
        ),
      );
    });

    it("Should throw ConflictError if user is not following", async () => {
      userServiceMock.getById.mockResolvedValue(mockFollower);
      userServiceMock.getById.mockResolvedValue(mockFollowed);
      followRepositoryMock.isFollowing.mockResolvedValueOnce(null);

      await expect(followService.unfollow(1, 2)).rejects.toThrowError(
        new ConflictError(
          "You do not follow this user",
          FollowErrorCode.YOU_NOT_FOLLOW_USER,
        ),
      );
    });

    it("Should successfully unfollow a user", async () => {
      userServiceMock.getById.mockResolvedValue(mockFollower);
      userServiceMock.getById.mockResolvedValue(mockFollowed);
      followRepositoryMock.isFollowing.mockResolvedValueOnce(mockFollow);

      await followService.unfollow(1, 2);

      expect(followRepositoryMock.unfollow).toHaveBeenCalledWith(1, 2);
    });
  });
});
