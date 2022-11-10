import AppDataSource from "../../data-source";
import AppError from "../../errors/appErrors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

import User from "../../entities/user.entity";

import { IUserLogin } from "../../interfaces/user";

const userSessionService = async({ email, password }: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email });

  if (!user) { throw new AppError( "Account not found" ) };
  if (!user.password) { throw new AppError( "Password not found", 401 ) };
  if (!bcrypt.compareSync(password, user.password)){
    throw new AppError("Wrong email/password", 403)};

  const token = jwt.sign({isAdm:user.isAdm}, process.env.SECRET_KEY as string, {
    subject: user.id,
    expiresIn: "24h"
  });

  return token;
};

export default userSessionService;
