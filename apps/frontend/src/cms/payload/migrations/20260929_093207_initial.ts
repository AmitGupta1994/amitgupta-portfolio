import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

import { SITES, type SiteKey } from '@/types/sites'

type Row = Record<string, any>

const context = { disableRevalidate: true }

/** Legacy tables whose names collide with the new per-site globals. */
const COLLIDING = ['research', 'research_nav', 'trek', 'trek_nav'] as const

/** Everything the old shared schema created, dropped once its content is copied. */
const LEGACY_TABLES = [
  'experiences_placements',
  'experiences',
  'expertise_placements',
  'expertise',
  'publications_placements',
  'publications',
  'projects_placements',
  'projects_tech_stack',
  'projects',
  'skill_categories_placements',
  'skill_categories_items',
  'skill_categories',
  'photos',
  'videos',
  'profile_hero_description',
  'profile',
  'navigation_links',
  'navigation',
  'legacy_research_nav',
  'legacy_research',
  'legacy_trek_nav',
  'legacy_trek',
]

export async function up(args: MigrateUpArgs): Promise<void> {
  const { db } = args

  // The old schema had `research`/`trek` global tables of its own; move them aside
  // so the new per-site tables can be created, then read the copy out of them.
  for (const table of COLLIDING) {
    await db.execute(
      sql.raw(`DO $$ BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = '${table}' AND column_name IN ('about', 'href')
        ) AND NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = '${table}' AND column_name = 'summary'
        ) THEN
          ALTER TABLE "${table}" RENAME TO "legacy_${table}";
        END IF;
      END $$;`),
    )
  }

  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "tech_experiences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" varchar NOT NULL,
  	"company" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "tech_skill_categories_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"rating" numeric NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "tech_skill_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"key" varchar NOT NULL,
  	"show" boolean DEFAULT true,
  	"priority" numeric DEFAULT 99 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "tech_expertise" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"domain" varchar NOT NULL,
  	"years" varchar,
  	"description" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "tech_projects_tech_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "tech_projects" (
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
  
  CREATE TABLE IF NOT EXISTS "tech_publications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"authors" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"publisher" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "tech_photos" (
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
  
  CREATE TABLE IF NOT EXISTS "tech_videos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"album" varchar,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "research_experiences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" varchar NOT NULL,
  	"company" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "research_skill_categories_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"rating" numeric NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "research_skill_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"key" varchar NOT NULL,
  	"show" boolean DEFAULT true,
  	"priority" numeric DEFAULT 99 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "research_expertise" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"domain" varchar NOT NULL,
  	"years" varchar,
  	"description" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "research_projects_tech_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "research_projects" (
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
  
  CREATE TABLE IF NOT EXISTS "research_publications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"authors" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"publisher" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "research_photos" (
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
  
  CREATE TABLE IF NOT EXISTS "research_videos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"album" varchar,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "trek_experiences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" varchar NOT NULL,
  	"company" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "trek_skill_categories_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"rating" numeric NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "trek_skill_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"key" varchar NOT NULL,
  	"show" boolean DEFAULT true,
  	"priority" numeric DEFAULT 99 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "trek_expertise" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"domain" varchar NOT NULL,
  	"years" varchar,
  	"description" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "trek_projects_tech_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "trek_projects" (
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
  
  CREATE TABLE IF NOT EXISTS "trek_publications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"authors" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"publisher" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "trek_photos" (
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
  
  CREATE TABLE IF NOT EXISTS "trek_videos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"album" varchar,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
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
  
  CREATE TABLE IF NOT EXISTS "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "users" (
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
  
  CREATE TABLE IF NOT EXISTS "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
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
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "tech_hero_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"highlight" boolean DEFAULT false
  );
  
  CREATE TABLE IF NOT EXISTS "tech_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "tech" (
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
  
  CREATE TABLE IF NOT EXISTS "research_hero_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"highlight" boolean DEFAULT false
  );
  
  CREATE TABLE IF NOT EXISTS "research_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "research" (
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
  
  CREATE TABLE IF NOT EXISTS "trek_hero_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"highlight" boolean DEFAULT false
  );
  
  CREATE TABLE IF NOT EXISTS "trek_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "trek" (
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
  
