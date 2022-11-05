import AppDataSource from "./data-source";
import app from "./app";
import "dotenv/config";

(async () => {
  await AppDataSource.initialize().catch((error) => {
    console.error("Error during Data Source initialization", error);
  });

  app.listen(process.env.PORT || 3000, () => {
    console.log("server running");
  });
})();
