import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTag1731841550997 implements MigrationInterface {
  name = 'CreateTag1731841550997';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tag" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "value" character varying(256) NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7561a113607b9a3804c895442a" ON "tag" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_12e318242b90834fb3b94c5654" ON "tag" ("updated_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fbbecbf5974405cb19dbd2f243" ON "tag" ("value") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fbbecbf5974405cb19dbd2f243"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_12e318242b90834fb3b94c5654"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7561a113607b9a3804c895442a"`,
    );
    await queryRunner.query(`DROP TABLE "tag"`);
  }
}
