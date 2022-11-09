import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../app";
import { mockedLogin, mockedUser } from "../mocks/user";
import { mockedSeller, mockedSellerUpdate } from "../mocks/seller";

describe("/sellers", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("error during data source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /sellers - Must be able to create a seller", async () => {
    const userCreateResponse = await request(app)
      .post("/users")
      .send(mockedUser);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLogin);

    const response = await request(app)
      .post("/sellers")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({
        ...mockedSeller,
        userId: userCreateResponse.body.data.id,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("companyName");
    expect(response.body.data).toHaveProperty("isActive");
    expect(response.body.data).toHaveProperty("cnpj");
    expect(response.body.data).toHaveProperty("createdAt");
    expect(response.body.data).toHaveProperty("updatedAt");
    expect(response.body.data).toHaveProperty("user");
  });

  test("POST /sellers - Should NOT be able to create a seller that already exists", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLogin);

    const listUserResponse = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app)
      .post("/sellers")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({
        ...mockedSeller,
        userId: listUserResponse.body.data.id,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("data");
  });

  test("POST /sellers - Should NOT be able to create seller without authentication", async () => {
    const response = await request(app).post("/sellers").send(mockedSeller);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /sellers - Should be able to return a get seller registered", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLogin);

    const response = await request(app)
      .get("/sellers")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedSeller);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
  });

  test("GET /sellers - Should NOT be able to list seller without authentication", async () => {
    const response = await request(app).get("/sellers").send(mockedSeller);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /sellers - Should be able to update seller", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLogin);

    const getUserResponse = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app)
      .patch("/sellers")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({ ...mockedSellerUpdate, userId: getUserResponse.body.data.id });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("companyName");
    expect(response.body.data).toHaveProperty("isActive");
    expect(response.body.data).toHaveProperty("cnpj");
    expect(response.body.data).toHaveProperty("createdAt");
    expect(response.body.data).toHaveProperty("updatedAt");
    expect(response.body.data).toHaveProperty("user");
  });

  test("PATCH /sellers - Should NOT be able to updated seller without authentication", async () => {
    const response = await request(app).patch("/sellers").send(mockedSeller);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /sellers - Should be able to delete a seller", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLogin);

    const getUserResponse = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app)
      .delete("/sellers")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const getSeller = await request(app)
      .get("/products")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(204);
    expect(response.body).not.toHaveProperty("message");
    expect(response.body).not.toHaveProperty("data");
    expect(getSeller.body.data.isActive).toBeFalsy();
  });

  test("DELETE /sellers - Should NOT be able to delete a seller without authorization", async () => {
    const response = await request(app).delete("/sellers");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("data");
  });
});