`)

  // These link tables already exist on an upgraded database, so IF NOT EXISTS
  // skips them — add the columns the new collections need before the foreign
  // keys below reference them.
  await db.execute(sql`
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "tech_experiences_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "tech_skill_categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "tech_expertise_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "tech_projects_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "tech_publications_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "tech_photos_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "tech_videos_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "research_experiences_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "research_skill_categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "research_expertise_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "research_projects_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "research_publications_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "research_photos_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "research_videos_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "trek_experiences_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "trek_skill_categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "trek_expertise_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "trek_projects_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "trek_publications_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "trek_photos_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "trek_videos_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "media_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "users_id" integer;
  ALTER TABLE "payload_preferences_rels" ADD COLUMN IF NOT EXISTS "users_id" integer;
  `)

  await db.execute(sql`
  DO $$ BEGIN
    ALTER TABLE "tech_skill_categories_items" ADD CONSTRAINT "tech_skill_categories_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tech_skill_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "tech_projects_tech_stack" ADD CONSTRAINT "tech_projects_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tech_projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "tech_projects" ADD CONSTRAINT "tech_projects_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "research_skill_categories_items" ADD CONSTRAINT "research_skill_categories_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."research_skill_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "research_projects_tech_stack" ADD CONSTRAINT "research_projects_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."research_projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "research_projects" ADD CONSTRAINT "research_projects_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "trek_skill_categories_items" ADD CONSTRAINT "trek_skill_categories_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trek_skill_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "trek_projects_tech_stack" ADD CONSTRAINT "trek_projects_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trek_projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "trek_projects" ADD CONSTRAINT "trek_projects_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tech_experiences_fk" FOREIGN KEY ("tech_experiences_id") REFERENCES "public"."tech_experiences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tech_skill_categories_fk" FOREIGN KEY ("tech_skill_categories_id") REFERENCES "public"."tech_skill_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tech_expertise_fk" FOREIGN KEY ("tech_expertise_id") REFERENCES "public"."tech_expertise"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tech_projects_fk" FOREIGN KEY ("tech_projects_id") REFERENCES "public"."tech_projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tech_publications_fk" FOREIGN KEY ("tech_publications_id") REFERENCES "public"."tech_publications"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tech_photos_fk" FOREIGN KEY ("tech_photos_id") REFERENCES "public"."tech_photos"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tech_videos_fk" FOREIGN KEY ("tech_videos_id") REFERENCES "public"."tech_videos"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_research_experiences_fk" FOREIGN KEY ("research_experiences_id") REFERENCES "public"."research_experiences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_research_skill_categories_fk" FOREIGN KEY ("research_skill_categories_id") REFERENCES "public"."research_skill_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_research_expertise_fk" FOREIGN KEY ("research_expertise_id") REFERENCES "public"."research_expertise"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_research_projects_fk" FOREIGN KEY ("research_projects_id") REFERENCES "public"."research_projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_research_publications_fk" FOREIGN KEY ("research_publications_id") REFERENCES "public"."research_publications"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_research_photos_fk" FOREIGN KEY ("research_photos_id") REFERENCES "public"."research_photos"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_research_videos_fk" FOREIGN KEY ("research_videos_id") REFERENCES "public"."research_videos"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trek_experiences_fk" FOREIGN KEY ("trek_experiences_id") REFERENCES "public"."trek_experiences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trek_skill_categories_fk" FOREIGN KEY ("trek_skill_categories_id") REFERENCES "public"."trek_skill_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trek_expertise_fk" FOREIGN KEY ("trek_expertise_id") REFERENCES "public"."trek_expertise"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trek_projects_fk" FOREIGN KEY ("trek_projects_id") REFERENCES "public"."trek_projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trek_publications_fk" FOREIGN KEY ("trek_publications_id") REFERENCES "public"."trek_publications"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trek_photos_fk" FOREIGN KEY ("trek_photos_id") REFERENCES "public"."trek_photos"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trek_videos_fk" FOREIGN KEY ("trek_videos_id") REFERENCES "public"."trek_videos"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "tech_hero_description" ADD CONSTRAINT "tech_hero_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tech"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "tech_nav" ADD CONSTRAINT "tech_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tech"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "tech" ADD CONSTRAINT "tech_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "research_hero_description" ADD CONSTRAINT "research_hero_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."research"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "research_nav" ADD CONSTRAINT "research_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."research"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "research" ADD CONSTRAINT "research_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "trek_hero_description" ADD CONSTRAINT "trek_hero_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trek"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "trek_nav" ADD CONSTRAINT "trek_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trek"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "trek" ADD CONSTRAINT "trek_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  CREATE INDEX IF NOT EXISTS "tech_experiences_updated_at_idx" ON "tech_experiences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "tech_experiences_created_at_idx" ON "tech_experiences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "tech_skill_categories_items_order_idx" ON "tech_skill_categories_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tech_skill_categories_items_parent_id_idx" ON "tech_skill_categories_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "tech_skill_categories_key_idx" ON "tech_skill_categories" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "tech_skill_categories_updated_at_idx" ON "tech_skill_categories" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "tech_skill_categories_created_at_idx" ON "tech_skill_categories" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "tech_expertise_updated_at_idx" ON "tech_expertise" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "tech_expertise_created_at_idx" ON "tech_expertise" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "tech_projects_tech_stack_order_idx" ON "tech_projects_tech_stack" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tech_projects_tech_stack_parent_id_idx" ON "tech_projects_tech_stack" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tech_projects_image_idx" ON "tech_projects" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "tech_projects_updated_at_idx" ON "tech_projects" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "tech_projects_created_at_idx" ON "tech_projects" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "tech_publications_updated_at_idx" ON "tech_publications" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "tech_publications_created_at_idx" ON "tech_publications" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "tech_photos_updated_at_idx" ON "tech_photos" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "tech_photos_created_at_idx" ON "tech_photos" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "tech_photos_filename_idx" ON "tech_photos" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "tech_videos_updated_at_idx" ON "tech_videos" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "tech_videos_created_at_idx" ON "tech_videos" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "research_experiences_updated_at_idx" ON "research_experiences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "research_experiences_created_at_idx" ON "research_experiences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "research_skill_categories_items_order_idx" ON "research_skill_categories_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "research_skill_categories_items_parent_id_idx" ON "research_skill_categories_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "research_skill_categories_key_idx" ON "research_skill_categories" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "research_skill_categories_updated_at_idx" ON "research_skill_categories" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "research_skill_categories_created_at_idx" ON "research_skill_categories" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "research_expertise_updated_at_idx" ON "research_expertise" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "research_expertise_created_at_idx" ON "research_expertise" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "research_projects_tech_stack_order_idx" ON "research_projects_tech_stack" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "research_projects_tech_stack_parent_id_idx" ON "research_projects_tech_stack" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "research_projects_image_idx" ON "research_projects" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "research_projects_updated_at_idx" ON "research_projects" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "research_projects_created_at_idx" ON "research_projects" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "research_publications_updated_at_idx" ON "research_publications" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "research_publications_created_at_idx" ON "research_publications" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "research_photos_updated_at_idx" ON "research_photos" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "research_photos_created_at_idx" ON "research_photos" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "research_photos_filename_idx" ON "research_photos" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "research_videos_updated_at_idx" ON "research_videos" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "research_videos_created_at_idx" ON "research_videos" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "trek_experiences_updated_at_idx" ON "trek_experiences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "trek_experiences_created_at_idx" ON "trek_experiences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "trek_skill_categories_items_order_idx" ON "trek_skill_categories_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "trek_skill_categories_items_parent_id_idx" ON "trek_skill_categories_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "trek_skill_categories_key_idx" ON "trek_skill_categories" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "trek_skill_categories_updated_at_idx" ON "trek_skill_categories" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "trek_skill_categories_created_at_idx" ON "trek_skill_categories" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "trek_expertise_updated_at_idx" ON "trek_expertise" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "trek_expertise_created_at_idx" ON "trek_expertise" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "trek_projects_tech_stack_order_idx" ON "trek_projects_tech_stack" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "trek_projects_tech_stack_parent_id_idx" ON "trek_projects_tech_stack" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "trek_projects_image_idx" ON "trek_projects" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "trek_projects_updated_at_idx" ON "trek_projects" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "trek_projects_created_at_idx" ON "trek_projects" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "trek_publications_updated_at_idx" ON "trek_publications" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "trek_publications_created_at_idx" ON "trek_publications" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "trek_photos_updated_at_idx" ON "trek_photos" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "trek_photos_created_at_idx" ON "trek_photos" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "trek_photos_filename_idx" ON "trek_photos" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "trek_videos_updated_at_idx" ON "trek_videos" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "trek_videos_created_at_idx" ON "trek_videos" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX IF NOT EXISTS "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tech_experiences_id_idx" ON "payload_locked_documents_rels" USING btree ("tech_experiences_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tech_skill_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("tech_skill_categories_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tech_expertise_id_idx" ON "payload_locked_documents_rels" USING btree ("tech_expertise_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tech_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("tech_projects_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tech_publications_id_idx" ON "payload_locked_documents_rels" USING btree ("tech_publications_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tech_photos_id_idx" ON "payload_locked_documents_rels" USING btree ("tech_photos_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tech_videos_id_idx" ON "payload_locked_documents_rels" USING btree ("tech_videos_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_research_experiences_id_idx" ON "payload_locked_documents_rels" USING btree ("research_experiences_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_research_skill_categories__idx" ON "payload_locked_documents_rels" USING btree ("research_skill_categories_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_research_expertise_id_idx" ON "payload_locked_documents_rels" USING btree ("research_expertise_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_research_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("research_projects_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_research_publications_id_idx" ON "payload_locked_documents_rels" USING btree ("research_publications_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_research_photos_id_idx" ON "payload_locked_documents_rels" USING btree ("research_photos_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_research_videos_id_idx" ON "payload_locked_documents_rels" USING btree ("research_videos_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_trek_experiences_id_idx" ON "payload_locked_documents_rels" USING btree ("trek_experiences_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_trek_skill_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("trek_skill_categories_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_trek_expertise_id_idx" ON "payload_locked_documents_rels" USING btree ("trek_expertise_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_trek_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("trek_projects_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_trek_publications_id_idx" ON "payload_locked_documents_rels" USING btree ("trek_publications_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_trek_photos_id_idx" ON "payload_locked_documents_rels" USING btree ("trek_photos_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_trek_videos_id_idx" ON "payload_locked_documents_rels" USING btree ("trek_videos_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "tech_hero_description_order_idx" ON "tech_hero_description" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tech_hero_description_parent_id_idx" ON "tech_hero_description" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tech_nav_order_idx" ON "tech_nav" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tech_nav_parent_id_idx" ON "tech_nav" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tech_image_idx" ON "tech" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "research_hero_description_order_idx" ON "research_hero_description" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "research_hero_description_parent_id_idx" ON "research_hero_description" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "research_nav_order_idx" ON "research_nav" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "research_nav_parent_id_idx" ON "research_nav" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "research_image_idx" ON "research" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "trek_hero_description_order_idx" ON "trek_hero_description" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "trek_hero_description_parent_id_idx" ON "trek_hero_description" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "trek_nav_order_idx" ON "trek_nav" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "trek_nav_parent_id_idx" ON "trek_nav" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "trek_image_idx" ON "trek" USING btree ("image_id");`)

  await upgradeLegacyContent(args)
}


/**
 * Upgrades a database that still holds the old shared schema (one `experiences`
 * table for every site, a single `profile` global, `placements` rows deciding
 * which site showed what) to the per-site tables.
 *
 * Content is read with raw SELECTs — those collections no longer exist in the
 * config — and written through the local API so arrays and ids are handled for
 * us. Runs inside the migration's transaction: any failure rolls the lot back.
 */
async function upgradeLegacyContent({ db, payload, req }: MigrateUpArgs): Promise<void> {
  const all = async (table: string): Promise<Row[]> => {
    const { rows } = await db.execute(sql.raw(`select * from "${table}"`))
    return (rows ?? []) as Row[]
  }
  const exists = async (table: string): Promise<boolean> => {
    const { rows } = await db.execute(sql.raw(`select to_regclass('public.${table}') is not null as present`))
    return Boolean((rows?.[0] as Row | undefined)?.present)
  }

  if (!(await exists('experiences'))) return

  payload.logger.info('Legacy schema found — copying content into the per-site tables')

  const byOrder = (rows: Row[]) => [...rows].sort((a, b) => Number(a._order ?? 0) - Number(b._order ?? 0))
  const placementsFor = (rows: Row[], parentId: unknown) =>
    rows
      .filter((row) => String(row._parent_id) === String(parentId))
      .map((row) => ({ site: String(row.site) as SiteKey, order: Number(row.order ?? 0) }))

  /** Every site a legacy row belongs to: the tech portfolio plus its placements. */
  const targets = (row: Row, placements: Row[]) => [
    { site: 'tech' as SiteKey, order: Number(row.order ?? 0) },
    ...placementsFor(placements, row.id).filter((p) => SITES.includes(p.site)),
  ]

  const copy = async (
    legacyTable: string,
    placementTable: string,
    type: string,
    toData: (row: Row) => Record<string, unknown>,
  ) => {
    const rows = await all(legacyTable)
    const placements = (await exists(placementTable)) ? await all(placementTable) : []
    for (const row of rows) {
      for (const { site, order } of targets(row, placements)) {
        await payload.create({
          collection: `${site}-${type}` as 'tech-experiences',
          data: { ...toData(row), order } as never,
          req,
          context,
        })
      }
    }
    payload.logger.info(`Copied ${rows.length} ${legacyTable} row(s)`)
  }

  await copy('experiences', 'experiences_placements', 'experiences', (row) => ({
    role: row.role,
    company: row.company,
    date: row.date,
    description: row.description,
  }))

  await copy('expertise', 'expertise_placements', 'expertise', (row) => ({
    domain: row.domain,
    years: row.years ?? undefined,
    description: row.description,
  }))

  await copy('publications', 'publications_placements', 'publications', (row) => ({
    title: row.title,
    authors: row.authors,
    date: row.date,
    publisher: row.publisher,
  }))

  const techStack = (await exists('projects_tech_stack')) ? await all('projects_tech_stack') : []
  await copy('projects', 'projects_placements', 'projects', (row) => ({
    title: row.title,
    description: row.description,
    githubUrl: row.github_url ?? undefined,
    liveUrl: row.live_url ?? undefined,
    image: row.image_id ?? undefined,
    imageUrl: row.image_url ?? undefined,
    techStack: byOrder(techStack.filter((t) => String(t._parent_id) === String(row.id))).map((t) => ({
      name: t.name,
    })),
  }))

  // Skill categories carry their own `priority` instead of `order`.
  const skillItems = (await exists('skill_categories_items')) ? await all('skill_categories_items') : []
  const skillPlacements = (await exists('skill_categories_placements'))
    ? await all('skill_categories_placements')
    : []
  const skillRows = await all('skill_categories')
  for (const row of skillRows) {
    const sites: SiteKey[] = [
      'tech',
      ...placementsFor(skillPlacements, row.id)
        .map((p) => p.site)
        .filter((site) => SITES.includes(site)),
    ]
    for (const site of sites) {
      await payload.create({
        collection: `${site}-skill-categories` as 'tech-skill-categories',
        data: {
          title: row.title,
          key: row.key,
          show: row.show ?? true,
          priority: Number(row.priority ?? 99),
          items: byOrder(skillItems.filter((i) => String(i._parent_id) === String(row.id))).map((i) => ({
            name: i.name,
            rating: Number(i.rating),
          })),
        } as never,
        req,
        context,
      })
    }
  }
  payload.logger.info(`Copied ${skillRows.length} skill category row(s)`)

  // Uploads and films already carried a single site, so they move table-to-table.
  for (const table of ['photos', 'videos'] as const) {
    if (!(await exists(table))) continue
    const rows = await all(table)
    if (rows.length === 0) continue
    for (const site of SITES) {
      const columns =
        table === 'photos'
          ? '"caption", "album", "location", "order", "url", "thumbnail_u_r_l", "filename", "mime_type", "filesize", "width", "height", "focal_x", "focal_y", "updated_at", "created_at"'
          : '"title", "url", "description", "album", "order", "updated_at", "created_at"'
      await db.execute(
        sql.raw(
          `insert into "${site}_${table}" (${columns}) select ${columns} from "${table}" where site = '${site}'`,
        ),
      )
    }
    payload.logger.warn(
      `Copied ${rows.length} ${table} row(s). Blob URLs are per collection, so re-check those files in the admin.`,
    )
  }

  // Globals: the single profile plus each site's old page copy.
  const [profile] = await all('profile')
  if (profile) {
    const heroDescription = byOrder(await all('profile_hero_description')).map((row) => ({
      text: row.text,
      highlight: Boolean(row.highlight),
    }))
    const navLinks = (await exists('navigation_links'))
      ? byOrder(await all('navigation_links')).map((row) => ({ name: row.name, href: row.href }))
      : []

    const identity = {
      name: profile.name,
      headline: profile.headline,
      image: profile.image_id ?? undefined,
      imageUrl: profile.image_url ?? undefined,
      mainSiteUrl: profile.main_site_url ?? undefined,
      contact: {
        email: profile.contact_email,
        phone: profile.contact_phone,
        location: profile.contact_location ?? undefined,
        whatsapp: profile.contact_whatsapp ?? undefined,
        linkedin: profile.contact_linkedin ?? undefined,
        github: profile.contact_github ?? undefined,
        freelancer: profile.contact_freelancer ?? undefined,
        googleScholar: profile.contact_google_scholar ?? undefined,
      },
    }

    await payload.updateGlobal({
      slug: 'tech',
      data: {
        ...identity,
        title: 'Portfolio',
        summary: profile.summary,
        hero: {
          title: profile.hero_title,
          description: heroDescription,
          cta: { label: profile.hero_cta_label, href: profile.hero_cta_href },
        },
        nav: navLinks,
      } as never,
      req,
      context,
    })

    for (const site of ['research', 'trek'] as const) {
      if (!(await exists(`legacy_${site}`))) continue
      const [old] = await all(`legacy_${site}`)
      if (!old) continue
      const nav = (await exists(`legacy_${site}_nav`))
        ? byOrder(await all(`legacy_${site}_nav`)).map((row) => ({ name: row.name, href: row.href }))
        : []

      await payload.updateGlobal({
        slug: site,
        data: {
          ...identity,
          title: old.title,
          tagline: old.tagline ?? undefined,
          summary: old.about,
          hero: {
            title: old.hero_title || old.title,
            description: old.hero_description ? [{ text: old.hero_description }] : heroDescription,
            cta: { label: profile.hero_cta_label, href: profile.hero_cta_href },
          },
          nav,
          seo: { title: old.seo_title ?? undefined, description: old.seo_description ?? undefined },
        } as never,
        req,
        context,
      })
    }
    payload.logger.info('Copied the profile and per-site page copy into the site globals')
  }

  for (const table of LEGACY_TABLES) {
    await db.execute(sql.raw(`DROP TABLE IF EXISTS "${table}" CASCADE`))
  }
  payload.logger.info('Dropped the legacy shared tables')
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
