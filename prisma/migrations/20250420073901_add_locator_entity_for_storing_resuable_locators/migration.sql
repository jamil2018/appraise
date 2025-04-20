/*
  Warnings:

  - You are about to drop the `TestCaseTemplateStep` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TestCaseTemplateStep" DROP CONSTRAINT "TestCaseTemplateStep_templateStepId_fkey";

-- DropForeignKey
ALTER TABLE "TestCaseTemplateStep" DROP CONSTRAINT "TestCaseTemplateStep_testCaseId_fkey";

-- DropTable
DROP TABLE "TestCaseTemplateStep";

-- CreateTable
CREATE TABLE "TestCaseStep" (
    "id" TEXT NOT NULL,
    "testCaseId" TEXT NOT NULL,
    "templateStepId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "TestCaseStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestCaseStepParameter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" "ParamType" NOT NULL,
    "order" INTEGER NOT NULL,
    "testCaseStepId" TEXT NOT NULL,

    CONSTRAINT "TestCaseStepParameter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Locator" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Locator_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestCaseStep" ADD CONSTRAINT "TestCaseStep_testCaseId_fkey" FOREIGN KEY ("testCaseId") REFERENCES "TestCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestCaseStep" ADD CONSTRAINT "TestCaseStep_templateStepId_fkey" FOREIGN KEY ("templateStepId") REFERENCES "TemplateStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestCaseStepParameter" ADD CONSTRAINT "TestCaseStepParameter_testCaseStepId_fkey" FOREIGN KEY ("testCaseStepId") REFERENCES "TestCaseStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
