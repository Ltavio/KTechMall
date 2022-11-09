import { IUserLogin, IUserRequest } from "../../../interfaces/user";

export const mockedUser: IUserRequest = {
  name: "Kenzinho",
  email: "kenzinho@kenzie.com.br",
  password: "5432",
  cellphone: 999999999,
};

export const mockedSecondUser: IUserRequest = {
  name: "Trybinho",
  email: "trybinho@trybe.com.br",
  password: "5173",
  cellphone: 888888888,
};

export const mockedLogin: IUserLogin = {
  email: "kenzinho@kenzie.com.br",
  password: "5432",
};

export const mockedSecondLogin: IUserLogin = {
  email: "trybinho@trybe.com.br",
  password: "5173",
};
