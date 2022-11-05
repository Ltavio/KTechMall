import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appErrors";
import { IUserUpdate } from "../../interfaces/user";

const updateUserService = async (
  dataUser: IUserUpdate,
  id: string
): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const account = users.find((user) => user.id === id);

  if (!account) {
    throw new AppError("User not found");
  }

  const data = Object.keys(dataUser);
  if (data.includes("isActive") || data.includes("id")) {
    throw new AppError("Not Possible update isActive or ID", 401);
  }

  await userRepository.update(account!.id, {
    ...account,
    ...dataUser,
    updatedAt: new Date(),
  });

  return account;
};

export default updateUserService;
