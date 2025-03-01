import { DatabaseClient } from "@/infra/database";
import { PostRepository, PostService, PostController } from ".";
import { IPostController } from "./interfaces";
import { ValidatorService } from "@/shared/validator";
import { SentimentAnalysisService } from "@/shared/sentimentAnalysisService";
import { HttpRequest } from "@/shared/httpRequestService";

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
      const postService = new PostService(
        postRepository,
        sentimentAnalysisService,
      );
      this.instance = new PostController(
        postService,
        ValidatorService.getInstance(),
      );
    }

    return this.instance;
  }
}
