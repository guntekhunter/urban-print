/*
  Warnings:

  - Added the required column `coating` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cutting_length` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cutting_width` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `material` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prize` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_length` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_width` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "coating" TEXT NOT NULL,
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "cutting_length" INTEGER NOT NULL,
ADD COLUMN     "cutting_width" INTEGER NOT NULL,
ADD COLUMN     "material" TEXT NOT NULL,
ADD COLUMN     "prize" INTEGER NOT NULL,
ADD COLUMN     "product_length" INTEGER NOT NULL,
ADD COLUMN     "product_width" INTEGER NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "custumer" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "contact_person" TEXT NOT NULL,

    CONSTRAINT "custumer_pkey" PRIMARY KEY ("id")
);
