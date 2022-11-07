import createProductService from "../../services/products/createProducts.service";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";

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

  test("Should insert the information of new product in the database", async () => {
    const name = "Esponja";
    const price = 20;
    const stock = 5;
    const description = "Esponja amarela";
    const categoryId = "";
    const sellerId = "";

    const productData = {
      name,
      price,
      stock,
      description,
      categoryId,
      sellerId,
    };

    const newProduct = await createProductService(productData);

    expect(newProduct).toEqual(
      expect.objectContaining({
        id: 1,
        name,
        categoryId,
        sellerId,
        price,
        stock,
        description,
      })
    );
  });
});
