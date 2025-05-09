-- AlterTable
ALTER TABLE "TestCaseStepParameter" ADD COLUMN     "locatorId" TEXT;

-- AddForeignKey
ALTER TABLE "TestCaseStepParameter" ADD CONSTRAINT "TestCaseStepParameter_locatorId_fkey" FOREIGN KEY ("locatorId") REFERENCES "Locator"("id") ON DELETE SET NULL ON UPDATE CASCADE;
