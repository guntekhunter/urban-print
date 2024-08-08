/*
  Warnings:

  - Added the required column `sales_id` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "sales_id" INTEGER NOT NULL;
