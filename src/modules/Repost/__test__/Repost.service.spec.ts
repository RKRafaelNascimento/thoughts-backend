import { RepostService } from "@/modules/Repost/Repost.service";
import { IPostService } from "@/modules/Post/interfaces";
import { IRepostRepository } from "@/modules/Repost/interfaces";
import { IUserService } from "@/modules/User/interfaces";
import { ISentimentAnalysisService } from "@/shared/sentimentAnalysisService/interfaces";
import {
  NotFoundError,
  ForbiddenError,
  ConflictError,
  TooManyRequestsError,
} from "@/shared/errors";
import { RepostErrorCode } from "@/modules/Repost/error";
import { MAX_DAILY_POSTS } from "@/config";

let postServiceMock: jest.Mocked<IPostService>;
let repostRepositoryMock: jest.Mocked<IRepostRepository>;
let sentimentAnalysisServiceMock: jest.Mocked<ISentimentAnalysisService>;
let userServiceMock: jest.Mocked<IUserService>;
let repostService: RepostService;

const mockRepost = {
  id: 1,
  userId: 2,
  originalPostId: 10,
  content: "This is a repost",
  sentiment: "pos" as const,
  createdAt: new Date(),
};

const mockOriginalPost = {
  id: 10,
  userId: 1,
  content: "Original Post",
  sentiment: "neutral" as const,
  createdAt: new Date(),
};

beforeAll(() => {
  postServiceMock = {
    getById: jest.fn(),
    create: jest.fn(),
    getFeed: jest.fn(),
    getPostsByUserId: jest.fn(),
  } as jest.Mocked<IPostService>;

  repostRepositoryMock = {
    create: jest.fn(),
    getRepostByOriginalAndUserId: jest.fn(),
  } as jest.Mocked<IRepostRepository>;

  sentimentAnalysisServiceMock = {
    analyzeText: jest.fn(),
  } as jest.Mocked<ISentimentAnalysisService>;

  userServiceMock = {
    countLimitedPostsAndRepostsTodayByUser: jest.fn(),
    getById: jest.fn(),
    getUserProfile: jest.fn(),
  } as jest.Mocked<IUserService>;

  repostService = new RepostService(
    postServiceMock,
    repostRepositoryMock,
    sentimentAnalysisServiceMock,
    userServiceMock,
  );
});

describe("RepostService", () => {
  describe("Method: create", () => {
    it("Should throw NotFoundError if the original post does not exist", async () => {
      postServiceMock.getById.mockResolvedValueOnce(null);

      await expect(
        repostService.create({
          userId: 2,
          originalPostId: 10,
          content: "This is a repost",
        }),
      ).rejects.toThrowError(
        new NotFoundError(
          "Original post not found",
          RepostErrorCode.ORIGINAL_POST_NOT_FOUND,
        ),
      );
    });

    it("Should throw ForbiddenError if the user tries to repost their own post", async () => {
      postServiceMock.getById.mockResolvedValueOnce({
        ...mockOriginalPost,
        userId: 2,
      });

      await expect(
        repostService.create({
          userId: 2,
          originalPostId: 10,
          content: "This is a repost",
        }),
      ).rejects.toThrowError(
        new ForbiddenError(
          "You cannot repost your own post",
          RepostErrorCode.YOU_CANNOT_REPOST_OWN_POST,
        ),
      );
    });

    it("Should throw ConflictError if the user has already reposted the post", async () => {
      postServiceMock.getById.mockResolvedValueOnce(mockOriginalPost);
      repostRepositoryMock.getRepostByOriginalAndUserId.mockResolvedValueOnce(
        mockRepost,
      );

      await expect(
        repostService.create({
          userId: 2,
          originalPostId: 10,
          content: "This is a repost",
        }),
      ).rejects.toThrowError(
        new ConflictError(
          "You have already reposted this content",
          RepostErrorCode.YOU_ALREADY_REPOSTED,
        ),
      );
    });

    it("Should throw TooManyRequestsError if the user has reached the daily limit", async () => {
      postServiceMock.getById.mockResolvedValueOnce(mockOriginalPost);
      repostRepositoryMock.getRepostByOriginalAndUserId.mockResolvedValueOnce(
        null,
      );
      userServiceMock.countLimitedPostsAndRepostsTodayByUser.mockResolvedValueOnce(
        MAX_DAILY_POSTS,
      );

      await expect(
        repostService.create({
          userId: 2,
          originalPostId: 10,
          content: "This is a repost",
        }),
      ).rejects.toThrowError(
        new TooManyRequestsError(
          "You have reached the daily limit of 5 posts. Please try again tomorrow.",
          RepostErrorCode.DAILY_POST_LIMIT_REACHED,
        ),
      );
    });

    it("Should analyze sentiment when content is provided", async () => {
      postServiceMock.getById.mockResolvedValueOnce(mockOriginalPost);
      repostRepositoryMock.getRepostByOriginalAndUserId.mockResolvedValueOnce(
        null,
      );
      userServiceMock.countLimitedPostsAndRepostsTodayByUser.mockResolvedValueOnce(
        3,
      );
      sentimentAnalysisServiceMock.analyzeText.mockResolvedValueOnce("pos");

      await repostService.create({
        userId: 2,
        originalPostId: 10,
        content: "This is a repost",
      });

      expect(sentimentAnalysisServiceMock.analyzeText).toHaveBeenCalledWith(
        "This is a repost",
      );
    });

    it("Should create a repost successfully", async () => {
      postServiceMock.getById.mockResolvedValueOnce(mockOriginalPost);
      repostRepositoryMock.getRepostByOriginalAndUserId.mockResolvedValueOnce(
        null,
      );
      userServiceMock.countLimitedPostsAndRepostsTodayByUser.mockResolvedValueOnce(
        3,
      );
      sentimentAnalysisServiceMock.analyzeText.mockResolvedValueOnce("pos");
      repostRepositoryMock.create.mockResolvedValueOnce(mockRepost);

      const result = await repostService.create({
        userId: 2,
        originalPostId: 10,
        content: "This is a repost",
      });

      expect(result).toMatchObject(mockRepost);
      expect(repostRepositoryMock.create).toHaveBeenCalledWith({
        userId: 2,
        originalPostId: 10,
        content: "This is a repost",
        sentiment: "pos",
      });
    });
  });
});
