/*
  Warnings:

  - You are about to drop the `TestSuiteTestCases` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TestSuiteTestCases" DROP CONSTRAINT "TestSuiteTestCases_testCaseId_fkey";

-- DropForeignKey
ALTER TABLE "TestSuiteTestCases" DROP CONSTRAINT "TestSuiteTestCases_testSuiteId_fkey";

-- DropTable
DROP TABLE "TestSuiteTestCases";
