/*
  Warnings:

  - You are about to alter the column `price` on the `Furniture` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `weight` on the `Furniture` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Furniture" ALTER COLUMN "price" SET DATA TYPE INTEGER,
ALTER COLUMN "weight" SET DATA TYPE INTEGER;
