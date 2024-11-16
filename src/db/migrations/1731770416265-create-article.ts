import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateArticle1731770416265 implements MigrationInterface {
  name = 'CreateArticle1731770416265';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "article" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(256) NOT NULL, "description" character varying(512) NOT NULL, "content" character varying(16384) NOT NULL, "published_on" date NOT NULL, "author_id" integer NOT NULL, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3bdcf36c4bc293677bdc7c9230" ON "article" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_386c33fd72491755e65a28c234" ON "article" ("updated_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fca3cb9ba4963678f564f22e7a" ON "article" ("title") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_263ad0cfef57624ed1869723a9" ON "article" ("published_on") `,
    );
    await queryRunner.query(
      `ALTER TABLE "article" ADD CONSTRAINT "FK_16d4ce4c84bd9b8562c6f396262" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "article" DROP CONSTRAINT "FK_16d4ce4c84bd9b8562c6f396262"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_263ad0cfef57624ed1869723a9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fca3cb9ba4963678f564f22e7a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_386c33fd72491755e65a28c234"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3bdcf36c4bc293677bdc7c9230"`,
    );
    await queryRunner.query(`DROP TABLE "article"`);
  }
}
