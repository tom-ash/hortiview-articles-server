import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueToValueInTag1731848126697 implements MigrationInterface {
  name = 'AddUniqueToValueInTag1731848126697';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fbbecbf5974405cb19dbd2f243"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_fbbecbf5974405cb19dbd2f243" ON "tag" ("value") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fbbecbf5974405cb19dbd2f243"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fbbecbf5974405cb19dbd2f243" ON "tag" ("value") `,
    );
  }
}
