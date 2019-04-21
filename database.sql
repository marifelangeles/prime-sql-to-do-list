CREATE TABLE "task" (
	"id" SERIAL PRIMARY KEY,
	"taskDescription" VARCHAR(200) NOT NULL,
	"completeStatus" BOOLEAN DEFAULT FALSE
);

INSERT INTO "task" ("taskDescription", "completeStatus")
VALUES ('Do laundry', FALSE);

SELECT * FROM "task";

INSERT INTO "task" ("taskDescription", "completeStatus")
VALUES ('Wash dishes', FALSE);

SELECT * FROM "task" ORDER BY "id" DESC;

DELETE FROM "task" WHERE "id" = 2;

UPDATE "task" SET "completeStatus" = 'TRUE'
WHERE "id" = 9;