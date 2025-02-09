/*
  Warnings:

  - You are about to drop the column `Shape` on the `Furniture` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Furniture` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Furniture" DROP COLUMN "Shape",
DROP COLUMN "image",
ADD COLUMN     "cover" TEXT,
ADD COLUMN     "shape" TEXT,
ALTER COLUMN "pullOut" SET DEFAULT 0,
ALTER COLUMN "withStorage" SET DEFAULT false;

-- CreateTable
CREATE TABLE "SelectedFile" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "furnitureId" TEXT,
    "key" TEXT NOT NULL,

    CONSTRAINT "SelectedFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SelectedFile" ADD CONSTRAINT "SelectedFile_furnitureId_fkey" FOREIGN KEY ("furnitureId") REFERENCES "Furniture"("id") ON DELETE CASCADE ON UPDATE CASCADE;
