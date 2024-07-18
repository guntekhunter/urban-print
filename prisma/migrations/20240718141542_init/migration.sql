/*
  Warnings:

  - Added the required column `name` to the `custumer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "custumer" ADD COLUMN     "name" TEXT NOT NULL;
