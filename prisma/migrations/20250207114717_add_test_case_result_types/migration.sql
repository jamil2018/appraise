/*
  Warnings:

  - The `result` column on the `TestRunTestCase` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `status` to the `TestRunTestCase` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TestCaseStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "TestCaseResult" AS ENUM ('PASSED', 'FAILED', 'COULD_NOT_COMPLETE');

-- AlterTable
ALTER TABLE "TestRunTestCase" ADD COLUMN     "status" "TestCaseStatus" NOT NULL,
DROP COLUMN "result",
ADD COLUMN     "result" "TestCaseResult";
