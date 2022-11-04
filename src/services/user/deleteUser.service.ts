import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appErrors";

const deleteUserService = async (id: string): Promise<boolean> => {
  const userRepository = AppDataSource.getRepository(User);
  const account = await userRepository.findOneBy({ id });

  if (!account?.isActive) {
    throw new AppError("Unable to delete inactive user");
  }

  account.isActive = false;
  await userRepository.save(account);

  return true;
};

export default deleteUserService;
