import { IUser } from ".";

export interface IUserRepository {
  getById(id: number): Promise<IUser | null>;
}
