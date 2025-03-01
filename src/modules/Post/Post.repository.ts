import { IDatabaseClient } from "@/infra/interfaces";
import { IPost, IPostRepository } from "./interfaces";
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
}
