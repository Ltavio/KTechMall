import { IProductRequest, IProductUpdate } from "../../../interfaces/products";

export const mockedProductRequest: IProductRequest = {
  description: "Mocked product to test",
  name: "Mocked Product",
  price: 13,
  categoryId: "1234",
  sellerId: "1234",
  stock: 2
};
export const mockedSecondProductRequest: IProductRequest = {
  description: "Other product Mocked to test",
  name: "Other product Mocked",
  price: 13,
  categoryId: "",
  sellerId: "",
  stock: 1
};
export const mockedProductUpdateRequest: IProductUpdate = {
  description: "Other product Mocked to test",
  name: "Updated product Mocked",
  price: 31,
  stock: 1
};


export const mockedInvalidProductRequest: IProductRequest = {
  description: "Other product Mocked to test",
  name: "Other product Mocked",
  price: 13,
  categoryId: "",
  sellerId: "",
  stock: 1
};