import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";

import request from "supertest";
import { mockedLogin, mockedSecondLogin, mockedUser } from "../mocks/users";
import { mockedSellerRequest } from "../mocks/sellers";
import {
  mockedOrderProduct,
  mockedOrderProductUpdate,
} from "../mocks/ordersProduct";
import {
  mockedProductRequest,
  mockedSecondProductRequest,
} from "../mocks/products";
import { mockedCategoryRequest } from "../mocks/categories";

describe("/order_product", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.log("Error during Data Source initialization", err);
      });
  });
  afterAll(async () => {
    await connection.destroy();
  });

  it("POST /orderProduct - Shoul be able to create an order product", async () => {
    const userCreateResponse = await request(app)
      .post("/users")
      .send(mockedUser);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLogin);

    const sellerCreateResponse = await request(app)
      .post("/sellers")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedSellerRequest);

    const categoryCreateResponse = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedCategoryRequest);

    mockedProductRequest.categoryId = categoryCreateResponse.body.data.id;
    mockedProductRequest.sellerId = sellerCreateResponse.body.data.id;

    const product = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedProductRequest);

    mockedOrderProduct.userId = userCreateResponse.body.data.id;
    mockedOrderProduct.productId = product.body.data.id;

    const response = await request(app)
      .post(`/ordersProduct/product/${product.body.data.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedOrderProduct);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Created order_product");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("quantity");
    expect(response.body.data).toHaveProperty("price_product");
    expect(response.body.data).toHaveProperty("price_total_products");
    expect(response.body.data).toHaveProperty("user");
    expect(response.body.data).toHaveProperty("product");
    expect(response.body.data).toHaveProperty("createdAt");
    expect(response.body.data).toHaveProperty("updatedAt");
  });

  it("POST /orderProduct - Should not be able to create an order product with product invalid id", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLogin);

    const product = await request(app).get("/products");

    mockedOrderProduct.productId = "invalid";

    const response = await request(app)
      .post(`/ordersProduct/product/${product.body.data.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedOrderProduct);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Product not found");
  });

  it("POST /orderProduct - Should not be able to create an order product if stock product is less than the quantity ordered", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLogin);

    const seller = await request(app)
      .get("/sellers")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const category = await request(app).get("/categories");

    mockedSecondProductRequest.categoryId = category.body.data[0].id;
    mockedSecondProductRequest.sellerId = seller.body.data.id;

    const product = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedSecondProductRequest);

    mockedOrderProduct.productId = product.body.data.id;
    mockedOrderProduct.quantity = 3;

    const response = await request(app)
      .post(`/ordersProduct/product/${product.body.data.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedOrderProduct);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message", "insufficient stock");
    expect(response.body).not.toHaveProperty("data");
  });

  it("GET /orderProduct - Should be able to list all orders_product", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLogin);

    const response = await request(app)
      .get("/ordersProduct")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Listed orders_product");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveLength(1);
  });

  it("PATCH /orderProduct - Should be able to change the quantity of in an order_product ", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLogin);

    const listOrderProduct = await request(app)
      .get("/ordersProduct")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app)
      .patch(`/ordersProduct/${listOrderProduct.body.data[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedOrderProductUpdate);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Updated order_product");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("quantity");
    expect(response.body.data).toHaveProperty("price_product");
    expect(response.body.data).toHaveProperty("price_total_products");
    expect(response.body.data).toHaveProperty("user");
    expect(response.body.data).toHaveProperty("product");
    expect(response.body.data).toHaveProperty("createdAt");
    expect(response.body.data).toHaveProperty("updatedAt");
  });

  it("PATCH /orderProduct - Should not be able to change the quantity of an order_product, if the product qauntity is less than requested ", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLogin);

    const listOrderProduct = await request(app)
      .get("/ordersProduct")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    mockedOrderProductUpdate.quantity = 9999999999;

    const response = await request(app)
      .patch(`/ordersProduct/${listOrderProduct.body.data[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedOrderProductUpdate);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("data");
  });

  it("DELETE /orderProduct - Should not be able to delete orders_product from another user", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLogin);
    const orderProduct = await request(app)
      .get("/ordersProduct")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    const secondUserLoginResponse = await request(app)
      .post("/login")
      .send(mockedSecondLogin);

    const response = await request(app)
      .delete(`/ordersProduct/${orderProduct.body.data[0].id}`)
      .set("Authorization", `Bearer ${secondUserLoginResponse.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("data");
  });

  it("DELETE /orderProduct - Should be able to delete orders_product", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLogin);

    const orderProduct = await request(app)
      .get("/ordersProduct")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/ordersProduct/${orderProduct.body.data[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(204);
    expect(response.body).not.toHaveProperty("message");
    expect(response.body).not.toHaveProperty("data");
  });
});
