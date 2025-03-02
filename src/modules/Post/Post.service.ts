import { TooManyRequestsError } from "@/shared/errors";
import {
  IPost,
  IPostAndReposts,
  IPostRepository,
  IPostService,
} from "./interfaces";
import { PostErrorCode } from "./error";
import { MAX_DAILY_POSTS } from "@/config";
import { ISentimentAnalysisService } from "@/shared/sentimentAnalysisService/interfaces";
import { IUserService } from "../User/interfaces";

export class PostService implements IPostService {
  constructor(
    private postRepository: IPostRepository,
    private sentimentAnalysisService: ISentimentAnalysisService,
    private userService: IUserService,
  ) {}

  async create(
    post: Omit<IPost, "id" | "createdAt" | "sentiment">,
  ): Promise<IPost> {
    const { userId, content } = post;
    const postsAndRepostsCount =
      await this.userService.countLimitedPostsAndRepostsTodayByUser(userId);

    if (postsAndRepostsCount >= MAX_DAILY_POSTS) {
      throw new TooManyRequestsError(
        "You have reached the daily limit of 5 posts. Please try again tomorrow.",
        PostErrorCode.DAILY_POST_LIMIT_REACHED,
      );
    }

    const sentiment = await this.sentimentAnalysisService.analyzeText(content);

    return this.postRepository.create({ ...post, sentiment });
  }

  async getById(id: number): Promise<IPost | null> {
    return this.postRepository.getById(id);
  }

  async getFeed(
    skip: number,
    take: number,
    userId: number,
    isFollowing?: boolean,
  ): Promise<IPostAndReposts[]> {
    if (isFollowing) {
      return this.postRepository.getPostsAndRepostsFromFollowing(
        userId,
        skip,
        take,
      );
    }

    return this.postRepository.getAllPostsWithReposts(skip, take);
  }
}
