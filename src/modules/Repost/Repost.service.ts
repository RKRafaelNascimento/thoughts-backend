import { ISentimentAnalysisService } from "@/shared/sentimentAnalysisService/interfaces";
import { IRepost, IRepostRepository, IRepostService } from "./interfaces";
import { IPostService } from "@/modules/Post/interfaces";
import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
  TooManyRequestsError,
} from "@/shared/errors";
import { RepostErrorCode } from "./error";
import { MAX_DAILY_POSTS } from "@/config";
import { IUserService } from "../User/interfaces";

export class RepostService implements IRepostService {
  constructor(
    private postService: IPostService,
    private repostRepository: IRepostRepository,
    private sentimentAnalysisService: ISentimentAnalysisService,
    private userService: IUserService,
  ) {}

  async create(
    repost: Omit<IRepost, "id" | "createdAt" | "sentiment">,
  ): Promise<IRepost> {
    const { userId, originalPostId, content } = repost;
    const originalPost = await this.postService.getById(originalPostId);

    if (!originalPost) {
      throw new NotFoundError(
        "Original post not found",
        RepostErrorCode.ORIGINAL_POST_NOT_FOUND,
      );
    }

    if (originalPost.userId === userId) {
      throw new ForbiddenError(
        "You cannot repost your own post",
        RepostErrorCode.YOU_CANNOT_REPOST_OWN_POST,
      );
    }

    const hasUserAlreadyReposted = await this.checkAlreadyRepost(
      userId,
      originalPostId,
    );

    if (hasUserAlreadyReposted) {
      throw new ConflictError(
        "You have already reposted this content",
        RepostErrorCode.YOU_ALREADY_REPOSTED,
      );
    }

    const postsAndRepostsCount =
      await this.userService.countLimitedPostsAndRepostsTodayByUser(userId);

    if (postsAndRepostsCount >= MAX_DAILY_POSTS) {
      throw new TooManyRequestsError(
        "You have reached the daily limit of 5 posts. Please try again tomorrow.",
        RepostErrorCode.DAILY_POST_LIMIT_REACHED,
      );
    }

    let sentiment: "pos" | "neg" | "neutral" | null = null;

    if (content) {
      sentiment = await this.sentimentAnalysisService.analyzeText(content);
    }

    return this.repostRepository.create({ ...repost, sentiment });
  }

  async checkAlreadyRepost(
    userId: number,
    originalPostId: number,
  ): Promise<boolean> {
    const repost = await this.repostRepository.getRepostByOriginalAndUserId(
      userId,
      originalPostId,
    );

    return !!repost;
  }
}
