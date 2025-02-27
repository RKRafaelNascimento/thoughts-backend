import { IDatabaseClient } from "@/infra/interfaces";
import { IUser, IUserRepository } from "./interfaces";
import { PrismaClient } from "@prisma/client";

export class UseRepository implements IUserRepository {
  private ormClient: PrismaClient;
  constructor(private databaseClient: IDatabaseClient) {
    this.ormClient = databaseClient.getOrmClient();
  }

  async getById(id: number): Promise<IUser | null> {
    return this.ormClient.user.findUnique({ where: { id } });
  }
}
