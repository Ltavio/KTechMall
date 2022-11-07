import createProductService from "../../services/products/createProducts.service";
import { DataSource } from "typeorm";
import request from "supertest";
import AppDataSource from "../../data-source";
import app from "../../app";
import {
  mockedCategory,
  mockedLogin,
  mockedProductData,
  mockedSeller,
  mockedUser,
} from "../mocks";
import { IUser } from "../../interfaces/user";

describe("Create an product", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /products Should insert the information of new product in the database", async () => {
    const userCreateResponse = await request(app)
      .post("/users")
      .send(mockedUser);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLogin);

    const sellerCreateResponse = await request(app)
      .post("/sellers")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({ ...mockedSeller, userId: userCreateResponse.body.data.id });

    const categoryCreateResponse = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedCategory);

    const response = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({
        ...mockedProductData,
        sellerId: sellerCreateResponse.body.data.id,
        categoryId: categoryCreateResponse.body.data.id,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("name");
    expect(response.body.data).toHaveProperty("price");
    expect(response.body.data).toHaveProperty("stock");
    expect(response.body.data).toHaveProperty("description");
    expect(response.body.data).toHaveProperty("seller");
    expect(response.body.data).toHaveProperty("category");
    expect(response.body.data).toHaveProperty("createdAt");
    expect(response.body.data).toHaveProperty("updatedAt");
    expect(response.body.data).toHaveProperty("isActive");
  });

  test("POST /products - Should not be able to create product without authorization", async () => {
    const response = await request(app)
      .post("/products")
      .send({
        ...mockedProductData,
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("data");
  });

  // test("GET /products", () => {});
});
