import { IDatabaseClient } from "@/infra/interfaces";
import { IFollow, IFollowRepository } from "./interfaces";
import { PrismaClient } from "@prisma/client";

export class FollowRepository implements IFollowRepository {
  private ormClient: PrismaClient;
  constructor(private databaseClient: IDatabaseClient) {
    this.ormClient = databaseClient.getOrmClient();
  }

  async follow(followerId: number, followedId: number): Promise<IFollow> {
    return this.ormClient.follow.create({ data: { followerId, followedId } });
  }

  async isFollowing(
    followerId: number,
    followedId: number,
  ): Promise<IFollow | null> {
    return this.ormClient.follow.findUnique({
      where: { followerId_followedId: { followedId, followerId } },
    });
  }

  async unfollow(followerId: number, followedId: number): Promise<void> {
    await this.ormClient.follow.delete({
      where: { followerId_followedId: { followerId, followedId } },
    });
  }
}
