import AppDataSource from "../../data-source";
import AppError from "../../errors/appErrors";
import bcrypt from "bcrypt";

import User from "../../entities/user.entity";

import { IUserRequest, IUserResponse } from "../../interfaces/user";

const createUserService = async (
    { name, email, password, cellphone,}: IUserRequest ): Promise<IUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.findOneBy({ email });

  if(users){ throw new AppError( "Email already exists" ) };

  const user = userRepository.create({
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 10),
    cellphone: cellphone,
  });

  await userRepository.save(user);

  return {
    message: "Created user",
    data: user
  };
};

export default createUserService;