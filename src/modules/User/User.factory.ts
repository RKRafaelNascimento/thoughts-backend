import { DatabaseClient } from "@/infra/database";
import { IUserService } from "./interfaces";
import { UseRepository } from "./User.repository";
import { UserService } from "./User.service";

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
