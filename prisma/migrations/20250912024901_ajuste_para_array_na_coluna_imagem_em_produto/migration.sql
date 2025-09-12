/*
  Warnings:

  - The `imagemInterna` column on the `Produto` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `imagemExterna` column on the `Produto` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "imagemInterna",
ADD COLUMN     "imagemInterna" TEXT[],
DROP COLUMN "imagemExterna",
ADD COLUMN     "imagemExterna" TEXT[];
