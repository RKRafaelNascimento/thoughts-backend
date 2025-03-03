import { DatabaseClient } from "@/infra/database";
import { IUserController, IUserService } from "./interfaces";
import { UseRepository } from "./User.repository";
import { UserService } from "./User.service";
import { UserController } from "./User.controller";
import { ValidatorService } from "@/shared/validator";

export class UserServiceFactory {
  private static instance: IUserService;

  static getInstance(): IUserService {
    if (!this.instance) {
      const userRepository = new UseRepository(DatabaseClient.getInstance());
      this.instance = new UserService(userRepository);
    }

    return this.instance;
  }
}

export class UserServiceController {
  private static instance: IUserController;

  static getInstance(): IUserController {
    if (!this.instance) {
      this.instance = new UserController(
        UserServiceFactory.getInstance(),
        ValidatorService.getInstance(),
      );
    }

    return this.instance;
  }
}
