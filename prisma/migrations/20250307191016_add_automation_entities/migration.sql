/*
  Warnings:

  - You are about to drop the column `expectedOutcome` on the `TestCase` table. All the data in the column will be lost.
  - You are about to drop the column `steps` on the `TestCase` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TestCase" DROP COLUMN "expectedOutcome",
DROP COLUMN "steps";

-- CreateTable
CREATE TABLE "TemplateStep" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "parameters" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TemplateStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestCaseTemplateStep" (
    "id" TEXT NOT NULL,
    "testCaseId" TEXT NOT NULL,
    "templateStepId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "TestCaseTemplateStep_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestCaseTemplateStep" ADD CONSTRAINT "TestCaseTemplateStep_testCaseId_fkey" FOREIGN KEY ("testCaseId") REFERENCES "TestCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestCaseTemplateStep" ADD CONSTRAINT "TestCaseTemplateStep_templateStepId_fkey" FOREIGN KEY ("templateStepId") REFERENCES "TemplateStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
