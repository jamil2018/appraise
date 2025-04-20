/*
  Warnings:

  - Changed the type of `type` on the `TemplateStep` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TemplateStepType" AS ENUM ('ACTION', 'ASSERTION', 'FLOW_CONTROL');

-- CreateEnum
CREATE TYPE "StepParameterValueType" AS ENUM ('STRING', 'NUMBER', 'LOCATOR');

-- AlterTable
ALTER TABLE "TemplateStep" DROP COLUMN "type",
ADD COLUMN     "type" "TemplateStepType" NOT NULL;

-- DropEnum
DROP TYPE "TestCaseTemplateStepType";
