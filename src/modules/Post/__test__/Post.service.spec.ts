import { PostService } from "@/modules/Post";
import { IPostRepository } from "@/modules/Post/interfaces";
import { ISentimentAnalysisService } from "@/shared/sentimentAnalysisService/interfaces";
import { TooManyRequestsError } from "@/shared/errors";
import { IUserService } from "@/modules/User/interfaces";
import { PostErrorCode } from "@/modules/Post/error";

const MAX_DAILY_POSTS = 5;
let postRepositoryMock: jest.Mocked<IPostRepository>;
let sentimentAnalysisServiceMock: jest.Mocked<ISentimentAnalysisService>;
let postService: PostService;
let userServiceMock: jest.Mocked<IUserService>;

const mockPost = {
  id: 1,
  userId: 3,
  content: "This is a test post",
  sentiment: "neutral" as "neutral" | "pos" | "neg",
  createdAt: new Date(),
  getUserProfile: jest.fn(),
};

beforeAll(() => {
  postRepositoryMock = {
    create: jest.fn(),
    getById: jest.fn(),
    getAllPostsWithReposts: jest.fn(),
    getPostsAndRepostsFromFollowing: jest.fn(),
    getPostsAndRepostByUserId: jest.fn(),
  };

  sentimentAnalysisServiceMock = {
    analyzeText: jest.fn(),
  };
  userServiceMock = {
    getById: jest.fn(),
    countLimitedPostsAndRepostsTodayByUser: jest.fn(),
    getUserProfile: jest.fn(),
  };

  postService = new PostService(
    postRepositoryMock,
    sentimentAnalysisServiceMock,
    userServiceMock,
  );
});

describe("PostService", () => {
  describe("Method: create", () => {
    it("Should throw TooManyRequestsError if user exceeds daily post limit", async () => {
      userServiceMock.countLimitedPostsAndRepostsTodayByUser.mockResolvedValueOnce(
        MAX_DAILY_POSTS,
      );

      await expect(
        postService.create({ userId: 3, content: "Test post" }),
      ).rejects.toThrowError(
        new TooManyRequestsError(
          "You have reached the daily limit of 5 posts. Please try again tomorrow.",
          PostErrorCode.DAILY_POST_LIMIT_REACHED,
        ),
      );
    });

    it("Should successfully create a post when under the daily limit", async () => {
      userServiceMock.countLimitedPostsAndRepostsTodayByUser.mockResolvedValueOnce(
        3,
      );
      sentimentAnalysisServiceMock.analyzeText.mockResolvedValueOnce("neutral");
      postRepositoryMock.create.mockResolvedValueOnce(mockPost);

      const result = await postService.create({
        userId: 3,
        content: "Another test post",
      });

      expect(
        userServiceMock.countLimitedPostsAndRepostsTodayByUser,
      ).toHaveBeenCalledWith(3);
      expect(sentimentAnalysisServiceMock.analyzeText).toHaveBeenCalledWith(
        "Another test post",
      );
      expect(postRepositoryMock.create).toHaveBeenCalledWith({
        userId: 3,
        content: "Another test post",
        sentiment: "neutral",
      });

      expect(result).toMatchObject(mockPost);
    });
  });
});
