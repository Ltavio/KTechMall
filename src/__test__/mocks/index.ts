import { ICategoryRequest } from "../../interfaces/categories";
import { IProduct, IProductRequest } from "../../interfaces/products";
import { ISellerRequest } from "../../interfaces/seller";
import { IUserLogin, IUserRequest } from "../../interfaces/user";

export const mockedUser: IUserRequest = {
  name: "Kenzinho",
  email: "kenzinho@kenzie.com.br",
  password: "5432",
  cellphone: 999999999,
};

export const mockedLogin: IUserLogin = {
  email: "kenzinho@kenzie.com.br",
  password: "5432",
};

export const mockedSeller = {
  cnpj: "0123456789",
  companyName: "Kenzie Academy",
};

export const mockedProductData = {
  name: "Esponja",
  price: 20,
  stock: 5,
  description: "Esponja amarela",
};

export const mockedCategory: ICategoryRequest = {
  name: "Utensílios",
  description: "Utensílios gerais",
};
