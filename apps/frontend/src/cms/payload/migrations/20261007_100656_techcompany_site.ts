import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_techcompany_services_icon" AS ENUM('megaphone', 'palette', 'chart', 'camera', 'video', 'pen', 'search', 'globe', 'code', 'mobile', 'sparkles', 'cpu', 'layers', 'server');
  CREATE TYPE "public"."enum_techcompany_products_status" AS ENUM('live', 'beta', 'building');
  ALTER TYPE "public"."enum_creatives_services_icon" ADD VALUE 'code';
  ALTER TYPE "public"."enum_creatives_services_icon" ADD VALUE 'mobile';
  ALTER TYPE "public"."enum_creatives_services_icon" ADD VALUE 'sparkles';
  ALTER TYPE "public"."enum_creatives_services_icon" ADD VALUE 'cpu';
  ALTER TYPE "public"."enum_creatives_services_icon" ADD VALUE 'layers';
  ALTER TYPE "public"."enum_creatives_services_icon" ADD VALUE 'server';
  ALTER TYPE "public"."enum_voxelate_services_icon" ADD VALUE 'code';
  ALTER TYPE "public"."enum_voxelate_services_icon" ADD VALUE 'mobile';
  ALTER TYPE "public"."enum_voxelate_services_icon" ADD VALUE 'sparkles';
  ALTER TYPE "public"."enum_voxelate_services_icon" ADD VALUE 'cpu';
  ALTER TYPE "public"."enum_voxelate_services_icon" ADD VALUE 'layers';
  ALTER TYPE "public"."enum_voxelate_services_icon" ADD VALUE 'server';
  CREATE TABLE "techcompany_experiences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" varchar NOT NULL,
  	"company" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "techcompany_skill_categories_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"rating" numeric NOT NULL
  );
  
  CREATE TABLE "techcompany_skill_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"key" varchar NOT NULL,
  	"show" boolean DEFAULT true,
  	"priority" numeric DEFAULT 99 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "techcompany_expertise" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"domain" varchar NOT NULL,
  	"years" varchar,
  	"description" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "techcompany_projects_tech_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "techcompany_projects" (
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
  
  CREATE TABLE "techcompany_publications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"authors" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"publisher" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "techcompany_photos" (
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
  
  CREATE TABLE "techcompany_videos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"album" varchar,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "techcompany_services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"icon" "enum_techcompany_services_icon" DEFAULT 'megaphone' NOT NULL,
  	"description" varchar NOT NULL,
  	"details" varchar,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "techcompany_packages_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "techcompany_packages" (
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
  
  CREATE TABLE "techcompany_products_tech_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "techcompany_products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"status" "enum_techcompany_products_status" DEFAULT 'building' NOT NULL,
  	"tagline" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"url" varchar,
  	"image_id" integer,
  	"image_url" varchar,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "techcompany_reviews" (
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
  
  CREATE TABLE "techcompany_hero_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"highlight" boolean DEFAULT false
  );
  
  CREATE TABLE "techcompany_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "techcompany_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "techcompany_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "techcompany" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'TechCompany' NOT NULL,
  	"tagline" varchar DEFAULT 'Software development company',
  	"name" varchar DEFAULT 'TechCompany' NOT NULL,
  	"headline" varchar DEFAULT 'Software Development Company' NOT NULL,
  	"image_id" integer,
  	"image_url" varchar DEFAULT '/techcompany/logo.png',
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
  	"summary" varchar DEFAULT 'We are a software development company that designs, builds and runs <strong>scalable web and mobile products</strong>, <strong>AI systems</strong> and the cloud infrastructure under them. Clients hire us as dedicated engineers at a fixed monthly rate, by the hour, or to deliver an outsourced project end to end — and we build and ship products of our own.' NOT NULL,
  	"hero_title" varchar DEFAULT 'Software built to scale' NOT NULL,
  	"hero_cta_label" varchar DEFAULT 'Start a project' NOT NULL,
  	"hero_cta_href" varchar DEFAULT '/#contact' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"company_legal_name" varchar,
  	"company_founded" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "voxelate" ALTER COLUMN "image_url" SET DEFAULT '/voxelate/logo-mark.jpg';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "techcompany_experiences_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "techcompany_skill_categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "techcompany_expertise_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "techcompany_projects_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "techcompany_publications_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "techcompany_photos_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "techcompany_videos_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "techcompany_services_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "techcompany_packages_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "techcompany_products_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "techcompany_reviews_id" integer;
  ALTER TABLE "techcompany_skill_categories_items" ADD CONSTRAINT "techcompany_skill_categories_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."techcompany_skill_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "techcompany_projects_tech_stack" ADD CONSTRAINT "techcompany_projects_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."techcompany_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "techcompany_projects" ADD CONSTRAINT "techcompany_projects_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "techcompany_packages_features" ADD CONSTRAINT "techcompany_packages_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."techcompany_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "techcompany_products_tech_stack" ADD CONSTRAINT "techcompany_products_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."techcompany_products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "techcompany_products" ADD CONSTRAINT "techcompany_products_image_id_techcompany_photos_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."techcompany_photos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "techcompany_hero_description" ADD CONSTRAINT "techcompany_hero_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."techcompany"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "techcompany_nav" ADD CONSTRAINT "techcompany_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."techcompany"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "techcompany_stats" ADD CONSTRAINT "techcompany_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."techcompany"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "techcompany_process" ADD CONSTRAINT "techcompany_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."techcompany"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "techcompany" ADD CONSTRAINT "techcompany_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "techcompany_experiences_updated_at_idx" ON "techcompany_experiences" USING btree ("updated_at");
  CREATE INDEX "techcompany_experiences_created_at_idx" ON "techcompany_experiences" USING btree ("created_at");
  CREATE INDEX "techcompany_skill_categories_items_order_idx" ON "techcompany_skill_categories_items" USING btree ("_order");
  CREATE INDEX "techcompany_skill_categories_items_parent_id_idx" ON "techcompany_skill_categories_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "techcompany_skill_categories_key_idx" ON "techcompany_skill_categories" USING btree ("key");
  CREATE INDEX "techcompany_skill_categories_updated_at_idx" ON "techcompany_skill_categories" USING btree ("updated_at");
  CREATE INDEX "techcompany_skill_categories_created_at_idx" ON "techcompany_skill_categories" USING btree ("created_at");
  CREATE INDEX "techcompany_expertise_updated_at_idx" ON "techcompany_expertise" USING btree ("updated_at");
  CREATE INDEX "techcompany_expertise_created_at_idx" ON "techcompany_expertise" USING btree ("created_at");
  CREATE INDEX "techcompany_projects_tech_stack_order_idx" ON "techcompany_projects_tech_stack" USING btree ("_order");
  CREATE INDEX "techcompany_projects_tech_stack_parent_id_idx" ON "techcompany_projects_tech_stack" USING btree ("_parent_id");
  CREATE INDEX "techcompany_projects_image_idx" ON "techcompany_projects" USING btree ("image_id");
  CREATE INDEX "techcompany_projects_updated_at_idx" ON "techcompany_projects" USING btree ("updated_at");
  CREATE INDEX "techcompany_projects_created_at_idx" ON "techcompany_projects" USING btree ("created_at");
  CREATE INDEX "techcompany_publications_updated_at_idx" ON "techcompany_publications" USING btree ("updated_at");
  CREATE INDEX "techcompany_publications_created_at_idx" ON "techcompany_publications" USING btree ("created_at");
  CREATE INDEX "techcompany_photos_updated_at_idx" ON "techcompany_photos" USING btree ("updated_at");
  CREATE INDEX "techcompany_photos_created_at_idx" ON "techcompany_photos" USING btree ("created_at");
  CREATE UNIQUE INDEX "techcompany_photos_filename_idx" ON "techcompany_photos" USING btree ("filename");
  CREATE INDEX "techcompany_videos_updated_at_idx" ON "techcompany_videos" USING btree ("updated_at");
  CREATE INDEX "techcompany_videos_created_at_idx" ON "techcompany_videos" USING btree ("created_at");
  CREATE INDEX "techcompany_services_updated_at_idx" ON "techcompany_services" USING btree ("updated_at");
  CREATE INDEX "techcompany_services_created_at_idx" ON "techcompany_services" USING btree ("created_at");
  CREATE INDEX "techcompany_packages_features_order_idx" ON "techcompany_packages_features" USING btree ("_order");
  CREATE INDEX "techcompany_packages_features_parent_id_idx" ON "techcompany_packages_features" USING btree ("_parent_id");
  CREATE INDEX "techcompany_packages_updated_at_idx" ON "techcompany_packages" USING btree ("updated_at");
  CREATE INDEX "techcompany_packages_created_at_idx" ON "techcompany_packages" USING btree ("created_at");
  CREATE INDEX "techcompany_products_tech_stack_order_idx" ON "techcompany_products_tech_stack" USING btree ("_order");
  CREATE INDEX "techcompany_products_tech_stack_parent_id_idx" ON "techcompany_products_tech_stack" USING btree ("_parent_id");
  CREATE INDEX "techcompany_products_image_idx" ON "techcompany_products" USING btree ("image_id");
  CREATE INDEX "techcompany_products_updated_at_idx" ON "techcompany_products" USING btree ("updated_at");
  CREATE INDEX "techcompany_products_created_at_idx" ON "techcompany_products" USING btree ("created_at");
  CREATE INDEX "techcompany_reviews_updated_at_idx" ON "techcompany_reviews" USING btree ("updated_at");
  CREATE INDEX "techcompany_reviews_created_at_idx" ON "techcompany_reviews" USING btree ("created_at");
  CREATE INDEX "techcompany_hero_description_order_idx" ON "techcompany_hero_description" USING btree ("_order");
  CREATE INDEX "techcompany_hero_description_parent_id_idx" ON "techcompany_hero_description" USING btree ("_parent_id");
  CREATE INDEX "techcompany_nav_order_idx" ON "techcompany_nav" USING btree ("_order");
  CREATE INDEX "techcompany_nav_parent_id_idx" ON "techcompany_nav" USING btree ("_parent_id");
  CREATE INDEX "techcompany_stats_order_idx" ON "techcompany_stats" USING btree ("_order");
  CREATE INDEX "techcompany_stats_parent_id_idx" ON "techcompany_stats" USING btree ("_parent_id");
  CREATE INDEX "techcompany_process_order_idx" ON "techcompany_process" USING btree ("_order");
  CREATE INDEX "techcompany_process_parent_id_idx" ON "techcompany_process" USING btree ("_parent_id");
  CREATE INDEX "techcompany_image_idx" ON "techcompany" USING btree ("image_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_techcompany_experiences_fk" FOREIGN KEY ("techcompany_experiences_id") REFERENCES "public"."techcompany_experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_techcompany_skill_categorie_fk" FOREIGN KEY ("techcompany_skill_categories_id") REFERENCES "public"."techcompany_skill_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_techcompany_expertise_fk" FOREIGN KEY ("techcompany_expertise_id") REFERENCES "public"."techcompany_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_techcompany_projects_fk" FOREIGN KEY ("techcompany_projects_id") REFERENCES "public"."techcompany_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_techcompany_publications_fk" FOREIGN KEY ("techcompany_publications_id") REFERENCES "public"."techcompany_publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_techcompany_photos_fk" FOREIGN KEY ("techcompany_photos_id") REFERENCES "public"."techcompany_photos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_techcompany_videos_fk" FOREIGN KEY ("techcompany_videos_id") REFERENCES "public"."techcompany_videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_techcompany_services_fk" FOREIGN KEY ("techcompany_services_id") REFERENCES "public"."techcompany_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_techcompany_packages_fk" FOREIGN KEY ("techcompany_packages_id") REFERENCES "public"."techcompany_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_techcompany_products_fk" FOREIGN KEY ("techcompany_products_id") REFERENCES "public"."techcompany_products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_techcompany_reviews_fk" FOREIGN KEY ("techcompany_reviews_id") REFERENCES "public"."techcompany_reviews"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_techcompany_experiences_id_idx" ON "payload_locked_documents_rels" USING btree ("techcompany_experiences_id");
  CREATE INDEX "payload_locked_documents_rels_techcompany_skill_categori_idx" ON "payload_locked_documents_rels" USING btree ("techcompany_skill_categories_id");
  CREATE INDEX "payload_locked_documents_rels_techcompany_expertise_id_idx" ON "payload_locked_documents_rels" USING btree ("techcompany_expertise_id");
  CREATE INDEX "payload_locked_documents_rels_techcompany_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("techcompany_projects_id");
  CREATE INDEX "payload_locked_documents_rels_techcompany_publications_i_idx" ON "payload_locked_documents_rels" USING btree ("techcompany_publications_id");
  CREATE INDEX "payload_locked_documents_rels_techcompany_photos_id_idx" ON "payload_locked_documents_rels" USING btree ("techcompany_photos_id");
  CREATE INDEX "payload_locked_documents_rels_techcompany_videos_id_idx" ON "payload_locked_documents_rels" USING btree ("techcompany_videos_id");
  CREATE INDEX "payload_locked_documents_rels_techcompany_services_id_idx" ON "payload_locked_documents_rels" USING btree ("techcompany_services_id");
  CREATE INDEX "payload_locked_documents_rels_techcompany_packages_id_idx" ON "payload_locked_documents_rels" USING btree ("techcompany_packages_id");
  CREATE INDEX "payload_locked_documents_rels_techcompany_products_id_idx" ON "payload_locked_documents_rels" USING btree ("techcompany_products_id");
  CREATE INDEX "payload_locked_documents_rels_techcompany_reviews_id_idx" ON "payload_locked_documents_rels" USING btree ("techcompany_reviews_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "techcompany_experiences" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "techcompany_skill_categories_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "techcompany_skill_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "techcompany_expertise" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "techcompany_projects_tech_stack" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "techcompany_projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "techcompany_publications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "techcompany_photos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "techcompany_videos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "techcompany_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "techcompany_packages_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "techcompany_packages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "techcompany_products_tech_stack" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "techcompany_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "techcompany_reviews" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "techcompany_hero_description" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "techcompany_nav" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "techcompany_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "techcompany_process" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "techcompany" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "techcompany_experiences" CASCADE;
  DROP TABLE "techcompany_skill_categories_items" CASCADE;
  DROP TABLE "techcompany_skill_categories" CASCADE;
  DROP TABLE "techcompany_expertise" CASCADE;
  DROP TABLE "techcompany_projects_tech_stack" CASCADE;
  DROP TABLE "techcompany_projects" CASCADE;
  DROP TABLE "techcompany_publications" CASCADE;
  DROP TABLE "techcompany_photos" CASCADE;
  DROP TABLE "techcompany_videos" CASCADE;
  DROP TABLE "techcompany_services" CASCADE;
  DROP TABLE "techcompany_packages_features" CASCADE;
  DROP TABLE "techcompany_packages" CASCADE;
  DROP TABLE "techcompany_products_tech_stack" CASCADE;
  DROP TABLE "techcompany_products" CASCADE;
  DROP TABLE "techcompany_reviews" CASCADE;
  DROP TABLE "techcompany_hero_description" CASCADE;
  DROP TABLE "techcompany_nav" CASCADE;
  DROP TABLE "techcompany_stats" CASCADE;
  DROP TABLE "techcompany_process" CASCADE;
  DROP TABLE "techcompany" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_techcompany_experiences_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_techcompany_skill_categorie_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_techcompany_expertise_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_techcompany_projects_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_techcompany_publications_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_techcompany_photos_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_techcompany_videos_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_techcompany_services_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_techcompany_packages_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_techcompany_products_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_techcompany_reviews_fk";
  
  ALTER TABLE "creatives_services" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "creatives_services" ALTER COLUMN "icon" SET DEFAULT 'megaphone'::text;
  DROP TYPE "public"."enum_creatives_services_icon";
  CREATE TYPE "public"."enum_creatives_services_icon" AS ENUM('megaphone', 'palette', 'chart', 'camera', 'video', 'pen', 'search', 'globe');
  ALTER TABLE "creatives_services" ALTER COLUMN "icon" SET DEFAULT 'megaphone'::"public"."enum_creatives_services_icon";
  ALTER TABLE "creatives_services" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_creatives_services_icon" USING "icon"::"public"."enum_creatives_services_icon";
  ALTER TABLE "voxelate_services" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "voxelate_services" ALTER COLUMN "icon" SET DEFAULT 'megaphone'::text;
  DROP TYPE "public"."enum_voxelate_services_icon";
  CREATE TYPE "public"."enum_voxelate_services_icon" AS ENUM('megaphone', 'palette', 'chart', 'camera', 'video', 'pen', 'search', 'globe');
  ALTER TABLE "voxelate_services" ALTER COLUMN "icon" SET DEFAULT 'megaphone'::"public"."enum_voxelate_services_icon";
  ALTER TABLE "voxelate_services" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_voxelate_services_icon" USING "icon"::"public"."enum_voxelate_services_icon";
  DROP INDEX "payload_locked_documents_rels_techcompany_experiences_id_idx";
  DROP INDEX "payload_locked_documents_rels_techcompany_skill_categori_idx";
  DROP INDEX "payload_locked_documents_rels_techcompany_expertise_id_idx";
  DROP INDEX "payload_locked_documents_rels_techcompany_projects_id_idx";
  DROP INDEX "payload_locked_documents_rels_techcompany_publications_i_idx";
  DROP INDEX "payload_locked_documents_rels_techcompany_photos_id_idx";
  DROP INDEX "payload_locked_documents_rels_techcompany_videos_id_idx";
  DROP INDEX "payload_locked_documents_rels_techcompany_services_id_idx";
  DROP INDEX "payload_locked_documents_rels_techcompany_packages_id_idx";
  DROP INDEX "payload_locked_documents_rels_techcompany_products_id_idx";
  DROP INDEX "payload_locked_documents_rels_techcompany_reviews_id_idx";
  ALTER TABLE "voxelate" ALTER COLUMN "image_url" SET DEFAULT 'https://github.com/amitgupta1994.png';
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "techcompany_experiences_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "techcompany_skill_categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "techcompany_expertise_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "techcompany_projects_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "techcompany_publications_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "techcompany_photos_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "techcompany_videos_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "techcompany_services_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "techcompany_packages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "techcompany_products_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "techcompany_reviews_id";
  DROP TYPE "public"."enum_techcompany_services_icon";
  DROP TYPE "public"."enum_techcompany_products_status";`)
}
