import { DataSource } from "typeorm";
import request from "supertest";
import AppDataSource from "../../data-source";
import app from "../../app";
import { mockedCategory } from "../mocks/categories";
import {
  mockedInvalidProductData,
  mockedProductData,
  mockedProductForDelete,
  mockedProductForUpdate,
  mockedProductUpdate,
} from "../mocks/products";
import {
  mockedLogin,
  mockedSecondLogin,
  mockedSecondUser,
  mockedUser,
} from "../mocks/user";
import { mockedSecondSeller, mockedSeller } from "../mocks/seller";

describe("Products Routes", () => {
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

  test("POST /products - Should insert the information of new product in the database", async () => {
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

  test("POST /products - Should NOT be able to create product without authorization", async () => {
    const response = await request(app)
      .post("/products")
      .send({
        ...mockedProductData,
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("data");
  });

  test("POST /products - Should NOT be able to create a product that already exists", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLogin);

    const getSellerResponse = await request(app)
      .get("/sellers")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const listCategoryResponse = await request(app).get("/categories");

    const response = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({
        ...mockedProductData,
        sellerId: getSellerResponse.body.data.id,
        categoryId: listCategoryResponse.body.data[0].id,
      });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("data");
  });

  test("POST /products - Should NOT be able to create product with invalid data", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLogin);

    const response = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({
        ...mockedInvalidProductData,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("data");
  });

  test("GET /products - Should be able to list all products", async () => {
    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data.length).toBe(1);
  });

  test("GET /products/:id - Should be able to list one product", async () => {
    const productsResponse = await request(app).get("/products");
    const response = await request(app).get(
      `/products/${productsResponse.body.data[0].id}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
  });

  test("GET /products/:id - Should NOT be able to list a product with invalid id", async () => {
    const response = await request(app).get(
      "/products/dab97041-8b7d-48a7-bac0-1c40b5be45d8"
    );

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("data");
  });

  test("PATCH /products/:id - Should be able to update product data", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLogin);

    const getSellerResponse = await request(app)
      .get("/sellers")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const listCategoryResponse = await request(app).get("/categories");

    const createdProductForUpdate = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({
        ...mockedProductForUpdate,
        sellerId: getSellerResponse.body.data.id,
        categoryId: listCategoryResponse.body.data[0].id,
      });

    const response = await request(app)
      .patch(`/products/${createdProductForUpdate.body.data.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedProductUpdate);

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

  test("PATCH /products/:id - Should NOT be able to update without authorization", async () => {
    const getProductToUpdate = await request(app).get("/products");
    const response = await request(app)
      .patch(`/products/${getProductToUpdate.body.data[1].id}`)
      .send(mockedProductUpdate);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("data");
  });

  test("PATCH /products/:id - Should NOT be able to update to a product that already exists", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLogin);

    const getProducts = await request(app).get("/products");

    const response = await request(app)
      .patch(`/products/${getProducts.body.data[1].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({ name: getProducts.body.data[0].name });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("data");
  });

  test("PATCH /products/:id - Should NOT be able to update a product from another seller", async () => {
    const createSecondUserResponse = await request(app)
      .post("/users")
      .send(mockedSecondUser);

    const secondUserLoginResponse = await request(app)
      .post("/login")
      .send(mockedSecondLogin);

    const createSecondSellerResponse = await request(app)
      .post("/sellers")
      .set("Authorization", `Bearer ${secondUserLoginResponse.body.token}`)
      .send({
        ...mockedSecondSeller,
        userId: createSecondUserResponse.body.data.id,
      });

    const getProducts = await request(app).get("/products");

    const response = await request(app)
      .patch(`/products/${getProducts.body.data[1].id}`)
      .set("Authorization", `Bearer ${secondUserLoginResponse.body.token}`)
      .send(mockedProductUpdate);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("data");
  });

  test("DELETE /products/:id - Should be able to delete a product", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLogin);

    const getSellerResponse = await request(app)
      .get("/sellers")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const listCategoryResponse = await request(app).get("/categories");

    const createdProductForDelete = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({
        ...mockedProductForDelete,
        sellerId: getSellerResponse.body.data.id,
        categoryId: listCategoryResponse.body.data[0].id,
      });

    const response = await request(app)
      .delete(`/products/${createdProductForDelete.body.data.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const getProducts = await request(app).get("/products");

    expect(response.status).toBe(204);
    expect(response.body).not.toHaveProperty("message");
    expect(response.body).not.toHaveProperty("data");
    expect(getProducts.body.data[2].isActive).toBeFalsy();
  });

  test("DELETE /products/:id - Should NOT be able to delete a product without authorization", async () => {
    const getProducts = await request(app).get("/products");
    const response = await request(app).delete(
      `/products/${getProducts.body.data[2].id}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("data");
  });

  test("DELETE /products/:id - Should NOT be able to delete a product with an invalid id", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLogin);

    const response = await request(app)
      .delete("/products/dab97041-8b7d-48a7-bac0-1c40b5be45d8")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("data");
  });

  test("DELETE /products:id - Should NOT be able to delete a product from another seller", async () => {
    const secondUserLoginResponse = await request(app)
      .post("/login")
      .send(mockedSecondLogin);

    const getProducts = await request(app).get("/products");

    const response = await request(app)
      .delete(`/products/${getProducts.body.data[0].id}`)
      .set("Authorization", `Bearer ${secondUserLoginResponse.body.token}`);
  });
});
