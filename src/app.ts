import { createServer, Server } from "http";
import express, { Application } from "express";
import { applicationConfig, corsConfig } from "@/config";
import { ILogger } from "@/shared/logger/interfaces";
import { Logger } from "@/shared/logger";
import { DatabaseClient } from "@/infra/database";
import * as routes from "@/modules";
import swaggerUi from "swagger-ui-express";
import { swaggerConfig } from "@/shared/swagger/swaggerConfig";
import cors from "cors";

export default class App {
  private readonly application: Application;
  private server: Server;
  private hasInitialized = false;
  private static instance: App;

  private constructor(
    private port: number = applicationConfig.port,
    private readonly logger: ILogger = Logger.getInstance(),
  ) {
    this.application = express();
    this.server = createServer(this.application);
  }

  public static getInstance(): App {
    if (this.instance) return this.instance;
    this.instance = new App();
    return this.instance;
  }

  private setupGlobalMiddleware(): void {
    this.logger.info({ msg: "Initializing global middle" });
    this.application.use(express.json());
    this.application.use(express.urlencoded({ extended: false }));
    this.application.use(cors(corsConfig));

    this.application.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerConfig),
    );
  }

  public async stopApplication(): Promise<void> {
    this.logger.info({ msg: "Stopping application" });
    this.server.close();
    this.closeToDatabase();
  }

  private async closeToDatabase(): Promise<void> {
    console.info(`Closing database connection`);
    await DatabaseClient.getInstance().closeConnection();
  }

  private setupRoutes(): void {
    this.logger.info({ msg: "Initializing application routes" });
    this.application.use("/", [...Object.values(routes)]);
  }

  private async setupDatabases(): Promise<void> {
    this.logger.info({ msg: "connecting to databases" });
    await Promise.all([DatabaseClient.getInstance().startConnection()]);
    this.logger.info({ msg: "databases connected successfully" });
  }

  public initServer(): void {
    this.logger.info({ msg: "Initializing server" });
    this.server.listen(this.port, () => {
      this.logger.info({ msg: `Server listening on port ${this.port}` });
    });
  }

  public listeningEvent(): void {}

  public async initApplication(): Promise<void> {
    if (this.hasInitialized) return;
    this.hasInitialized = true;
    this.logger.info({ msg: "Initializing application" });
    this.setupGlobalMiddleware();
    this.setupRoutes();
    this.setupDatabases();
  }
}
