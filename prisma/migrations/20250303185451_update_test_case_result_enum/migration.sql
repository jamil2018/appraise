/*
  Warnings:

  - The values [COULD_NOT_COMPLETE] on the enum `TestCaseResult` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TestCaseResult_new" AS ENUM ('PASSED', 'FAILED', 'BLOCKED', 'SKIPPED', 'RETEST', 'UNTESTED');
ALTER TABLE "TestRunTestCase" ALTER COLUMN "result" TYPE "TestCaseResult_new" USING ("result"::text::"TestCaseResult_new");
ALTER TYPE "TestCaseResult" RENAME TO "TestCaseResult_old";
ALTER TYPE "TestCaseResult_new" RENAME TO "TestCaseResult";
DROP TYPE "TestCaseResult_old";
COMMIT;
