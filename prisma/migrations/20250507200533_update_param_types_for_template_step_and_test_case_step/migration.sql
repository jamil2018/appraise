/*
  Warnings:

  - Changed the type of `type` on the `TemplateStepParameter` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `TestCaseStepParameter` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TemplateStepParameterType" AS ENUM ('NUMBER', 'STRING', 'DATE', 'BOOLEAN');

-- CreateEnum
CREATE TYPE "TestCaseStepParameterType" AS ENUM ('STRING', 'NUMBER', 'BOOLEAN', 'DATE', 'LOCATOR');

-- AlterTable
ALTER TABLE "TemplateStepParameter" DROP COLUMN "type",
ADD COLUMN     "type" "TemplateStepParameterType" NOT NULL;

-- AlterTable
ALTER TABLE "TestCaseStepParameter" DROP COLUMN "type",
ADD COLUMN     "type" "TestCaseStepParameterType" NOT NULL;

-- DropEnum
DROP TYPE "ParamType";
