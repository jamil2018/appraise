/*
  Warnings:

  - Added the required column `signature` to the `TemplateStep` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TemplateStep" ADD COLUMN     "signature" TEXT NOT NULL;
