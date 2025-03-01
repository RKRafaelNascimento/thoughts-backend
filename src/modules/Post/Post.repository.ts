import { IDatabaseClient } from "@/infra/interfaces";
import { IPost, IPostRepository } from "./interfaces";
import { PrismaClient } from "@prisma/client";
import { DateHelper } from "@/shared/dateHelper";
import { MAX_DAILY_POSTS } from "@/config";

export class PostRepository implements IPostRepository {
  private ormClient: PrismaClient;

  constructor(private databaseClient: IDatabaseClient) {
    this.ormClient = this.databaseClient.getOrmClient();
  }

  async create(post: Omit<IPost, "id" | "createdAt">): Promise<IPost> {
    return this.ormClient.post.create({
      data: { ...post },
    });
  }

  async countPostsTodayByUser(userId: number): Promise<number> {
    const startDate = DateHelper.getStartOfDay(new Date());
    const endDate = DateHelper.getEndOfDay(new Date());

    return this.ormClient.post.count({
      where: { userId, createdAt: { gte: startDate, lt: endDate } },
      take: MAX_DAILY_POSTS + 1,
    });
  }
}
