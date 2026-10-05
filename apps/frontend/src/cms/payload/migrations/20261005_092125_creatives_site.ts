import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_creatives_services_icon" AS ENUM('megaphone', 'palette', 'chart', 'camera', 'video', 'pen', 'search', 'globe');
  CREATE TABLE "creatives_experiences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" varchar NOT NULL,
  	"company" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "creatives_skill_categories_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"rating" numeric NOT NULL
  );
  
  CREATE TABLE "creatives_skill_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"key" varchar NOT NULL,
  	"show" boolean DEFAULT true,
  	"priority" numeric DEFAULT 99 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "creatives_expertise" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"domain" varchar NOT NULL,
  	"years" varchar,
  	"description" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "creatives_projects_tech_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "creatives_projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"github_url" varchar,
  	"live_url" varchar,
  	"image_id" integer,
  	"image_url" varchar,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "creatives_publications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"authors" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"publisher" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "creatives_photos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"album" varchar,
  	"location" varchar,
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
  
  CREATE TABLE "creatives_videos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"album" varchar,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "creatives_services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"icon" "enum_creatives_services_icon" DEFAULT 'megaphone' NOT NULL,
  	"description" varchar NOT NULL,
  	"details" varchar,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "creatives_packages_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "creatives_packages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"period" varchar,
  	"description" varchar NOT NULL,
  	"popular" boolean DEFAULT false,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "creatives_reviews" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar,
  	"company" varchar,
  	"text" varchar NOT NULL,
  	"rating" numeric DEFAULT 5 NOT NULL,
  	"avatar_url" varchar,
  	"link" varchar,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "creatives_hero_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"highlight" boolean DEFAULT false
  );
  
  CREATE TABLE "creatives_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "creatives_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "creatives" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Creatives' NOT NULL,
  	"tagline" varchar DEFAULT 'Digital marketing & branding studio',
  	"name" varchar DEFAULT 'Amit Gupta' NOT NULL,
  	"headline" varchar DEFAULT 'Digital Marketing & Branding' NOT NULL,
  	"image_id" integer,
  	"image_url" varchar DEFAULT 'https://github.com/amitgupta1994.png',
  	"main_site_url" varchar,
  	"contact_email" varchar NOT NULL,
  	"contact_phone" varchar NOT NULL,
  	"contact_location" varchar,
  	"contact_whatsapp" varchar,
  	"contact_linkedin" varchar,
  	"contact_github" varchar,
  	"contact_freelancer" varchar,
  	"contact_google_scholar" varchar,
  	"contact_instagram" varchar,
  	"contact_youtube" varchar,
  	"contact_facebook" varchar,
  	"summary" varchar DEFAULT 'We build brands people remember and campaigns that pay for themselves — strategy, identity, content and performance marketing under one roof.' NOT NULL,
  	"hero_title" varchar DEFAULT 'Ideas that move people' NOT NULL,
  	"hero_cta_label" varchar DEFAULT 'Get started' NOT NULL,
  	"hero_cta_href" varchar DEFAULT '/#contact' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "creatives_experiences_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "creatives_skill_categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "creatives_expertise_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "creatives_projects_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "creatives_publications_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "creatives_photos_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "creatives_videos_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "creatives_services_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "creatives_packages_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "creatives_reviews_id" integer;
  ALTER TABLE "tech" ADD COLUMN "contact_instagram" varchar;
  ALTER TABLE "tech" ADD COLUMN "contact_youtube" varchar;
  ALTER TABLE "tech" ADD COLUMN "contact_facebook" varchar;
  ALTER TABLE "research" ADD COLUMN "contact_instagram" varchar;
  ALTER TABLE "research" ADD COLUMN "contact_youtube" varchar;
  ALTER TABLE "research" ADD COLUMN "contact_facebook" varchar;
  ALTER TABLE "trek" ADD COLUMN "contact_instagram" varchar;
  ALTER TABLE "trek" ADD COLUMN "contact_youtube" varchar;
  ALTER TABLE "trek" ADD COLUMN "contact_facebook" varchar;
  ALTER TABLE "creatives_skill_categories_items" ADD CONSTRAINT "creatives_skill_categories_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."creatives_skill_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "creatives_projects_tech_stack" ADD CONSTRAINT "creatives_projects_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."creatives_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "creatives_projects" ADD CONSTRAINT "creatives_projects_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "creatives_packages_features" ADD CONSTRAINT "creatives_packages_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."creatives_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "creatives_hero_description" ADD CONSTRAINT "creatives_hero_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."creatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "creatives_nav" ADD CONSTRAINT "creatives_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."creatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "creatives_stats" ADD CONSTRAINT "creatives_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."creatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "creatives" ADD CONSTRAINT "creatives_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "creatives_experiences_updated_at_idx" ON "creatives_experiences" USING btree ("updated_at");
  CREATE INDEX "creatives_experiences_created_at_idx" ON "creatives_experiences" USING btree ("created_at");
  CREATE INDEX "creatives_skill_categories_items_order_idx" ON "creatives_skill_categories_items" USING btree ("_order");
  CREATE INDEX "creatives_skill_categories_items_parent_id_idx" ON "creatives_skill_categories_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "creatives_skill_categories_key_idx" ON "creatives_skill_categories" USING btree ("key");
  CREATE INDEX "creatives_skill_categories_updated_at_idx" ON "creatives_skill_categories" USING btree ("updated_at");
  CREATE INDEX "creatives_skill_categories_created_at_idx" ON "creatives_skill_categories" USING btree ("created_at");
  CREATE INDEX "creatives_expertise_updated_at_idx" ON "creatives_expertise" USING btree ("updated_at");
  CREATE INDEX "creatives_expertise_created_at_idx" ON "creatives_expertise" USING btree ("created_at");
  CREATE INDEX "creatives_projects_tech_stack_order_idx" ON "creatives_projects_tech_stack" USING btree ("_order");
  CREATE INDEX "creatives_projects_tech_stack_parent_id_idx" ON "creatives_projects_tech_stack" USING btree ("_parent_id");
  CREATE INDEX "creatives_projects_image_idx" ON "creatives_projects" USING btree ("image_id");
  CREATE INDEX "creatives_projects_updated_at_idx" ON "creatives_projects" USING btree ("updated_at");
  CREATE INDEX "creatives_projects_created_at_idx" ON "creatives_projects" USING btree ("created_at");
  CREATE INDEX "creatives_publications_updated_at_idx" ON "creatives_publications" USING btree ("updated_at");
  CREATE INDEX "creatives_publications_created_at_idx" ON "creatives_publications" USING btree ("created_at");
  CREATE INDEX "creatives_photos_updated_at_idx" ON "creatives_photos" USING btree ("updated_at");
  CREATE INDEX "creatives_photos_created_at_idx" ON "creatives_photos" USING btree ("created_at");
  CREATE UNIQUE INDEX "creatives_photos_filename_idx" ON "creatives_photos" USING btree ("filename");
  CREATE INDEX "creatives_videos_updated_at_idx" ON "creatives_videos" USING btree ("updated_at");
  CREATE INDEX "creatives_videos_created_at_idx" ON "creatives_videos" USING btree ("created_at");
  CREATE INDEX "creatives_services_updated_at_idx" ON "creatives_services" USING btree ("updated_at");
  CREATE INDEX "creatives_services_created_at_idx" ON "creatives_services" USING btree ("created_at");
  CREATE INDEX "creatives_packages_features_order_idx" ON "creatives_packages_features" USING btree ("_order");
  CREATE INDEX "creatives_packages_features_parent_id_idx" ON "creatives_packages_features" USING btree ("_parent_id");
  CREATE INDEX "creatives_packages_updated_at_idx" ON "creatives_packages" USING btree ("updated_at");
  CREATE INDEX "creatives_packages_created_at_idx" ON "creatives_packages" USING btree ("created_at");
  CREATE INDEX "creatives_reviews_updated_at_idx" ON "creatives_reviews" USING btree ("updated_at");
  CREATE INDEX "creatives_reviews_created_at_idx" ON "creatives_reviews" USING btree ("created_at");
  CREATE INDEX "creatives_hero_description_order_idx" ON "creatives_hero_description" USING btree ("_order");
  CREATE INDEX "creatives_hero_description_parent_id_idx" ON "creatives_hero_description" USING btree ("_parent_id");
  CREATE INDEX "creatives_nav_order_idx" ON "creatives_nav" USING btree ("_order");
  CREATE INDEX "creatives_nav_parent_id_idx" ON "creatives_nav" USING btree ("_parent_id");
  CREATE INDEX "creatives_stats_order_idx" ON "creatives_stats" USING btree ("_order");
  CREATE INDEX "creatives_stats_parent_id_idx" ON "creatives_stats" USING btree ("_parent_id");
  CREATE INDEX "creatives_image_idx" ON "creatives" USING btree ("image_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_creatives_experiences_fk" FOREIGN KEY ("creatives_experiences_id") REFERENCES "public"."creatives_experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_creatives_skill_categories_fk" FOREIGN KEY ("creatives_skill_categories_id") REFERENCES "public"."creatives_skill_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_creatives_expertise_fk" FOREIGN KEY ("creatives_expertise_id") REFERENCES "public"."creatives_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_creatives_projects_fk" FOREIGN KEY ("creatives_projects_id") REFERENCES "public"."creatives_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_creatives_publications_fk" FOREIGN KEY ("creatives_publications_id") REFERENCES "public"."creatives_publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_creatives_photos_fk" FOREIGN KEY ("creatives_photos_id") REFERENCES "public"."creatives_photos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_creatives_videos_fk" FOREIGN KEY ("creatives_videos_id") REFERENCES "public"."creatives_videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_creatives_services_fk" FOREIGN KEY ("creatives_services_id") REFERENCES "public"."creatives_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_creatives_packages_fk" FOREIGN KEY ("creatives_packages_id") REFERENCES "public"."creatives_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_creatives_reviews_fk" FOREIGN KEY ("creatives_reviews_id") REFERENCES "public"."creatives_reviews"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_creatives_experiences_id_idx" ON "payload_locked_documents_rels" USING btree ("creatives_experiences_id");
  CREATE INDEX "payload_locked_documents_rels_creatives_skill_categories_idx" ON "payload_locked_documents_rels" USING btree ("creatives_skill_categories_id");
  CREATE INDEX "payload_locked_documents_rels_creatives_expertise_id_idx" ON "payload_locked_documents_rels" USING btree ("creatives_expertise_id");
  CREATE INDEX "payload_locked_documents_rels_creatives_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("creatives_projects_id");
  CREATE INDEX "payload_locked_documents_rels_creatives_publications_id_idx" ON "payload_locked_documents_rels" USING btree ("creatives_publications_id");
  CREATE INDEX "payload_locked_documents_rels_creatives_photos_id_idx" ON "payload_locked_documents_rels" USING btree ("creatives_photos_id");
  CREATE INDEX "payload_locked_documents_rels_creatives_videos_id_idx" ON "payload_locked_documents_rels" USING btree ("creatives_videos_id");
  CREATE INDEX "payload_locked_documents_rels_creatives_services_id_idx" ON "payload_locked_documents_rels" USING btree ("creatives_services_id");
  CREATE INDEX "payload_locked_documents_rels_creatives_packages_id_idx" ON "payload_locked_documents_rels" USING btree ("creatives_packages_id");
  CREATE INDEX "payload_locked_documents_rels_creatives_reviews_id_idx" ON "payload_locked_documents_rels" USING btree ("creatives_reviews_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "creatives_experiences" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "creatives_skill_categories_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "creatives_skill_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "creatives_expertise" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "creatives_projects_tech_stack" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "creatives_projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "creatives_publications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "creatives_photos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "creatives_videos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "creatives_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "creatives_packages_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "creatives_packages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "creatives_reviews" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "creatives_hero_description" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "creatives_nav" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "creatives_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "creatives" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "creatives_experiences" CASCADE;
  DROP TABLE "creatives_skill_categories_items" CASCADE;
  DROP TABLE "creatives_skill_categories" CASCADE;
  DROP TABLE "creatives_expertise" CASCADE;
  DROP TABLE "creatives_projects_tech_stack" CASCADE;
  DROP TABLE "creatives_projects" CASCADE;
  DROP TABLE "creatives_publications" CASCADE;
  DROP TABLE "creatives_photos" CASCADE;
  DROP TABLE "creatives_videos" CASCADE;
  DROP TABLE "creatives_services" CASCADE;
  DROP TABLE "creatives_packages_features" CASCADE;
  DROP TABLE "creatives_packages" CASCADE;
  DROP TABLE "creatives_reviews" CASCADE;
  DROP TABLE "creatives_hero_description" CASCADE;
  DROP TABLE "creatives_nav" CASCADE;
  DROP TABLE "creatives_stats" CASCADE;
  DROP TABLE "creatives" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_creatives_experiences_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_creatives_skill_categories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_creatives_expertise_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_creatives_projects_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_creatives_publications_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_creatives_photos_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_creatives_videos_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_creatives_services_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_creatives_packages_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_creatives_reviews_fk";
  
  DROP INDEX "payload_locked_documents_rels_creatives_experiences_id_idx";
  DROP INDEX "payload_locked_documents_rels_creatives_skill_categories_idx";
  DROP INDEX "payload_locked_documents_rels_creatives_expertise_id_idx";
  DROP INDEX "payload_locked_documents_rels_creatives_projects_id_idx";
  DROP INDEX "payload_locked_documents_rels_creatives_publications_id_idx";
  DROP INDEX "payload_locked_documents_rels_creatives_photos_id_idx";
  DROP INDEX "payload_locked_documents_rels_creatives_videos_id_idx";
  DROP INDEX "payload_locked_documents_rels_creatives_services_id_idx";
  DROP INDEX "payload_locked_documents_rels_creatives_packages_id_idx";
  DROP INDEX "payload_locked_documents_rels_creatives_reviews_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "creatives_experiences_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "creatives_skill_categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "creatives_expertise_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "creatives_projects_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "creatives_publications_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "creatives_photos_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "creatives_videos_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "creatives_services_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "creatives_packages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "creatives_reviews_id";
  ALTER TABLE "tech" DROP COLUMN "contact_instagram";
  ALTER TABLE "tech" DROP COLUMN "contact_youtube";
  ALTER TABLE "tech" DROP COLUMN "contact_facebook";
  ALTER TABLE "research" DROP COLUMN "contact_instagram";
  ALTER TABLE "research" DROP COLUMN "contact_youtube";
  ALTER TABLE "research" DROP COLUMN "contact_facebook";
  ALTER TABLE "trek" DROP COLUMN "contact_instagram";
  ALTER TABLE "trek" DROP COLUMN "contact_youtube";
  ALTER TABLE "trek" DROP COLUMN "contact_facebook";
  DROP TYPE "public"."enum_creatives_services_icon";`)
}
