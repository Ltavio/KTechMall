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
    const category_id = "";
    const seller_id = "";

    const productData = {
      name,
      price,
      stock,
      description,
      category_id,
      seller_id,
    };

    const newPeoduct = await createProductService(productData);

    expect(newPeoduct).toEqual(
      expect.objectContaining({
        id: 1,
        name,
        category_id,
        seller_id,
        price,
        stock,
        description,
      })
    );
  });
});
