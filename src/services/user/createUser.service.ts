import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/user";
import { AppError } from "../../errors/appErrors";
import bcrypt from "bcrypt";

const createUserService = async ({
  name,
  email,
  password,
  cellphone,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.findOneBy({ email });

  if (users) {
    throw new AppError("Email already exists");
  }

  const user = userRepository.create({
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 10),
    cellphone: cellphone,
  });

  await userRepository.save(user);

  return user;
};

export default createUserService;
