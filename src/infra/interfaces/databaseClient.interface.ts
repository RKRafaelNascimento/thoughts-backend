import { IOrmClient } from "./ormClient.interface";

export interface IDatabaseClient {
  startConnection: () => Promise<unknown | undefined>;
  closeConnection: () => Promise<void>;
  getOrmClient: () => IOrmClient;
}
