import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "tech_experiences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" varchar NOT NULL,
  	"company" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tech_skill_categories_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"rating" numeric NOT NULL
  );
  
  CREATE TABLE "tech_skill_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"key" varchar NOT NULL,
  	"show" boolean DEFAULT true,
  	"priority" numeric DEFAULT 99 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tech_expertise" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"domain" varchar NOT NULL,
  	"years" varchar,
  	"description" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tech_projects_tech_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "tech_projects" (
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
  
  CREATE TABLE "tech_publications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"authors" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"publisher" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tech_photos" (
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
  
  CREATE TABLE "tech_videos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"album" varchar,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "research_experiences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" varchar NOT NULL,
  	"company" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "research_skill_categories_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"rating" numeric NOT NULL
  );
  
  CREATE TABLE "research_skill_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"key" varchar NOT NULL,
  	"show" boolean DEFAULT true,
  	"priority" numeric DEFAULT 99 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "research_expertise" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"domain" varchar NOT NULL,
  	"years" varchar,
  	"description" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "research_projects_tech_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "research_projects" (
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
  
  CREATE TABLE "research_publications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"authors" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"publisher" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "research_photos" (
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
  
  CREATE TABLE "research_videos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"album" varchar,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "trek_experiences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" varchar NOT NULL,
  	"company" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "trek_skill_categories_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"rating" numeric NOT NULL
  );
  
  CREATE TABLE "trek_skill_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"key" varchar NOT NULL,
  	"show" boolean DEFAULT true,
  	"priority" numeric DEFAULT 99 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "trek_expertise" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"domain" varchar NOT NULL,
  	"years" varchar,
  	"description" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "trek_projects_tech_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "trek_projects" (
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
  
  CREATE TABLE "trek_publications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"authors" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"publisher" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "trek_photos" (
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
  
  CREATE TABLE "trek_videos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"album" varchar,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
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
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tech_experiences_id" integer,
  	"tech_skill_categories_id" integer,
  	"tech_expertise_id" integer,
  	"tech_projects_id" integer,
  	"tech_publications_id" integer,
  	"tech_photos_id" integer,
  	"tech_videos_id" integer,
  	"research_experiences_id" integer,
  	"research_skill_categories_id" integer,
  	"research_expertise_id" integer,
  	"research_projects_id" integer,
  	"research_publications_id" integer,
  	"research_photos_id" integer,
  	"research_videos_id" integer,
  	"trek_experiences_id" integer,
  	"trek_skill_categories_id" integer,
  	"trek_expertise_id" integer,
  	"trek_projects_id" integer,
  	"trek_publications_id" integer,
  	"trek_photos_id" integer,
  	"trek_videos_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tech_hero_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"highlight" boolean DEFAULT false
  );
  
  CREATE TABLE "tech_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "tech" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Portfolio' NOT NULL,
  	"tagline" varchar DEFAULT 'Backend-focused full stack engineering',
  	"name" varchar DEFAULT 'Amit Gupta' NOT NULL,
  	"headline" varchar DEFAULT 'Lead Engineer | Full Stack Engineer (Backend-Focused)' NOT NULL,
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
  	"summary" varchar DEFAULT 'Tech Lead and Full Stack Engineer (Backend-Focused) with <strong>7+ years</strong> of experience architecting scalable systems, from requirement gathering and MVP development through cloud deployment and monitoring.' NOT NULL,
  	"hero_title" varchar DEFAULT 'Engineering systems that scale' NOT NULL,
  	"hero_cta_label" varchar DEFAULT 'Let''s build together' NOT NULL,
  	"hero_cta_href" varchar DEFAULT '/#contact' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "research_hero_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"highlight" boolean DEFAULT false
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
  	"name" varchar DEFAULT 'Amit Gupta' NOT NULL,
  	"headline" varchar DEFAULT 'Researcher | Human gait analysis and applied machine learning' NOT NULL,
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
  	"summary" varchar DEFAULT 'I work where <strong>research meets engineering</strong>: building the sensing hardware, computer-vision pipelines and analysis behind human gait studies, then turning the results into software that holds up outside the lab.' NOT NULL,
  	"hero_title" varchar DEFAULT 'Measuring how people move' NOT NULL,
  	"hero_cta_label" varchar DEFAULT 'Get in touch' NOT NULL,
  	"hero_cta_href" varchar DEFAULT '/#contact' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "trek_hero_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"highlight" boolean DEFAULT false
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
  	"tagline" varchar DEFAULT 'Himalayan trails, long walks and the gear that survives them — Kathmandu (Nepal)',
  	"name" varchar DEFAULT 'Amit Gupta' NOT NULL,
  	"headline" varchar DEFAULT 'Trekker | Himalayan trails' NOT NULL,
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
  	"summary" varchar DEFAULT 'Away from the screen I walk. This is where the <strong>trails, passes and altitude</strong> live — the routes covered in Nepal and beyond, with the photographs and films that came back from them.' NOT NULL,
  	"hero_title" varchar DEFAULT 'Walking the Himalaya' NOT NULL,
  	"hero_cta_label" varchar DEFAULT 'Say hello' NOT NULL,
  	"hero_cta_href" varchar DEFAULT '/#contact' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "tech_skill_categories_items" ADD CONSTRAINT "tech_skill_categories_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tech_skill_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tech_projects_tech_stack" ADD CONSTRAINT "tech_projects_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tech_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tech_projects" ADD CONSTRAINT "tech_projects_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "research_skill_categories_items" ADD CONSTRAINT "research_skill_categories_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."research_skill_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "research_projects_tech_stack" ADD CONSTRAINT "research_projects_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."research_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "research_projects" ADD CONSTRAINT "research_projects_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "trek_skill_categories_items" ADD CONSTRAINT "trek_skill_categories_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trek_skill_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trek_projects_tech_stack" ADD CONSTRAINT "trek_projects_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trek_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trek_projects" ADD CONSTRAINT "trek_projects_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tech_experiences_fk" FOREIGN KEY ("tech_experiences_id") REFERENCES "public"."tech_experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tech_skill_categories_fk" FOREIGN KEY ("tech_skill_categories_id") REFERENCES "public"."tech_skill_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tech_expertise_fk" FOREIGN KEY ("tech_expertise_id") REFERENCES "public"."tech_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tech_projects_fk" FOREIGN KEY ("tech_projects_id") REFERENCES "public"."tech_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tech_publications_fk" FOREIGN KEY ("tech_publications_id") REFERENCES "public"."tech_publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tech_photos_fk" FOREIGN KEY ("tech_photos_id") REFERENCES "public"."tech_photos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tech_videos_fk" FOREIGN KEY ("tech_videos_id") REFERENCES "public"."tech_videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_research_experiences_fk" FOREIGN KEY ("research_experiences_id") REFERENCES "public"."research_experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_research_skill_categories_fk" FOREIGN KEY ("research_skill_categories_id") REFERENCES "public"."research_skill_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_research_expertise_fk" FOREIGN KEY ("research_expertise_id") REFERENCES "public"."research_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_research_projects_fk" FOREIGN KEY ("research_projects_id") REFERENCES "public"."research_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_research_publications_fk" FOREIGN KEY ("research_publications_id") REFERENCES "public"."research_publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_research_photos_fk" FOREIGN KEY ("research_photos_id") REFERENCES "public"."research_photos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_research_videos_fk" FOREIGN KEY ("research_videos_id") REFERENCES "public"."research_videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trek_experiences_fk" FOREIGN KEY ("trek_experiences_id") REFERENCES "public"."trek_experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trek_skill_categories_fk" FOREIGN KEY ("trek_skill_categories_id") REFERENCES "public"."trek_skill_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trek_expertise_fk" FOREIGN KEY ("trek_expertise_id") REFERENCES "public"."trek_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trek_projects_fk" FOREIGN KEY ("trek_projects_id") REFERENCES "public"."trek_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trek_publications_fk" FOREIGN KEY ("trek_publications_id") REFERENCES "public"."trek_publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trek_photos_fk" FOREIGN KEY ("trek_photos_id") REFERENCES "public"."trek_photos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trek_videos_fk" FOREIGN KEY ("trek_videos_id") REFERENCES "public"."trek_videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tech_hero_description" ADD CONSTRAINT "tech_hero_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tech"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tech_nav" ADD CONSTRAINT "tech_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tech"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tech" ADD CONSTRAINT "tech_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "research_hero_description" ADD CONSTRAINT "research_hero_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."research"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "research_nav" ADD CONSTRAINT "research_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."research"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "research" ADD CONSTRAINT "research_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "trek_hero_description" ADD CONSTRAINT "trek_hero_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trek"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trek_nav" ADD CONSTRAINT "trek_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trek"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trek" ADD CONSTRAINT "trek_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "tech_experiences_updated_at_idx" ON "tech_experiences" USING btree ("updated_at");
  CREATE INDEX "tech_experiences_created_at_idx" ON "tech_experiences" USING btree ("created_at");
  CREATE INDEX "tech_skill_categories_items_order_idx" ON "tech_skill_categories_items" USING btree ("_order");
  CREATE INDEX "tech_skill_categories_items_parent_id_idx" ON "tech_skill_categories_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "tech_skill_categories_key_idx" ON "tech_skill_categories" USING btree ("key");
  CREATE INDEX "tech_skill_categories_updated_at_idx" ON "tech_skill_categories" USING btree ("updated_at");
  CREATE INDEX "tech_skill_categories_created_at_idx" ON "tech_skill_categories" USING btree ("created_at");
  CREATE INDEX "tech_expertise_updated_at_idx" ON "tech_expertise" USING btree ("updated_at");
  CREATE INDEX "tech_expertise_created_at_idx" ON "tech_expertise" USING btree ("created_at");
  CREATE INDEX "tech_projects_tech_stack_order_idx" ON "tech_projects_tech_stack" USING btree ("_order");
  CREATE INDEX "tech_projects_tech_stack_parent_id_idx" ON "tech_projects_tech_stack" USING btree ("_parent_id");
  CREATE INDEX "tech_projects_image_idx" ON "tech_projects" USING btree ("image_id");
  CREATE INDEX "tech_projects_updated_at_idx" ON "tech_projects" USING btree ("updated_at");
  CREATE INDEX "tech_projects_created_at_idx" ON "tech_projects" USING btree ("created_at");
  CREATE INDEX "tech_publications_updated_at_idx" ON "tech_publications" USING btree ("updated_at");
  CREATE INDEX "tech_publications_created_at_idx" ON "tech_publications" USING btree ("created_at");
  CREATE INDEX "tech_photos_updated_at_idx" ON "tech_photos" USING btree ("updated_at");
  CREATE INDEX "tech_photos_created_at_idx" ON "tech_photos" USING btree ("created_at");
  CREATE UNIQUE INDEX "tech_photos_filename_idx" ON "tech_photos" USING btree ("filename");
  CREATE INDEX "tech_videos_updated_at_idx" ON "tech_videos" USING btree ("updated_at");
  CREATE INDEX "tech_videos_created_at_idx" ON "tech_videos" USING btree ("created_at");
  CREATE INDEX "research_experiences_updated_at_idx" ON "research_experiences" USING btree ("updated_at");
  CREATE INDEX "research_experiences_created_at_idx" ON "research_experiences" USING btree ("created_at");
  CREATE INDEX "research_skill_categories_items_order_idx" ON "research_skill_categories_items" USING btree ("_order");
  CREATE INDEX "research_skill_categories_items_parent_id_idx" ON "research_skill_categories_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "research_skill_categories_key_idx" ON "research_skill_categories" USING btree ("key");
  CREATE INDEX "research_skill_categories_updated_at_idx" ON "research_skill_categories" USING btree ("updated_at");
  CREATE INDEX "research_skill_categories_created_at_idx" ON "research_skill_categories" USING btree ("created_at");
  CREATE INDEX "research_expertise_updated_at_idx" ON "research_expertise" USING btree ("updated_at");
  CREATE INDEX "research_expertise_created_at_idx" ON "research_expertise" USING btree ("created_at");
  CREATE INDEX "research_projects_tech_stack_order_idx" ON "research_projects_tech_stack" USING btree ("_order");
  CREATE INDEX "research_projects_tech_stack_parent_id_idx" ON "research_projects_tech_stack" USING btree ("_parent_id");
  CREATE INDEX "research_projects_image_idx" ON "research_projects" USING btree ("image_id");
  CREATE INDEX "research_projects_updated_at_idx" ON "research_projects" USING btree ("updated_at");
  CREATE INDEX "research_projects_created_at_idx" ON "research_projects" USING btree ("created_at");
  CREATE INDEX "research_publications_updated_at_idx" ON "research_publications" USING btree ("updated_at");
  CREATE INDEX "research_publications_created_at_idx" ON "research_publications" USING btree ("created_at");
  CREATE INDEX "research_photos_updated_at_idx" ON "research_photos" USING btree ("updated_at");
  CREATE INDEX "research_photos_created_at_idx" ON "research_photos" USING btree ("created_at");
  CREATE UNIQUE INDEX "research_photos_filename_idx" ON "research_photos" USING btree ("filename");
  CREATE INDEX "research_videos_updated_at_idx" ON "research_videos" USING btree ("updated_at");
  CREATE INDEX "research_videos_created_at_idx" ON "research_videos" USING btree ("created_at");
  CREATE INDEX "trek_experiences_updated_at_idx" ON "trek_experiences" USING btree ("updated_at");
  CREATE INDEX "trek_experiences_created_at_idx" ON "trek_experiences" USING btree ("created_at");
  CREATE INDEX "trek_skill_categories_items_order_idx" ON "trek_skill_categories_items" USING btree ("_order");
  CREATE INDEX "trek_skill_categories_items_parent_id_idx" ON "trek_skill_categories_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "trek_skill_categories_key_idx" ON "trek_skill_categories" USING btree ("key");
  CREATE INDEX "trek_skill_categories_updated_at_idx" ON "trek_skill_categories" USING btree ("updated_at");
  CREATE INDEX "trek_skill_categories_created_at_idx" ON "trek_skill_categories" USING btree ("created_at");
  CREATE INDEX "trek_expertise_updated_at_idx" ON "trek_expertise" USING btree ("updated_at");
  CREATE INDEX "trek_expertise_created_at_idx" ON "trek_expertise" USING btree ("created_at");
  CREATE INDEX "trek_projects_tech_stack_order_idx" ON "trek_projects_tech_stack" USING btree ("_order");
  CREATE INDEX "trek_projects_tech_stack_parent_id_idx" ON "trek_projects_tech_stack" USING btree ("_parent_id");
  CREATE INDEX "trek_projects_image_idx" ON "trek_projects" USING btree ("image_id");
  CREATE INDEX "trek_projects_updated_at_idx" ON "trek_projects" USING btree ("updated_at");
  CREATE INDEX "trek_projects_created_at_idx" ON "trek_projects" USING btree ("created_at");
  CREATE INDEX "trek_publications_updated_at_idx" ON "trek_publications" USING btree ("updated_at");
  CREATE INDEX "trek_publications_created_at_idx" ON "trek_publications" USING btree ("created_at");
  CREATE INDEX "trek_photos_updated_at_idx" ON "trek_photos" USING btree ("updated_at");
  CREATE INDEX "trek_photos_created_at_idx" ON "trek_photos" USING btree ("created_at");
  CREATE UNIQUE INDEX "trek_photos_filename_idx" ON "trek_photos" USING btree ("filename");
  CREATE INDEX "trek_videos_updated_at_idx" ON "trek_videos" USING btree ("updated_at");
  CREATE INDEX "trek_videos_created_at_idx" ON "trek_videos" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_tech_experiences_id_idx" ON "payload_locked_documents_rels" USING btree ("tech_experiences_id");
  CREATE INDEX "payload_locked_documents_rels_tech_skill_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("tech_skill_categories_id");
  CREATE INDEX "payload_locked_documents_rels_tech_expertise_id_idx" ON "payload_locked_documents_rels" USING btree ("tech_expertise_id");
  CREATE INDEX "payload_locked_documents_rels_tech_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("tech_projects_id");
  CREATE INDEX "payload_locked_documents_rels_tech_publications_id_idx" ON "payload_locked_documents_rels" USING btree ("tech_publications_id");
  CREATE INDEX "payload_locked_documents_rels_tech_photos_id_idx" ON "payload_locked_documents_rels" USING btree ("tech_photos_id");
  CREATE INDEX "payload_locked_documents_rels_tech_videos_id_idx" ON "payload_locked_documents_rels" USING btree ("tech_videos_id");
  CREATE INDEX "payload_locked_documents_rels_research_experiences_id_idx" ON "payload_locked_documents_rels" USING btree ("research_experiences_id");
  CREATE INDEX "payload_locked_documents_rels_research_skill_categories__idx" ON "payload_locked_documents_rels" USING btree ("research_skill_categories_id");
  CREATE INDEX "payload_locked_documents_rels_research_expertise_id_idx" ON "payload_locked_documents_rels" USING btree ("research_expertise_id");
  CREATE INDEX "payload_locked_documents_rels_research_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("research_projects_id");
  CREATE INDEX "payload_locked_documents_rels_research_publications_id_idx" ON "payload_locked_documents_rels" USING btree ("research_publications_id");
  CREATE INDEX "payload_locked_documents_rels_research_photos_id_idx" ON "payload_locked_documents_rels" USING btree ("research_photos_id");
  CREATE INDEX "payload_locked_documents_rels_research_videos_id_idx" ON "payload_locked_documents_rels" USING btree ("research_videos_id");
  CREATE INDEX "payload_locked_documents_rels_trek_experiences_id_idx" ON "payload_locked_documents_rels" USING btree ("trek_experiences_id");
  CREATE INDEX "payload_locked_documents_rels_trek_skill_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("trek_skill_categories_id");
  CREATE INDEX "payload_locked_documents_rels_trek_expertise_id_idx" ON "payload_locked_documents_rels" USING btree ("trek_expertise_id");
  CREATE INDEX "payload_locked_documents_rels_trek_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("trek_projects_id");
  CREATE INDEX "payload_locked_documents_rels_trek_publications_id_idx" ON "payload_locked_documents_rels" USING btree ("trek_publications_id");
  CREATE INDEX "payload_locked_documents_rels_trek_photos_id_idx" ON "payload_locked_documents_rels" USING btree ("trek_photos_id");
  CREATE INDEX "payload_locked_documents_rels_trek_videos_id_idx" ON "payload_locked_documents_rels" USING btree ("trek_videos_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "tech_hero_description_order_idx" ON "tech_hero_description" USING btree ("_order");
  CREATE INDEX "tech_hero_description_parent_id_idx" ON "tech_hero_description" USING btree ("_parent_id");
  CREATE INDEX "tech_nav_order_idx" ON "tech_nav" USING btree ("_order");
  CREATE INDEX "tech_nav_parent_id_idx" ON "tech_nav" USING btree ("_parent_id");
  CREATE INDEX "tech_image_idx" ON "tech" USING btree ("image_id");
  CREATE INDEX "research_hero_description_order_idx" ON "research_hero_description" USING btree ("_order");
  CREATE INDEX "research_hero_description_parent_id_idx" ON "research_hero_description" USING btree ("_parent_id");
  CREATE INDEX "research_nav_order_idx" ON "research_nav" USING btree ("_order");
  CREATE INDEX "research_nav_parent_id_idx" ON "research_nav" USING btree ("_parent_id");
  CREATE INDEX "research_image_idx" ON "research" USING btree ("image_id");
  CREATE INDEX "trek_hero_description_order_idx" ON "trek_hero_description" USING btree ("_order");
  CREATE INDEX "trek_hero_description_parent_id_idx" ON "trek_hero_description" USING btree ("_parent_id");
  CREATE INDEX "trek_nav_order_idx" ON "trek_nav" USING btree ("_order");
  CREATE INDEX "trek_nav_parent_id_idx" ON "trek_nav" USING btree ("_parent_id");
  CREATE INDEX "trek_image_idx" ON "trek" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "tech_experiences" CASCADE;
  DROP TABLE "tech_skill_categories_items" CASCADE;
  DROP TABLE "tech_skill_categories" CASCADE;
  DROP TABLE "tech_expertise" CASCADE;
  DROP TABLE "tech_projects_tech_stack" CASCADE;
  DROP TABLE "tech_projects" CASCADE;
  DROP TABLE "tech_publications" CASCADE;
  DROP TABLE "tech_photos" CASCADE;
  DROP TABLE "tech_videos" CASCADE;
  DROP TABLE "research_experiences" CASCADE;
  DROP TABLE "research_skill_categories_items" CASCADE;
  DROP TABLE "research_skill_categories" CASCADE;
  DROP TABLE "research_expertise" CASCADE;
  DROP TABLE "research_projects_tech_stack" CASCADE;
  DROP TABLE "research_projects" CASCADE;
  DROP TABLE "research_publications" CASCADE;
  DROP TABLE "research_photos" CASCADE;
  DROP TABLE "research_videos" CASCADE;
  DROP TABLE "trek_experiences" CASCADE;
  DROP TABLE "trek_skill_categories_items" CASCADE;
  DROP TABLE "trek_skill_categories" CASCADE;
  DROP TABLE "trek_expertise" CASCADE;
  DROP TABLE "trek_projects_tech_stack" CASCADE;
  DROP TABLE "trek_projects" CASCADE;
  DROP TABLE "trek_publications" CASCADE;
  DROP TABLE "trek_photos" CASCADE;
  DROP TABLE "trek_videos" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "tech_hero_description" CASCADE;
  DROP TABLE "tech_nav" CASCADE;
  DROP TABLE "tech" CASCADE;
  DROP TABLE "research_hero_description" CASCADE;
  DROP TABLE "research_nav" CASCADE;
  DROP TABLE "research" CASCADE;
  DROP TABLE "trek_hero_description" CASCADE;
  DROP TABLE "trek_nav" CASCADE;
  DROP TABLE "trek" CASCADE;`)
}
