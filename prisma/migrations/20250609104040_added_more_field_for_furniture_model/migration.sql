/*
  Warnings:

  - Added the required column `category` to the `Furniture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `make` to the `Furniture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Furniture" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "condition" TEXT NOT NULL DEFAULT 'New',
ADD COLUMN     "dimensions" TEXT,
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "make" TEXT NOT NULL,
ADD COLUMN     "material" TEXT,
ADD COLUMN     "model" TEXT,
ADD COLUMN     "status" TEXT,
ADD COLUMN     "stockCount" INTEGER DEFAULT 1,
ADD COLUMN     "style" TEXT,
ADD COLUMN     "weight" DOUBLE PRECISION;
