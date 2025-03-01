import { PostService } from "@/modules/Post";
import { IPostRepository } from "@/modules/Post/interfaces";
import { ISentimentAnalysisService } from "@/shared/sentimentAnalysisService/interfaces";
import { TooManyRequestsError } from "@/shared/errors";
import { PostErrorCode } from "@/modules/Post/error";

const MAX_DAILY_POSTS = 5;
let postRepositoryMock: jest.Mocked<IPostRepository>;
let sentimentAnalysisServiceMock: jest.Mocked<ISentimentAnalysisService>;
let postService: PostService;

const mockPost = {
  id: 1,
  userId: 3,
  content: "This is a test post",
  sentiment: "neutral" as "neutral" | "pos" | "neg",
  createdAt: new Date(),
};

beforeAll(() => {
  postRepositoryMock = {
    create: jest.fn(),
    countPostsTodayByUser: jest.fn(),
  };

  sentimentAnalysisServiceMock = {
    analyzeText: jest.fn(),
  };

  postService = new PostService(
    postRepositoryMock,
    sentimentAnalysisServiceMock,
  );
});

describe("PostService", () => {
  describe("Method: create", () => {
    it("Should throw TooManyRequestsError if user exceeds daily post limit", async () => {
      postRepositoryMock.countPostsTodayByUser.mockResolvedValueOnce(
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
      postRepositoryMock.countPostsTodayByUser.mockResolvedValueOnce(3);
      sentimentAnalysisServiceMock.analyzeText.mockResolvedValueOnce("neutral");
      postRepositoryMock.create.mockResolvedValueOnce(mockPost);

      const result = await postService.create({
        userId: 3,
        content: "Another test post",
      });

      expect(postRepositoryMock.countPostsTodayByUser).toHaveBeenCalledWith(3);
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
