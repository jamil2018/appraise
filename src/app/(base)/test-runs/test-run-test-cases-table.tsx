import { getTestRunTestCasesAction } from "@/actions/test-run/test-run-actions";
import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { testRunTestCasesTableCols } from "./test-run-test-cases-table-columns";
import { TestRunTestCases } from "@/actions/test-run/test-run-actions";

const TestRunTestCasesTable = async ({ testRunId }: { testRunId: string }) => {
  const { data: testRunTestCases } = await getTestRunTestCasesAction(testRunId);

  return (
    <>
      <DataTable
        columns={testRunTestCasesTableCols}
        data={testRunTestCases as TestRunTestCases[]}
        filterColumn="testCase_title"
        filterPlaceholder="Filter by title..."
      />
    </>
  );
};

export default TestRunTestCasesTable;
