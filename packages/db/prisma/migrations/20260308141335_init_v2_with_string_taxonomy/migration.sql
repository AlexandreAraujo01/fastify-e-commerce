-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Product" (
    "product_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "taxonomie_id" INTEGER NOT NULL,
    "attributes" JSONB NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Taxonomies" (
    "taxonomie_id" INTEGER NOT NULL,
    "taxonomie_slug" TEXT NOT NULL,
    "taxonomie_description" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Taxonomies_pkey" PRIMARY KEY ("taxonomie_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Taxonomies_taxonomie_slug_key" ON "Taxonomies"("taxonomie_slug");

-- CreateIndex
CREATE INDEX "Taxonomies_taxonomie_slug_idx" ON "Taxonomies"("taxonomie_slug");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_taxonomie_id_fkey" FOREIGN KEY ("taxonomie_id") REFERENCES "Taxonomies"("taxonomie_id") ON DELETE RESTRICT ON UPDATE CASCADE;
