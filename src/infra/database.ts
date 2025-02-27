import { PrismaClient } from "@prisma/client";
import { Logger } from "@/shared/logger";
import { ILogger } from "@/shared/logger/interfaces";
import { IDatabaseClient } from "./interfaces";

export class DatabaseClient implements IDatabaseClient {
  private static instance: IDatabaseClient;
  private prisma: PrismaClient;

  private constructor(private readonly logger: ILogger) {
    this.prisma = new PrismaClient();
  }

  public static getInstance(logger?: ILogger): IDatabaseClient {
    if (!this.instance) {
      const loggerInstance = logger || Logger.getInstance();
      this.instance = new DatabaseClient(loggerInstance);
    }

    return this.instance;
  }

  public async startConnection(): Promise<void> {
    this.logger.info({ msg: "Establishing database connection" });
    await this.prisma.$connect();
  }

  public async closeConnection(): Promise<void> {
    this.logger.info({ msg: "Closing database connection" });
    await this.prisma.$disconnect();
  }

  public getOrmClient(): PrismaClient {
    return this.prisma;
  }
}
