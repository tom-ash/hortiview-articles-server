import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddManyToManyArticleTagRelationship1731842212071
  implements MigrationInterface
{
  name = 'AddManyToManyArticleTagRelationship1731842212071';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "articles_tags" ("tag_id" integer NOT NULL, "article_id" integer NOT NULL, CONSTRAINT "PK_eeda07761f3734f20e6ce8f83dd" PRIMARY KEY ("tag_id", "article_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_82ccd5e9ccf84c6c2445a5331f" ON "articles_tags" ("tag_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0844b8f28aa32ef4bb5885d500" ON "articles_tags" ("article_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "articles_tags" ADD CONSTRAINT "FK_82ccd5e9ccf84c6c2445a5331fa" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles_tags" ADD CONSTRAINT "FK_0844b8f28aa32ef4bb5885d5003" FOREIGN KEY ("article_id") REFERENCES "article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "articles_tags" DROP CONSTRAINT "FK_0844b8f28aa32ef4bb5885d5003"`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles_tags" DROP CONSTRAINT "FK_82ccd5e9ccf84c6c2445a5331fa"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0844b8f28aa32ef4bb5885d500"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_82ccd5e9ccf84c6c2445a5331f"`,
    );
    await queryRunner.query(`DROP TABLE "articles_tags"`);
  }
}
