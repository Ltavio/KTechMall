import { MigrationInterface, QueryRunner } from "typeorm";

export class devMigration1668024843963 implements MigrationInterface {
    name = 'devMigration1668024843963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" character varying(256) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "email" character varying(150) NOT NULL, "cellphone" integer NOT NULL, "password" character varying(150) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "isAdm" boolean NOT NULL DEFAULT false, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sellers" ("id" uuid NOT NULL, "companyName" character varying(150) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "cnpj" character varying(14) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "UQ_82e4b2d09d66df52a6b2deed7ad" UNIQUE ("companyName"), CONSTRAINT "UQ_6943dd3abf12ff92cae80cfdce2" UNIQUE ("cnpj"), CONSTRAINT "REL_4c1c59db4ac1ed90a1a7c0ff3d" UNIQUE ("userId"), CONSTRAINT "PK_97337ccbf692c58e6c7682de8a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL, "name" character varying(150) NOT NULL, "price" numeric(8,2) NOT NULL, "stock" integer NOT NULL, "description" character varying(256) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "sellerId" uuid, "categoryId" uuid, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders_product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "price_product" numeric(8,2) NOT NULL, "price_total_products" numeric(8,2) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "userId" uuid, "productId" uuid, "cartId" uuid, CONSTRAINT "PK_ac832121b6c331b084ecc4121fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "delivery" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address_id" character varying(100) NOT NULL, "delivery" boolean NOT NULL DEFAULT true, "receiver" character varying(100) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), CONSTRAINT "PK_ffad7bf84e68716cd9af89003b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL, "sub_total_orders" double precision NOT NULL, "frete" double precision NOT NULL, "price_total" double precision NOT NULL, "userId" uuid, "deliveryId" uuid, CONSTRAINT "REL_756f53ab9466eb52a52619ee01" UNIQUE ("userId"), CONSTRAINT "REL_d7e2476b7127eab2e04136ccae" UNIQUE ("deliveryId"), CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sellers" ADD CONSTRAINT "FK_4c1c59db4ac1ed90a1a7c0ff3df" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_e40a1dd2909378f0da1f34f7bd6" FOREIGN KEY ("sellerId") REFERENCES "sellers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_product" ADD CONSTRAINT "FK_4cce8a22bab115e11c981b0a8fd" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_product" ADD CONSTRAINT "FK_1be1adfe5f3af119e7b6f7b7923" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_product" ADD CONSTRAINT "FK_8cf2c147f6b5a10361f55dc831e" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_d7e2476b7127eab2e04136ccae1" FOREIGN KEY ("deliveryId") REFERENCES "delivery"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_d7e2476b7127eab2e04136ccae1"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`ALTER TABLE "orders_product" DROP CONSTRAINT "FK_8cf2c147f6b5a10361f55dc831e"`);
        await queryRunner.query(`ALTER TABLE "orders_product" DROP CONSTRAINT "FK_1be1adfe5f3af119e7b6f7b7923"`);
        await queryRunner.query(`ALTER TABLE "orders_product" DROP CONSTRAINT "FK_4cce8a22bab115e11c981b0a8fd"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_e40a1dd2909378f0da1f34f7bd6"`);
        await queryRunner.query(`ALTER TABLE "sellers" DROP CONSTRAINT "FK_4c1c59db4ac1ed90a1a7c0ff3df"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "delivery"`);
        await queryRunner.query(`DROP TABLE "orders_product"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "sellers"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
