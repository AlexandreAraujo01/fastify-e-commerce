/*
  Warnings:

  - The primary key for the `Taxonomies` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_taxonomie_id_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "taxonomie_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Taxonomies" DROP CONSTRAINT "Taxonomies_pkey",
ALTER COLUMN "taxonomie_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Taxonomies_pkey" PRIMARY KEY ("taxonomie_id");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_taxonomie_id_fkey" FOREIGN KEY ("taxonomie_id") REFERENCES "Taxonomies"("taxonomie_id") ON DELETE RESTRICT ON UPDATE CASCADE;
