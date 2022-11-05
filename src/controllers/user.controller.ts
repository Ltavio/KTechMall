import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";

import createUserService from "../services/user/createUser.service";
import listUsersService from "../services/user/listUsers.service";
import deleteUserService from "../services/user/deleteUser.service";
import updateUserService from "../services/user/updateUser.service";

const createUserController = async (req: Request, res: Response) => {
  const { name, email, password, cellphone } = req.body;
  const newUser = await createUserService({ name, email, password, cellphone });
  return res.status(201).json({
    message: "Created user",
    data: instanceToPlain(newUser),
  });
};

const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();
  return res.status(200).json({
    message: "Listed users",
    data: instanceToPlain(users),
  });
};

const updateUserController = async (req: Request, res: Response) => {
  const dataUser = req.body;
  const { id } = req.params;
  const updatedUser = await updateUserService(dataUser, id);
  return res.status(201).json({
    message: "Updated user",
    data: instanceToPlain(updatedUser),
  });
};

const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteUserService(id);
  return res.status(204).json({ message: "User deleted with sucess!" });
};

export {
  createUserController,
  listUsersController,
  updateUserController,
  deleteUserController,
};
