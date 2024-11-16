import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuthor1731761496456 implements MigrationInterface {
  name = 'CreateAuthor1731761496456';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "author" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bfcfc75a7acbeee4a1ccf92d20" ON "author" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_78825c503cbef61c17d5b19516" ON "author" ("updated_at") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_d3962fd11a54d87f927e84d108" ON "author" ("name") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d3962fd11a54d87f927e84d108"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_78825c503cbef61c17d5b19516"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bfcfc75a7acbeee4a1ccf92d20"`,
    );
    await queryRunner.query(`DROP TABLE "author"`);
  }
}
