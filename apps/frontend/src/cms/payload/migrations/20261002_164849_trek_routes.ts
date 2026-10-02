import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "trek_treks" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"region" varchar,
  	"season" varchar,
  	"days" numeric,
  	"max_altitude_m" numeric,
  	"distance_km" numeric,
  	"summary" varchar NOT NULL,
  	"body" varchar,
  	"hero_image_id" integer,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "trek_treks_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"trek_photos_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "trek_treks_id" integer;
  ALTER TABLE "trek_treks" ADD CONSTRAINT "trek_treks_hero_image_id_trek_photos_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."trek_photos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "trek_treks_rels" ADD CONSTRAINT "trek_treks_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."trek_treks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trek_treks_rels" ADD CONSTRAINT "trek_treks_rels_trek_photos_fk" FOREIGN KEY ("trek_photos_id") REFERENCES "public"."trek_photos"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "trek_treks_slug_idx" ON "trek_treks" USING btree ("slug");
  CREATE INDEX "trek_treks_hero_image_idx" ON "trek_treks" USING btree ("hero_image_id");
  CREATE INDEX "trek_treks_updated_at_idx" ON "trek_treks" USING btree ("updated_at");
  CREATE INDEX "trek_treks_created_at_idx" ON "trek_treks" USING btree ("created_at");
  CREATE INDEX "trek_treks_rels_order_idx" ON "trek_treks_rels" USING btree ("order");
  CREATE INDEX "trek_treks_rels_parent_idx" ON "trek_treks_rels" USING btree ("parent_id");
  CREATE INDEX "trek_treks_rels_path_idx" ON "trek_treks_rels" USING btree ("path");
  CREATE INDEX "trek_treks_rels_trek_photos_id_idx" ON "trek_treks_rels" USING btree ("trek_photos_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trek_treks_fk" FOREIGN KEY ("trek_treks_id") REFERENCES "public"."trek_treks"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_trek_treks_id_idx" ON "payload_locked_documents_rels" USING btree ("trek_treks_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "trek_treks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "trek_treks_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "trek_treks" CASCADE;
  DROP TABLE "trek_treks_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_trek_treks_fk";
  
  DROP INDEX "payload_locked_documents_rels_trek_treks_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "trek_treks_id";`)
}
