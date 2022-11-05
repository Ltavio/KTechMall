import { MigrationInterface, QueryRunner } from "typeorm";

export class createCategory1667583975348 implements MigrationInterface {
    name = 'createCategory1667583975348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "deletedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ADD "deletedAt" TIMESTAMP`);
    }

}
