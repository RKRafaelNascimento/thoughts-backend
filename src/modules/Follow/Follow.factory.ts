import { DatabaseClient } from "@/infra/database";
import { FollowRepository, FollowService, FollowControler } from ".";
import { IFollowController } from "./interfaces";
import { ValidatorService } from "@/shared/validator";
import { UserServiceFactory } from "@/modules/User";

export class FollowControllerFactory {
  private static instance: IFollowController;

  static getInstance() {
    if (!this.instance) {
      const followRepository = new FollowRepository(
        DatabaseClient.getInstance(),
      );
      const userService = UserServiceFactory.getInstance();
      const followService = new FollowService(followRepository, userService);
      this.instance = new FollowControler(
        followService,
        ValidatorService.getInstance(),
      );
    }

    return this.instance;
  }
}
