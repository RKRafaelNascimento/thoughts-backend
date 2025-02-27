import { IUser, IUserService, IUserRepository } from "./interfaces";

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async getById(id: number): Promise<IUser | null> {
    return this.userRepository.getById(id);
  }
}
