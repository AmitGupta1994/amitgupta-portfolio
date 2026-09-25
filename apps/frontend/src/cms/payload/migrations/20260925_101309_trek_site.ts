import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_photos_site" AS ENUM('research', 'trek');
  CREATE TYPE "public"."enum_videos_site" AS ENUM('research', 'trek');
  ALTER TYPE "public"."enum_projects_placements_site" ADD VALUE 'trek';
  ALTER TYPE "public"."enum_experiences_placements_site" ADD VALUE 'trek';
  ALTER TYPE "public"."enum_expertise_placements_site" ADD VALUE 'trek';
  ALTER TYPE "public"."enum_skill_categories_placements_site" ADD VALUE 'trek';
  ALTER TYPE "public"."enum_publications_placements_site" ADD VALUE 'trek';
  CREATE TABLE "photos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"album" varchar,
  	"location" varchar,
  	"site" "enum_photos_site" DEFAULT 'trek' NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "videos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"album" varchar,
  	"site" "enum_videos_site" DEFAULT 'trek' NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "trek_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "trek" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Trek' NOT NULL,
  	"tagline" varchar DEFAULT 'Himalayan trails, long walks and the gear that survives them',
  	"hero_title" varchar,
  	"hero_description" varchar,
  	"about" varchar DEFAULT 'Away from the screen I walk. This is where the <strong>trails, passes and altitude</strong> live — the routes I have covered in Nepal and beyond, what the days actually looked like, and the photographs and films that came back with me.' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "photos_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "videos_id" integer;
  ALTER TABLE "research" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "research" ADD COLUMN "hero_description" varchar;
  ALTER TABLE "trek_nav" ADD CONSTRAINT "trek_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trek"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "photos_updated_at_idx" ON "photos" USING btree ("updated_at");
  CREATE INDEX "photos_created_at_idx" ON "photos" USING btree ("created_at");
  CREATE UNIQUE INDEX "photos_filename_idx" ON "photos" USING btree ("filename");
  CREATE INDEX "videos_updated_at_idx" ON "videos" USING btree ("updated_at");
  CREATE INDEX "videos_created_at_idx" ON "videos" USING btree ("created_at");
  CREATE INDEX "trek_nav_order_idx" ON "trek_nav" USING btree ("_order");
  CREATE INDEX "trek_nav_parent_id_idx" ON "trek_nav" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_photos_fk" FOREIGN KEY ("photos_id") REFERENCES "public"."photos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_videos_fk" FOREIGN KEY ("videos_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_photos_id_idx" ON "payload_locked_documents_rels" USING btree ("photos_id");
  CREATE INDEX "payload_locked_documents_rels_videos_id_idx" ON "payload_locked_documents_rels" USING btree ("videos_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "photos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "videos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "trek_nav" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "trek" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "photos" CASCADE;
  DROP TABLE "videos" CASCADE;
  DROP TABLE "trek_nav" CASCADE;
  DROP TABLE "trek" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_photos_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_videos_fk";
  
  ALTER TABLE "projects_placements" ALTER COLUMN "site" SET DATA TYPE text;
  ALTER TABLE "projects_placements" ALTER COLUMN "site" SET DEFAULT 'research'::text;
  DROP TYPE "public"."enum_projects_placements_site";
  CREATE TYPE "public"."enum_projects_placements_site" AS ENUM('research');
  ALTER TABLE "projects_placements" ALTER COLUMN "site" SET DEFAULT 'research'::"public"."enum_projects_placements_site";
  ALTER TABLE "projects_placements" ALTER COLUMN "site" SET DATA TYPE "public"."enum_projects_placements_site" USING "site"::"public"."enum_projects_placements_site";
  ALTER TABLE "experiences_placements" ALTER COLUMN "site" SET DATA TYPE text;
  ALTER TABLE "experiences_placements" ALTER COLUMN "site" SET DEFAULT 'research'::text;
  DROP TYPE "public"."enum_experiences_placements_site";
  CREATE TYPE "public"."enum_experiences_placements_site" AS ENUM('research');
  ALTER TABLE "experiences_placements" ALTER COLUMN "site" SET DEFAULT 'research'::"public"."enum_experiences_placements_site";
  ALTER TABLE "experiences_placements" ALTER COLUMN "site" SET DATA TYPE "public"."enum_experiences_placements_site" USING "site"::"public"."enum_experiences_placements_site";
  ALTER TABLE "expertise_placements" ALTER COLUMN "site" SET DATA TYPE text;
  ALTER TABLE "expertise_placements" ALTER COLUMN "site" SET DEFAULT 'research'::text;
  DROP TYPE "public"."enum_expertise_placements_site";
  CREATE TYPE "public"."enum_expertise_placements_site" AS ENUM('research');
  ALTER TABLE "expertise_placements" ALTER COLUMN "site" SET DEFAULT 'research'::"public"."enum_expertise_placements_site";
  ALTER TABLE "expertise_placements" ALTER COLUMN "site" SET DATA TYPE "public"."enum_expertise_placements_site" USING "site"::"public"."enum_expertise_placements_site";
  ALTER TABLE "skill_categories_placements" ALTER COLUMN "site" SET DATA TYPE text;
  ALTER TABLE "skill_categories_placements" ALTER COLUMN "site" SET DEFAULT 'research'::text;
  DROP TYPE "public"."enum_skill_categories_placements_site";
  CREATE TYPE "public"."enum_skill_categories_placements_site" AS ENUM('research');
  ALTER TABLE "skill_categories_placements" ALTER COLUMN "site" SET DEFAULT 'research'::"public"."enum_skill_categories_placements_site";
  ALTER TABLE "skill_categories_placements" ALTER COLUMN "site" SET DATA TYPE "public"."enum_skill_categories_placements_site" USING "site"::"public"."enum_skill_categories_placements_site";
  ALTER TABLE "publications_placements" ALTER COLUMN "site" SET DATA TYPE text;
  ALTER TABLE "publications_placements" ALTER COLUMN "site" SET DEFAULT 'research'::text;
  DROP TYPE "public"."enum_publications_placements_site";
  CREATE TYPE "public"."enum_publications_placements_site" AS ENUM('research');
  ALTER TABLE "publications_placements" ALTER COLUMN "site" SET DEFAULT 'research'::"public"."enum_publications_placements_site";
  ALTER TABLE "publications_placements" ALTER COLUMN "site" SET DATA TYPE "public"."enum_publications_placements_site" USING "site"::"public"."enum_publications_placements_site";
  DROP INDEX "payload_locked_documents_rels_photos_id_idx";
  DROP INDEX "payload_locked_documents_rels_videos_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "photos_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "videos_id";
  ALTER TABLE "research" DROP COLUMN "hero_title";
  ALTER TABLE "research" DROP COLUMN "hero_description";
  DROP TYPE "public"."enum_photos_site";
  DROP TYPE "public"."enum_videos_site";`)
}
