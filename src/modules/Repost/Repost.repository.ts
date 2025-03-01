import { IDatabaseClient } from "@/infra/interfaces";
import { IRepost, IRepostRepository } from "./interfaces";
import { PrismaClient } from "@prisma/client";

export class RepostRepository implements IRepostRepository {
  private ormClient: PrismaClient;
  constructor(private databaseClient: IDatabaseClient) {
    this.ormClient = databaseClient.getOrmClient();
  }

  async create(repost: Omit<IRepost, "id" | "createdAt">): Promise<IRepost> {
    return this.ormClient.repost.create({ data: { ...repost } });
  }

  async getRepostByOriginalAndUserId(
    userId: number,
    originalPostId: number,
  ): Promise<IRepost | null> {
    return this.ormClient.repost.findFirst({
      where: {
        userId: userId,
        originalPostId: originalPostId,
      },
    });
  }
}
