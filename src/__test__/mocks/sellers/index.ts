import { ISellerRequest } from "../../../interfaces/seller";

export const mockedSellerRequest: ISellerRequest = {
  cnpj: "0123456789",
  companyName: "Kenzie Academy",
  //userId: ""
};

export const mockedSecondSellerRequest: ISellerRequest = {
  cnpj: "9876543210",
  companyName: "Trybe",
  //userId: ""
};

export const mockedSellerUpdate = {
  cnpj: "123458413",
  companyName: "Tesla",
};

export const mockedInvalidSellerUpdate = {
  id: "524563215",
};