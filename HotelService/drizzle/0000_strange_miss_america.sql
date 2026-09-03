CREATE TABLE "hotels" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "hotels_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"location" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"rating" integer DEFAULT 0 NOT NULL,
	"rating_count" integer DEFAULT 0 NOT NULL
);
