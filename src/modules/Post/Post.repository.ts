import { IDatabaseClient } from "@/infra/interfaces";
import { IPost, IPostAndReposts, IPostRepository } from "./interfaces";
import { PrismaClient } from "@prisma/client";

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

  async getById(id: number): Promise<IPost | null> {
    return this.ormClient.post.findUnique({ where: { id } });
  }

  async getAllPostsWithReposts(
    skip: number,
    take: number,
  ): Promise<IPostAndReposts[]> {
    return this.ormClient.post.findMany({
      include: {
        user: true,
        Repost: {
          include: {
            user: true,
          },
          take,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take,
    }) as unknown as IPostAndReposts[];
  }

  async getPostsAndRepostsFromFollowing(
    userId: number,
    skip: number,
    take: number,
  ): Promise<IPostAndReposts[]> {
    return this.ormClient.post.findMany({
      where: {
        OR: [
          {
            user: {
              following: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
          {
            Repost: {
              some: {
                user: {
                  following: {
                    some: {
                      followerId: userId,
                    },
                  },
                },
              },
            },
          },
        ],
      },
      include: {
        user: true,
        Repost: {
          include: {
            user: true,
          },
          take,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take,
    }) as unknown as IPostAndReposts[];
  }

  async getPostsAndRepostByUserId(
    userId: number,
    skip: number,
    take: number,
  ): Promise<IPostAndReposts[]> {
    return this.ormClient.post.findMany({
      where: {
        OR: [{ userId: userId }],
      },
      include: {
        user: true,
        Repost: {
          include: {
            user: true,
          },
          take,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take,
    }) as unknown as IPostAndReposts[];
  }
}
