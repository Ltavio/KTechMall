import AppDataSource from "../../data-source";
import AppError from "../../errors/appErrors";

import User from "../../entities/user.entity";

import { IUserResponse, IUserUpdate } from "../../interfaces/user";

const updateUserService = async (
    dataUser: IUserUpdate,
    id: string ):Promise<IUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);
  const account = await userRepository.findOneBy({ id });

  if (!account) { throw new AppError( "User not found" )}

  const data = Object.keys(dataUser);

  if ( data.includes( "isActive" ) || data.includes( "id" ) ) {
    throw new AppError( "Not Possible update isActive or ID", 401 )};

  await userRepository.update(account!.id, {
    ...account,
    ...dataUser,
    updatedAt: new Date(),
  });

  return {
    message: "Updated user",
    data: account
  };
};

export default updateUserService;