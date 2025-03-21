/*
  Warnings:

  - You are about to drop the column `parameters` on the `TemplateStep` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ParamType" AS ENUM ('NUMBER', 'STRING', 'DATE', 'BOOLEAN');

-- AlterTable
ALTER TABLE "TemplateStep" DROP COLUMN "parameters";

-- CreateTable
CREATE TABLE "TemplateStepParameter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ParamType" NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "templateStepId" TEXT NOT NULL,

    CONSTRAINT "TemplateStepParameter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TemplateStepParameter" ADD CONSTRAINT "TemplateStepParameter_templateStepId_fkey" FOREIGN KEY ("templateStepId") REFERENCES "TemplateStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
