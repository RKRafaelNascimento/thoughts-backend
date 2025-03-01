import { DatabaseClient } from "@/infra/database";
import { RepostRepository, RepostService, RepostController } from ".";
import { IRepostController } from "./interfaces";
import { ValidatorService } from "@/shared/validator";
import { SentimentAnalysisService } from "@/shared/sentimentAnalysisService";
import { HttpRequest } from "@/shared/httpRequestService";
import { PostServiceFactory } from "@/modules/Post";
import { UserServiceFactory } from "../User";

export class RepostControllerFactory {
  private static instance: IRepostController;

  static getInstance(): IRepostController {
    if (!this.instance) {
      const repostRepository = new RepostRepository(
        DatabaseClient.getInstance(),
      );
      const httpRequest = new HttpRequest();
      const apiUrl = process.env.SENTIMENT_API_URL!;
      const sentimentAnalysisService = new SentimentAnalysisService(
        httpRequest,
        apiUrl,
      );
      const postService = PostServiceFactory.getInstance();
      const userService = UserServiceFactory.getInstance();
      const repostService = new RepostService(
        postService,
        repostRepository,
        sentimentAnalysisService,
        userService,
      );
      this.instance = new RepostController(
        repostService,
        ValidatorService.getInstance(),
      );
    }

    return this.instance;
  }
}
