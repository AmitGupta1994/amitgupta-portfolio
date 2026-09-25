import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_projects_placements_site" AS ENUM('research');
  CREATE TYPE "public"."enum_experiences_placements_site" AS ENUM('research');
  CREATE TYPE "public"."enum_expertise_placements_site" AS ENUM('research');
  CREATE TYPE "public"."enum_skill_categories_placements_site" AS ENUM('research');
  CREATE TYPE "public"."enum_publications_placements_site" AS ENUM('research');
  CREATE TABLE "projects_placements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"site" "enum_projects_placements_site" DEFAULT 'research' NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL
  );
  
  CREATE TABLE "experiences_placements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"site" "enum_experiences_placements_site" DEFAULT 'research' NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL
  );
  
  CREATE TABLE "expertise_placements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"site" "enum_expertise_placements_site" DEFAULT 'research' NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL
  );
  
  CREATE TABLE "skill_categories_placements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"site" "enum_skill_categories_placements_site" DEFAULT 'research' NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL
  );
  
  CREATE TABLE "publications_placements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"site" "enum_publications_placements_site" DEFAULT 'research' NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL
  );
  
  CREATE TABLE "research_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "research" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Research' NOT NULL,
  	"tagline" varchar DEFAULT 'Gait analysis, sensing hardware and applied machine learning',
  	"about" varchar DEFAULT 'I work at the intersection of <strong>research and engineering</strong>: building the sensing hardware, computer-vision pipelines and data analysis behind human gait studies, then turning the results into software that runs reliably outside the lab. My published work covers FSR-instrumented insoles, pose-estimation based joint measurement and machine learning for fault detection.' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "projects_placements" ADD CONSTRAINT "projects_placements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_placements" ADD CONSTRAINT "experiences_placements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "expertise_placements" ADD CONSTRAINT "expertise_placements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "skill_categories_placements" ADD CONSTRAINT "skill_categories_placements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."skill_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_placements" ADD CONSTRAINT "publications_placements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "research_nav" ADD CONSTRAINT "research_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."research"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "projects_placements_order_idx" ON "projects_placements" USING btree ("_order");
  CREATE INDEX "projects_placements_parent_id_idx" ON "projects_placements" USING btree ("_parent_id");
  CREATE INDEX "experiences_placements_order_idx" ON "experiences_placements" USING btree ("_order");
  CREATE INDEX "experiences_placements_parent_id_idx" ON "experiences_placements" USING btree ("_parent_id");
  CREATE INDEX "expertise_placements_order_idx" ON "expertise_placements" USING btree ("_order");
  CREATE INDEX "expertise_placements_parent_id_idx" ON "expertise_placements" USING btree ("_parent_id");
  CREATE INDEX "skill_categories_placements_order_idx" ON "skill_categories_placements" USING btree ("_order");
  CREATE INDEX "skill_categories_placements_parent_id_idx" ON "skill_categories_placements" USING btree ("_parent_id");
  CREATE INDEX "publications_placements_order_idx" ON "publications_placements" USING btree ("_order");
  CREATE INDEX "publications_placements_parent_id_idx" ON "publications_placements" USING btree ("_parent_id");
  CREATE INDEX "research_nav_order_idx" ON "research_nav" USING btree ("_order");
  CREATE INDEX "research_nav_parent_id_idx" ON "research_nav" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "projects_placements" CASCADE;
  DROP TABLE "experiences_placements" CASCADE;
  DROP TABLE "expertise_placements" CASCADE;
  DROP TABLE "skill_categories_placements" CASCADE;
  DROP TABLE "publications_placements" CASCADE;
  DROP TABLE "research_nav" CASCADE;
  DROP TABLE "research" CASCADE;
  DROP TYPE "public"."enum_projects_placements_site";
  DROP TYPE "public"."enum_experiences_placements_site";
  DROP TYPE "public"."enum_expertise_placements_site";
  DROP TYPE "public"."enum_skill_categories_placements_site";
  DROP TYPE "public"."enum_publications_placements_site";`)
}
