import { IDatabaseClient } from "@/infra/interfaces";
import { IPostsAndReposts, IUser, IUserRepository } from "./interfaces";
import { PrismaClient } from "@prisma/client";
import { DateHelper } from "@/shared/dateHelper";
import { MAX_DAILY_POSTS } from "@/config";

export class UseRepository implements IUserRepository {
  private ormClient: PrismaClient;
  constructor(private databaseClient: IDatabaseClient) {
    this.ormClient = databaseClient.getOrmClient();
  }

  async getById(id: number): Promise<IUser | null> {
    return this.ormClient.user.findUnique({ where: { id } });
  }

  async countLimitedPostsAndRepostsTodayByUser(
    userId: number,
  ): Promise<IPostsAndReposts[]> {
    const startDate = DateHelper.getStartOfDay(new Date());
    const endDate = DateHelper.getEndOfDay(new Date());

    return this.ormClient.user.findMany({
      where: { id: userId },
      select: {
        Post: {
          where: {
            createdAt: {
              gte: startDate,
              lt: endDate,
            },
          },
          select: { id: true },
          take: MAX_DAILY_POSTS + 1,
        },
        Repost: {
          where: {
            createdAt: {
              gte: startDate,
              lt: endDate,
            },
          },
          select: { id: true },
          take: MAX_DAILY_POSTS + 1,
        },
      },
    });
  }
}
