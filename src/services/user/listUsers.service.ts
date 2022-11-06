import AppDataSource from "../../data-source";

import User from "../../entities/user.entity";

import { IListUserResponse, IUser } from "../../interfaces/user";

const listUsersService = async ():Promise<IListUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  return {
    message: "Listed user",
    data: users
  }
};

export default listUsersService;