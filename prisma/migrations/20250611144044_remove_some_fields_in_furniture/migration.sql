/*
  Warnings:

  - You are about to drop the column `cover` on the `Furniture` table. All the data in the column will be lost.
  - You are about to drop the column `measurements` on the `Furniture` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Furniture` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Furniture" DROP COLUMN "cover",
DROP COLUMN "measurements",
DROP COLUMN "size";
