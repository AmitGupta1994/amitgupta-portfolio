import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_voxelate_services_icon" AS ENUM('megaphone', 'palette', 'chart', 'camera', 'video', 'pen', 'search', 'globe');
  CREATE TABLE "voxelate_experiences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" varchar NOT NULL,
  	"company" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "voxelate_skill_categories_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"rating" numeric NOT NULL
  );
  
  CREATE TABLE "voxelate_skill_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"key" varchar NOT NULL,
  	"show" boolean DEFAULT true,
  	"priority" numeric DEFAULT 99 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "voxelate_expertise" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"domain" varchar NOT NULL,
  	"years" varchar,
  	"description" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "voxelate_projects_tech_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "voxelate_projects" (
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
  
  CREATE TABLE "voxelate_publications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"authors" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"publisher" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "voxelate_photos" (
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
  
  CREATE TABLE "voxelate_videos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"album" varchar,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "voxelate_services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"icon" "enum_voxelate_services_icon" DEFAULT 'megaphone' NOT NULL,
  	"description" varchar NOT NULL,
  	"details" varchar,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "voxelate_packages_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "voxelate_packages" (
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
  
  CREATE TABLE "voxelate_reviews" (
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
  
  CREATE TABLE "voxelate_team" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"bio" varchar,
  	"photo_id" integer,
  	"photo_url" varchar,
  	"linkedin" varchar,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "voxelate_clients" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"website" varchar,
  	"logo_id" integer,
  	"logo_url" varchar,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "voxelate_hero_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"highlight" boolean DEFAULT false
  );
  
  CREATE TABLE "voxelate_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "voxelate_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "voxelate" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Voxelate' NOT NULL,
  	"tagline" varchar DEFAULT 'Digital marketing & branding company',
  	"name" varchar DEFAULT 'Voxelate' NOT NULL,
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
  	"summary" varchar DEFAULT 'Voxelate is a digital marketing and branding company. Our team of strategists, designers and creators builds brands people remember and campaigns that pay for themselves.' NOT NULL,
  	"hero_title" varchar DEFAULT 'Brands built to be remembered' NOT NULL,
  	"hero_cta_label" varchar DEFAULT 'Start a project' NOT NULL,
  	"hero_cta_href" varchar DEFAULT '/#contact' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"company_legal_name" varchar,
  	"company_founded" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "creatives" ALTER COLUMN "tagline" SET DEFAULT 'Digital marketing & branding';
  ALTER TABLE "creatives" ALTER COLUMN "summary" SET DEFAULT 'I help businesses build brands people remember and campaigns that pay for themselves — strategy, identity, content and performance marketing, done hands-on.';
  ALTER TABLE "creatives" ALTER COLUMN "hero_cta_label" SET DEFAULT 'Work with me';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "voxelate_experiences_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "voxelate_skill_categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "voxelate_expertise_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "voxelate_projects_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "voxelate_publications_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "voxelate_photos_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "voxelate_videos_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "voxelate_services_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "voxelate_packages_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "voxelate_reviews_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "voxelate_team_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "voxelate_clients_id" integer;
  ALTER TABLE "voxelate_skill_categories_items" ADD CONSTRAINT "voxelate_skill_categories_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."voxelate_skill_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "voxelate_projects_tech_stack" ADD CONSTRAINT "voxelate_projects_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."voxelate_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "voxelate_projects" ADD CONSTRAINT "voxelate_projects_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "voxelate_packages_features" ADD CONSTRAINT "voxelate_packages_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."voxelate_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "voxelate_team" ADD CONSTRAINT "voxelate_team_photo_id_voxelate_photos_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."voxelate_photos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "voxelate_clients" ADD CONSTRAINT "voxelate_clients_logo_id_voxelate_photos_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."voxelate_photos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "voxelate_hero_description" ADD CONSTRAINT "voxelate_hero_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."voxelate"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "voxelate_nav" ADD CONSTRAINT "voxelate_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."voxelate"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "voxelate_stats" ADD CONSTRAINT "voxelate_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."voxelate"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "voxelate" ADD CONSTRAINT "voxelate_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "voxelate_experiences_updated_at_idx" ON "voxelate_experiences" USING btree ("updated_at");
  CREATE INDEX "voxelate_experiences_created_at_idx" ON "voxelate_experiences" USING btree ("created_at");
  CREATE INDEX "voxelate_skill_categories_items_order_idx" ON "voxelate_skill_categories_items" USING btree ("_order");
  CREATE INDEX "voxelate_skill_categories_items_parent_id_idx" ON "voxelate_skill_categories_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "voxelate_skill_categories_key_idx" ON "voxelate_skill_categories" USING btree ("key");
  CREATE INDEX "voxelate_skill_categories_updated_at_idx" ON "voxelate_skill_categories" USING btree ("updated_at");
  CREATE INDEX "voxelate_skill_categories_created_at_idx" ON "voxelate_skill_categories" USING btree ("created_at");
  CREATE INDEX "voxelate_expertise_updated_at_idx" ON "voxelate_expertise" USING btree ("updated_at");
  CREATE INDEX "voxelate_expertise_created_at_idx" ON "voxelate_expertise" USING btree ("created_at");
  CREATE INDEX "voxelate_projects_tech_stack_order_idx" ON "voxelate_projects_tech_stack" USING btree ("_order");
  CREATE INDEX "voxelate_projects_tech_stack_parent_id_idx" ON "voxelate_projects_tech_stack" USING btree ("_parent_id");
  CREATE INDEX "voxelate_projects_image_idx" ON "voxelate_projects" USING btree ("image_id");
  CREATE INDEX "voxelate_projects_updated_at_idx" ON "voxelate_projects" USING btree ("updated_at");
  CREATE INDEX "voxelate_projects_created_at_idx" ON "voxelate_projects" USING btree ("created_at");
  CREATE INDEX "voxelate_publications_updated_at_idx" ON "voxelate_publications" USING btree ("updated_at");
  CREATE INDEX "voxelate_publications_created_at_idx" ON "voxelate_publications" USING btree ("created_at");
  CREATE INDEX "voxelate_photos_updated_at_idx" ON "voxelate_photos" USING btree ("updated_at");
  CREATE INDEX "voxelate_photos_created_at_idx" ON "voxelate_photos" USING btree ("created_at");
  CREATE UNIQUE INDEX "voxelate_photos_filename_idx" ON "voxelate_photos" USING btree ("filename");
  CREATE INDEX "voxelate_videos_updated_at_idx" ON "voxelate_videos" USING btree ("updated_at");
  CREATE INDEX "voxelate_videos_created_at_idx" ON "voxelate_videos" USING btree ("created_at");
  CREATE INDEX "voxelate_services_updated_at_idx" ON "voxelate_services" USING btree ("updated_at");
  CREATE INDEX "voxelate_services_created_at_idx" ON "voxelate_services" USING btree ("created_at");
  CREATE INDEX "voxelate_packages_features_order_idx" ON "voxelate_packages_features" USING btree ("_order");
  CREATE INDEX "voxelate_packages_features_parent_id_idx" ON "voxelate_packages_features" USING btree ("_parent_id");
  CREATE INDEX "voxelate_packages_updated_at_idx" ON "voxelate_packages" USING btree ("updated_at");
  CREATE INDEX "voxelate_packages_created_at_idx" ON "voxelate_packages" USING btree ("created_at");
  CREATE INDEX "voxelate_reviews_updated_at_idx" ON "voxelate_reviews" USING btree ("updated_at");
  CREATE INDEX "voxelate_reviews_created_at_idx" ON "voxelate_reviews" USING btree ("created_at");
  CREATE INDEX "voxelate_team_photo_idx" ON "voxelate_team" USING btree ("photo_id");
  CREATE INDEX "voxelate_team_updated_at_idx" ON "voxelate_team" USING btree ("updated_at");
  CREATE INDEX "voxelate_team_created_at_idx" ON "voxelate_team" USING btree ("created_at");
  CREATE INDEX "voxelate_clients_logo_idx" ON "voxelate_clients" USING btree ("logo_id");
  CREATE INDEX "voxelate_clients_updated_at_idx" ON "voxelate_clients" USING btree ("updated_at");
  CREATE INDEX "voxelate_clients_created_at_idx" ON "voxelate_clients" USING btree ("created_at");
  CREATE INDEX "voxelate_hero_description_order_idx" ON "voxelate_hero_description" USING btree ("_order");
  CREATE INDEX "voxelate_hero_description_parent_id_idx" ON "voxelate_hero_description" USING btree ("_parent_id");
  CREATE INDEX "voxelate_nav_order_idx" ON "voxelate_nav" USING btree ("_order");
  CREATE INDEX "voxelate_nav_parent_id_idx" ON "voxelate_nav" USING btree ("_parent_id");
  CREATE INDEX "voxelate_stats_order_idx" ON "voxelate_stats" USING btree ("_order");
  CREATE INDEX "voxelate_stats_parent_id_idx" ON "voxelate_stats" USING btree ("_parent_id");
  CREATE INDEX "voxelate_image_idx" ON "voxelate" USING btree ("image_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_voxelate_experiences_fk" FOREIGN KEY ("voxelate_experiences_id") REFERENCES "public"."voxelate_experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_voxelate_skill_categories_fk" FOREIGN KEY ("voxelate_skill_categories_id") REFERENCES "public"."voxelate_skill_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_voxelate_expertise_fk" FOREIGN KEY ("voxelate_expertise_id") REFERENCES "public"."voxelate_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_voxelate_projects_fk" FOREIGN KEY ("voxelate_projects_id") REFERENCES "public"."voxelate_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_voxelate_publications_fk" FOREIGN KEY ("voxelate_publications_id") REFERENCES "public"."voxelate_publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_voxelate_photos_fk" FOREIGN KEY ("voxelate_photos_id") REFERENCES "public"."voxelate_photos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_voxelate_videos_fk" FOREIGN KEY ("voxelate_videos_id") REFERENCES "public"."voxelate_videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_voxelate_services_fk" FOREIGN KEY ("voxelate_services_id") REFERENCES "public"."voxelate_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_voxelate_packages_fk" FOREIGN KEY ("voxelate_packages_id") REFERENCES "public"."voxelate_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_voxelate_reviews_fk" FOREIGN KEY ("voxelate_reviews_id") REFERENCES "public"."voxelate_reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_voxelate_team_fk" FOREIGN KEY ("voxelate_team_id") REFERENCES "public"."voxelate_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_voxelate_clients_fk" FOREIGN KEY ("voxelate_clients_id") REFERENCES "public"."voxelate_clients"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_voxelate_experiences_id_idx" ON "payload_locked_documents_rels" USING btree ("voxelate_experiences_id");
  CREATE INDEX "payload_locked_documents_rels_voxelate_skill_categories__idx" ON "payload_locked_documents_rels" USING btree ("voxelate_skill_categories_id");
  CREATE INDEX "payload_locked_documents_rels_voxelate_expertise_id_idx" ON "payload_locked_documents_rels" USING btree ("voxelate_expertise_id");
  CREATE INDEX "payload_locked_documents_rels_voxelate_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("voxelate_projects_id");
  CREATE INDEX "payload_locked_documents_rels_voxelate_publications_id_idx" ON "payload_locked_documents_rels" USING btree ("voxelate_publications_id");
  CREATE INDEX "payload_locked_documents_rels_voxelate_photos_id_idx" ON "payload_locked_documents_rels" USING btree ("voxelate_photos_id");
  CREATE INDEX "payload_locked_documents_rels_voxelate_videos_id_idx" ON "payload_locked_documents_rels" USING btree ("voxelate_videos_id");
  CREATE INDEX "payload_locked_documents_rels_voxelate_services_id_idx" ON "payload_locked_documents_rels" USING btree ("voxelate_services_id");
  CREATE INDEX "payload_locked_documents_rels_voxelate_packages_id_idx" ON "payload_locked_documents_rels" USING btree ("voxelate_packages_id");
  CREATE INDEX "payload_locked_documents_rels_voxelate_reviews_id_idx" ON "payload_locked_documents_rels" USING btree ("voxelate_reviews_id");
  CREATE INDEX "payload_locked_documents_rels_voxelate_team_id_idx" ON "payload_locked_documents_rels" USING btree ("voxelate_team_id");
  CREATE INDEX "payload_locked_documents_rels_voxelate_clients_id_idx" ON "payload_locked_documents_rels" USING btree ("voxelate_clients_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "voxelate_experiences" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "voxelate_skill_categories_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "voxelate_skill_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "voxelate_expertise" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "voxelate_projects_tech_stack" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "voxelate_projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "voxelate_publications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "voxelate_photos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "voxelate_videos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "voxelate_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "voxelate_packages_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "voxelate_packages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "voxelate_reviews" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "voxelate_team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "voxelate_clients" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "voxelate_hero_description" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "voxelate_nav" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "voxelate_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "voxelate" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "voxelate_experiences" CASCADE;
  DROP TABLE "voxelate_skill_categories_items" CASCADE;
  DROP TABLE "voxelate_skill_categories" CASCADE;
  DROP TABLE "voxelate_expertise" CASCADE;
  DROP TABLE "voxelate_projects_tech_stack" CASCADE;
  DROP TABLE "voxelate_projects" CASCADE;
  DROP TABLE "voxelate_publications" CASCADE;
  DROP TABLE "voxelate_photos" CASCADE;
  DROP TABLE "voxelate_videos" CASCADE;
  DROP TABLE "voxelate_services" CASCADE;
  DROP TABLE "voxelate_packages_features" CASCADE;
  DROP TABLE "voxelate_packages" CASCADE;
  DROP TABLE "voxelate_reviews" CASCADE;
  DROP TABLE "voxelate_team" CASCADE;
  DROP TABLE "voxelate_clients" CASCADE;
  DROP TABLE "voxelate_hero_description" CASCADE;
  DROP TABLE "voxelate_nav" CASCADE;
  DROP TABLE "voxelate_stats" CASCADE;
  DROP TABLE "voxelate" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_voxelate_experiences_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_voxelate_skill_categories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_voxelate_expertise_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_voxelate_projects_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_voxelate_publications_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_voxelate_photos_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_voxelate_videos_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_voxelate_services_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_voxelate_packages_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_voxelate_reviews_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_voxelate_team_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_voxelate_clients_fk";
  
  DROP INDEX "payload_locked_documents_rels_voxelate_experiences_id_idx";
  DROP INDEX "payload_locked_documents_rels_voxelate_skill_categories__idx";
  DROP INDEX "payload_locked_documents_rels_voxelate_expertise_id_idx";
  DROP INDEX "payload_locked_documents_rels_voxelate_projects_id_idx";
  DROP INDEX "payload_locked_documents_rels_voxelate_publications_id_idx";
  DROP INDEX "payload_locked_documents_rels_voxelate_photos_id_idx";
  DROP INDEX "payload_locked_documents_rels_voxelate_videos_id_idx";
  DROP INDEX "payload_locked_documents_rels_voxelate_services_id_idx";
  DROP INDEX "payload_locked_documents_rels_voxelate_packages_id_idx";
  DROP INDEX "payload_locked_documents_rels_voxelate_reviews_id_idx";
  DROP INDEX "payload_locked_documents_rels_voxelate_team_id_idx";
  DROP INDEX "payload_locked_documents_rels_voxelate_clients_id_idx";
  ALTER TABLE "creatives" ALTER COLUMN "tagline" SET DEFAULT 'Digital marketing & branding studio';
  ALTER TABLE "creatives" ALTER COLUMN "summary" SET DEFAULT 'We build brands people remember and campaigns that pay for themselves — strategy, identity, content and performance marketing under one roof.';
  ALTER TABLE "creatives" ALTER COLUMN "hero_cta_label" SET DEFAULT 'Get started';
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "voxelate_experiences_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "voxelate_skill_categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "voxelate_expertise_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "voxelate_projects_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "voxelate_publications_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "voxelate_photos_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "voxelate_videos_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "voxelate_services_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "voxelate_packages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "voxelate_reviews_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "voxelate_team_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "voxelate_clients_id";
  DROP TYPE "public"."enum_voxelate_services_icon";`)
}
