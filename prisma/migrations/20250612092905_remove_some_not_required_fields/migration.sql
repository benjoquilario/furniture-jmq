/*
  Warnings:

  - You are about to drop the column `make` on the `Furniture` table. All the data in the column will be lost.
  - You are about to drop the column `pullOut` on the `Furniture` table. All the data in the column will be lost.
  - You are about to drop the column `seater` on the `Furniture` table. All the data in the column will be lost.
  - You are about to drop the column `shape` on the `Furniture` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Furniture` table. All the data in the column will be lost.
  - You are about to drop the column `style` on the `Furniture` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Furniture` table. All the data in the column will be lost.
  - You are about to drop the column `withStorage` on the `Furniture` table. All the data in the column will be lost.
  - You are about to drop the `SelectedFile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `brand` to the `Furniture` table without a default value. This is not possible if the table is not empty.
  - Made the column `stockCount` on table `Furniture` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "SelectedFile" DROP CONSTRAINT "SelectedFile_furnitureId_fkey";

-- AlterTable
ALTER TABLE "Furniture" DROP COLUMN "make",
DROP COLUMN "pullOut",
DROP COLUMN "seater",
DROP COLUMN "shape",
DROP COLUMN "status",
DROP COLUMN "style",
DROP COLUMN "weight",
DROP COLUMN "withStorage",
ADD COLUMN     "brand" TEXT NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "stockCount" SET NOT NULL;

-- DropTable
DROP TABLE "SelectedFile";

-- CreateTable
CREATE TABLE "FurnitureImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "furnitureId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FurnitureImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FurnitureImage" ADD CONSTRAINT "FurnitureImage_furnitureId_fkey" FOREIGN KEY ("furnitureId") REFERENCES "Furniture"("id") ON DELETE CASCADE ON UPDATE CASCADE;
