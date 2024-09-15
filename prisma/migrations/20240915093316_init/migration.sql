/*
  Warnings:

  - You are about to drop the column `cutting_length` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `cutting_width` on the `Order` table. All the data in the column will be lost.
  - Added the required column `product_size` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "cutting_length",
DROP COLUMN "cutting_width",
ADD COLUMN     "product_size" TEXT NOT NULL;
