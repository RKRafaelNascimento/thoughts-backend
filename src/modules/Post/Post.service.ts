import { TooManyRequestsError } from "@/shared/errors";
import { IPost, IPostRepository, IPostService } from "./interfaces";
import { PostErrorCode } from "./error";
import { MAX_DAILY_POSTS } from "@/config";
import { ISentimentAnalysisService } from "@/shared/sentimentAnalysisService/interfaces";

export class PostService implements IPostService {
  constructor(
    private postRepository: IPostRepository,
    private sentimentAnalysisService: ISentimentAnalysisService,
  ) {}

  async create(
    post: Omit<IPost, "id" | "createdAt" | "sentiment">,
  ): Promise<IPost> {
    const { userId, content } = post;
    const postCount = await this.postRepository.countPostsTodayByUser(userId);

    if (postCount >= MAX_DAILY_POSTS) {
      throw new TooManyRequestsError(
        "You have reached the daily limit of 5 posts. Please try again tomorrow.",
        PostErrorCode.DAILY_POST_LIMIT_REACHED,
      );
    }

    const sentiment = await this.sentimentAnalysisService.analyzeText(content);

    return this.postRepository.create({ ...post, sentiment });
  }
}
