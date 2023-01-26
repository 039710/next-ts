-- CreateTable
CREATE TABLE "schedulers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "interval" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "schedulers_pkey" PRIMARY KEY ("id")
);
