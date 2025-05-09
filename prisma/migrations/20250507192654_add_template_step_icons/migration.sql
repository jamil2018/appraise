/*
  Warnings:

  - Added the required column `icon` to the `TemplateStep` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TemplateStepIcon" AS ENUM ('MOUSE', 'NAVIGATION', 'INPUT', 'DOWNLOAD', 'API', 'STORE', 'FORMAT', 'DATA', 'UPLOAD', 'WAIT', 'VALIDATION', 'DEBUG');

-- AlterTable
ALTER TABLE "TemplateStep" ADD COLUMN     "icon" "TemplateStepIcon" NOT NULL;
