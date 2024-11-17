import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddExternalIdToArticle1731848930957 implements MigrationInterface {
  name = 'AddExternalIdToArticle1731848930957';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "article" ADD "externalId" integer`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_9ae1b9a35bcd6bac4b1960fe39" ON "article" ("externalId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9ae1b9a35bcd6bac4b1960fe39"`,
    );
    await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "externalId"`);
  }
}
