import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_mokshyatrails_treks_departures_status" AS ENUM('available', 'limited', 'full');
  CREATE TYPE "public"."enum_mokshyatrails_treks_difficulty" AS ENUM('easy', 'moderate', 'challenging', 'strenuous');
  CREATE TYPE "public"."enum_mokshyatrails_bookings_status" AS ENUM('new', 'contacted', 'confirmed', 'cancelled');
  CREATE TABLE "mokshyatrails_experiences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" varchar NOT NULL,
  	"company" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "mokshyatrails_skill_categories_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"rating" numeric NOT NULL
  );
  
  CREATE TABLE "mokshyatrails_skill_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"key" varchar NOT NULL,
  	"show" boolean DEFAULT true,
  	"priority" numeric DEFAULT 99 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "mokshyatrails_expertise" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"domain" varchar NOT NULL,
  	"years" varchar,
  	"description" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "mokshyatrails_projects_tech_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "mokshyatrails_projects" (
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
  
  CREATE TABLE "mokshyatrails_publications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"authors" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"publisher" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "mokshyatrails_photos" (
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
  
  CREATE TABLE "mokshyatrails_videos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"album" varchar,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "mokshyatrails_treks_itinerary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "mokshyatrails_treks_includes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "mokshyatrails_treks_excludes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "mokshyatrails_treks_departures" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone,
  	"price" varchar,
  	"status" "enum_mokshyatrails_treks_departures_status" DEFAULT 'available' NOT NULL
  );
  
  CREATE TABLE "mokshyatrails_treks" (
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
  	"hero_image_url" varchar,
  	"difficulty" "enum_mokshyatrails_treks_difficulty" DEFAULT 'moderate',
  	"price_from" varchar,
  	"group_size" varchar,
  	"featured" boolean DEFAULT false,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "mokshyatrails_treks_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"mokshyatrails_photos_id" integer
  );
  
  CREATE TABLE "mokshyatrails_bookings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_mokshyatrails_bookings_status" DEFAULT 'new' NOT NULL,
  	"trek_id" integer,
  	"trek_title" varchar,
  	"departure" varchar NOT NULL,
  	"travellers" numeric NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"country" varchar,
  	"message" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "mokshyatrails_reviews" (
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
  
  CREATE TABLE "mokshyatrails_hero_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"highlight" boolean DEFAULT false
  );
  
  CREATE TABLE "mokshyatrails_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "mokshyatrails_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_url" varchar,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar
  );
  
  CREATE TABLE "mokshyatrails_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "mokshyatrails" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Mokshya Trails' NOT NULL,
  	"tagline" varchar DEFAULT 'Trekking company in Nepal',
  	"name" varchar DEFAULT 'Mokshya Trails' NOT NULL,
  	"headline" varchar DEFAULT 'Guided treks in the Himalaya' NOT NULL,
  	"image_id" integer,
  	"image_url" varchar DEFAULT '/mokshyatrails/logo.png',
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
  	"summary" varchar DEFAULT 'Mokshya Trails is a Nepal-based trekking company. Our licensed guides and porters lead small groups on the Himalaya''s classic routes and quieter valleys — with permits, lodges and logistics handled, so you can <strong>just walk</strong>.' NOT NULL,
  	"hero_title" varchar DEFAULT 'Walk the Himalaya with us' NOT NULL,
  	"hero_cta_label" varchar DEFAULT 'Plan your trek' NOT NULL,
  	"hero_cta_href" varchar DEFAULT '/#contact' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"company_legal_name" varchar,
  	"company_founded" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "mokshyatrails_experiences_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "mokshyatrails_skill_categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "mokshyatrails_expertise_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "mokshyatrails_projects_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "mokshyatrails_publications_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "mokshyatrails_photos_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "mokshyatrails_videos_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "mokshyatrails_treks_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "mokshyatrails_bookings_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "mokshyatrails_reviews_id" integer;
  ALTER TABLE "mokshyatrails_skill_categories_items" ADD CONSTRAINT "mokshyatrails_skill_categories_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mokshyatrails_skill_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mokshyatrails_projects_tech_stack" ADD CONSTRAINT "mokshyatrails_projects_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mokshyatrails_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mokshyatrails_projects" ADD CONSTRAINT "mokshyatrails_projects_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "mokshyatrails_treks_itinerary" ADD CONSTRAINT "mokshyatrails_treks_itinerary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mokshyatrails_treks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mokshyatrails_treks_includes" ADD CONSTRAINT "mokshyatrails_treks_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mokshyatrails_treks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mokshyatrails_treks_excludes" ADD CONSTRAINT "mokshyatrails_treks_excludes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mokshyatrails_treks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mokshyatrails_treks_departures" ADD CONSTRAINT "mokshyatrails_treks_departures_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mokshyatrails_treks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mokshyatrails_treks" ADD CONSTRAINT "mokshyatrails_treks_hero_image_id_mokshyatrails_photos_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."mokshyatrails_photos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "mokshyatrails_treks_rels" ADD CONSTRAINT "mokshyatrails_treks_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."mokshyatrails_treks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mokshyatrails_treks_rels" ADD CONSTRAINT "mokshyatrails_treks_rels_mokshyatrails_photos_fk" FOREIGN KEY ("mokshyatrails_photos_id") REFERENCES "public"."mokshyatrails_photos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mokshyatrails_bookings" ADD CONSTRAINT "mokshyatrails_bookings_trek_id_mokshyatrails_treks_id_fk" FOREIGN KEY ("trek_id") REFERENCES "public"."mokshyatrails_treks"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "mokshyatrails_hero_description" ADD CONSTRAINT "mokshyatrails_hero_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mokshyatrails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mokshyatrails_nav" ADD CONSTRAINT "mokshyatrails_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mokshyatrails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mokshyatrails_slides" ADD CONSTRAINT "mokshyatrails_slides_image_id_mokshyatrails_photos_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."mokshyatrails_photos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "mokshyatrails_slides" ADD CONSTRAINT "mokshyatrails_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mokshyatrails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mokshyatrails_stats" ADD CONSTRAINT "mokshyatrails_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mokshyatrails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mokshyatrails" ADD CONSTRAINT "mokshyatrails_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "mokshyatrails_experiences_updated_at_idx" ON "mokshyatrails_experiences" USING btree ("updated_at");
  CREATE INDEX "mokshyatrails_experiences_created_at_idx" ON "mokshyatrails_experiences" USING btree ("created_at");
  CREATE INDEX "mokshyatrails_skill_categories_items_order_idx" ON "mokshyatrails_skill_categories_items" USING btree ("_order");
  CREATE INDEX "mokshyatrails_skill_categories_items_parent_id_idx" ON "mokshyatrails_skill_categories_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "mokshyatrails_skill_categories_key_idx" ON "mokshyatrails_skill_categories" USING btree ("key");
  CREATE INDEX "mokshyatrails_skill_categories_updated_at_idx" ON "mokshyatrails_skill_categories" USING btree ("updated_at");
  CREATE INDEX "mokshyatrails_skill_categories_created_at_idx" ON "mokshyatrails_skill_categories" USING btree ("created_at");
  CREATE INDEX "mokshyatrails_expertise_updated_at_idx" ON "mokshyatrails_expertise" USING btree ("updated_at");
  CREATE INDEX "mokshyatrails_expertise_created_at_idx" ON "mokshyatrails_expertise" USING btree ("created_at");
  CREATE INDEX "mokshyatrails_projects_tech_stack_order_idx" ON "mokshyatrails_projects_tech_stack" USING btree ("_order");
  CREATE INDEX "mokshyatrails_projects_tech_stack_parent_id_idx" ON "mokshyatrails_projects_tech_stack" USING btree ("_parent_id");
  CREATE INDEX "mokshyatrails_projects_image_idx" ON "mokshyatrails_projects" USING btree ("image_id");
  CREATE INDEX "mokshyatrails_projects_updated_at_idx" ON "mokshyatrails_projects" USING btree ("updated_at");
  CREATE INDEX "mokshyatrails_projects_created_at_idx" ON "mokshyatrails_projects" USING btree ("created_at");
  CREATE INDEX "mokshyatrails_publications_updated_at_idx" ON "mokshyatrails_publications" USING btree ("updated_at");
  CREATE INDEX "mokshyatrails_publications_created_at_idx" ON "mokshyatrails_publications" USING btree ("created_at");
  CREATE INDEX "mokshyatrails_photos_updated_at_idx" ON "mokshyatrails_photos" USING btree ("updated_at");
  CREATE INDEX "mokshyatrails_photos_created_at_idx" ON "mokshyatrails_photos" USING btree ("created_at");
  CREATE UNIQUE INDEX "mokshyatrails_photos_filename_idx" ON "mokshyatrails_photos" USING btree ("filename");
  CREATE INDEX "mokshyatrails_videos_updated_at_idx" ON "mokshyatrails_videos" USING btree ("updated_at");
  CREATE INDEX "mokshyatrails_videos_created_at_idx" ON "mokshyatrails_videos" USING btree ("created_at");
  CREATE INDEX "mokshyatrails_treks_itinerary_order_idx" ON "mokshyatrails_treks_itinerary" USING btree ("_order");
  CREATE INDEX "mokshyatrails_treks_itinerary_parent_id_idx" ON "mokshyatrails_treks_itinerary" USING btree ("_parent_id");
  CREATE INDEX "mokshyatrails_treks_includes_order_idx" ON "mokshyatrails_treks_includes" USING btree ("_order");
  CREATE INDEX "mokshyatrails_treks_includes_parent_id_idx" ON "mokshyatrails_treks_includes" USING btree ("_parent_id");
  CREATE INDEX "mokshyatrails_treks_excludes_order_idx" ON "mokshyatrails_treks_excludes" USING btree ("_order");
  CREATE INDEX "mokshyatrails_treks_excludes_parent_id_idx" ON "mokshyatrails_treks_excludes" USING btree ("_parent_id");
  CREATE INDEX "mokshyatrails_treks_departures_order_idx" ON "mokshyatrails_treks_departures" USING btree ("_order");
  CREATE INDEX "mokshyatrails_treks_departures_parent_id_idx" ON "mokshyatrails_treks_departures" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "mokshyatrails_treks_slug_idx" ON "mokshyatrails_treks" USING btree ("slug");
  CREATE INDEX "mokshyatrails_treks_hero_image_idx" ON "mokshyatrails_treks" USING btree ("hero_image_id");
  CREATE INDEX "mokshyatrails_treks_updated_at_idx" ON "mokshyatrails_treks" USING btree ("updated_at");
  CREATE INDEX "mokshyatrails_treks_created_at_idx" ON "mokshyatrails_treks" USING btree ("created_at");
  CREATE INDEX "mokshyatrails_treks_rels_order_idx" ON "mokshyatrails_treks_rels" USING btree ("order");
  CREATE INDEX "mokshyatrails_treks_rels_parent_idx" ON "mokshyatrails_treks_rels" USING btree ("parent_id");
  CREATE INDEX "mokshyatrails_treks_rels_path_idx" ON "mokshyatrails_treks_rels" USING btree ("path");
  CREATE INDEX "mokshyatrails_treks_rels_mokshyatrails_photos_id_idx" ON "mokshyatrails_treks_rels" USING btree ("mokshyatrails_photos_id");
  CREATE INDEX "mokshyatrails_bookings_trek_idx" ON "mokshyatrails_bookings" USING btree ("trek_id");
  CREATE INDEX "mokshyatrails_bookings_updated_at_idx" ON "mokshyatrails_bookings" USING btree ("updated_at");
  CREATE INDEX "mokshyatrails_bookings_created_at_idx" ON "mokshyatrails_bookings" USING btree ("created_at");
  CREATE INDEX "mokshyatrails_reviews_updated_at_idx" ON "mokshyatrails_reviews" USING btree ("updated_at");
  CREATE INDEX "mokshyatrails_reviews_created_at_idx" ON "mokshyatrails_reviews" USING btree ("created_at");
  CREATE INDEX "mokshyatrails_hero_description_order_idx" ON "mokshyatrails_hero_description" USING btree ("_order");
  CREATE INDEX "mokshyatrails_hero_description_parent_id_idx" ON "mokshyatrails_hero_description" USING btree ("_parent_id");
  CREATE INDEX "mokshyatrails_nav_order_idx" ON "mokshyatrails_nav" USING btree ("_order");
  CREATE INDEX "mokshyatrails_nav_parent_id_idx" ON "mokshyatrails_nav" USING btree ("_parent_id");
  CREATE INDEX "mokshyatrails_slides_order_idx" ON "mokshyatrails_slides" USING btree ("_order");
  CREATE INDEX "mokshyatrails_slides_parent_id_idx" ON "mokshyatrails_slides" USING btree ("_parent_id");
  CREATE INDEX "mokshyatrails_slides_image_idx" ON "mokshyatrails_slides" USING btree ("image_id");
  CREATE INDEX "mokshyatrails_stats_order_idx" ON "mokshyatrails_stats" USING btree ("_order");
  CREATE INDEX "mokshyatrails_stats_parent_id_idx" ON "mokshyatrails_stats" USING btree ("_parent_id");
  CREATE INDEX "mokshyatrails_image_idx" ON "mokshyatrails" USING btree ("image_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_mokshyatrails_experiences_fk" FOREIGN KEY ("mokshyatrails_experiences_id") REFERENCES "public"."mokshyatrails_experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_mokshyatrails_skill_categor_fk" FOREIGN KEY ("mokshyatrails_skill_categories_id") REFERENCES "public"."mokshyatrails_skill_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_mokshyatrails_expertise_fk" FOREIGN KEY ("mokshyatrails_expertise_id") REFERENCES "public"."mokshyatrails_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_mokshyatrails_projects_fk" FOREIGN KEY ("mokshyatrails_projects_id") REFERENCES "public"."mokshyatrails_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_mokshyatrails_publications_fk" FOREIGN KEY ("mokshyatrails_publications_id") REFERENCES "public"."mokshyatrails_publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_mokshyatrails_photos_fk" FOREIGN KEY ("mokshyatrails_photos_id") REFERENCES "public"."mokshyatrails_photos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_mokshyatrails_videos_fk" FOREIGN KEY ("mokshyatrails_videos_id") REFERENCES "public"."mokshyatrails_videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_mokshyatrails_treks_fk" FOREIGN KEY ("mokshyatrails_treks_id") REFERENCES "public"."mokshyatrails_treks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_mokshyatrails_bookings_fk" FOREIGN KEY ("mokshyatrails_bookings_id") REFERENCES "public"."mokshyatrails_bookings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_mokshyatrails_reviews_fk" FOREIGN KEY ("mokshyatrails_reviews_id") REFERENCES "public"."mokshyatrails_reviews"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_mokshyatrails_experiences__idx" ON "payload_locked_documents_rels" USING btree ("mokshyatrails_experiences_id");
  CREATE INDEX "payload_locked_documents_rels_mokshyatrails_skill_catego_idx" ON "payload_locked_documents_rels" USING btree ("mokshyatrails_skill_categories_id");
  CREATE INDEX "payload_locked_documents_rels_mokshyatrails_expertise_id_idx" ON "payload_locked_documents_rels" USING btree ("mokshyatrails_expertise_id");
  CREATE INDEX "payload_locked_documents_rels_mokshyatrails_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("mokshyatrails_projects_id");
  CREATE INDEX "payload_locked_documents_rels_mokshyatrails_publications_idx" ON "payload_locked_documents_rels" USING btree ("mokshyatrails_publications_id");
  CREATE INDEX "payload_locked_documents_rels_mokshyatrails_photos_id_idx" ON "payload_locked_documents_rels" USING btree ("mokshyatrails_photos_id");
  CREATE INDEX "payload_locked_documents_rels_mokshyatrails_videos_id_idx" ON "payload_locked_documents_rels" USING btree ("mokshyatrails_videos_id");
  CREATE INDEX "payload_locked_documents_rels_mokshyatrails_treks_id_idx" ON "payload_locked_documents_rels" USING btree ("mokshyatrails_treks_id");
  CREATE INDEX "payload_locked_documents_rels_mokshyatrails_bookings_id_idx" ON "payload_locked_documents_rels" USING btree ("mokshyatrails_bookings_id");
  CREATE INDEX "payload_locked_documents_rels_mokshyatrails_reviews_id_idx" ON "payload_locked_documents_rels" USING btree ("mokshyatrails_reviews_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "mokshyatrails_experiences" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mokshyatrails_skill_categories_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mokshyatrails_skill_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mokshyatrails_expertise" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mokshyatrails_projects_tech_stack" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mokshyatrails_projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mokshyatrails_publications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mokshyatrails_photos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mokshyatrails_videos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mokshyatrails_treks_itinerary" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mokshyatrails_treks_includes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mokshyatrails_treks_excludes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mokshyatrails_treks_departures" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mokshyatrails_treks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mokshyatrails_treks_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mokshyatrails_bookings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mokshyatrails_reviews" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mokshyatrails_hero_description" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mokshyatrails_nav" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mokshyatrails_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mokshyatrails_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mokshyatrails" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "mokshyatrails_experiences" CASCADE;
  DROP TABLE "mokshyatrails_skill_categories_items" CASCADE;
  DROP TABLE "mokshyatrails_skill_categories" CASCADE;
  DROP TABLE "mokshyatrails_expertise" CASCADE;
  DROP TABLE "mokshyatrails_projects_tech_stack" CASCADE;
  DROP TABLE "mokshyatrails_projects" CASCADE;
  DROP TABLE "mokshyatrails_publications" CASCADE;
  DROP TABLE "mokshyatrails_photos" CASCADE;
  DROP TABLE "mokshyatrails_videos" CASCADE;
  DROP TABLE "mokshyatrails_treks_itinerary" CASCADE;
  DROP TABLE "mokshyatrails_treks_includes" CASCADE;
  DROP TABLE "mokshyatrails_treks_excludes" CASCADE;
  DROP TABLE "mokshyatrails_treks_departures" CASCADE;
  DROP TABLE "mokshyatrails_treks" CASCADE;
  DROP TABLE "mokshyatrails_treks_rels" CASCADE;
  DROP TABLE "mokshyatrails_bookings" CASCADE;
  DROP TABLE "mokshyatrails_reviews" CASCADE;
  DROP TABLE "mokshyatrails_hero_description" CASCADE;
  DROP TABLE "mokshyatrails_nav" CASCADE;
  DROP TABLE "mokshyatrails_slides" CASCADE;
  DROP TABLE "mokshyatrails_stats" CASCADE;
  DROP TABLE "mokshyatrails" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_mokshyatrails_experiences_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_mokshyatrails_skill_categor_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_mokshyatrails_expertise_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_mokshyatrails_projects_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_mokshyatrails_publications_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_mokshyatrails_photos_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_mokshyatrails_videos_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_mokshyatrails_treks_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_mokshyatrails_bookings_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_mokshyatrails_reviews_fk";
  
  DROP INDEX "payload_locked_documents_rels_mokshyatrails_experiences__idx";
  DROP INDEX "payload_locked_documents_rels_mokshyatrails_skill_catego_idx";
  DROP INDEX "payload_locked_documents_rels_mokshyatrails_expertise_id_idx";
  DROP INDEX "payload_locked_documents_rels_mokshyatrails_projects_id_idx";
  DROP INDEX "payload_locked_documents_rels_mokshyatrails_publications_idx";
  DROP INDEX "payload_locked_documents_rels_mokshyatrails_photos_id_idx";
  DROP INDEX "payload_locked_documents_rels_mokshyatrails_videos_id_idx";
  DROP INDEX "payload_locked_documents_rels_mokshyatrails_treks_id_idx";
  DROP INDEX "payload_locked_documents_rels_mokshyatrails_bookings_id_idx";
  DROP INDEX "payload_locked_documents_rels_mokshyatrails_reviews_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "mokshyatrails_experiences_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "mokshyatrails_skill_categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "mokshyatrails_expertise_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "mokshyatrails_projects_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "mokshyatrails_publications_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "mokshyatrails_photos_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "mokshyatrails_videos_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "mokshyatrails_treks_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "mokshyatrails_bookings_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "mokshyatrails_reviews_id";
  DROP TYPE "public"."enum_mokshyatrails_treks_departures_status";
  DROP TYPE "public"."enum_mokshyatrails_treks_difficulty";
  DROP TYPE "public"."enum_mokshyatrails_bookings_status";`)
}
