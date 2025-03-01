import { DatabaseClient } from "@/infra/database";
import { PostRepository, PostService, PostController } from ".";
import { IPostController, IPostService } from "./interfaces";
import { ValidatorService } from "@/shared/validator";
import { SentimentAnalysisService } from "@/shared/sentimentAnalysisService";
import { HttpRequest } from "@/shared/httpRequestService";
import { UserServiceFactory } from "../User";

export class PostControllerFactory {
  private static instance: IPostController;

  static getInstance(): IPostController {
    if (!this.instance) {
      const postRepository = new PostRepository(DatabaseClient.getInstance());
      const httpRequest = new HttpRequest();
      const apiUrl = process.env.SENTIMENT_API_URL!;
      const sentimentAnalysisService = new SentimentAnalysisService(
        httpRequest,
        apiUrl,
      );
      const userService = UserServiceFactory.getInstance();
      const postService = new PostService(
        postRepository,
        sentimentAnalysisService,
        userService,
      );
      this.instance = new PostController(
        postService,
        ValidatorService.getInstance(),
      );
    }

    return this.instance;
  }
}

export class PostServiceFactory {
  private static instance: IPostService;

  static getInstance(): IPostService {
    if (!this.instance) {
      const postRepository = new PostRepository(DatabaseClient.getInstance());
      const httpRequest = new HttpRequest();
      const apiUrl = process.env.SENTIMENT_API_URL!;
      const sentimentAnalysisService = new SentimentAnalysisService(
        httpRequest,
        apiUrl,
      );
      const userService = UserServiceFactory.getInstance();
      this.instance = new PostService(
        postRepository,
        sentimentAnalysisService,
        userService,
      );
    }

    return this.instance;
  }
}
